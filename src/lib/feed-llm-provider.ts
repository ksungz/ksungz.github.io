import Anthropic from "@anthropic-ai/sdk";

export interface FeedLlmProviderInfo {
  name: string;
  configured: boolean;
  model: string | null;
}

interface FeedLlmConfig {
  provider: string;
  configured: boolean;
  apiKey: string;
  baseUrl: string;
  model: string;
}

// 2026-11-09 Ollama 구독을 그만두면서 Claude(Anthropic)를 기본 제공자로 쓴다.
// ollama는 FEED_LLM_PROVIDER=ollama로 지정하거나 Anthropic 키가 없을 때만 쓴다. scripts/feed/llm-provider.mjs와 같은 규칙이다.
const ANTHROPIC_DEFAULT_MODEL = "claude-sonnet-5-5";

function resolveConfig(): FeedLlmConfig {
  const explicit = (process.env.FEED_LLM_PROVIDER || "").trim().toLowerCase();
  const genericKey = process.env.FEED_LLM_API_KEY || "";
  const anthropicKey = process.env.ANTHROPIC_API_KEY || "";
  const ollamaKey = process.env.OLLAMA_API_KEY || "";
  const provider =
    explicit ||
    (anthropicKey ? "anthropic" : genericKey || ollamaKey ? "ollama" : "none");

  if (provider === "anthropic") {
    const apiKey = genericKey || anthropicKey;
    const requested = process.env.FEED_LLM_MODEL || "";
    return {
      provider,
      configured: Boolean(apiKey),
      apiKey,
      baseUrl: process.env.FEED_LLM_BASE_URL || "",
      // Ollama용 모델 이름이 남아 있어도 Claude에는 보내지 않는다.
      model: requested.startsWith("claude-") ? requested : ANTHROPIC_DEFAULT_MODEL,
    };
  }
  if (provider === "ollama") {
    const apiKey = genericKey || ollamaKey;
    return {
      provider,
      configured: Boolean(apiKey),
      apiKey,
      baseUrl:
        process.env.FEED_LLM_BASE_URL ||
        process.env.OLLAMA_HOST ||
        "https://ollama.com",
      model:
        process.env.FEED_LLM_MODEL ||
        process.env.OLLAMA_MODEL ||
        "kimi-k2.7-code:cloud",
    };
  }
  return {
    provider,
    configured: false,
    apiKey: "",
    baseUrl: "",
    model: "",
  };
}

export function getFeedLlmProviderInfo(): FeedLlmProviderInfo {
  const config = resolveConfig();
  return {
    name: config.provider,
    configured: config.configured,
    model: config.model || null,
  };
}

async function generateWithAnthropic(
  config: FeedLlmConfig,
  prompt: string,
  timeoutMs: number
): Promise<string> {
  // Studio에서 사람이 누르는 요청이라 다시 시도하지 않고 바로 실패를 알린다.
  const client = new Anthropic({
    apiKey: config.apiKey,
    authToken: null,
    ...(config.baseUrl ? { baseURL: config.baseUrl } : {}),
    maxRetries: 0,
  });
  const response = await client.messages.create(
    {
      model: config.model,
      // 생각(thinking)도 이 한도 안에서 쓰인다. Sonnet 5.5는 thinking을 끄는 disabled가 400이라 기본(adaptive)에 effort로 양을 정한다.
      max_tokens: 16_000,
      messages: [{ role: "user", content: prompt }],
      output_config: { effort: "medium" },
    },
    { timeout: timeoutMs }
  );
  if (response.stop_reason === "refusal") {
    throw new Error("LLM provider refused the request");
  }
  // 답 앞에 thinking 블록이 올 수 있어서 text 블록만 모은다. JSON은 호출하는 쪽에서 꺼낸다.
  return response.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("")
    .trim();
}

export async function generateFeedJson(
  prompt: string,
  timeoutMs: number = 120_000
): Promise<string> {
  const config = resolveConfig();
  if (!config.configured) {
    throw new Error(`LLM provider '${config.provider}' is not configured`);
  }
  if (config.provider === "anthropic") {
    return generateWithAnthropic(config, prompt, timeoutMs);
  }

  const response = await fetch(
    `${config.baseUrl.replace(/\/$/, "")}/api/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [{ role: "user", content: prompt }],
        stream: false,
        format: "json",
      }),
      signal: AbortSignal.timeout(timeoutMs),
    }
  );
  if (!response.ok) {
    throw new Error(`LLM provider returned ${response.status}`);
  }
  const data = (await response.json()) as {
    message?: { content?: string };
  };
  return data.message?.content || "";
}
