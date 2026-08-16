import{r as t,j as e}from"./index-BEEmpp9M.js";import{d as g,b as v,e as S,a as b,I as y,h as n,R as C,C as R,P as w}from"./draftStorage-CnI_izgY.js";import"./registry-LlCWe3ZK.js";const i={empty:`// 자유롭게 JavaScript를 작성해 보세요.

console.log("Hello, JavaScript!");
`,function:`function greet(name) {
  return \`안녕하세요, \${name}!\`;
}

console.log(greet("민지"));
`,array:`const numbers = [1, 2, 3, 4, 5];

for (const number of numbers) {
  console.log(number);
}
`,condition:`const temperature = 24;

if (temperature >= 25) {
  console.log("더워요");
} else {
  console.log("선선해요");
}
`,object:`const product = {
  id: 1,
  name: "키보드",
  price: 89000,
};

console.log(product);
console.log(product.name);
`,async:`async function loadMessage() {
  const message = await Promise.resolve("준비 완료");
  console.log(message);
}

await loadMessage();
`},N=()=>e.jsxs("aside",{className:n.assistant,"aria-label":"연습장 도움말",children:[e.jsx("div",{className:n.assistantTabs,children:e.jsx("button",{type:"button",className:n.activeTab,children:"연습장 안내"})}),e.jsx("div",{className:n.assistantScroll,children:e.jsxs("div",{className:n.helpContent,children:[e.jsx("span",{className:n.sectionKicker,children:"JAVASCRIPT SCRATCH"}),e.jsx("h1",{children:"자유 연습장"}),e.jsx("p",{className:n.lead,children:"문제나 테스트 없이 JavaScript 문법을 직접 실험할 수 있습니다."}),e.jsxs("section",{children:[e.jsx("h3",{children:"사용 방법"}),e.jsxs("ol",{className:n.stepList,children:[e.jsxs("li",{children:[e.jsx("span",{children:"1"}),e.jsx("p",{children:"왼쪽 템플릿에서 시작 코드를 고릅니다."})]}),e.jsxs("li",{children:[e.jsx("span",{children:"2"}),e.jsx("p",{children:"중앙 편집기에서 값을 바꿔 봅니다."})]}),e.jsxs("li",{children:[e.jsx("span",{children:"3"}),e.jsx("p",{children:"실행하고 Console에서 결과를 확인합니다."})]}),e.jsxs("li",{children:[e.jsx("span",{children:"4"}),e.jsx("p",{children:"멈추지 않으면 중단 버튼을 누릅니다."})]})]})]}),e.jsxs("section",{className:n.interviewCard,children:[e.jsx("span",{children:"안전한 실행 환경"}),e.jsx("p",{children:"코드는 별도 Web Worker에서 실행됩니다. DOM과 저장소에 접근할 수 없으며 네트워크 요청은 제한됩니다."})]})]})})]}),k=()=>{const[a,o]=t.useState(()=>g()??i.empty),[u,x]=t.useState(v),[m,d]=t.useState(null),[r,l]=t.useState(!1),c=t.useRef(null);t.useEffect(()=>{const s=window.setTimeout(()=>S(a),400);return()=>window.clearTimeout(s)},[a]),t.useEffect(()=>()=>{var s;return(s=c.current)==null?void 0:s.cancel()},[]);const p=t.useCallback(()=>{var s;(s=c.current)==null||s.cancel(),l(!1)},[]),h=t.useCallback(async()=>{if(r)return;const s=b({code:a,mode:"scratch"});c.current=s,l(!0);const f=await s.promise;c.current===s&&(c.current=null,d(f),l(!1))},[a,r]),j=()=>{window.confirm("연습장 코드를 기본 예제로 되돌릴까요?")&&(o(i.empty),d(null))};return e.jsx(y,{title:"자유 JavaScript 연습장",subtitle:"테스트 없이 문법 실험",scratch:!0,settings:u,onSettingsChange:x,explorer:e.jsx(w,{activeId:"scratch"}),editor:e.jsx(R,{value:a,onChange:o,settings:u,onRun:()=>{h()},ariaLabel:"JavaScript 자유 연습장 편집기"}),assistant:e.jsx(N,{}),result:e.jsx(C,{outcome:m,isRunning:r,onStop:p,scratch:!0}),onRun:()=>{h()},onReset:j,onStop:p,isRunning:r,extraToolbar:e.jsxs("label",{className:n.templateSelect,children:[e.jsx("span",{children:"예제"}),e.jsxs("select",{defaultValue:"empty",onChange:s=>o(i[s.target.value]),children:[e.jsx("option",{value:"empty",children:"빈 JavaScript"}),e.jsx("option",{value:"function",children:"함수 작성"}),e.jsx("option",{value:"array",children:"배열 반복"}),e.jsx("option",{value:"condition",children:"조건문"}),e.jsx("option",{value:"object",children:"객체 확인"}),e.jsx("option",{value:"async",children:"async/await"})]})]})})};export{k as ScratchIDEPage};
