const p={syntax:"문법 연습",easy:"쉬움",medium:"보통",challenge:"도전"},m={function:"함수 구현",debug:"오류 수정","predict-output":"출력 예측",dom:"DOM",react:"React"},u="/solution.js",o=(t,n)=>[{title:"문제를 더 쉽게 말하면",content:t.rephrase},{title:"필요한 값과 순서",content:t.variables},{title:"한국어 의사 코드",content:t.pseudocode},{title:"코드 뼈대",content:"빈칸을 한 줄씩 채워 보세요.",code:t.skeleton},{title:"핵심 조건식",content:t.condition},{title:"전체 답안",content:"직접 작성한 코드와 줄 단위로 비교해 보세요.",code:n}],e=({starterCode:t,solutionCode:n,hintSteps:r,...a})=>({...a,runtime:"javascript",starterFiles:{[u]:t},solutionFiles:{[u]:n},hints:o(r,n)}),d=[e({id:"fix-binary-search",title:"멈추지 않는 이진 탐색",description:"특정 입력에서 반복이 끝나지 않는 이진 탐색 코드를 고치세요.",plainDescription:"정렬된 숫자 목록의 가운데를 확인해 범위를 절반씩 줄입니다. 지금 코드는 이미 확인한 가운데 칸을 다시 포함해 같은 범위를 반복할 수 있습니다.",type:"debug",difficulty:"medium",concepts:["반복문","조건문","배열"],functionName:"binarySearch",inputDescription:"오름차순 숫자 배열 numbers와 찾을 숫자 target",outputDescription:"target의 인덱스, 없으면 -1",constraints:["numbers는 오름차순입니다.","반복마다 검색 범위가 반드시 줄어야 합니다."],examples:[{input:"numbers = [1, 3, 5, 7], target = 5",output:"2",explanation:"가운데 값 3보다 5가 크므로 오른쪽을 보고, 다음 가운데 인덱스 2에서 5를 찾습니다."}],walkthrough:["left와 right 사이의 mid를 계산합니다.","값을 찾으면 mid를 반환합니다.","target이 크면 left를 mid + 1로 옮깁니다.","target이 작으면 right를 mid - 1로 옮깁니다.","범위가 사라지면 -1을 반환합니다."],syntaxReference:[{title:"범위를 확실히 줄이기",description:"이미 확인한 mid는 다음 범위에서 제외합니다.",code:`left = mid + 1;
right = mid - 1;`}],starterCode:`function binarySearch(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (numbers[mid] === target) {
      return mid;
    }

    if (numbers[mid] < target) {
      left = mid; // 이 줄 때문에 같은 범위를 다시 볼 수 있습니다.
    } else {
      right = mid; // 이 줄도 확인해 보세요.
    }
  }

  return -1;
}
`,solutionCode:`function binarySearch(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (numbers[mid] === target) {
      return mid;
    }

    if (numbers[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
`,hintSteps:{rephrase:"가운데 칸을 확인했으면 다음 차례에는 그 칸을 후보에서 빼야 합니다.",variables:"left, right, mid 세 경계값이 있으며 반복마다 left 증가 또는 right 감소가 필요합니다.",pseudocode:"중간 확인 → 작으면 왼쪽 경계를 mid 다음으로 → 크면 오른쪽 경계를 mid 전으로",skeleton:`if (numbers[mid] < target) {
  left = mid /* 한 칸 이동 */;
} else {
  right = mid /* 한 칸 이동 */;
}`,condition:"left = mid + 1, right = mid - 1이어야 이미 확인한 칸이 제외됩니다."},tests:[{id:"found",name:"가운데 오른쪽에서 찾기",input:[[1,3,5,7],5],expected:2,failureHint:"target이 더 크면 left를 mid + 1로 옮기세요."},{id:"missing",name:"없는 값 찾기",input:[[1,3,5,7],4],expected:-1,failureHint:"찾지 못해도 범위가 줄어 반복이 끝나야 합니다."},{id:"first",name:"첫 값 찾기",input:[[2,4,6,8,10],2],expected:0,hidden:!0,failureHint:"target이 작을 때 right를 mid - 1로 옮기세요."},{id:"empty",name:"빈 배열",input:[[],1],expected:-1,hidden:!0,failureHint:"초기 left가 right보다 크면 반복 없이 -1이어야 합니다."}],explanation:["이진 탐색은 이미 검사한 mid를 다음 검색 범위에서 제외해야 합니다.","mid를 그대로 경계로 두면 원소가 두 개 남았을 때 같은 mid가 반복될 수 있습니다."],complexity:{time:"O(log n)",space:"O(1)"},interviewExplanation:"이미 검사한 중간 인덱스를 제외하도록 left = mid + 1과 right = mid - 1로 수정해 반복 종료를 보장했습니다."}),e({id:"fix-number-sort",title:"숫자 정렬 오류",description:"숫자가 문자열 순서로 정렬되고 원본 배열까지 바뀌는 코드를 고치세요.",plainDescription:"JavaScript의 sort는 기본으로 숫자를 글자처럼 비교합니다. 또한 배열 자체를 바꾸므로 복사한 뒤 숫자 비교 함수를 넣어야 합니다.",type:"debug",difficulty:"easy",concepts:["배열","함수","불변성"],functionName:"sortNumbers",inputDescription:"숫자 배열 numbers",outputDescription:"작은 숫자부터 정렬된 새 배열",constraints:["원본 numbers를 변경하지 마세요.","오름차순으로 정렬하세요."],examples:[{input:"numbers = [10, 2, 30]",output:"[2, 10, 30]",explanation:"문자열 기본 정렬은 10, 2, 30이지만 숫자 차이를 비교하면 2, 10, 30입니다."}],walkthrough:["스프레드로 numbers를 복사합니다.","복사한 배열에 sort를 호출합니다.","(a, b) => a - b 비교 함수를 전달합니다.","정렬된 새 배열을 반환합니다."],syntaxReference:[{title:"숫자 오름차순 정렬",description:"a - b가 음수면 a가 b보다 앞에 옵니다.",code:"const sorted = [...numbers].sort((a, b) => a - b);"}],starterCode:`function sortNumbers(numbers) {
  return numbers.sort(); // 문자열 순서로 정렬하고 원본도 바꿉니다.
}
`,solutionCode:`function sortNumbers(numbers) {
  return [...numbers].sort((a, b) => a - b);
}
`,hintSteps:{rephrase:"원본을 복사한 종이 위에서 숫자의 실제 크기 순서로 정렬합니다.",variables:"배열 복사 [...numbers]와 숫자 비교 함수가 필요합니다.",pseudocode:"numbers 복사 → a - b 기준으로 sort → 새 배열 반환",skeleton:`function sortNumbers(numbers) {
  return [...numbers].sort((a, b) => /* 숫자 비교 */);
}`,condition:"오름차순 비교 함수는 (a, b) => a - b입니다."},tests:[{id:"digits",name:"자릿수가 다른 숫자",input:[[10,2,30]],expected:[2,10,30],expectInputUnchanged:!0,failureHint:"sort에 (a, b) => a - b를 전달하세요."},{id:"negative",name:"음수 포함",input:[[3,-1,0,-10]],expected:[-10,-1,0,3],expectInputUnchanged:!0,failureHint:"문자열이 아닌 숫자 차이로 비교하세요."},{id:"duplicate",name:"중복 숫자",input:[[4,2,4,1]],expected:[1,2,4,4],hidden:!0,expectInputUnchanged:!0,failureHint:"중복 값도 모두 유지하세요."},{id:"empty",name:"빈 배열",input:[[]],expected:[],hidden:!0,expectInputUnchanged:!0,failureHint:"복사한 빈 배열을 그대로 정렬해 반환할 수 있습니다."}],explanation:["sort의 기본 비교는 문자열 기준이어서 10이 2보다 앞설 수 있습니다.","sort는 원본을 변경하므로 스프레드로 먼저 복사합니다."],complexity:{time:"O(n log n)",space:"O(n)"},interviewExplanation:"원본 변경을 막기 위해 배열을 복사하고 숫자 오름차순 비교 함수 a - b를 sort에 전달했습니다."}),e({id:"fix-like-mutation",title:"원본 배열을 바꾸는 좋아요 코드",description:"상품과 원본 배열을 직접 바꾸지 않도록 좋아요 업데이트 코드를 수정하세요.",plainDescription:"현재 코드는 목록 안의 상품 객체를 찾아 그 자리에서 liked를 바꿉니다. React가 변경을 안정적으로 알아차리도록 새 배열과 새 대상 객체를 만들어야 합니다.",type:"debug",difficulty:"medium",concepts:["배열","객체","불변성"],functionName:"toggleProductLike",inputDescription:"상품 배열 products와 대상 상품 id",outputDescription:"대상 liked만 반전된 새 배열",constraints:["products와 내부 상품 객체를 직접 변경하지 마세요.","대상 ID가 없으면 값이 같은 새 배열을 반환하세요."],examples:[{input:"products = [{ id: 1, liked: false }], id = 1",output:"[{ id: 1, liked: true }]",explanation:"대상 객체를 복사하고 liked만 반대로 덮어씁니다."}],walkthrough:["find와 직접 대입을 제거합니다.","products.map으로 새 배열을 만듭니다.","ID가 다르면 기존 product를 반환합니다.","ID가 같으면 객체를 복사해 liked를 반전합니다."],syntaxReference:[{title:"불변 배열 업데이트",description:"map과 객체 스프레드를 함께 사용합니다.",code:`items.map(item => item.id === id
  ? { ...item, active: !item.active }
  : item
);`}],starterCode:`function toggleProductLike(products, id) {
  const product = products.find(item => item.id === id);

  if (product) {
    product.liked = !product.liked; // 원본 객체를 직접 바꿉니다.
  }

  return products; // 원본 배열도 그대로 반환합니다.
}
`,solutionCode:`function toggleProductLike(products, id) {
  return products.map(product => {
    if (product.id !== id) {
      return product;
    }

    return {
      ...product,
      liked: !product.liked,
    };
  });
}
`,hintSteps:{rephrase:"원본 명단에 지우개질하지 말고 새 명단을 만들면서 대상만 새로 적습니다.",variables:"현재 product와 대상 id, map, 객체 스프레드가 필요합니다.",pseudocode:"products map → ID 다르면 그대로 → 같으면 복사하고 liked 반전",skeleton:`return products.map(product => {
  if (product.id !== id) return product;
  return { ...product, liked: /* 반전 */ };
});`,condition:"대상 조건은 product.id === id이며 새 객체의 liked는 !product.liked입니다."},tests:[{id:"target",name:"대상 좋아요 반전",input:[[{id:1,liked:!1},{id:2,liked:!1}],2],expected:[{id:1,liked:!1},{id:2,liked:!0}],expectInputUnchanged:!0,failureHint:"원본 객체에 대입하지 말고 map에서 새 객체를 반환하세요."},{id:"turn-off",name:"true를 false로 반전",input:[[{id:1,name:"A",liked:!0}],1],expected:[{id:1,name:"A",liked:!1}],expectInputUnchanged:!0,failureHint:"!product.liked로 양방향 반전을 구현하세요."},{id:"missing",name:"대상 상품 없음",input:[[{id:1,liked:!1}],9],expected:[{id:1,liked:!1}],hidden:!0,expectInputUnchanged:!0,failureHint:"ID가 다른 상품은 그대로 반환하세요."},{id:"empty",name:"빈 상품 목록",input:[[],1],expected:[],hidden:!0,expectInputUnchanged:!0,failureHint:"map은 빈 배열에서 빈 새 배열을 반환합니다."}],explanation:["직접 대입은 입력 객체를 변경해 이전 상태까지 오염시킵니다.","map과 객체 스프레드로 변경된 경로에 새 참조를 만들어 React 상태 업데이트에 적합하게 만듭니다."],complexity:{time:"O(n)",space:"O(n)"},interviewExplanation:"map으로 새 배열을 만들고 대상 상품만 스프레드 복사해 liked를 반전하여 입력 상태의 불변성을 지켰습니다."}),e({id:"fix-foreach-async",title:"forEach(async ...) 오류",description:"비동기 작업이 끝나기 전에 빈 배열을 반환하는 코드를 고치세요.",plainDescription:"forEach는 안의 async 함수들을 기다리지 않습니다. 모든 작업 Promise를 배열로 만든 뒤 Promise.all로 기다려야 합니다.",type:"debug",difficulty:"medium",concepts:["비동기","배열","함수"],functionName:"loadDoubled",inputDescription:"숫자 배열 numbers",outputDescription:"각 숫자를 비동기로 두 배 만든 결과 배열 Promise",constraints:["결과 순서는 입력 순서와 같아야 합니다.","모든 비동기 작업이 끝난 뒤 반환하세요."],examples:[{input:"numbers = [1, 2, 3]",output:"[2, 4, 6]",explanation:"각 숫자를 두 배로 만든 Promise를 모두 기다린 뒤 배열로 받습니다."}],walkthrough:["결과 배열에 push하는 방식을 제거합니다.","numbers.map으로 Promise 배열을 만듭니다.","async 콜백 안에서 값을 두 배로 반환합니다.","Promise.all을 await하거나 그대로 반환합니다."],syntaxReference:[{title:"Promise.all과 map",description:"map이 만든 Promise들을 모두 기다리고 결과 순서를 보존합니다.",code:`const results = await Promise.all(
  items.map(async item => load(item))
);`}],starterCode:`async function loadDoubled(numbers) {
  const results = [];

  numbers.forEach(async number => {
    await Promise.resolve();
    results.push(number * 2);
  });

  return results; // forEach의 async 작업을 기다리지 않습니다.
}
`,solutionCode:`async function loadDoubled(numbers) {
  return Promise.all(
    numbers.map(async number => {
      await Promise.resolve();
      return number * 2;
    }),
  );
}
`,hintSteps:{rephrase:"여러 배달을 동시에 보낸 뒤 모든 배달이 도착할 때까지 기다려 결과 목록을 받습니다.",variables:"numbers.map으로 만든 Promise 배열과 Promise.all이 필요합니다.",pseudocode:"각 number의 비동기 두 배 Promise 만들기 → Promise.all로 전부 기다리기 → 결과 반환",skeleton:`async function loadDoubled(numbers) {
  return Promise.all(
    numbers.map(async number => {
      await Promise.resolve();
      return /* 두 배 */;
    }),
  );
}`,condition:"forEach 반환값은 기다릴 Promise 배열이 아닙니다. map + Promise.all 조합을 사용하세요."},tests:[{id:"three",name:"숫자 세 개",input:[[1,2,3]],expected:[2,4,6],failureHint:"forEach 대신 map으로 Promise 배열을 만들고 Promise.all을 반환하세요."},{id:"one",name:"숫자 한 개",input:[[5]],expected:[10],failureHint:"비동기 콜백 안에서 number * 2를 반환하세요."},{id:"empty",name:"빈 배열",input:[[]],expected:[],hidden:!0,failureHint:"Promise.all([])은 빈 배열로 완료됩니다."},{id:"negative",name:"음수 포함",input:[[-2,0,4]],expected:[-4,0,8],hidden:!0,failureHint:"입력 순서를 그대로 유지하세요."}],explanation:["forEach는 async 콜백의 Promise를 수집하거나 기다리지 않습니다.","map은 Promise 배열을 만들고 Promise.all은 모두 완료된 결과를 입력 순서대로 반환합니다."],complexity:{time:"O(n)개의 작업을 생성하며 실제 대기 시간은 가장 긴 작업에 좌우됩니다.",space:"O(n)"},interviewExplanation:"forEach가 async 콜백을 기다리지 않는 문제를 map과 Promise.all로 바꿔 모든 작업 완료와 결과 순서를 보장했습니다."}),e({id:"fix-zero-default",title:"0을 잃어버리는 || 기본값",description:"정상 값인 0을 기본값 10으로 바꾸는 코드를 고치세요.",plainDescription:"0은 값이 없는 것이 아니지만 ||는 0을 거짓으로 취급합니다. null이나 undefined일 때만 기본값을 쓰는 ??가 알맞습니다.",type:"debug",difficulty:"easy",concepts:["조건문","변수"],functionName:"normalizeCount",inputDescription:"숫자, null 또는 undefined인 value",outputDescription:"value가 없으면 10, 숫자이면 그 숫자 그대로",constraints:["0은 유효한 값입니다.","null과 undefined만 기본값으로 바꾸세요."],examples:[{input:"value = 0",output:"0",explanation:"0은 사용자가 입력한 정상적인 개수입니다."},{input:"value = null",output:"10",explanation:"값이 없으므로 기본값 10을 사용합니다."}],walkthrough:["||가 어떤 값을 거짓으로 보는지 확인합니다.","값 없음만 구분하는 ??로 바꿉니다.","value ?? 10을 반환합니다."],syntaxReference:[{title:"null 병합 연산자",description:"왼쪽이 null 또는 undefined일 때만 오른쪽을 선택합니다.",code:"const count = value ?? 10;"}],starterCode:`function normalizeCount(value) {
  return value || 10; // 0도 거짓으로 취급되어 10이 됩니다.
}
`,solutionCode:`function normalizeCount(value) {
  return value ?? 10;
}
`,hintSteps:{rephrase:"0은 사용자가 정한 값으로 보존하고 정말 비어 있을 때만 10을 넣습니다.",variables:"value와 기본값 10 사이에 ?? 연산자를 사용합니다.",pseudocode:"value가 null/undefined인가? → 10, 아니면 value",skeleton:`function normalizeCount(value) {
  return value /* 값 없음 연산자 */ 10;
}`,condition:"||가 아니라 null 병합 연산자 ??가 핵심입니다."},tests:[{id:"zero",name:"0 보존",input:[0],expected:0,failureHint:"0을 거짓으로 처리하지 않는 ??를 사용하세요."},{id:"number",name:"일반 숫자 보존",input:[3],expected:3,failureHint:"값이 있으면 그대로 반환해야 합니다."},{id:"null",name:"null 기본값",input:[null],expected:10,hidden:!0,failureHint:"null일 때는 기본값 10을 사용하세요."},{id:"undefined",name:"undefined 기본값",input:[void 0],expected:10,hidden:!0,failureHint:"undefined일 때도 기본값 10을 사용하세요."}],explanation:["||는 0, 빈 문자열, false까지 모두 오른쪽 값으로 대체합니다.","??는 null과 undefined만 값 없음으로 처리해 0을 보존합니다."],complexity:{time:"O(1)",space:"O(1)"},interviewExplanation:"0이 유효한 도메인 값이므로 truthy 검사인 || 대신 null과 undefined만 처리하는 ??를 사용했습니다."}),e({id:"fix-empty-reduce",title:"빈 배열에서 실패하는 reduce",description:"빈 배열에서도 0을 반환하도록 reduce 코드를 고치세요.",plainDescription:"reduce가 첫 합계값 없이 시작하면 빈 배열에서 시작할 값이 없어 오류가 납니다. 합계의 시작값 0을 명시해야 합니다.",type:"debug",difficulty:"easy",concepts:["배열","함수"],functionName:"sumSafely",inputDescription:"숫자 배열 numbers",outputDescription:"모든 숫자의 합, 빈 배열이면 0",constraints:["빈 배열을 반드시 처리하세요.","reduce를 유지해 고쳐 보세요."],examples:[{input:"numbers = [2, 3, 4]",output:"9",explanation:"0에서 시작해 2, 3, 4를 더하면 9입니다."},{input:"numbers = []",output:"0",explanation:"더할 값이 없으므로 초기값 0이 결과입니다."}],walkthrough:["reduce 콜백은 그대로 둡니다.","콜백 뒤에 두 번째 인수를 추가합니다.","합계의 항등원인 0을 초기값으로 넣습니다."],syntaxReference:[{title:"reduce 초기값",description:"두 번째 인수 0이 첫 accumulator가 됩니다.",code:"const total = numbers.reduce((sum, number) => sum + number, 0);"}],starterCode:`function sumSafely(numbers) {
  return numbers.reduce((sum, number) => sum + number);
  // 빈 배열에는 첫 sum으로 사용할 값이 없습니다.
}
`,solutionCode:`function sumSafely(numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}
`,hintSteps:{rephrase:"합계 계산을 시작할 빈 바구니의 값 0을 reduce에 알려줍니다.",variables:"reduce의 두 번째 인수로 초기 합계 0이 필요합니다.",pseudocode:"sum을 0에서 시작 → 각 number 더하기 → 최종 sum 반환",skeleton:`function sumSafely(numbers) {
  return numbers.reduce(
    (sum, number) => sum + number,
    /* 초기값 */
  );
}`,condition:"reduce 콜백 뒤의 두 번째 인수에 0을 넣으세요."},tests:[{id:"basic",name:"숫자 합계",input:[[2,3,4]],expected:9,failureHint:"reduce에서 sum + number를 반환하세요."},{id:"empty",name:"빈 배열",input:[[]],expected:0,failureHint:"reduce의 두 번째 인수로 0을 전달하세요."},{id:"negative",name:"음수 포함",input:[[5,-8,2]],expected:-1,hidden:!0,failureHint:"모든 숫자를 그대로 누적하세요."},{id:"single",name:"값 한 개",input:[[7]],expected:7,hidden:!0,failureHint:"초기값 0에 첫 값을 더한 결과여야 합니다."}],explanation:["초기값이 없으면 reduce는 첫 원소를 누적값으로 사용해 빈 배열에서 오류가 납니다.","덧셈의 시작값 0을 전달하면 모든 배열 길이를 같은 로직으로 처리합니다."],complexity:{time:"O(n)",space:"O(1)"},interviewExplanation:"reduce의 명시적 초기값으로 0을 전달해 빈 배열에서도 예외 없이 합계의 항등원을 반환하게 했습니다."})],s=[e({id:"add-two-numbers",title:"두 숫자 더하기",description:"두 숫자 a와 b를 받아 더한 값을 반환하세요.",plainDescription:"입력으로 숫자 두 개가 들어옵니다. 두 숫자를 +로 더해 함수 밖으로 돌려주면 됩니다.",type:"function",difficulty:"syntax",concepts:["변수","함수"],functionName:"addNumbers",inputDescription:"첫 번째 숫자 a와 두 번째 숫자 b",outputDescription:"a와 b를 더한 숫자",constraints:["a와 b는 유한한 숫자입니다.","문자열로 바꾸지 말고 숫자를 반환하세요."],examples:[{input:"a = 2, b = 3",output:"5",explanation:"2 + 3을 계산하면 5입니다."},{input:"a = -4, b = 7",output:"3",explanation:"-4에서 7만큼 이동하면 3입니다."}],walkthrough:["함수 괄호 안의 a와 b가 입력값입니다.","a + b를 계산합니다.","계산한 값을 return으로 돌려줍니다."],syntaxReference:[{title:"값 반환하기",description:"return 뒤의 값이 함수의 실행 결과가 됩니다.",code:`function add(a, b) {
  return a + b;
}`}],starterCode:`function addNumbers(a, b) {
  // 두 숫자를 더해 반환하세요.
}
`,solutionCode:`function addNumbers(a, b) {
  return a + b;
}
`,hintSteps:{rephrase:"a와 b 사이에 덧셈 기호를 넣은 결과가 답입니다.",variables:"새 변수를 만들지 않아도 됩니다. a, b, return만 있으면 충분합니다.",pseudocode:"a와 b를 더한다 → 더한 값을 반환한다",skeleton:`function addNumbers(a, b) {
  return /* 더한 값 */;
}`,condition:"핵심 식은 a + b 입니다. +는 숫자 덧셈에 사용합니다."},tests:[{id:"basic",name:"작은 양수",input:[2,3],expected:5,failureHint:"a와 b를 모두 더했는지 확인하세요."},{id:"negative",name:"음수가 포함된 경우",input:[-4,7],expected:3,failureHint:"음수도 그대로 + 연산할 수 있습니다."},{id:"zero",name:"0 더하기",input:[0,9],expected:9,hidden:!0,failureHint:"0을 더해도 다른 숫자는 그대로입니다."},{id:"decimals",name:"소수 더하기",input:[1.5,2.25],expected:3.75,hidden:!0,failureHint:"정수로 변환하지 말고 입력 숫자를 그대로 더하세요."}],explanation:["함수 매개변수 a와 b를 바로 사용할 수 있습니다.","return a + b는 계산과 반환을 한 줄에서 처리합니다."],complexity:{time:"O(1) — 한 번 덧셈합니다.",space:"O(1) — 추가 저장 공간이 없습니다."},interviewExplanation:"두 매개변수를 + 연산자로 더한 뒤 바로 반환했으며, 입력 크기와 관계없이 한 번만 계산합니다."}),e({id:"is-positive",title:"양수인지 확인하기",description:"숫자가 0보다 크면 true, 아니면 false를 반환하세요.",plainDescription:"숫자가 0의 오른쪽에 있는지 확인하는 문제입니다. 0은 양수에 포함하지 않습니다.",type:"function",difficulty:"syntax",concepts:["조건문","함수"],functionName:"isPositive",inputDescription:"확인할 숫자 value 한 개",outputDescription:"양수이면 true, 0이나 음수이면 false",constraints:["0은 양수가 아닙니다.","반드시 boolean 값을 반환하세요."],examples:[{input:"value = 8",output:"true",explanation:"8은 0보다 큽니다."},{input:"value = 0",output:"false",explanation:"0은 0보다 크지 않습니다."}],walkthrough:["value와 0을 비교합니다.","value가 더 크면 true입니다.","비교식 자체를 반환합니다."],syntaxReference:[{title:"크기 비교",description:"> 비교식은 맞으면 true, 아니면 false가 됩니다.",code:"const isAdult = age > 19;"}],starterCode:`function isPositive(value) {
  // 0보다 큰지 확인하세요.
}
`,solutionCode:`function isPositive(value) {
  return value > 0;
}
`,hintSteps:{rephrase:"입력 숫자가 0보다 큰지만 답하면 됩니다.",variables:"value를 0과 비교한 결과를 바로 반환할 수 있습니다.",pseudocode:"value가 0보다 큰가? → 그 참/거짓 값을 반환한다",skeleton:`function isPositive(value) {
  return value /* 비교 기호 */ 0;
}`,condition:"양수 조건은 value > 0 입니다. >=를 쓰면 0도 포함됩니다."},tests:[{id:"positive",name:"양수",input:[8],expected:!0,failureHint:"> 비교 연산자를 사용해 보세요."},{id:"zero",name:"경계값 0",input:[0],expected:!1,failureHint:"0을 양수로 포함하지 않았는지 확인하세요."},{id:"negative",name:"음수",input:[-.5],expected:!1,hidden:!0,failureHint:"음수는 false여야 합니다."}],explanation:["비교 연산의 결과는 이미 boolean이므로 if문이 없어도 됩니다.",">를 사용해 0을 제외합니다."],complexity:{time:"O(1)",space:"O(1)"},interviewExplanation:"0을 제외한 양수만 true가 되도록 value > 0 비교 결과를 직접 반환했습니다."}),e({id:"is-even",title:"짝수인지 확인하기",description:"정수를 받아 짝수이면 true, 홀수이면 false를 반환하세요.",plainDescription:"2로 나누었을 때 나머지가 0인지 확인합니다. 음수 짝수도 같은 방법으로 판별할 수 있습니다.",type:"function",difficulty:"syntax",concepts:["조건문","함수"],functionName:"isEven",inputDescription:"정수 number 한 개",outputDescription:"짝수이면 true, 홀수이면 false",constraints:["number는 정수입니다.","0은 짝수입니다."],examples:[{input:"number = 6",output:"true",explanation:"6을 2로 나눈 나머지는 0입니다."},{input:"number = 7",output:"false",explanation:"7을 2로 나눈 나머지는 1입니다."}],walkthrough:["% 연산자로 2로 나눈 나머지를 구합니다.","나머지가 0인지 비교합니다.","비교 결과를 반환합니다."],syntaxReference:[{title:"나머지 연산자",description:"%는 나눈 뒤 남는 값을 구합니다.",code:"const remainder = 7 % 2; // 1"}],starterCode:`function isEven(number) {
  // 2로 나눈 나머지를 확인하세요.
}
`,solutionCode:`function isEven(number) {
  return number % 2 === 0;
}
`,hintSteps:{rephrase:"숫자를 둘씩 묶었을 때 하나도 남지 않으면 짝수입니다.",variables:"number % 2로 나머지를 구하고 0과 비교합니다.",pseudocode:"number를 2로 나눈 나머지 계산 → 0과 같은지 반환",skeleton:`function isEven(number) {
  return number % 2 /* 같은지 비교 */ 0;
}`,condition:"number % 2 === 0이 핵심 조건입니다."},tests:[{id:"even",name:"양의 짝수",input:[6],expected:!0,failureHint:"나머지가 0인지 확인하세요."},{id:"odd",name:"홀수",input:[7],expected:!1,failureHint:"홀수일 때 false가 되어야 합니다."},{id:"zero",name:"0",input:[0],expected:!0,hidden:!0,failureHint:"0을 2로 나눈 나머지도 0입니다."},{id:"negative",name:"음의 짝수",input:[-8],expected:!0,hidden:!0,failureHint:"음수도 같은 나머지 조건으로 확인할 수 있습니다."}],explanation:["짝수는 2의 배수이므로 2로 나눈 나머지가 0입니다.","===를 사용해 숫자 0과 정확히 비교합니다."],complexity:{time:"O(1)",space:"O(1)"},interviewExplanation:"정수의 짝수 여부를 number % 2 === 0 조건으로 판별해 boolean으로 반환했습니다."}),e({id:"first-array-value",title:"배열의 첫 번째 값 반환하기",description:"배열의 첫 번째 값을 반환하고, 빈 배열이면 undefined를 반환하세요.",plainDescription:"배열 칸은 0부터 번호를 셉니다. 첫 칸을 읽으면 되고, 빈 배열은 JavaScript가 자연스럽게 undefined를 돌려줍니다.",type:"function",difficulty:"syntax",concepts:["배열","함수"],functionName:"firstValue",inputDescription:"값이 들어 있는 배열 items",outputDescription:"items의 첫 번째 값 또는 undefined",constraints:["배열의 값은 어떤 자료형이어도 됩니다.","원본 배열을 바꾸지 마세요."],examples:[{input:'items = ["apple", "banana"]',output:'"apple"',explanation:"0번 칸의 값은 apple입니다."},{input:"items = []",output:"undefined",explanation:"0번 칸이 없으므로 undefined입니다."}],walkthrough:["배열 인덱스가 0부터 시작함을 기억합니다.","items[0]을 읽습니다.","읽은 값을 반환합니다."],syntaxReference:[{title:"배열 인덱스",description:"대괄호 안에 칸 번호를 적습니다.",code:"const first = items[0];"}],starterCode:`function firstValue(items) {
  // 배열의 첫 번째 칸을 읽으세요.
}
`,solutionCode:`function firstValue(items) {
  return items[0];
}
`,hintSteps:{rephrase:"배열에서 가장 앞에 놓인 값 하나를 꺼냅니다.",variables:"새 변수 없이 items의 0번 칸을 바로 반환할 수 있습니다.",pseudocode:"items의 0번 칸을 읽는다 → 반환한다",skeleton:`function firstValue(items) {
  return items[/* 첫 칸 번호 */];
}`,condition:"JavaScript 배열의 첫 번째 인덱스는 0입니다."},tests:[{id:"strings",name:"문자열 배열",input:[["apple","banana"]],expected:"apple",failureHint:"items[0]을 반환해 보세요."},{id:"numbers",name:"숫자 배열",input:[[42,7]],expected:42,failureHint:"값의 종류와 관계없이 첫 칸은 0번입니다."},{id:"empty",name:"빈 배열",input:[[]],expected:void 0,hidden:!0,failureHint:"빈 배열을 별도 문자열이나 null로 바꾸지 마세요."}],explanation:["배열 인덱스는 0부터 시작합니다.","존재하지 않는 배열 칸을 읽으면 undefined이므로 별도 분기가 필요 없습니다."],complexity:{time:"O(1)",space:"O(1)"},interviewExplanation:"배열의 첫 원소는 인덱스 0에 있으므로 items[0]을 반환했고 원본은 변경하지 않았습니다."}),e({id:"array-length",title:"배열의 길이 반환하기",description:"배열에 들어 있는 값의 개수를 반환하세요.",plainDescription:"배열을 직접 세지 않아도 length 속성에 현재 칸 수가 들어 있습니다.",type:"function",difficulty:"syntax",concepts:["배열","객체"],functionName:"arrayLength",inputDescription:"확인할 배열 items",outputDescription:"배열 원소의 개수인 숫자",constraints:["items는 항상 배열입니다.","빈 배열의 길이는 0입니다."],examples:[{input:'items = ["a", "b", "c"]',output:"3",explanation:"배열에 값이 세 개 있습니다."},{input:"items = []",output:"0",explanation:"빈 배열에는 값이 없습니다."}],walkthrough:["items 뒤에 점을 찍습니다.","length 속성을 읽습니다.","숫자를 반환합니다."],syntaxReference:[{title:"length 속성",description:"배열과 문자열의 길이를 숫자로 알려줍니다.",code:"const count = items.length;"}],starterCode:`function arrayLength(items) {
  // length 속성을 사용하세요.
}
`,solutionCode:`function arrayLength(items) {
  return items.length;
}
`,hintSteps:{rephrase:"배열 안에 값이 몇 개인지 숫자로 답합니다.",variables:"items가 가진 length 속성을 바로 읽을 수 있습니다.",pseudocode:"items의 length를 읽는다 → 반환한다",skeleton:`function arrayLength(items) {
  return items./* 길이 속성 */;
}`,condition:"length는 함수가 아니므로 괄호 없이 items.length로 씁니다."},tests:[{id:"three",name:"값 세 개",input:[["a","b","c"]],expected:3,failureHint:"items.length를 확인하세요."},{id:"empty",name:"빈 배열",input:[[]],expected:0,failureHint:"length는 빈 배열에서 0입니다."},{id:"many",name:"값 여러 개",input:[[1,2,3,4,5,6]],expected:6,hidden:!0,failureHint:"고정된 숫자가 아니라 배열의 length를 반환하세요."}],explanation:["배열의 length 속성은 원소 개수를 즉시 알려줍니다.","반복문으로 직접 셀 필요가 없습니다."],complexity:{time:"O(1)",space:"O(1)"},interviewExplanation:"JavaScript 배열이 제공하는 length 속성을 사용해 원소 개수를 상수 시간에 반환했습니다."}),e({id:"sum-array",title:"배열 숫자 합계",description:"숫자 배열의 모든 값을 더해 합계를 반환하세요.",plainDescription:"합계를 0에서 시작해 배열의 숫자를 하나씩 더합니다. 빈 배열은 더할 값이 없으므로 0입니다.",type:"function",difficulty:"easy",concepts:["배열","반복문","변수"],functionName:"sumNumbers",inputDescription:"숫자로만 이루어진 배열 numbers",outputDescription:"모든 숫자를 더한 합계",constraints:["numbers는 빈 배열일 수 있습니다.","원본 배열을 변경하지 마세요."],examples:[{input:"numbers = [3, 5, 2]",output:"10",explanation:"0 + 3 = 3, 3 + 5 = 8, 8 + 2 = 10입니다."},{input:"numbers = []",output:"0",explanation:"더할 숫자가 없으므로 시작값 0을 반환합니다."}],walkthrough:["합계를 저장할 total을 0으로 만듭니다.","numbers를 하나씩 반복합니다.","현재 숫자를 total에 더합니다.","반복이 끝난 뒤 total을 반환합니다."],syntaxReference:[{title:"for...of 반복",description:"배열 값을 앞에서부터 하나씩 number에 넣습니다.",code:`for (const number of numbers) {
  total += number;
}`}],starterCode:`function sumNumbers(numbers) {
  // 합계를 0부터 시작해 보세요.
}
`,solutionCode:`function sumNumbers(numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}
`,hintSteps:{rephrase:"배열 숫자를 장바구니 합계처럼 하나씩 누적합니다.",variables:"합계를 기억할 let total = 0이 필요합니다.",pseudocode:"total을 0으로 만든다 → 각 number를 total에 더한다 → total 반환",skeleton:`function sumNumbers(numbers) {
  let total = 0;
  for (const number of numbers) {
    // 누적
  }
  return total;
}`,condition:"total += number는 total = total + number와 같습니다."},tests:[{id:"basic",name:"양수 합계",input:[[3,5,2]],expected:10,failureHint:"모든 숫자를 total에 누적했는지 확인하세요."},{id:"mixed",name:"음수가 섞인 합계",input:[[10,-3,-2]],expected:5,failureHint:"음수도 그대로 더해야 합니다."},{id:"empty",name:"빈 배열",input:[[]],expected:0,hidden:!0,failureHint:"반복문이 돌지 않아도 0을 반환할 시작값이 필요합니다."},{id:"single",name:"값 한 개",input:[[7]],expected:7,hidden:!0,failureHint:"배열 길이가 1이어도 같은 로직이어야 합니다."}],explanation:["누적 변수 total을 0으로 초기화하면 빈 배열도 자연스럽게 처리됩니다.","for...of는 인덱스 없이 배열의 값을 직접 읽습니다."],complexity:{time:"O(n) — 모든 숫자를 한 번 확인합니다.",space:"O(1) — total 하나만 추가합니다."},interviewExplanation:"0으로 초기화한 누적 변수에 배열 값을 한 번씩 더해 빈 배열도 0으로 처리했습니다."}),e({id:"count-positive",title:"양수 개수 세기",description:"숫자 배열에서 0보다 큰 값의 개수를 반환하세요.",plainDescription:"배열을 하나씩 보면서 양수를 발견할 때만 개수를 1 올립니다. 0은 세지 않습니다.",type:"function",difficulty:"easy",concepts:["배열","반복문","조건문"],functionName:"countPositive",inputDescription:"숫자 배열 numbers",outputDescription:"0보다 큰 숫자의 개수",constraints:["0은 양수가 아닙니다.","빈 배열이면 0을 반환하세요."],examples:[{input:"numbers = [-2, 0, 3, 7]",output:"2",explanation:"3과 7만 0보다 크므로 두 개입니다."}],walkthrough:["개수 count를 0으로 만듭니다.","숫자를 하나씩 확인합니다.","number > 0일 때 count를 1 올립니다.","count를 반환합니다."],syntaxReference:[{title:"조건 안에서 증가",description:"조건이 참일 때만 ++가 실행됩니다.",code:`if (number > 0) {
  count += 1;
}`}],starterCode:`function countPositive(numbers) {
  // 양수를 발견할 때마다 개수를 올리세요.
}
`,solutionCode:`function countPositive(numbers) {
  let count = 0;

  for (const number of numbers) {
    if (number > 0) {
      count += 1;
    }
  }

  return count;
}
`,hintSteps:{rephrase:"배열 안에서 양수인 칸에만 체크 표시를 하고 그 수를 셉니다.",variables:"개수를 저장할 count와 현재 값 number가 필요합니다.",pseudocode:"count = 0 → 각 숫자가 0보다 크면 count + 1 → count 반환",skeleton:`function countPositive(numbers) {
  let count = 0;
  for (const number of numbers) {
    if (/* 양수 조건 */) {
      count += 1;
    }
  }
  return count;
}`,condition:"0을 제외하려면 number > 0을 사용합니다."},tests:[{id:"mixed",name:"양수·0·음수 혼합",input:[[-2,0,3,7]],expected:2,failureHint:"number > 0일 때만 count를 올리세요."},{id:"none",name:"양수가 없는 경우",input:[[-3,-1,0]],expected:0,failureHint:"조건에 맞는 값이 없으면 시작값 0이어야 합니다."},{id:"all",name:"모두 양수",input:[[1,2,9]],expected:3,hidden:!0,failureHint:"배열의 모든 값을 반복했는지 확인하세요."},{id:"empty",name:"빈 배열",input:[[]],expected:0,hidden:!0,failureHint:"빈 배열에서도 count의 시작값을 반환하세요."}],explanation:["합계가 아니라 조건을 만족한 횟수를 누적합니다.","0은 > 0 조건을 통과하지 않습니다."],complexity:{time:"O(n)",space:"O(1)"},interviewExplanation:"배열을 한 번 순회하며 number > 0인 경우에만 카운터를 증가시켰습니다."}),e({id:"find-largest",title:"가장 큰 값 찾기",description:"숫자 배열에서 가장 큰 값을 반환하고, 빈 배열이면 null을 반환하세요.",plainDescription:"첫 숫자를 현재 최댓값으로 정하고 더 큰 숫자를 만날 때마다 바꿉니다. 배열이 비어 있으면 비교할 값이 없으므로 null입니다.",type:"function",difficulty:"easy",concepts:["배열","반복문","조건문"],functionName:"findMax",inputDescription:"숫자 배열 numbers",outputDescription:"가장 큰 숫자, 빈 배열이면 null",constraints:["음수만 들어올 수 있습니다.","Math.max의 spread 문법 없이 반복문으로 풀어 보세요."],examples:[{input:"numbers = [4, 9, 2]",output:"9",explanation:"4로 시작해 9를 만나 최댓값을 9로 바꿉니다."},{input:"numbers = []",output:"null",explanation:"비교할 숫자가 없습니다."}],walkthrough:["빈 배열이면 null을 먼저 반환합니다.","첫 값을 max에 저장합니다.","각 숫자가 max보다 크면 max를 바꿉니다.","max를 반환합니다."],syntaxReference:[{title:"빠른 반환",description:"특수한 경우를 함수 앞에서 먼저 끝냅니다.",code:`if (numbers.length === 0) {
  return null;
}`}],starterCode:`function findMax(numbers) {
  // 빈 배열을 먼저 확인하세요.
}
`,solutionCode:`function findMax(numbers) {
  if (numbers.length === 0) {
    return null;
  }

  let max = numbers[0];
  for (const number of numbers) {
    if (number > max) {
      max = number;
    }
  }

  return max;
}
`,hintSteps:{rephrase:"가장 큰 숫자를 임시 우승자로 두고 더 큰 숫자가 나오면 교체합니다.",variables:"빈 배열 검사와 현재 최댓값 max가 필요합니다.",pseudocode:"비었으면 null → max = 첫 값 → 더 큰 number를 만나면 max 교체 → 반환",skeleton:`function findMax(numbers) {
  if (numbers.length === 0) return null;
  let max = numbers[0];
  for (const number of numbers) {
    if (/* 더 큰지 */) max = number;
  }
  return max;
}`,condition:"교체 조건은 number > max입니다. max를 0으로 시작하면 음수 배열에서 실패합니다."},tests:[{id:"basic",name:"일반 배열",input:[[4,9,2]],expected:9,failureHint:"현재 max보다 큰 값을 만나면 교체하세요."},{id:"negative",name:"모두 음수",input:[[-9,-2,-7]],expected:-2,failureHint:"max를 0이 아니라 배열의 첫 값으로 시작하세요."},{id:"empty",name:"빈 배열",input:[[]],expected:null,hidden:!0,failureHint:"배열이 비었을 때 null을 먼저 반환하세요."},{id:"duplicate",name:"최댓값 중복",input:[[5,8,8,1]],expected:8,hidden:!0,failureHint:"중복 여부와 관계없이 가장 큰 값만 반환하세요."}],explanation:["첫 원소를 초기 최댓값으로 사용하면 음수만 있는 배열도 안전합니다.","빈 배열은 첫 원소가 없으므로 먼저 null로 처리합니다."],complexity:{time:"O(n)",space:"O(1)"},interviewExplanation:"빈 배열을 먼저 분기하고 첫 값을 기준으로 한 번 순회하며 더 큰 값으로 최댓값을 갱신했습니다."})],c=[e({id:"filter-in-stock",title:"품절 상품 제외하기",description:"상품 배열에서 inStock이 true인 상품만 새 배열로 반환하세요.",plainDescription:"상품 카드 목록을 만들기 전에 품절 표시가 없는 상품만 골라냅니다. 원본 목록은 그대로 두어야 합니다.",type:"function",difficulty:"easy",concepts:["배열","객체","함수"],functionName:"filterAvailableProducts",inputDescription:"id, name, inStock을 가진 상품 객체 배열 products",outputDescription:"inStock이 true인 상품만 담은 새 배열",constraints:["상품 순서를 유지하세요.","원본 배열과 상품 객체를 변경하지 마세요."],examples:[{input:"products = [{ id: 1, inStock: true }, { id: 2, inStock: false }]",output:"[{ id: 1, inStock: true }]",explanation:"첫 상품만 재고가 있으므로 첫 상품만 남습니다."}],walkthrough:["products에 filter를 호출합니다.","각 product의 inStock을 확인합니다.","true인 상품만 남긴 새 배열을 반환합니다."],syntaxReference:[{title:"filter",description:"조건이 true인 원소만 모은 새 배열을 만듭니다.",code:"const visible = products.filter(product => product.visible);"}],starterCode:`function filterAvailableProducts(products) {
  // 재고가 있는 상품만 남기세요.
}
`,solutionCode:`function filterAvailableProducts(products) {
  return products.filter(product => product.inStock);
}
`,hintSteps:{rephrase:"각 상품의 재고 스위치가 켜진 항목만 새 목록에 담습니다.",variables:"현재 상품 product와 product.inStock 조건이 필요합니다.",pseudocode:"products를 filter한다 → product.inStock이 true인 항목을 남긴다 → 반환",skeleton:`function filterAvailableProducts(products) {
  return products.filter(product => /* 재고 조건 */);
}`,condition:"filter 안에서 product.inStock을 반환하면 true인 상품만 남습니다."},tests:[{id:"mixed",name:"재고 상태가 섞인 목록",input:[[{id:1,name:"키보드",inStock:!0},{id:2,name:"마우스",inStock:!1}]],expected:[{id:1,name:"키보드",inStock:!0}],expectInputUnchanged:!0,failureHint:"product.inStock이 true인 항목만 filter로 남기세요."},{id:"all",name:"모두 재고 있음",input:[[{id:1,name:"A",inStock:!0},{id:2,name:"B",inStock:!0}]],expected:[{id:1,name:"A",inStock:!0},{id:2,name:"B",inStock:!0}],failureHint:"조건에 맞는 상품의 순서를 유지하세요."},{id:"empty",name:"빈 상품 목록",input:[[]],expected:[],hidden:!0,failureHint:"filter는 빈 배열에서 빈 배열을 반환합니다."},{id:"none",name:"모두 품절",input:[[{id:1,inStock:!1},{id:2,inStock:!1}]],expected:[],hidden:!0,failureHint:"false인 항목이 결과에 들어가지 않아야 합니다."}],explanation:["filter는 원본 배열을 바꾸지 않고 조건을 통과한 항목으로 새 배열을 만듭니다.","boolean 속성은 === true 없이 그대로 조건으로 쓸 수 있습니다."],complexity:{time:"O(n)",space:"O(n) — 결과 배열을 만듭니다."},interviewExplanation:"filter로 각 상품의 inStock 값을 검사해 재고가 있는 상품만 새 배열로 반환했습니다."}),e({id:"find-product",title:"특정 상품 찾기",description:"상품 ID와 일치하는 상품을 반환하고, 없으면 null을 반환하세요.",plainDescription:"주소나 클릭 이벤트에서 받은 ID로 상품 목록을 검색합니다. 한 개만 필요하므로 find가 알맞습니다.",type:"function",difficulty:"easy",concepts:["배열","객체","조건문"],functionName:"findProduct",inputDescription:"상품 배열 products와 찾을 숫자 id",outputDescription:"ID가 같은 상품 객체, 없으면 null",constraints:["ID는 숫자이며 상품마다 고유합니다.","원본 상품을 변경하지 마세요."],examples:[{input:'products = [{ id: 10, name: "모니터" }], id = 10',output:'{ id: 10, name: "모니터" }',explanation:"상품의 id 10과 찾는 id 10이 같습니다."}],walkthrough:["products.find를 사용합니다.","product.id와 id를 정확히 비교합니다.","find 결과가 없으면 null로 바꿉니다."],syntaxReference:[{title:"find와 null 처리",description:"find는 못 찾으면 undefined이므로 ??로 null을 선택할 수 있습니다.",code:"const item = items.find(item => item.id === id) ?? null;"}],starterCode:`function findProduct(products, id) {
  // 같은 id를 가진 상품 하나를 찾으세요.
}
`,solutionCode:`function findProduct(products, id) {
  return products.find(product => product.id === id) ?? null;
}
`,hintSteps:{rephrase:"상품 목록에서 이름표 번호가 id와 같은 상품 하나를 꺼냅니다.",variables:"현재 product의 id와 두 번째 입력 id를 비교합니다.",pseudocode:"products에서 product.id === id인 항목 찾기 → 없으면 null → 반환",skeleton:`function findProduct(products, id) {
  return products.find(product => /* ID 비교 */) ?? null;
}`,condition:"product.id === id로 자료형까지 정확히 비교합니다."},tests:[{id:"found",name:"상품을 찾은 경우",input:[[{id:10,name:"모니터"},{id:20,name:"키보드"}],20],expected:{id:20,name:"키보드"},failureHint:"product.id와 입력 id를 비교하세요."},{id:"missing",name:"상품이 없는 경우",input:[[{id:10,name:"모니터"}],99],expected:null,failureHint:"find가 돌려준 undefined를 null로 바꾸세요."},{id:"empty",name:"빈 상품 목록",input:[[],1],expected:null,hidden:!0,failureHint:"빈 배열에서도 null을 반환해야 합니다."},{id:"first",name:"첫 상품 찾기",input:[[{id:1,name:"A"},{id:2,name:"B"}],1],expected:{id:1,name:"A"},hidden:!0,failureHint:"find는 조건을 만족한 첫 상품을 반환합니다."}],explanation:["find는 조건에 맞는 첫 항목을 반환합니다.","?? null은 결과가 undefined일 때만 null을 선택합니다."],complexity:{time:"O(n)",space:"O(1)"},interviewExplanation:"find로 ID가 일치하는 첫 상품을 찾고, 검색 실패 시 undefined 대신 명시적인 null을 반환했습니다."}),e({id:"total-product-price",title:"상품 가격 합계",description:"상품 배열의 price를 모두 더해 총 가격을 반환하세요.",plainDescription:"장바구니 상품의 price를 하나씩 꺼내 합계에 더합니다. 빈 장바구니의 합계는 0입니다.",type:"function",difficulty:"easy",concepts:["배열","객체","반복문"],functionName:"totalPrice",inputDescription:"price 숫자 속성을 가진 상품 배열 products",outputDescription:"모든 price의 합",constraints:["price는 0 이상의 숫자입니다.","빈 배열이면 0을 반환하세요."],examples:[{input:"products = [{ price: 12000 }, { price: 8000 }]",output:"20000",explanation:"12000 + 8000 = 20000입니다."}],walkthrough:["total을 0으로 만듭니다.","상품을 하나씩 확인합니다.","product.price를 total에 더합니다.","total을 반환합니다."],syntaxReference:[{title:"객체 속성 누적",description:"현재 객체의 price 속성만 꺼내 합계에 더합니다.",code:`for (const product of products) {
  total += product.price;
}`}],starterCode:`function totalPrice(products) {
  // 각 상품의 price를 누적하세요.
}
`,solutionCode:`function totalPrice(products) {
  let total = 0;

  for (const product of products) {
    total += product.price;
  }

  return total;
}
`,hintSteps:{rephrase:"각 상품 가격표를 읽어 하나의 총액으로 합칩니다.",variables:"합계 total, 현재 상품 product, product.price가 필요합니다.",pseudocode:"total = 0 → 각 product의 price를 total에 더하기 → total 반환",skeleton:`function totalPrice(products) {
  let total = 0;
  for (const product of products) {
    total += /* 가격 속성 */;
  }
  return total;
}`,condition:"상품 자체가 아니라 product.price 숫자를 더해야 합니다."},tests:[{id:"basic",name:"상품 두 개",input:[[{name:"A",price:12e3},{name:"B",price:8e3}]],expected:2e4,failureHint:"product.price를 total에 더하세요."},{id:"free",name:"무료 상품 포함",input:[[{price:0},{price:5e3}]],expected:5e3,failureHint:"가격 0도 정상적인 숫자입니다."},{id:"empty",name:"빈 장바구니",input:[[]],expected:0,hidden:!0,failureHint:"total을 0으로 시작하세요."},{id:"single",name:"상품 한 개",input:[[{price:9900}]],expected:9900,hidden:!0,failureHint:"상품 개수와 관계없이 같은 반복문을 사용하세요."}],explanation:["가격 합계를 0으로 초기화해 빈 배열을 안전하게 처리합니다.","객체 전체가 아니라 price 속성을 읽어 숫자를 누적합니다."],complexity:{time:"O(n)",space:"O(1)"},interviewExplanation:"상품 배열을 한 번 순회하면서 각 price를 0으로 초기화한 total에 누적했습니다."}),e({id:"toggle-like",title:"좋아요 값 반전하기",description:"상품의 liked 값을 반대로 바꾼 새 객체를 반환하세요.",plainDescription:"좋아요가 켜져 있으면 끄고, 꺼져 있으면 켭니다. React 상태처럼 원본 객체는 수정하지 않고 복사본을 만듭니다.",type:"function",difficulty:"easy",concepts:["객체","불변성","조건문"],functionName:"toggleLiked",inputDescription:"liked boolean 속성이 있는 item 객체",outputDescription:"나머지 속성은 같고 liked만 반대인 새 객체",constraints:["원본 item을 변경하지 마세요.","새 객체를 반환하세요."],examples:[{input:"item = { id: 1, liked: false }",output:"{ id: 1, liked: true }",explanation:"!false는 true이고 id는 그대로 유지됩니다."}],walkthrough:["스프레드로 item 속성을 새 객체에 복사합니다.","liked 속성을 뒤에서 다시 씁니다.","!item.liked로 값을 반전합니다.","새 객체를 반환합니다."],syntaxReference:[{title:"객체 복사와 boolean 반전",description:"뒤에 적은 속성이 앞에서 복사한 값을 덮어씁니다.",code:"const next = { ...item, open: !item.open };"}],starterCode:`function toggleLiked(item) {
  // 원본을 바꾸지 말고 새 객체를 만드세요.
}
`,solutionCode:`function toggleLiked(item) {
  return {
    ...item,
    liked: !item.liked,
  };
}
`,hintSteps:{rephrase:"스위치가 켜져 있으면 끄고, 꺼져 있으면 켠 복사본을 만듭니다.",variables:"객체 복사 ...item과 반전값 !item.liked가 필요합니다.",pseudocode:"새 객체 생성 → item 속성 복사 → liked를 반대로 덮어쓰기 → 반환",skeleton:`function toggleLiked(item) {
  return {
    ...item,
    liked: /* 반대 값 */,
  };
}`,condition:"!item.liked는 true를 false로, false를 true로 바꿉니다."},tests:[{id:"turn-on",name:"좋아요 켜기",input:[{id:1,name:"A",liked:!1}],expected:{id:1,name:"A",liked:!0},expectInputUnchanged:!0,failureHint:"...item으로 다른 속성도 복사하고 원본을 직접 수정하지 마세요."},{id:"turn-off",name:"좋아요 끄기",input:[{id:2,liked:!0}],expected:{id:2,liked:!1},expectInputUnchanged:!0,failureHint:"고정된 true가 아니라 !item.liked를 사용하세요."},{id:"keep-fields",name:"다른 속성 유지",input:[{id:3,price:1e3,liked:!1}],expected:{id:3,price:1e3,liked:!0},hidden:!0,expectInputUnchanged:!0,failureHint:"liked 외의 모든 속성도 결과에 남아야 합니다."}],explanation:["객체 스프레드는 얕은 복사본을 만듭니다.","liked를 뒤에 선언해 복사된 기존 값을 반전값으로 덮어씁니다."],complexity:{time:"O(k) — 객체 속성 수만큼 복사합니다.",space:"O(k) — 새 객체를 만듭니다."},interviewExplanation:"원본 상태를 직접 변경하지 않고 객체 스프레드로 복사한 뒤 liked만 논리 부정으로 반전했습니다."}),e({id:"find-selected-tab",title:"선택된 탭 찾기",description:"탭 배열에서 selected가 true인 탭을 반환하고, 없으면 null을 반환하세요.",plainDescription:"화면에 여러 탭이 있을 때 현재 선택 표시가 켜진 탭 하나를 찾습니다.",type:"function",difficulty:"easy",concepts:["배열","객체","함수"],functionName:"findSelectedTab",inputDescription:"id, label, selected를 가진 탭 배열 tabs",outputDescription:"선택된 첫 탭 또는 null",constraints:["선택된 탭은 최대 하나입니다.","원본 배열을 변경하지 마세요."],examples:[{input:'tabs = [{ id: "home", selected: false }, { id: "cart", selected: true }]',output:'{ id: "cart", selected: true }',explanation:"cart 탭의 selected만 true입니다."}],walkthrough:["tabs.find를 호출합니다.","tab.selected가 true인지 확인합니다.","없으면 null을 반환합니다."],syntaxReference:[{title:"boolean 속성으로 찾기",description:"속성 자체가 조건식으로 사용됩니다.",code:"const active = tabs.find(tab => tab.selected);"}],starterCode:`function findSelectedTab(tabs) {
  // selected가 true인 탭을 찾으세요.
}
`,solutionCode:`function findSelectedTab(tabs) {
  return tabs.find(tab => tab.selected) ?? null;
}
`,hintSteps:{rephrase:"선택 불이 켜진 탭 한 개를 목록에서 찾습니다.",variables:"각 tab의 selected 값과 find가 필요합니다.",pseudocode:"selected인 탭 찾기 → 찾지 못했으면 null → 반환",skeleton:`function findSelectedTab(tabs) {
  return tabs.find(tab => /* 선택 여부 */) ?? null;
}`,condition:"tab.selected가 이미 true/false이므로 그대로 반환할 수 있습니다."},tests:[{id:"selected",name:"선택된 탭 있음",input:[[{id:"home",selected:!1},{id:"cart",selected:!0}]],expected:{id:"cart",selected:!0},failureHint:"tab.selected인 첫 항목을 find로 찾으세요."},{id:"none",name:"선택된 탭 없음",input:[[{id:"home",selected:!1}]],expected:null,failureHint:"find 결과가 undefined이면 null을 반환하세요."},{id:"empty",name:"빈 탭 목록",input:[[]],expected:null,hidden:!0,failureHint:"빈 배열에서도 null이어야 합니다."},{id:"first",name:"첫 탭 선택",input:[[{id:"a",selected:!0},{id:"b",selected:!1}]],expected:{id:"a",selected:!0},hidden:!0,failureHint:"배열 순서를 바꾸지 마세요."}],explanation:["find는 선택 조건을 만족하는 객체 자체를 반환합니다.","선택된 탭이 없을 때 UI가 명확히 분기할 수 있도록 null로 통일합니다."],complexity:{time:"O(n)",space:"O(1)"},interviewExplanation:"find로 selected 플래그가 true인 탭을 찾고 없을 때는 null로 정규화했습니다."}),e({id:"update-cart-quantity",title:"장바구니 수량 변경하기",description:"ID가 같은 장바구니 상품의 quantity에 change를 더한 새 배열을 반환하세요. 수량은 0보다 작아질 수 없습니다.",plainDescription:"+ 또는 - 버튼을 눌렀을 때 해당 상품 수량만 바꿉니다. React 상태 업데이트처럼 배열과 대상 객체를 새로 만듭니다.",type:"function",difficulty:"medium",concepts:["배열","객체","불변성"],functionName:"updateCartQuantity",inputDescription:"장바구니 배열 cart, 상품 id, 변화량 change",outputDescription:"대상 수량이 바뀐 새 장바구니 배열",constraints:["수량의 최솟값은 0입니다.","ID가 없으면 값이 같은 새 배열을 반환하세요.","원본 cart를 변경하지 마세요."],examples:[{input:"cart = [{ id: 1, quantity: 2 }], id = 1, change = -1",output:"[{ id: 1, quantity: 1 }]",explanation:"대상 상품 수량 2에 -1을 더하면 1입니다."}],walkthrough:["cart.map으로 새 배열을 만듭니다.","item.id가 id와 다른 상품은 그대로 반환합니다.","대상 상품은 객체를 복사합니다.","quantity를 Math.max(0, 기존값 + change)로 바꿉니다."],syntaxReference:[{title:"map으로 한 항목 변경",description:"대상만 새 객체로 만들고 나머지는 그대로 반환합니다.",code:`items.map(item => item.id === id
  ? { ...item, value: nextValue }
  : item
);`},{title:"최솟값 제한",description:"Math.max는 두 숫자 중 큰 값을 선택합니다.",code:"const safe = Math.max(0, quantity);"}],starterCode:`function updateCartQuantity(cart, id, change) {
  // map으로 대상 상품만 바꾸세요.
}
`,solutionCode:`function updateCartQuantity(cart, id, change) {
  return cart.map(item => {
    if (item.id !== id) {
      return item;
    }

    return {
      ...item,
      quantity: Math.max(0, item.quantity + change),
    };
  });
}
`,hintSteps:{rephrase:"목록을 복사하면서 이름표가 같은 상품의 수량만 안전하게 바꿉니다.",variables:"현재 item, 대상 id, 변화량 change, 새 quantity가 필요합니다.",pseudocode:"cart map → ID 다르면 item → 같으면 복사 후 quantity + change → 0보다 작으면 0",skeleton:`function updateCartQuantity(cart, id, change) {
  return cart.map(item => {
    if (item.id !== id) return item;
    return { ...item, quantity: /* 0 이상 새 수량 */ };
  });
}`,condition:"Math.max(0, item.quantity + change)로 음수 수량을 막습니다."},tests:[{id:"increase",name:"수량 증가",input:[[{id:1,quantity:2},{id:2,quantity:1}],1,2],expected:[{id:1,quantity:4},{id:2,quantity:1}],expectInputUnchanged:!0,failureHint:"ID가 일치하는 항목에만 change를 더하고 원본을 바꾸지 마세요."},{id:"decrease",name:"수량 감소",input:[[{id:1,quantity:2}],1,-1],expected:[{id:1,quantity:1}],expectInputUnchanged:!0,failureHint:"change는 음수일 수도 있으므로 그대로 더하세요."},{id:"floor",name:"0 아래로 내려가지 않기",input:[[{id:1,quantity:1}],1,-5],expected:[{id:1,quantity:0}],hidden:!0,expectInputUnchanged:!0,failureHint:"Math.max(0, 새 수량)으로 최솟값을 제한하세요."},{id:"missing",name:"대상 ID 없음",input:[[{id:1,quantity:2}],9,1],expected:[{id:1,quantity:2}],hidden:!0,expectInputUnchanged:!0,failureHint:"ID가 다르면 기존 item을 그대로 반환하세요."}],explanation:["map은 원본 배열 대신 새 배열을 만듭니다.","대상 객체도 스프레드로 복사하고 Math.max로 수량 하한을 보장합니다."],complexity:{time:"O(n)",space:"O(n)"},interviewExplanation:"map으로 새 배열을 만들고 대상 ID의 객체만 복사해 수량을 갱신했으며 Math.max로 0 미만을 방지했습니다."})],i=[...s,...c,...d],l=new Map(i.map(t=>[t.id,t])),f=i[0],x=t=>t?l.get(t):void 0,b=Array.from(new Set(i.flatMap(t=>t.concepts))).sort((t,n)=>t.localeCompare(n,"ko"));export{p as D,u as M,m as T,i as a,b as c,f,x as g};
