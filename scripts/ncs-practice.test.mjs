import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../public/learning/ncs-mock-test-nile.js", import.meta.url), "utf8");
function load() {
  const window = {};
  vm.runInNewContext(source, { window });
  return JSON.parse(JSON.stringify(window.NCS_NILE_PRACTICE));
}
const exam = load();
function correct(id, expected) {
  const q = exam.questions[id - 1];
  assert.equal(q.options[q.answer], expected, `Q${id}: ${q.prompt}`);
}

test("100 questions, five disclosed domains, 20 independent scenarios", () => {
  assert.equal(exam.minutes, 110);
  assert.equal(exam.questions.length, 100);
  assert.equal(new Set(exam.questions.map(q => q.setTitle)).size, 20);
  assert.deepEqual(exam.domains, ["의사소통능력", "문제해결능력", "자기관리능력", "디지털능력", "수리능력"]);
  for (const domain of exam.domains) {
    assert.equal(exam.questions.filter(q => q.domain === domain).length, 20);
  }
  for (const [index, q] of exam.questions.entries()) {
    assert.equal(q.id, index + 1);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4);
    assert.ok(q.passage.length >= 280 && q.passage.includes("\n\n"));
    assert.ok(q.explanation.length >= 40 && q.hint.length >= 20);
    if (q.table) for (const row of q.table.rows) assert.equal(row.length, q.table.headers.length);
  }
});

test("stable options and balanced correct positions", () => {
  assert.deepEqual(load(), exam);
  const counts = [0, 0, 0, 0];
  for (const q of exam.questions) counts[q.answer]++;
  assert.deepEqual(counts, [25, 25, 25, 25]);
});

function permutations(values) {
  if (values.length === 0) return [[]];
  return values.flatMap((v, i) => permutations(values.filter((_, j) => i !== j)).map(p => [v, ...p]));
}
function schedules(eDay, forbidMonday) {
  return permutations(["A", "B", "C", "D", "E"]).filter(p =>
    p.indexOf("A") < p.indexOf("C") && p.indexOf("D") === p.indexOf("B") + 1 &&
    p[eDay] === "E" && (!forbidMonday || p[0] !== "A"));
}
test("Q21-25: exhaust every schedule, including changed conditions", () => {
  assert.deepEqual(schedules(2, true), [["B", "D", "E", "A", "C"]]);
  correct(21, schedules(2, true)[0].join(", "));
  correct(22, schedules(2, true)[0][1]);
  correct(23, schedules(2, false).length + "개");
  assert.equal(schedules(1, true).length, 0);
  correct(24, "모든 조건을 만족하는 일정이 없다.");
  assert.equal(schedules(2, true).filter(p => p[3] === "C").length, 0);
});

test("Q26-30: compute earliest finish from dependency graph", () => {
  const graph = { A: [20, []], B: [30, ["A"]], C: [15, ["A"]], D: [25, ["B", "C"]], E: [20, ["C"]], F: [10, ["D", "E"]] };
  function finish(overrides = {}) {
    const ends = {};
    for (const [name, [duration, dependencies]] of Object.entries(graph)) {
      ends[name] = Math.max(0, ...dependencies.map(d => ends[d])) + (overrides[name] ?? duration);
    }
    return ends.F;
  }
  function time(minutes) { return `${9 + Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`; }
  correct(26, time(finish()));
  correct(27, "A → B → D → F");
  correct(28, time(finish({ C: 5 })));
  correct(29, time(finish({ B: 20 })));
  correct(30, finish() - finish({ D: 10 }) + "분");
});

test("Q31-35: enumerate constrained improvement combinations", () => {
  const items = [{ id: "A", cost: 20, days: 2, score: 20 }, { id: "B", cost: 30, days: 3, score: 40 }, { id: "C", cost: 25, days: 3, score: 30 }, { id: "D", cost: 40, days: 4, score: 45 }];
  function best(budget, days) {
    return Array.from({ length: 16 }, (_, mask) => items.filter((_, i) => mask & (1 << i)))
      .filter(s => !s.some(x => x.id === "B") || s.some(x => x.id === "A"))
      .filter(s => !(s.some(x => x.id === "C") && s.some(x => x.id === "D")))
      .map(s => ({ names: s.map(x => x.id).join(", "), cost: s.reduce((t, x) => t + x.cost, 0), days: s.reduce((t, x) => t + x.days, 0), score: s.reduce((t, x) => t + x.score, 0) }))
      .filter(s => s.cost <= budget && s.days <= days).sort((a, b) => b.score - a.score);
  }
  assert.ok(best(70, 8)[0].score > best(70, 8)[1].score);
  correct(31, best(70, 8)[0].names);
  correct(33, best(75, 8)[0].score + "점");
  correct(34, best(70, 5)[0].names);
});

test("Q36-40 and Q41-60: denominators and time constraints", () => {
  correct(36, "5%에서 3%로 줄었다.");
  assert.equal(100 / 2000 * 100, 5);
  assert.equal(180 / 6000 * 100, 3);
  correct(38, (180 - 90) / 6000 * 100 + "%");
  assert.ok(45 + 40 > 60 && 30 + 40 > 60);
  correct(41, "기존 조건 그대로는 A와 B의 기한 및 회의 참석을 모두 충족할 수 없다.");
  correct(42, "11:10");
  correct(46, "Q, R, S");
  correct(47, 12 - 3 - 2 - 3 + "시간");
  correct(48, 3 + 3 + "시간");
  correct(57, (14 + 2 + 2) / 40 * 100 + "%");
});

test("Q61-65: newest status before filtering, exclude empty responses", () => {
  const rows = [{ id: 101, day: 1, status: "done", rating: 4 }, { id: 101, day: 3, status: "cancelled", rating: null }, { id: 102, day: 2, status: "done", rating: 5 }, { id: 103, day: 2, status: "done", rating: null }, { id: 104, day: 2, status: "done", rating: 3 }, { id: 105, day: 2, status: "applied", rating: null }];
  const latest = new Map();
  for (const row of rows) if (!latest.has(row.id) || latest.get(row.id).day < row.day) latest.set(row.id, row);
  const completed = [...latest.values()].filter(x => x.status === "done");
  const ratings = completed.map(x => x.rating).filter(x => x !== null);
  correct(61, completed.length + "명");
  correct(62, ratings.reduce((a, b) => a + b, 0) / ratings.length + "점");
});

test("Q81-100: independently recalculate tables, costs, rates and surveys", () => {
  const regions = [{ prior: 400, now: 500, capacity: 600, done: 400, cost: 2000 }, { prior: 300, now: 360, capacity: 400, done: 324, cost: 1800 }, { prior: 300, now: 240, capacity: 300, done: 216, cost: 1200 }];
  const sum = key => regions.reduce((t, r) => t + r[key], 0);
  const percent = (n, d) => (n / d * 100).toFixed(1) + "%";
  correct(81, (sum("now") - sum("prior")) / sum("prior") * 100 + "%");
  correct(82, percent(sum("done"), sum("now")));
  correct(83, ["A", "B", "C"][regions.findIndex(r => r.now > r.prior && r.done / r.now >= .9)]);
  const lowest = regions.map(r => r.cost / r.done);
  correct(84, ["A", "B", "C"][lowest.indexOf(Math.min(...lowest))]);
  correct(85, percent(sum("now"), sum("capacity")));
  function won(n) { return Math.round(n).toLocaleString("en-US") + "원"; }
  const base = 150000 * 24 + 80000 * 6;
  const cost = n => (base + n * 10000 * .9) * 1.1;
  correct(86, won(base + 40 * 10000));
  correct(87, won(cost(40)));
  correct(88, won(5000000 - cost(40)));
  correct(89, won(cost(50)));
  const maxPeople = Array.from({ length: 100 }, (_, i) => i).filter(n => cost(n) <= 5000000).at(-1);
  correct(90, maxPeople + "명");
  const rates = [12, 8, 10];
  correct(91, rates.reduce((a, b) => a + b, 0) * 3 + "건");
  correct(92, "15:00");
  // Count only complete requests; the fluid-rate lower bound is not an integer allocation.
  const firstFinishSeconds = Array.from({ length: 18001 }, (_, seconds) => seconds)
    .find(seconds => rates.reduce((t, r) => t + Math.floor(seconds * r / 3600), 0) >= 144);
  const minutes = firstFinishSeconds / 60;
  correct(93, `${9 + Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`);
  correct(94, (12 + 16 + 10) * 3 + "건");
  correct(95, (144 - 90) / 2 - 8 - 10 + "건");
  const respondents = 160 + 180 + 250, satisfied = 120 + 144 + 200;
  correct(96, respondents / 1000 * 100 + "%");
  correct(97, percent(satisfied, respondents));
  correct(98, percent(satisfied, 1000));
  correct(99, percent(144 + 30, 180 + 30));
  correct(100, 1000 * .5 - satisfied + "명");
});
