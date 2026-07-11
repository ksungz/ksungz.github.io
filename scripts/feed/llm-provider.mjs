function resolveConfig() {
  const apiKey = process.env.FEED_LLM_API_KEY || process.env.OLLAMA_API_KEY || "";
  const provider = (
    process.env.FEED_LLM_PROVIDER || (apiKey ? "ollama" : "none")
  ).toLowerCase();

  if (provider === "none") {
    return { provider, configured: false, apiKey: "", baseUrl: "", model: "" };
  }
  if (provider !== "ollama") {
    return { provider, configured: false, apiKey: "", baseUrl: "", model: "" };
  }
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

export function getFeedLlmProviderInfo() {
  const config = resolveConfig();
  return {
    name: config.provider,
    configured: config.configured,
    model: config.model || null,
  };
}

export async function generateFeedJson(prompt, timeoutMs = 120_000) {
  const config = resolveConfig();
  if (!config.configured) {
    throw new Error(`LLM provider '${config.provider}' is not configured`);
  }

  const response = await fetch(`${config.baseUrl.replace(/\/$/, "")}/api/chat`, {
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
  });
  if (!response.ok) {
    throw new Error(`LLM provider returned ${response.status}`);
  }
  const data = await response.json();
  return data.message?.content || "";
}
