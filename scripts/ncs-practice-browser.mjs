import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import assert from "node:assert/strict";

const loadPackage = createRequire(import.meta.url);
const { chromium, expect } = loadPackage("playwright/test");

const baseURL = process.env.NCS_TEST_URL || "http://localhost:9999";
const output = fs.mkdtempSync(path.join(os.tmpdir(), "ncs-practice-"));
const errors = [];

async function screenshotTop(page, filename) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: path.join(output, filename), fullPage: true });
}

async function main() {
  const browser = await chromium.launch();
  try {
    const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await desktop.newPage();
    page.on("pageerror", error => errors.push(error.message));
    const url = baseURL + "/learning/ncs-mock-test.html";
    await page.goto(url);
    const questions = await page.evaluate(() => window.NCS_NILE_PRACTICE.questions);
    await expect(page.getByText("110분", { exact: true })).toBeVisible();
    await expect(page.getByText("20문항", { exact: true })).toHaveCount(5);
    await page.getByRole("button", { name: "실전 연습 시작", exact: true }).click();
    await expect(page.locator("#timer")).toHaveText(/110:00|109:5\d/);
    await expect(page.locator(".study-help")).toHaveCount(0);
    await expect(page.locator(".quick-answer")).toHaveCount(0);
    await page.getByRole("radiogroup").getByText(questions[0].options[0], { exact: true }).click();
    await expect(page.getByRole("radio", { name: "1번 선택지", exact: true })).toBeFocused();
    await page.getByRole("radio", { name: "1번 선택지", exact: true }).press("ArrowRight");
    await expect(page.getByRole("radio", { name: "2번 선택지", exact: true })).toBeChecked();
    await expect(page.locator(".question-number strong")).toHaveText("1");
    await page.getByRole("radiogroup").getByText(questions[0].options[0], { exact: true }).click();
    await page.getByRole("button", { name: "검토 표시", exact: false }).click();
    await page.reload();
    await expect(page.getByRole("radio", { name: "1번 선택지", exact: true })).toBeChecked();
    await expect(page.getByRole("button", { name: "표시 해제", exact: false })).toBeVisible();
    await expect(page.locator(".answer-progress-fill")).toHaveAttribute("style", "width:1%");
    await screenshotTop(page, "desktop-question.png");

    for (let i = 0; i < questions.length; i++) {
      await page.locator(".answer-sidebar").getByRole("button", { name: `${i + 1}번 문항`, exact: true }).click();
      await expect(page.getByRole("heading", { level: 2 }).first()).toHaveText(questions[i].prompt);
      await page.getByRole("radiogroup").getByText(questions[i].options[questions[i].answer], { exact: true }).click();
    }
    await page.getByRole("button", { name: "제출", exact: false }).first().click();
    await expect(page.getByRole("dialog")).toContainText("100문항에 모두 답했습니다.");
    await page.getByRole("button", { name: "제출하기", exact: true }).click();
    await expect(page.locator(".score-value strong")).toHaveText("100");
    await expect(page.locator(".domain-result-score strong")).toHaveText(["20", "20", "20", "20", "20"]);
    for (const bar of await page.locator(".domain-bar-fill").all()) await expect(bar).toHaveAttribute("style", "width:100%");
    await screenshotTop(page, "desktop-result.png");
    await page.getByRole("button", { name: "다시 풀기", exact: true }).click();
    await page.getByRole("button", { name: "다시 시작", exact: true }).click();
    await expect(page.getByRole("button", { name: "실전 연습 시작", exact: true })).toBeVisible();

    await page.evaluate(q => {
      const now = Date.now();
      const answers = Array(100).fill(null);
      answers[0] = q[0].answer;
      answers[1] = (q[1].answer + 1) % 4;
      localStorage.setItem("ncs-nile-reading-v1", JSON.stringify({ version: 1, mode: "exam", status: "running", current: 0, answers, marked: Array(100).fill(false), startedAt: now - 110 * 60000, endAt: now - 1, submittedAt: null, timeSpent: null, finishReason: null }));
    }, questions);
    await page.reload();
    await expect(page.locator(".score-value strong")).toHaveText("1");
    await expect(page.locator(".summary-item strong")).toHaveText(["1", "1", "110:00"]);
    await expect(page.locator(".result-note")).toContainText("미응답 98문항");
    await page.getByRole("button", { name: "오답 1", exact: true }).click();
    await expect(page.locator(".review-nav .answer-cell")).toHaveCount(1);
    await expect(page.locator(".review-question .question-number strong")).toHaveText("2");

    const mobile = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
    const phone = await mobile.newPage();
    phone.on("pageerror", error => errors.push(error.message));
    await phone.goto(url);
    await phone.getByRole("radio", { name: "학습", exact: true }).check();
    await expect(phone.getByRole("radio", { name: "학습", exact: true })).toBeFocused();
    await phone.getByRole("button", { name: "학습 시작", exact: true }).click();
    await expect(phone.locator("#timer")).toHaveText("시간 제한 없음");
    await expect(phone.locator(".study-help details")).toHaveCount(2);
    await expect(phone.locator(".study-help details[open]")).toHaveCount(0);
    await phone.getByText("풀이 힌트", { exact: true }).click();
    await expect(phone.locator(".study-help details").first()).toHaveAttribute("open", "");
    await phone.getByText("정답과 해설", { exact: true }).click();
    await expect(phone.locator(".study-help details").last()).toContainText(`정답 ${questions[0].answer + 1}번`);
    await screenshotTop(phone, "mobile-study.png");
    await phone.getByRole("radiogroup").getByText(questions[0].options[1], { exact: true }).click();
    await phone.reload();
    await expect(phone.getByRole("radio", { name: "2번 선택지", exact: true })).toBeChecked();
    await expect(phone.locator("#timer")).toHaveText("시간 제한 없음");
    await phone.getByRole("button", { name: "답안지", exact: false }).first().click();
    await expect(phone.getByRole("dialog", { name: "답안지", exact: true })).toBeVisible();
    await phone.getByRole("dialog", { name: "답안지", exact: true }).getByRole("button", { name: "81번 문항", exact: true }).click();
    await expect(phone.locator(".question-table th")).toHaveCount(6);
    assert.ok(await phone.locator(".question-table-wrap").evaluate(el => el.scrollWidth > el.clientWidth), "mobile table should scroll within its container");
    assert.ok(await phone.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "no horizontal page overflow");
    await screenshotTop(phone, "mobile-table.png");
    await phone.setViewportSize({ width: 320, height: 740 });
    assert.ok(await phone.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "no horizontal page overflow at 320px");
    await screenshotTop(phone, "mobile-320.png");

    const old = await desktop.newPage();
    old.on("pageerror", error => errors.push(error.message));
    await old.goto(url + "?exam=gtp");
    await expect(old.getByText("50분", { exact: true })).toBeVisible();
    await old.getByRole("button", { name: "실전 연습 시작", exact: true }).click();
    const oldOption = await old.evaluate(() => window.NCS_MOCK_ADVANCED_QUESTIONS[0].options[2]);
    await old.getByRole("radiogroup").getByText(oldOption, { exact: true }).click();
    await old.reload();
    await expect(old.getByRole("radio", { name: "3번 선택지", exact: true })).toBeChecked();
    const keys = await old.evaluate(() => Object.keys(localStorage));
    assert.ok(keys.includes("gtp-ncs-mock-test-v2") && keys.includes("ncs-nile-reading-v1"));
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ passed: true, allQuestionsRendered: 100, checks: ["timed answers hidden", "resume and review flags", "100-point scoring and domain bars", "automatic timeout and filters", "study hints and explanations", "mobile answer sheet and table overflow", "legacy answers isolated"], screenshots: output }, null, 2));
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
