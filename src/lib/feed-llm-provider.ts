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

// 2026-11-09 Ollama 구독을 그만두면서 Claude(Anthropic)로 옮기고 Ollama 경로는 지웠다.
// 키가 없거나 다른 제공자를 지정하면 설정 안 됨으로 본다. scripts/feed/llm-provider.mjs와 같은 규칙이다.
const ANTHROPIC_DEFAULT_MODEL = "claude-sonnet-5-5";

function resolveConfig(): FeedLlmConfig {
  const explicit = (process.env.FEED_LLM_PROVIDER || "").trim().toLowerCase();
  const apiKey =
    process.env.FEED_LLM_API_KEY || process.env.ANTHROPIC_API_KEY || "";
  const provider = explicit || (apiKey ? "anthropic" : "none");
  if (provider !== "anthropic") {
    return {
      provider,
      configured: false,
      apiKey: "",
      baseUrl: "",
      model: "",
    };
  }
  const requested = process.env.FEED_LLM_MODEL || "";
  return {
    provider,
    configured: Boolean(apiKey),
    apiKey,
    baseUrl: process.env.FEED_LLM_BASE_URL || "",
    // claude-로 시작하지 않는 예전 모델 이름은 Claude에 보내지 않는다.
    model: requested.startsWith("claude-") ? requested : ANTHROPIC_DEFAULT_MODEL,
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

export async function generateFeedJson(
  prompt: string,
  timeoutMs: number = 120_000
): Promise<string> {
  const config = resolveConfig();
  if (!config.configured) {
    throw new Error(`LLM provider '${config.provider}' is not configured`);
  }
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
