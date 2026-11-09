import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";

import { generateFeedJson, getFeedLlmProviderInfo } from "./llm-provider.mjs";

const KEYS = [
  "FEED_LLM_PROVIDER",
  "FEED_LLM_API_KEY",
  "FEED_LLM_MODEL",
  "FEED_LLM_BASE_URL",
  "ANTHROPIC_API_KEY",
  "OLLAMA_API_KEY",
  "OLLAMA_MODEL",
  "OLLAMA_HOST",
];

// 테스트마다 제공자 관련 환경변수만 비우고 다시 채운다. 실제 API로는 나가지 않는다.
function withEnv(values, run) {
  const saved = Object.fromEntries(KEYS.map((key) => [key, process.env[key]]));
  for (const key of KEYS) delete process.env[key];
  Object.assign(process.env, values);
  const restore = () => {
    for (const key of KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  };
  return Promise.resolve().then(run).finally(restore);
}

// 가짜 Claude API: 요청을 모으고 준비한 응답을 차례로 돌려준다.
const seen = [];
let replies = [];
const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    seen.push({ url: req.url, body: JSON.parse(body || "{}") });
    const { status = 200, json } = replies.shift() || {};
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(json));
  });
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
test.after(() => server.close());
const baseUrl = `http://127.0.0.1:${server.address().port}`;

const message = (content, stopReason = "end_turn") => ({
  json: {
    id: "msg_test",
    type: "message",
    role: "assistant",
    model: "claude-sonnet-5-5",
    content,
    stop_reason: stopReason,
    stop_sequence: null,
    usage: { input_tokens: 1, output_tokens: 1 },
  },
});

test("제공자: Anthropic 키가 있으면 Claude Sonnet 5.5를 쓰고, 없으면 예전처럼 Ollama를 쓴다", () =>
  withEnv({ ANTHROPIC_API_KEY: "a", OLLAMA_API_KEY: "o" }, () => {
    assert.deepEqual(getFeedLlmProviderInfo(), {
      name: "anthropic",
      configured: true,
      model: "claude-sonnet-5-5",
    });
  })
    .then(() =>
      withEnv({ OLLAMA_API_KEY: "o" }, () => {
        assert.deepEqual(getFeedLlmProviderInfo(), {
          name: "ollama",
          configured: true,
          model: "kimi-k2.7-code:cloud",
        });
      })
    )
    .then(() =>
      withEnv({}, () => {
        assert.deepEqual(getFeedLlmProviderInfo(), {
          name: "none",
          configured: false,
          model: null,
        });
      })
    ));

test("제공자: 워크플로처럼 FEED_LLM_*로 지정하면 그 키와 모델을 쓰고, Ollama 모델 이름은 Claude에 보내지 않는다", () =>
  withEnv(
    {
      FEED_LLM_PROVIDER: "anthropic",
      FEED_LLM_API_KEY: "k",
      FEED_LLM_MODEL: "claude-haiku-5-5",
    },
    () => {
      assert.deepEqual(getFeedLlmProviderInfo(), {
        name: "anthropic",
        configured: true,
        model: "claude-haiku-5-5",
      });
    }
  )
    .then(() =>
      withEnv(
        { FEED_LLM_PROVIDER: "anthropic", FEED_LLM_API_KEY: "k", FEED_LLM_MODEL: "kimi-k2.7-code:cloud" },
        () => {
          assert.equal(getFeedLlmProviderInfo().model, "claude-sonnet-5-5");
        }
      )
    )
    .then(() =>
      withEnv({ FEED_LLM_PROVIDER: "anthropic" }, () => {
        // 비밀값이 아직 없으면 LLM 없이 규칙 기반으로만 수집한다.
        assert.equal(getFeedLlmProviderInfo().configured, false);
      })
    ));

test("Claude 요청: 프롬프트 하나를 user로 보내고 effort만 정하며, 샘플링 값과 thinking 설정은 보내지 않는다", () =>
  withEnv({ ANTHROPIC_API_KEY: "test-key", FEED_LLM_BASE_URL: baseUrl }, async () => {
    seen.length = 0;
    replies = [
      message([
        { type: "thinking", thinking: "", signature: "sig" },
        { type: "text", text: '```json\n{"summary":"요약"' },
        { type: "text", text: "}\n```" },
      ]),
    ];
    const raw = await generateFeedJson("JSON으로만 응답해", 5_000);
    assert.equal(raw, '```json\n{"summary":"요약"}\n```');
    assert.deepEqual(JSON.parse(raw.match(/\{[\s\S]*\}/)[0]), { summary: "요약" });
    const [request] = seen;
    assert.equal(request.url, "/v1/messages");
    assert.equal(request.body.model, "claude-sonnet-5-5");
    assert.equal(request.body.max_tokens, 16_000);
    assert.deepEqual(request.body.messages, [{ role: "user", content: "JSON으로만 응답해" }]);
    assert.deepEqual(request.body.output_config, { effort: "medium" });
    for (const key of ["temperature", "top_p", "top_k", "thinking", "format", "stream"]) {
      assert.ok(!(key in request.body), key);
    }
  }));

test("Claude 응답: 거절과 API 오류는 예외로 알려 호출한 쪽이 규칙 기반 결과로 돌아가게 한다", () =>
  withEnv({ ANTHROPIC_API_KEY: "test-key", FEED_LLM_BASE_URL: baseUrl }, async () => {
    replies = [message([{ type: "text", text: "{}" }], "refusal")];
    await assert.rejects(generateFeedJson("q", 5_000), /refused/);

    replies = [
      {
        status: 400,
        json: { type: "error", error: { type: "invalid_request_error", message: "bad" } },
      },
    ];
    await assert.rejects(generateFeedJson("q", 5_000), /400/);

    await withEnv({}, () =>
      assert.rejects(generateFeedJson("q", 5_000), /not configured/)
    );
  }));
