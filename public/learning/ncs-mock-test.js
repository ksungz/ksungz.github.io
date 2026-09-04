(function () {
  "use strict";

  var EXAM_SECONDS = 50 * 60;
  var STORAGE_KEY = "gtp-ncs-mock-test-v1";
  var DOMAIN_ORDER = [
    "의사소통능력",
    "수리능력",
    "문제해결능력",
    "자원관리능력",
    "조직이해능력",
  ];

  var questions = [
    {
      id: 1,
      domain: "의사소통능력",
      passage:
        "사내 문서 시스템의 정기 점검을 9월 8일 22시부터 23시까지 진행합니다. 점검 중에는 문서 열람은 가능하지만 신규 작성과 수정은 제한됩니다. 진행 중인 문서는 21시 50분까지 저장해 주시기 바랍니다.",
      prompt: "위 안내문의 주된 목적은 무엇인가?",
      options: [
        "문서 시스템의 성능 개선 결과를 홍보하기 위해",
        "점검 시간과 이용 제한 사항을 사전에 알리기 위해",
        "문서 작성 권한을 가진 사용자를 조사하기 위해",
        "시스템 점검 담당자를 모집하기 위해",
      ],
      answer: 1,
      explanation:
        "점검 일정, 제한되는 기능, 사용자가 미리 해야 할 행동을 안내하고 있으므로 핵심 목적은 이용 제한 사항의 사전 공지이다.",
    },
    {
      id: 2,
      domain: "의사소통능력",
      passage:
        "A 기능의 배포 일정은 당초 12일로 계획되어 있었으나 외부 연동 테스트가 예상보다 이틀 더 필요해 14일로 변경되었다.",
      prompt: "보고 문장으로 가장 간결하고 정확한 것은?",
      options: [
        "A 기능은 여러 사정이 있어서 일정이 어느 정도 뒤로 변경되었습니다.",
        "외부 연동 테스트가 있었고 A 기능 일정과 관련해 변경이 발생했습니다.",
        "외부 연동 테스트가 이틀 연장되어 A 기능 배포일을 12일에서 14일로 변경했습니다.",
        "A 기능은 원래 12일이었지만 테스트는 중요하므로 14일에 할 수도 있습니다.",
      ],
      answer: 2,
      explanation:
        "변경 원인, 기존 일정, 변경 일정을 한 문장에 명확하게 담은 3번이 가장 적절하다.",
    },
    {
      id: 3,
      domain: "의사소통능력",
      passage:
        "㉠ 원인을 확인한 결과 인증서 만료가 문제였습니다.\n㉡ 같은 문제가 재발하지 않도록 만료 알림 담당자를 지정해 주세요.\n㉢ 오늘 오전 일부 사용자가 로그인하지 못하는 현상이 발생했습니다.\n㉣ 인증서를 갱신한 뒤 현재는 정상적으로 로그인할 수 있습니다.",
      prompt: "장애 공유 글의 흐름으로 가장 자연스러운 순서는?",
      options: [
        "㉠ → ㉢ → ㉡ → ㉣",
        "㉡ → ㉣ → ㉢ → ㉠",
        "㉢ → ㉠ → ㉣ → ㉡",
        "㉢ → ㉣ → ㉡ → ㉠",
      ],
      answer: 2,
      explanation:
        "현상 발생, 원인 확인, 조치 결과, 재발 방지 요청 순서가 읽는 사람이 상황을 이해하기 가장 쉽다.",
    },
    {
      id: 4,
      domain: "의사소통능력",
      table: {
        headers: ["요일", "접수 문의", "당일 처리", "당일 처리율"],
        rows: [
          ["월", "200건", "160건", "80%"],
          ["화", "250건", "225건", "90%"],
          ["수", "180건", "153건", "85%"],
        ],
      },
      prompt: "표의 내용과 일치하는 설명은?",
      options: [
        "월요일은 접수 문의와 당일 처리율이 모두 가장 높다.",
        "화요일은 접수 문의와 당일 처리 건수가 모두 가장 많다.",
        "수요일은 당일 처리 건수가 월요일보다 많다.",
        "접수 문의가 적을수록 당일 처리율이 항상 높다.",
      ],
      answer: 1,
      explanation:
        "화요일은 접수 문의 250건, 당일 처리 225건으로 두 항목 모두 가장 많다. 나머지 설명은 표와 일치하지 않는다.",
    },
    {
      id: 5,
      domain: "의사소통능력",
      passage: "가능하면 오늘 중 검토하고 전달해 주세요.",
      prompt: "업무 지시의 모호함을 가장 잘 줄인 문장은?",
      options: [
        "시간이 될 때 내용을 한번 봐 주세요.",
        "오늘 안으로 최대한 빨리 처리해 주세요.",
        "오늘 15시까지 계약서 3쪽의 금액과 날짜를 확인한 뒤 수정본을 메일로 보내 주세요.",
        "계약서를 잘 검토해서 문제가 없도록 전달해 주세요.",
      ],
      answer: 2,
      explanation:
        "기한, 대상, 확인 범위, 전달 방법이 모두 구체적으로 제시된 3번이 해석 차이를 가장 줄인다.",
    },
    {
      id: 6,
      domain: "의사소통능력",
      passage:
        "모바일 오류는 현재 재현 자료가 부족하다. QA팀은 수요일까지 오류 로그와 기기 정보를 모으고, 개발팀은 목요일까지 원인을 분석한다. PM은 분석 결과를 보고 금요일 배포 여부를 결정한다.",
      prompt: "QA팀이 맡은 실행 항목은 무엇인가?",
      options: [
        "수요일까지 오류 로그와 기기 정보를 수집한다.",
        "목요일까지 오류 원인을 분석한다.",
        "금요일에 배포 여부를 결정한다.",
        "모바일 오류를 즉시 수정해 배포한다.",
      ],
      answer: 0,
      explanation:
        "본문에서 QA팀의 담당 업무와 기한은 수요일까지 오류 로그와 기기 정보를 모으는 것으로 명시되어 있다.",
    },
    {
      id: 7,
      domain: "의사소통능력",
      passage:
        "신규 예약 화면 도입 전후 4주를 비교한 결과, 입력 오류율은 8.2%에서 4.9%로 낮아졌고 평균 예약 완료 시간은 6분 10초에서 4분 40초로 줄었다.",
      prompt: "위 내용을 담은 보고서 제목으로 가장 적절한 것은?",
      options: [
        "신규 예약 화면 디자인 소개",
        "예약 담당자 근무 현황",
        "신규 예약 화면 도입 전후 이용 지표 비교",
        "다음 분기 예약 목표 수립",
      ],
      answer: 2,
      explanation:
        "도입 전후의 오류율과 완료 시간을 비교한 내용이므로 3번이 자료의 범위와 목적을 가장 정확히 드러낸다.",
    },
    {
      id: 8,
      domain: "의사소통능력",
      passage:
        "공용 문서 양식을 도입한 뒤 최신 버전이 아닌 파일을 사용하는 사례는 줄었다. 다만 결재자가 내용을 검토하는 데 걸리는 평균 시간은 이전과 거의 같았다.",
      prompt: "본문에서 직접 확인할 수 있는 내용은?",
      options: [
        "공용 양식이 결재자의 검토 시간을 크게 단축했다.",
        "공용 양식 도입 후 문서 작성 인원이 줄었다.",
        "최신 버전이 아닌 파일을 사용하는 문제가 감소했다.",
        "결재자는 공용 양식 사용을 반대했다.",
      ],
      answer: 2,
      explanation:
        "본문은 버전 불일치 사례가 줄었다고 명시한다. 검토 시간은 거의 같았고, 인원이나 반대 여부는 제시되지 않았다.",
    },
    {
      id: 9,
      domain: "의사소통능력",
      prompt: "협업 부서에 일정 확인을 요청하는 메일 문장으로 가장 적절한 것은?",
      options: [
        "일정이 왜 아직도 안 나왔는지 빨리 알려주세요.",
        "지난번 말한 일정 건, 확인되면 회신 바랍니다.",
        "9월 배포 계획 수립을 위해 테스트 가능 일정을 확인하고 있습니다. 4일까지 가능한 날짜를 회신해 주시면 반영하겠습니다.",
        "저희 일정이 급하니 귀 부서에서 알아서 맞춰주시기 바랍니다.",
      ],
      answer: 2,
      explanation:
        "요청 목적, 필요한 정보, 회신 기한이 구체적이고 상대방을 존중하는 3번이 가장 적절하다.",
    },
    {
      id: 10,
      domain: "의사소통능력",
      passage:
        "서비스 A는 이용자가 전월보다 20% 늘었지만 고객 문의 건수는 같았다. 서비스 B는 이용자가 10% 늘었고 고객 문의 건수는 15% 증가했다.",
      prompt: "위 자료만으로 판단하기 어려운 것은?",
      options: [
        "서비스 A의 이용자 1명당 문의 비율은 낮아졌다.",
        "서비스 B의 고객 문의 건수는 전월보다 증가했다.",
        "두 서비스 모두 이용자가 전월보다 늘었다.",
        "서비스 A의 제품 품질이 개선된 것이 문의 비율 하락의 원인이다.",
      ],
      answer: 3,
      explanation:
        "이용자와 문의 수의 변화는 확인할 수 있지만, 문의 비율이 낮아진 원인이 제품 품질 개선인지는 자료만으로 알 수 없다.",
    },
    {
      id: 11,
      domain: "수리능력",
      table: {
        headers: ["팀", "접수 건수", "기한 내 처리 건수"],
        rows: [
          ["A", "120", "108"],
          ["B", "150", "132"],
          ["C", "100", "91"],
        ],
      },
      prompt: "기한 내 처리율이 가장 높은 팀은?",
      options: ["A팀", "B팀", "C팀", "A팀과 C팀"],
      answer: 2,
      explanation:
        "A팀은 108÷120=90%, B팀은 132÷150=88%, C팀은 91÷100=91%이므로 C팀이 가장 높다.",
    },
    {
      id: 12,
      domain: "수리능력",
      prompt: "월간 이용자가 240명에서 300명으로 늘었다. 증가율은?",
      options: ["20%", "25%", "30%", "60%"],
      answer: 1,
      explanation:
        "증가 인원은 60명이고, 증가율은 60÷240×100=25%이다.",
    },
    {
      id: 13,
      domain: "수리능력",
      passage:
        "서비스 만족도 조사에서 신규 이용자 40명의 평균은 4.2점, 기존 이용자 60명의 평균은 3.8점이었다.",
      prompt: "전체 100명의 평균 만족도는?",
      options: ["3.8점", "3.9점", "3.96점", "4.2점"],
      answer: 2,
      explanation:
        "가중평균은 (4.2×40 + 3.8×60)÷100 = (168+228)÷100 = 3.96점이다.",
    },
    {
      id: 14,
      domain: "수리능력",
      passage:
        "총사업비 1,200만 원 중 인건비에 45%, 도구 구입에 25%를 배정했다.",
      prompt: "남은 예산은 얼마인가?",
      options: ["240만 원", "300만 원", "360만 원", "840만 원"],
      answer: 2,
      explanation:
        "사용 비율은 70%이고 남은 비율은 30%이다. 1,200만 원×30%=360만 원이다.",
    },
    {
      id: 15,
      domain: "수리능력",
      passage:
        "A는 한 업무를 혼자 6시간에 끝내고, B는 같은 업무를 혼자 3시간에 끝낸다. 두 사람의 작업 속도는 일정하다.",
      prompt: "두 사람이 함께 일하면 업무를 끝내는 데 걸리는 시간은?",
      options: ["1시간 30분", "2시간", "2시간 30분", "4시간 30분"],
      answer: 1,
      explanation:
        "한 시간 동안 A는 1/6, B는 1/3을 처리하므로 함께 1/2을 처리한다. 전체 업무에는 2시간이 걸린다.",
    },
    {
      id: 16,
      domain: "수리능력",
      passage:
        "월초 재고는 480개였고 이번 달에 220개를 추가로 받았다. 확보한 전체 수량의 70%를 사용했다.",
      prompt: "월말 재고는 몇 개인가?",
      options: ["140개", "210개", "294개", "490개"],
      answer: 1,
      explanation:
        "전체 수량은 480+220=700개이고, 30%가 남으므로 700×0.3=210개이다.",
    },
    {
      id: 17,
      domain: "수리능력",
      passage:
        "개당 5만 원인 장비 120개를 구매한다. 상품 금액에 10% 할인이 적용되고 배송비 18만 원은 별도로 붙는다.",
      prompt: "최종 결제 금액은?",
      options: ["522만 원", "540만 원", "558만 원", "618만 원"],
      answer: 2,
      explanation:
        "상품 금액은 5만 원×120=600만 원, 할인 후 540만 원이다. 배송비 18만 원을 더하면 558만 원이다.",
    },
    {
      id: 18,
      domain: "수리능력",
      table: {
        headers: ["월", "처리 건수"],
        rows: [
          ["1월", "80건"],
          ["2월", "92건"],
          ["3월", "?"],
        ],
      },
      prompt: "처리 건수가 매월 같은 비율로 증가했다면 3월 처리 건수는 약 몇 건인가?",
      options: ["100건", "104건", "106건", "115건"],
      answer: 2,
      explanation:
        "1월에서 2월 증가율은 12÷80=15%이다. 92×1.15=105.8이므로 약 106건이다.",
    },
    {
      id: 19,
      domain: "수리능력",
      prompt: "A팀과 B팀의 인원 비가 3:5이고 전체 인원이 64명일 때 A팀 인원은?",
      options: ["18명", "24명", "32명", "40명"],
      answer: 1,
      explanation:
        "전체 비율은 8이고 한 단위는 64÷8=8명이다. A팀은 3×8=24명이다.",
    },
    {
      id: 20,
      domain: "수리능력",
      passage:
        "같은 120km 구간을 갈 때는 시속 60km, 돌아올 때는 시속 40km로 이동했다. 중간 정차 시간은 없다.",
      prompt: "왕복 평균 속도는?",
      options: ["45km/h", "48km/h", "50km/h", "52km/h"],
      answer: 1,
      explanation:
        "갈 때 2시간, 올 때 3시간으로 총 240km를 5시간에 이동했다. 평균 속도는 240÷5=48km/h이다.",
    },
    {
      id: 21,
      domain: "문제해결능력",
      passage:
        "새 화면 배포 후 Safari에서만 버튼 글자가 잘리는 현상이 발생했다. Chrome과 Edge에서는 정상이며 API 응답과 서버 지표에도 이상이 없다. 이번 배포에는 버튼의 글꼴과 너비를 조정한 CSS 변경이 포함되었다.",
      prompt: "원인 확인을 위해 가장 먼저 살펴볼 항목은?",
      options: [
        "데이터베이스 저장 용량",
        "Safari에서의 CSS 글꼴과 너비 계산 방식",
        "API 인증 토큰 만료 여부",
        "서버 CPU 사용률",
      ],
      answer: 1,
      explanation:
        "특정 브라우저에서만 발생했고 관련 CSS가 변경되었으므로 Safari의 렌더링 차이와 변경된 스타일을 먼저 확인하는 것이 합리적이다.",
    },
    {
      id: 22,
      domain: "문제해결능력",
      passage:
        "업무 규칙은 다음과 같다.\n- A는 C보다 먼저 수행한다.\n- B는 D보다 먼저 수행한다.\n- C와 D를 모두 끝낸 뒤 E를 수행한다.",
      prompt: "규칙을 모두 만족하는 수행 순서는?",
      options: [
        "A → C → E → B → D",
        "B → D → A → E → C",
        "A → B → D → C → E",
        "B → A → D → E → C",
      ],
      answer: 2,
      explanation:
        "3번은 A가 C보다 앞서고 B가 D보다 앞서며, C와 D가 모두 끝난 뒤 E가 배치되어 모든 규칙을 만족한다.",
    },
    {
      id: 23,
      domain: "문제해결능력",
      passage:
        "외부 데이터를 사용하는 프로젝트는 보안 검토를 받아야 한다. 개인정보를 처리하는 프로젝트는 법무 검토도 받아야 한다. 이번 프로젝트는 공개된 외부 통계만 사용하며 개인정보는 처리하지 않는다.",
      prompt: "이번 프로젝트에 필요한 검토는?",
      options: [
        "보안 검토만 필요하다.",
        "법무 검토만 필요하다.",
        "보안 검토와 법무 검토가 모두 필요하다.",
        "어떤 검토도 필요하지 않다.",
      ],
      answer: 0,
      explanation:
        "외부 데이터를 사용하므로 보안 검토는 필요하지만 개인정보를 처리하지 않으므로 제시된 규칙상 법무 검토는 필수가 아니다.",
    },
    {
      id: 24,
      domain: "문제해결능력",
      table: {
        headers: ["개선안", "기대 효과(5점)", "필요 작업일"],
        rows: [
          ["P", "5", "4일"],
          ["Q", "4", "2일"],
          ["R", "3", "1일"],
          ["S", "5", "5일"],
        ],
      },
      passage:
        "이번 주에 사용할 수 있는 작업 시간은 최대 2일이다. 가능한 개선안 중 기대 효과가 가장 큰 하나를 선택한다.",
      prompt: "선택할 개선안은?",
      options: ["P", "Q", "R", "S"],
      answer: 1,
      explanation:
        "2일 이내에 가능한 개선안은 Q와 R이며, 기대 효과가 더 높은 Q를 선택한다.",
    },
    {
      id: 25,
      domain: "문제해결능력",
      passage:
        "파일 업로드 실패 → 저장 공간 부족 → 자동 정리 작업 미실행 → 정리 작업 계정의 인증 정보 만료 → 만료 알림이 퇴사한 이전 담당자에게만 발송",
      prompt: "재발 방지를 위해 우선 개선해야 할 근본 원인에 가장 가까운 것은?",
      options: [
        "사용자가 큰 파일을 업로드한 것",
        "저장 공간의 현재 사용량",
        "인증 정보 갱신 알림의 담당 체계가 유지되지 않은 것",
        "파일 업로드 버튼의 위치",
      ],
      answer: 2,
      explanation:
        "직접 증상은 저장 공간 부족이지만 연쇄 원인의 끝에는 담당자 변경이 알림 체계에 반영되지 않은 관리 문제가 있다.",
    },
    {
      id: 26,
      domain: "문제해결능력",
      passage:
        "비용이 10만 원 이하이면 자동 승인, 10만 원 초과 50만 원 이하는 팀장 승인, 50만 원 초과는 본부장 승인을 받는다. 민감정보가 포함된 구매는 비용 승인 후 보안 검토를 추가한다.",
      prompt: "민감정보가 포함된 60만 원 구매의 처리 순서는?",
      options: [
        "자동 승인 → 보안 검토",
        "팀장 승인 → 보안 검토",
        "본부장 승인 → 보안 검토",
        "보안 검토만 진행",
      ],
      answer: 2,
      explanation:
        "60만 원은 50만 원을 초과하므로 본부장 승인을 받고, 민감정보가 포함되었으므로 이후 보안 검토를 추가한다.",
    },
    {
      id: 27,
      domain: "문제해결능력",
      prompt: "수열 2, 6, 12, 20, 30의 다음 수는?",
      options: ["36", "40", "42", "44"],
      answer: 2,
      explanation:
        "수의 차이가 4, 6, 8, 10으로 2씩 증가한다. 다음 차이는 12이므로 30+12=42이다.",
    },
    {
      id: 28,
      domain: "문제해결능력",
      table: {
        headers: ["ID", "시작일", "종료일", "담당자"],
        rows: [
          ["R-101", "9일", "12일", "김"],
          ["R-102", "14일", "11일", "이"],
          ["R-103", "8일", "10일", "박"],
          ["R-104", "13일", "17일", "최"],
        ],
      },
      passage:
        "데이터 규칙은 ID가 중복되지 않고, 시작일은 종료일보다 늦을 수 없으며, 담당자는 반드시 있어야 한다.",
      prompt: "규칙을 위반한 행은?",
      options: ["R-101", "R-102", "R-103", "R-104"],
      answer: 1,
      explanation:
        "R-102는 시작일이 14일인데 종료일이 11일이므로 시작일이 종료일보다 늦을 수 없다는 규칙을 위반한다.",
    },
    {
      id: 29,
      domain: "문제해결능력",
      passage:
        "배포 직후 일부 요청의 응답 시간이 길어졌다. 전체 서버 자원은 정상 범위이고 모든 기능이 느린 것은 아니다.",
      prompt: "원인을 좁히기 위한 첫 조치로 가장 적절한 것은?",
      options: [
        "확인 없이 모든 서버를 재시작한다.",
        "느린 요청과 정상 요청의 경로, 로그, 배포 변경점을 비교한다.",
        "사용자에게 문제가 없다고 공지한다.",
        "전체 시스템을 이전 버전으로 즉시 되돌린다.",
      ],
      answer: 1,
      explanation:
        "일부 요청에서만 발생하므로 정상 요청과의 차이와 최근 변경점을 비교하면 원인 범위를 효율적으로 좁힐 수 있다.",
    },
    {
      id: 30,
      domain: "문제해결능력",
      passage:
        "새 자동화 도구의 효과는 아직 불확실하고 전사 적용 시 기존 업무에 영향을 줄 수 있다. 다만 한 팀에서 2주간 시험하는 것은 쉽게 되돌릴 수 있다.",
      prompt: "불확실성을 줄이는 방법으로 가장 적절한 것은?",
      options: [
        "검증 없이 전사에 즉시 적용한다.",
        "효과가 확실해질 때까지 아무것도 하지 않는다.",
        "한 팀에서 기준 지표를 정해 2주간 시험한 뒤 확대 여부를 결정한다.",
        "도구 공급사의 홍보 자료만으로 도입을 결정한다.",
      ],
      answer: 2,
      explanation:
        "범위를 제한한 가역적인 시험과 사전에 정한 지표를 이용하면 위험을 낮추면서 실제 효과를 확인할 수 있다.",
    },
    {
      id: 31,
      domain: "자원관리능력",
      passage:
        "4명이 하루 8시간씩 근무한다. 정기 운영 업무에 총 10시간, 긴급 요청 처리에 총 8시간이 반드시 필요하다.",
      prompt: "그날 다른 업무에 사용할 수 있는 총시간은?",
      options: ["12시간", "14시간", "18시간", "22시간"],
      answer: 1,
      explanation:
        "전체 가용 시간은 4×8=32시간이고 필수 업무 18시간을 빼면 14시간이 남는다.",
    },
    {
      id: 32,
      domain: "자원관리능력",
      prompt: "총예산 2,000만 원을 교육, 장비, 운영에 2:3:5로 배분할 때 장비 예산은?",
      options: ["400만 원", "500만 원", "600만 원", "1,000만 원"],
      answer: 2,
      explanation:
        "비율의 합은 10이고 장비는 3에 해당한다. 2,000만 원×3/10=600만 원이다.",
    },
    {
      id: 33,
      domain: "자원관리능력",
      passage:
        "A(2일) 후 C(4일)를 진행한다. 이와 동시에 B(3일) 후 D(2일)를 진행할 수 있다. C와 D가 모두 끝나야 E(1일)를 시작할 수 있다.",
      prompt: "전체 업무를 끝내는 데 필요한 최소 기간은?",
      options: ["6일", "7일", "8일", "12일"],
      answer: 1,
      explanation:
        "A-C 경로는 6일, B-D 경로는 5일이다. 두 경로가 끝난 뒤 E 1일이 필요하므로 최소 7일이다.",
    },
    {
      id: 34,
      domain: "자원관리능력",
      passage:
        "회의실 알파는 8명, 베타는 12명까지 이용할 수 있다. 고객 회의는 10명이며 10시부터 11시, 팀 회의는 6명이며 10시부터 10시 30분, 보안 회의는 9명이며 11시부터 12시에 열린다.",
      prompt: "모든 회의를 수용할 수 있는 배정은?",
      options: [
        "고객-알파, 팀-베타, 보안-알파",
        "고객-베타, 팀-알파, 보안-베타",
        "고객-베타, 팀-베타, 보안-알파",
        "고객-알파, 팀-알파, 보안-베타",
      ],
      answer: 1,
      explanation:
        "10명과 9명 회의는 베타가 필요하다. 고객 회의가 끝나는 11시에 보안 회의를 베타에서 이어서 열고, 팀 회의는 동시에 알파에서 진행할 수 있다.",
    },
    {
      id: 35,
      domain: "자원관리능력",
      table: {
        headers: ["직원", "보유 역량", "참여 가능 여부"],
        rows: [
          ["김", "프론트엔드, 운영", "불가"],
          ["이", "디자인, 조사", "가능"],
          ["박", "데이터, 프론트엔드", "가능"],
          ["최", "운영, 문서화", "가능"],
        ],
      },
      passage:
        "시제품 업무에는 디자인 역량과 프론트엔드 역량이 각각 최소 1명 필요하며, 2명만 투입할 수 있다.",
      prompt: "투입할 인원 조합은?",
      options: ["김, 이", "이, 박", "이, 최", "박, 최"],
      answer: 1,
      explanation:
        "참여 가능한 사람 중 디자인 역량은 이, 프론트엔드 역량은 박이 보유하므로 이와 박을 투입해야 한다.",
    },
    {
      id: 36,
      domain: "자원관리능력",
      passage:
        "한 부품은 하루 평균 12개 사용하며 주문 후 입고까지 5일이 걸린다. 예상 변동에 대비한 안전재고는 20개다.",
      prompt: "재주문 시점의 재고 수량은?",
      options: ["40개", "60개", "72개", "80개"],
      answer: 3,
      explanation:
        "입고 대기 중 필요한 수량은 12×5=60개이다. 안전재고 20개를 더해 재고가 80개일 때 주문한다.",
    },
    {
      id: 37,
      domain: "자원관리능력",
      passage:
        "시스템은 분당 최대 1,000건을 처리할 수 있다. 평소 요청은 분당 650건이며 행사 중에는 평소보다 40% 늘어날 것으로 예상된다.",
      prompt: "행사 중 예상 여유 처리량은 분당 몇 건인가?",
      options: ["40건", "90건", "260건", "350건"],
      answer: 1,
      explanation:
        "예상 요청은 650×1.4=910건이다. 최대 처리량 1,000건에서 빼면 90건의 여유가 있다.",
    },
    {
      id: 38,
      domain: "자원관리능력",
      passage:
        "예산은 1,000만 원이다. 필수 항목은 라이선스 300만 원, 보안 점검 250만 원, 사용자 교육 150만 원이다. 선택 항목인 장비 교체는 400만 원이다.",
      prompt: "필수 항목을 모두 수행하면서 예산을 지키는 계획은?",
      options: [
        "라이선스와 장비 교체만 수행한다.",
        "보안 점검, 사용자 교육, 장비 교체를 수행한다.",
        "필수 세 항목을 수행하고 장비 교체는 보류한다.",
        "필수 세 항목과 장비 교체를 모두 수행한다.",
      ],
      answer: 2,
      explanation:
        "필수 세 항목은 700만 원이다. 장비 교체까지 하면 1,100만 원으로 예산을 넘으므로 필수 항목만 수행한다.",
    },
    {
      id: 39,
      domain: "자원관리능력",
      passage:
        "자동화 구축에 1,200만 원이 들었고 1년 동안 1,800만 원의 비용 절감 효과가 발생했다. ROI는 (효과-비용)÷비용×100으로 계산한다.",
      prompt: "이 자동화의 ROI는?",
      options: ["33.3%", "50%", "66.7%", "150%"],
      answer: 1,
      explanation:
        "(1,800-1,200)÷1,200×100=50%이다.",
    },
    {
      id: 40,
      domain: "자원관리능력",
      table: {
        headers: ["업무", "효과 점수", "긴급도 점수", "소요 시간"],
        rows: [
          ["A", "5", "5", "4시간"],
          ["B", "4", "4", "2시간"],
          ["C", "5", "2", "2시간"],
          ["D", "3", "5", "1시간"],
        ],
      },
      passage:
        "사용할 수 있는 시간은 3시간이다. 효과 점수와 긴급도 점수의 합이 가장 커지도록 업무를 선택하며, 각 업무는 전부 완료해야 점수를 얻는다.",
      prompt: "선택할 업무 조합은?",
      options: ["B와 D", "C와 D", "B만", "D만"],
      answer: 0,
      explanation:
        "B와 D는 3시간에 총 16점, C와 D는 3시간에 총 15점이다. A는 시간 내 완료할 수 없으므로 B와 D가 최적이다.",
    },
    {
      id: 41,
      domain: "조직이해능력",
      passage:
        "우리 기관은 지역 기업의 기술 경쟁력을 높이고 지속 가능한 산업 생태계를 조성하기 위해 존재한다.",
      prompt: "위 문장은 조직의 무엇에 가장 가까운가?",
      options: ["조직도", "미션", "개인별 업무일지", "월간 예산"],
      answer: 1,
      explanation:
        "조직이 왜 존재하며 누구에게 어떤 가치를 제공하는지 설명하므로 미션에 해당한다.",
    },
    {
      id: 42,
      domain: "조직이해능력",
      prompt: "조직에서 인사, 법무, 재무 부서와 같은 스태프 부문의 일반적인 역할은?",
      options: [
        "모든 현업 부서의 업무를 직접 지휘한다.",
        "전문 지식과 기준을 제공해 현업의 의사결정을 지원한다.",
        "외부 고객에게 제품을 판매하는 업무만 수행한다.",
        "조직의 목표와 무관하게 독립적으로 운영된다.",
      ],
      answer: 1,
      explanation:
        "스태프 부문은 전문 영역의 조언, 정책, 지원을 제공해 라인 부문의 목표 달성을 돕는 역할을 한다.",
    },
    {
      id: 43,
      domain: "조직이해능력",
      passage:
        "한 이해관계자는 사업 결과에 미치는 영향력이 높고, 사업에 대한 관심도도 높다.",
      prompt: "이 이해관계자를 관리하는 방식으로 가장 적절한 것은?",
      options: [
        "최소한의 정보만 제공한다.",
        "정기적으로 긴밀히 소통하며 주요 의사결정에 참여시킨다.",
        "사업 종료 후에만 결과를 알린다.",
        "관심도가 낮아질 때까지 대응하지 않는다.",
      ],
      answer: 1,
      explanation:
        "영향력과 관심도가 모두 높은 이해관계자는 핵심 이해관계자로 분류해 긴밀하게 관리하고 지속적으로 소통해야 한다.",
    },
    {
      id: 44,
      domain: "조직이해능력",
      passage:
        "사업 예산 중 홍보비가 남았고 장비비가 부족하다. 두 항목의 사용 목적은 승인된 예산서에서 구분되어 있다.",
      prompt: "담당자의 행동으로 가장 적절한 것은?",
      options: [
        "남은 홍보비를 별도 절차 없이 장비 구매에 사용한다.",
        "개인 비용으로 장비를 먼저 구매한다.",
        "예산 변경 가능 여부와 승인 절차를 확인한 뒤 집행한다.",
        "예산 부족 사실을 기록하지 않고 구매를 취소한다.",
      ],
      answer: 2,
      explanation:
        "승인된 목적과 다른 항목으로 예산을 사용하려면 관련 규정과 변경 승인 절차를 먼저 확인해야 한다.",
    },
    {
      id: 45,
      domain: "조직이해능력",
      passage:
        "계약 업체가 평가를 앞두고 담당자에게 고가의 선물을 보냈다.",
      prompt: "이해충돌을 예방하는 행동으로 가장 적절한 것은?",
      options: [
        "평가가 끝난 뒤 사용하기 위해 보관한다.",
        "선물을 거절하거나 반환하고 내부 규정에 따라 보고한다.",
        "팀원들과 나누면 문제가 없으므로 받는다.",
        "업체에 더 큰 할인을 요청하고 선물을 받는다.",
      ],
      answer: 1,
      explanation:
        "평가의 공정성에 영향을 줄 수 있으므로 선물을 거절 또는 반환하고 조직의 윤리, 신고 절차를 따라야 한다.",
    },
    {
      id: 46,
      domain: "조직이해능력",
      passage:
        "목표는 서비스 배포 오류를 줄이는 것이다.",
      prompt: "오류가 발생하기 전에 관리할 수 있는 선행지표로 가장 적절한 것은?",
      options: [
        "지난달 고객 불만 건수",
        "배포 후 발생한 장애 건수",
        "배포 전 점검표 완료율",
        "연말 총매출",
      ],
      answer: 2,
      explanation:
        "배포 전 점검표 완료율은 오류 발생 전에 관리할 수 있는 활동 지표다. 장애와 불만 건수는 결과가 나온 뒤 확인하는 후행지표다.",
    },
    {
      id: 47,
      domain: "조직이해능력",
      prompt: "부서가 여러 개인 업무에서 프로세스 책임자의 역할로 가장 적절한 것은?",
      options: [
        "자기 부서 단계만 최적화하고 이후 과정은 관여하지 않는다.",
        "처음부터 끝까지 전체 흐름과 성과를 관리하고 부서 간 문제를 조정한다.",
        "모든 실무를 혼자 수행한다.",
        "규정과 무관하게 가장 빠른 방식만 선택한다.",
      ],
      answer: 1,
      explanation:
        "프로세스 책임자는 개별 부서의 단계가 아니라 고객 가치가 만들어지는 전체 흐름과 성과를 관리한다.",
    },
    {
      id: 48,
      domain: "조직이해능력",
      passage:
        "서비스 장애가 발생해 여러 부서에서 서로 다른 원인과 복구 시간을 공유하고 있다.",
      prompt: "조직 차원의 혼선을 줄이는 방법으로 가장 적절한 것은?",
      options: [
        "각 부서가 추정 내용을 자유롭게 외부에 알린다.",
        "공식 소통 창구를 정하고 확인된 사실과 다음 업데이트 시간을 일관되게 공유한다.",
        "원인이 완전히 밝혀질 때까지 내부 소통도 중단한다.",
        "가장 먼저 나온 추정을 확정 원인으로 공지한다.",
      ],
      answer: 1,
      explanation:
        "공식 창구를 단일화하고 확인된 정보와 다음 공유 시점을 명확히 하면 상충하는 메시지와 불필요한 추측을 줄일 수 있다.",
    },
    {
      id: 49,
      domain: "조직이해능력",
      prompt: "기능 부서와 프로젝트 조직을 함께 운영하는 매트릭스 조직의 대표적인 장점은?",
      options: [
        "보고 관계가 항상 하나라서 갈등이 전혀 없다.",
        "전문 인력을 여러 프로젝트에 유연하게 활용할 수 있다.",
        "부서 간 협업이 필요하지 않다.",
        "모든 의사결정 권한이 한 사람에게만 집중된다.",
      ],
      answer: 1,
      explanation:
        "매트릭스 조직은 기능별 전문성과 프로젝트 중심 협업을 결합해 전문 인력을 유연하게 배치할 수 있다는 장점이 있다.",
    },
    {
      id: 50,
      domain: "조직이해능력",
      passage:
        "새 업무 시스템을 전사에 도입하려 하지만 일부 사용자는 기존 방식에 익숙하고 새 절차의 필요성을 이해하지 못하고 있다.",
      prompt: "변화 정착 가능성을 높이는 방법으로 가장 적절한 것은?",
      options: [
        "설명 없이 사용을 즉시 강제하고 문의를 받지 않는다.",
        "도입 목적을 공유하고 소규모 시험, 교육, 피드백 반영 후 단계적으로 확대한다.",
        "반대 의견이 없어질 때까지 도입을 무기한 미룬다.",
        "기존 시스템과 새 시스템을 기한 없이 모두 유지한다.",
      ],
      answer: 1,
      explanation:
        "변화의 이유를 설명하고 작은 범위에서 검증한 뒤 교육과 피드백을 거쳐 확대하면 수용성과 실행 품질을 높일 수 있다.",
    },
  ];

  var app = document.getElementById("app");
  var modalRoot = document.getElementById("modal-root");
  var timerId = null;
  var sheetOpen = false;
  var modalType = null;
  var reviewFilter = "all";
  var reviewIndex = 0;
  var state = loadState();

  function initialState() {
    return {
      version: 1,
      status: "ready",
      current: 0,
      answers: new Array(questions.length).fill(null),
      marked: new Array(questions.length).fill(false),
      startedAt: null,
      endAt: null,
      submittedAt: null,
      timeSpent: null,
      finishReason: null,
    };
  }

  function loadState() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (
        saved &&
        saved.version === 1 &&
        Array.isArray(saved.answers) &&
        saved.answers.length === questions.length &&
        Array.isArray(saved.marked) &&
        saved.marked.length === questions.length
      ) {
        return saved;
      }
    } catch (error) {
      console.warn("저장된 시험 상태를 불러오지 못했습니다.", error);
    }
    return initialState();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("시험 상태를 저장하지 못했습니다.", error);
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatTime(seconds) {
    var safeSeconds = Math.max(0, Math.floor(seconds));
    var minutes = Math.floor(safeSeconds / 60);
    var remainder = safeSeconds % 60;
    return String(minutes).padStart(2, "0") + ":" + String(remainder).padStart(2, "0");
  }

  function getRemainingSeconds() {
    if (!state.endAt) return EXAM_SECONDS;
    return Math.max(0, Math.ceil((state.endAt - Date.now()) / 1000));
  }

  function getAnsweredCount() {
    return state.answers.filter(function (answer) {
      return answer !== null;
    }).length;
  }

  function getCorrectCount() {
    return questions.reduce(function (total, question, index) {
      return total + (state.answers[index] === question.answer ? 1 : 0);
    }, 0);
  }

  function getWrongIndices() {
    return questions
      .map(function (question, index) {
        return state.answers[index] !== null && state.answers[index] !== question.answer
          ? index
          : -1;
      })
      .filter(function (index) {
        return index >= 0;
      });
  }

  function getBlankIndices() {
    return state.answers
      .map(function (answer, index) {
        return answer === null ? index : -1;
      })
      .filter(function (index) {
        return index >= 0;
      });
  }

  function getMarkedIndices() {
    return state.marked
      .map(function (marked, index) {
        return marked ? index : -1;
      })
      .filter(function (index) {
        return index >= 0;
      });
  }

  function renderTable(table) {
    if (!table) return "";
    var head = table.headers
      .map(function (header) {
        return "<th scope=\"col\">" + escapeHtml(header) + "</th>";
      })
      .join("");
    var body = table.rows
      .map(function (row) {
        return (
          "<tr>" +
          row
            .map(function (cell) {
              return "<td>" + escapeHtml(cell) + "</td>";
            })
            .join("") +
          "</tr>"
        );
      })
      .join("");
    return (
      "<div class=\"question-table-wrap\">" +
      "<table class=\"question-table\"><thead><tr>" +
      head +
      "</tr></thead><tbody>" +
      body +
      "</tbody></table></div>"
    );
  }

  function renderQuestionBody(question, index, reviewMode) {
    var selectedAnswer = state.answers[index];
    var passage = question.passage
      ? "<div class=\"question-passage\">" + escapeHtml(question.passage) + "</div>"
      : "";
    var table = renderTable(question.table);
    var options = question.options
      .map(function (option, optionIndex) {
        var classes = ["option"];
        if (!reviewMode && selectedAnswer === optionIndex) classes.push("selected");
        if (reviewMode && optionIndex === question.answer) classes.push("correct");
        if (
          reviewMode &&
          selectedAnswer !== null &&
          selectedAnswer !== question.answer &&
          selectedAnswer === optionIndex
        ) {
          classes.push("incorrect");
        }
        var suffix = "";
        if (reviewMode && optionIndex === question.answer) {
          suffix = " <strong>(정답)</strong>";
        } else if (
          reviewMode &&
          selectedAnswer !== null &&
          selectedAnswer !== question.answer &&
          selectedAnswer === optionIndex
        ) {
          suffix = " <strong>(선택)</strong>";
        }
        var input = reviewMode
          ? ""
          : "<input type=\"radio\" name=\"answer\" value=\"" +
            optionIndex +
            "\" " +
            (selectedAnswer === optionIndex ? "checked" : "") +
            " aria-label=\"" +
            (optionIndex + 1) +
            "번 선택지\" />";
        return (
          "<label class=\"" +
          classes.join(" ") +
          "\" data-option=\"" +
          optionIndex +
          "\">" +
          input +
          "<span class=\"option-index\">" +
          (optionIndex + 1) +
          "</span>" +
          "<span class=\"option-text\">" +
          escapeHtml(option) +
          suffix +
          "</span></label>"
        );
      })
      .join("");

    return (
      "<div class=\"question-meta\">" +
      "<div class=\"question-number\"><strong>" +
      (index + 1) +
      "</strong><span>/ " +
      questions.length +
      "</span></div>" +
      "<span class=\"domain-badge\">" +
      escapeHtml(question.domain) +
      "</span></div>" +
      passage +
      table +
      "<h2 class=\"question-prompt\">" +
      escapeHtml(question.prompt) +
      "</h2>" +
      "<div class=\"options\" role=\"radiogroup\" aria-label=\"" +
      (index + 1) +
      "번 문항 선택지\">" +
      options +
      "</div>"
    );
  }

  function renderStart() {
    var domainItems = DOMAIN_ORDER.map(function (domain) {
      return (
        "<li><span>" +
        escapeHtml(domain) +
        "</span><span class=\"domain-count\">10문항</span></li>"
      );
    }).join("");
    var resume =
      state.status === "running" && state.endAt && state.endAt > Date.now()
        ? "<button class=\"button primary\" type=\"button\" data-action=\"resume\">이어 풀기</button>"
        : "<button class=\"button primary\" type=\"button\" data-action=\"start\">시험 시작</button>";

    app.innerHTML =
      "<div class=\"start-shell\">" +
      "<header class=\"start-header\">" +
      "<div class=\"brand\"><span class=\"brand-kicker\">PRACTICE TEST</span><p class=\"brand-title\">NCS 실전 모의시험</p></div>" +
      "<a class=\"back-link\" href=\"/learning/\">학습 공간으로</a>" +
      "</header>" +
      "<main class=\"start-main\">" +
      "<section>" +
      "<p class=\"eyebrow\">경기테크노파크 필기전형 기준</p>" +
      "<h1 class=\"start-title\">50분 동안<br />50문항</h1>" +
      "<p class=\"start-lead\">의사소통, 수리, 문제해결, 자원관리, 조직이해 영역을 실제 시험 순서와 시간에 맞춰 풉니다.</p>" +
      "<div class=\"format-strip\" aria-label=\"시험 형식\">" +
      "<div class=\"format-item\"><span class=\"format-value\">50분</span><span class=\"format-label\">제한 시간</span></div>" +
      "<div class=\"format-item\"><span class=\"format-value\">50</span><span class=\"format-label\">전체 문항</span></div>" +
      "<div class=\"format-item\"><span class=\"format-value\">4지</span><span class=\"format-label\">선택형</span></div>" +
      "</div>" +
      "</section>" +
      "<section class=\"start-panel\" aria-labelledby=\"domain-title\">" +
      "<div class=\"start-panel-head\"><h2 id=\"domain-title\">시험 영역</h2></div>" +
      "<ol class=\"domain-list\">" +
      domainItems +
      "</ol>" +
      "<div class=\"start-notes\">" +
      "<p>중간에는 정답과 해설이 표시되지 않으며, 제출하거나 시간이 끝난 뒤 확인할 수 있습니다.</p>" +
      "<p>공식 출제 영역을 기준으로 새로 작성한 연습문제이며 실제 기출문제는 아닙니다.</p>" +
      "</div>" +
      "<div class=\"start-action\">" +
      resume +
      "</div>" +
      "</section>" +
      "</main>" +
      "<footer class=\"start-footer\">공식 공고 기준: NCS 5개 영역, 영역별 10문항, 총 50문항 50분</footer>" +
      "</div>";
  }

  function renderTopbar() {
    var remaining = getRemainingSeconds();
    return (
      "<header class=\"exam-topbar\">" +
      "<div class=\"topbar-inner\">" +
      "<div class=\"brand\"><span class=\"brand-kicker\">NCS MOCK TEST</span><h1 class=\"brand-title\">" +
      escapeHtml(questions[state.current].domain) +
      "</h1></div>" +
      "<div class=\"timer-block\"><span class=\"timer-label\">남은 시간</span><span id=\"timer\" class=\"timer-value " +
      (remaining <= 300 ? "warning" : "") +
      "\">" +
      formatTime(remaining) +
      "</span></div>" +
      "<div class=\"topbar-actions\">" +
      "<button class=\"button mobile-only\" type=\"button\" data-action=\"open-sheet\"><span class=\"button-symbol\" aria-hidden=\"true\">▦</span>답안지</button>" +
      "<button class=\"button primary\" type=\"button\" data-action=\"submit\"><span class=\"button-symbol\" aria-hidden=\"true\">✓</span>제출</button>" +
      "</div></div></header>"
    );
  }

  function renderAnswerGroups(mode, indices) {
    if (mode === "review") {
      if (!indices.length) {
        return "<p class=\"review-empty\">이 조건에 해당하는 문항이 없습니다.</p>";
      }
      return (
        "<div class=\"answer-grid\">" +
        indices
          .map(function (index) {
            return renderAnswerCell(index, mode);
          })
          .join("") +
        "</div>"
      );
    }
    return DOMAIN_ORDER.map(function (domain) {
      var domainIndices = questions
        .map(function (question, index) {
          return question.domain === domain ? index : -1;
        })
        .filter(function (index) {
          return index >= 0;
        });
      var answered = domainIndices.filter(function (index) {
        return state.answers[index] !== null;
      }).length;
      return (
        "<section class=\"answer-domain\"><h3>" +
        escapeHtml(domain) +
        "<span>" +
        answered +
        "/10</span></h3><div class=\"answer-grid\">" +
        domainIndices
          .map(function (index) {
            return renderAnswerCell(index, mode);
          })
          .join("") +
        "</div></section>"
      );
    }).join("");
  }

  function renderAnswerCell(index, mode) {
    var classes = ["answer-cell"];
    if (index === (mode === "review" ? reviewIndex : state.current)) classes.push("current");
    if (mode === "exam") {
      if (state.answers[index] !== null) classes.push("answered");
      if (state.marked[index]) classes.push("marked");
    } else {
      if (state.answers[index] === null) classes.push("blank");
      else if (state.answers[index] === questions[index].answer) classes.push("correct");
      else classes.push("wrong");
      if (state.marked[index]) classes.push("marked");
    }
    return (
      "<button class=\"" +
      classes.join(" ") +
      "\" type=\"button\" data-action=\"" +
      (mode === "review" ? "review-go" : "go") +
      "\" data-index=\"" +
      index +
      "\" aria-label=\"" +
      (index + 1) +
      "번 문항\">" +
      (index + 1) +
      "</button>"
    );
  }

  function renderAnswerPanel(compact) {
    var answered = getAnsweredCount();
    var body =
      "<div class=\"answer-head\"><h2>답안지</h2>" +
      (compact
        ? "<button class=\"sheet-close\" type=\"button\" data-action=\"close-sheet\" aria-label=\"답안지 닫기\">×</button>"
        : "<span class=\"answer-progress\">" + answered + " / 50</span>") +
      "</div>" +
      (compact
        ? "<p class=\"answer-progress\">" + answered + " / 50 응답</p>"
        : "<div class=\"answer-progress-bar\"><div class=\"answer-progress-fill\" style=\"width:" +
          answered * 2 +
          "%\"></div></div>") +
      "<div class=\"answer-domains\">" +
      renderAnswerGroups("exam") +
      "</div>" +
      "<div class=\"answer-legend\">" +
      "<span class=\"legend-item\"><i class=\"legend-swatch answered\"></i>응답</span>" +
      "<span class=\"legend-item\"><i class=\"legend-swatch marked\"></i>검토 표시</span>" +
      "</div>" +
      (compact
        ? ""
        : "<button class=\"button primary answer-submit\" type=\"button\" data-action=\"submit\">시험 제출</button>");
    if (compact) {
      return (
        "<div class=\"sheet-backdrop " +
        (sheetOpen ? "open" : "") +
        "\" data-action=\"close-sheet\"><section class=\"answer-sheet\" role=\"dialog\" aria-modal=\"true\" aria-label=\"답안지\" data-sheet><div class=\"sheet-handle\"></div>" +
        body +
        "</section></div>"
      );
    }
    return "<div class=\"answer-sidebar-inner\">" + body + "</div>";
  }

  function renderExam() {
    var question = questions[state.current];
    var previousDisabled = state.current === 0 ? "disabled" : "";
    var nextLabel = state.current === questions.length - 1 ? "답안지 열기" : "다음 문항";
    var nextAction = state.current === questions.length - 1 ? "open-sheet" : "next";
    app.innerHTML =
      "<div class=\"shell\">" +
      renderTopbar() +
      "<div class=\"exam-layout\">" +
      "<main class=\"question-main\"><div class=\"question-wrap\">" +
      renderQuestionBody(question, state.current, false) +
      "<div class=\"question-controls\">" +
      "<div class=\"control-group\">" +
      "<button class=\"button\" type=\"button\" data-action=\"previous\" " +
      previousDisabled +
      "><span class=\"button-symbol\" aria-hidden=\"true\">←</span>이전</button>" +
      "<button class=\"button " +
      (state.marked[state.current] ? "marked" : "") +
      "\" type=\"button\" data-action=\"mark\"><span class=\"button-symbol\" aria-hidden=\"true\">⚑</span>" +
      (state.marked[state.current] ? "표시 해제" : "검토 표시") +
      "</button></div>" +
      "<div class=\"control-group\"><button class=\"button primary\" type=\"button\" data-action=\"" +
      nextAction +
      "\">" +
      nextLabel +
      "<span class=\"button-symbol\" aria-hidden=\"true\">→</span></button></div>" +
      "</div></div></main>" +
      "<aside class=\"answer-sidebar\" aria-label=\"전체 답안지\">" +
      renderAnswerPanel(false) +
      "</aside></div>" +
      renderAnswerPanel(true) +
      "</div>";
    updateTimerDisplay();
  }

  function getFilteredReviewIndices() {
    if (reviewFilter === "wrong") return getWrongIndices();
    if (reviewFilter === "blank") return getBlankIndices();
    if (reviewFilter === "marked") return getMarkedIndices();
    return questions.map(function (_, index) {
      return index;
    });
  }

  function renderResult() {
    var correct = getCorrectCount();
    var answered = getAnsweredCount();
    var wrong = getWrongIndices().length;
    var blank = getBlankIndices().length;
    var score = correct * 2;
    var spent = state.timeSpent === null ? EXAM_SECONDS : state.timeSpent;
    var filteredIndices = getFilteredReviewIndices();
    if (filteredIndices.length && filteredIndices.indexOf(reviewIndex) < 0) {
      reviewIndex = filteredIndices[0];
    }
    var domainResults = DOMAIN_ORDER.map(function (domain) {
      var domainQuestions = questions.filter(function (question) {
        return question.domain === domain;
      });
      var domainCorrect = questions.reduce(function (total, question, index) {
        return (
          total +
          (question.domain === domain && state.answers[index] === question.answer ? 1 : 0)
        );
      }, 0);
      return (
        "<div class=\"domain-result\"><span class=\"domain-result-name\">" +
        escapeHtml(domain) +
        "</span><div class=\"domain-result-score\"><strong>" +
        domainCorrect +
        "</strong><span>/ " +
        domainQuestions.length +
        "</span></div><div class=\"domain-bar\"><div class=\"domain-bar-fill\" style=\"width:" +
        domainCorrect * 10 +
        "%\"></div></div></div>"
      );
    }).join("");

    var filters = [
      ["all", "전체", questions.length],
      ["wrong", "오답", wrong],
      ["blank", "미응답", blank],
      ["marked", "검토 표시", getMarkedIndices().length],
    ]
      .map(function (filter) {
        return (
          "<button class=\"filter-tab " +
          (reviewFilter === filter[0] ? "active" : "") +
          "\" type=\"button\" data-action=\"filter\" data-filter=\"" +
          filter[0] +
          "\">" +
          filter[1] +
          " " +
          filter[2] +
          "</button>"
        );
      })
      .join("");

    var reviewContent = "";
    if (filteredIndices.length) {
      var reviewQuestion = questions[reviewIndex];
      var currentPosition = filteredIndices.indexOf(reviewIndex);
      reviewContent =
        renderQuestionBody(reviewQuestion, reviewIndex, true) +
        "<div class=\"explanation\"><span class=\"explanation-label\">해설</span><p>" +
        escapeHtml(reviewQuestion.explanation) +
        "</p></div>" +
        "<div class=\"review-controls\">" +
        "<button class=\"button\" type=\"button\" data-action=\"review-previous\" " +
        (currentPosition <= 0 ? "disabled" : "") +
        "><span class=\"button-symbol\" aria-hidden=\"true\">←</span>이전</button>" +
        "<button class=\"button\" type=\"button\" data-action=\"review-next\" " +
        (currentPosition >= filteredIndices.length - 1 ? "disabled" : "") +
        ">다음<span class=\"button-symbol\" aria-hidden=\"true\">→</span></button></div>";
    } else {
      reviewContent =
        "<p class=\"review-empty\">이 조건에 해당하는 문항이 없습니다. 다른 구분을 선택해 주세요.</p>";
    }

    app.innerHTML =
      "<div class=\"result-shell\">" +
      "<header class=\"result-header\"><div class=\"result-header-inner\"><h1>NCS 모의시험 결과</h1><div class=\"topbar-actions\">" +
      "<a class=\"button desktop-only\" href=\"/learning/\">학습 공간</a>" +
      "<button class=\"button\" type=\"button\" data-action=\"reset\">다시 풀기</button>" +
      "</div></div></header>" +
      "<main class=\"result-main\">" +
      "<section class=\"score-band\">" +
      "<div class=\"score-block\"><span class=\"score-label\">총점</span><div class=\"score-value\"><strong>" +
      score +
      "</strong><span>/ 100</span></div><span class=\"score-status " +
      (score >= 40 ? "pass" : "fail") +
      "\">" +
      (score >= 40 ? "과목 과락 기준 이상" : "과목 과락 기준 미만") +
      "</span></div>" +
      "<div class=\"result-summary\">" +
      "<div class=\"summary-item\"><strong>" +
      correct +
      "</strong><span>정답</span></div>" +
      "<div class=\"summary-item\"><strong>" +
      wrong +
      "</strong><span>오답</span></div>" +
      "<div class=\"summary-item\"><strong>" +
      formatTime(spent) +
      "</strong><span>풀이 시간</span></div>" +
      "<p class=\"result-note\">경기테크노파크 공고상 NCS 과목은 40점 미만이면 과락입니다. 실제 합격자는 과락 통과자 중 고득점 순으로 결정되므로 40점은 합격선이 아닙니다. 응답 " +
      answered +
      "문항, 미응답 " +
      blank +
      "문항입니다.</p>" +
      "</div></section>" +
      "<section class=\"section\"><h2 class=\"section-title\">영역별 결과</h2><div class=\"domain-results\">" +
      domainResults +
      "</div></section>" +
      "<section class=\"section\"><div class=\"review-toolbar\"><h2 class=\"section-title\" style=\"margin:0\">문항 검토</h2><div class=\"filter-tabs\" role=\"tablist\" aria-label=\"검토 문항 구분\">" +
      filters +
      "</div></div>" +
      "<div class=\"review-workspace\"><aside class=\"review-nav\" aria-label=\"검토 문항 목록\">" +
      renderAnswerGroups("review", filteredIndices) +
      "</aside><article class=\"review-question\">" +
      reviewContent +
      "</article></div></section>" +
      "</main></div>";
  }

  function renderModal() {
    if (!modalType) {
      modalRoot.innerHTML = "";
      return;
    }
    var isSubmit = modalType === "submit";
    var blank = getBlankIndices().length;
    var title = isSubmit ? "시험을 제출할까요?" : "처음부터 다시 풀까요?";
    var description = isSubmit
      ? blank > 0
        ? "아직 답하지 않은 문항이 " + blank + "개 있습니다. 제출하면 정답과 해설이 표시됩니다."
        : "50문항에 모두 답했습니다. 제출하면 정답과 해설이 표시됩니다."
      : "현재 답안과 결과가 모두 삭제되고 시작 화면으로 돌아갑니다.";
    var confirmLabel = isSubmit ? "제출하기" : "다시 시작";
    modalRoot.innerHTML =
      "<div class=\"modal-backdrop\" data-action=\"close-modal\">" +
      "<section class=\"modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modal-title\" data-modal>" +
      "<h2 id=\"modal-title\">" +
      title +
      "</h2><p>" +
      description +
      "</p><div class=\"modal-actions\">" +
      "<button class=\"button\" type=\"button\" data-action=\"close-modal\">취소</button>" +
      "<button class=\"button " +
      (isSubmit ? "primary" : "danger") +
      "\" type=\"button\" data-action=\"" +
      (isSubmit ? "confirm-submit" : "confirm-reset") +
      "\">" +
      confirmLabel +
      "</button></div></section></div>";
    window.setTimeout(function () {
      var cancelButton = modalRoot.querySelector("[data-action='close-modal']");
      if (cancelButton) cancelButton.focus();
    }, 0);
  }

  function render() {
    if (state.status === "ready") renderStart();
    else if (state.status === "running") renderExam();
    else renderResult();
    renderModal();
  }

  function updateTimerDisplay() {
    var timer = document.getElementById("timer");
    if (!timer) return;
    var remaining = getRemainingSeconds();
    timer.textContent = formatTime(remaining);
    timer.classList.toggle("warning", remaining <= 300);
  }

  function ensureTimer() {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
    if (state.status !== "running") return;
    timerId = window.setInterval(function () {
      var remaining = getRemainingSeconds();
      updateTimerDisplay();
      if (remaining <= 0) finishExam("timeout");
    }, 500);
  }

  function startExam() {
    state = initialState();
    state.status = "running";
    state.startedAt = Date.now();
    state.endAt = state.startedAt + EXAM_SECONDS * 1000;
    saveState();
    render();
    ensureTimer();
    window.scrollTo(0, 0);
  }

  function finishExam(reason) {
    if (state.status !== "running") return;
    var submittedAt = Date.now();
    state.status = "result";
    state.submittedAt = submittedAt;
    state.timeSpent = state.startedAt
      ? Math.min(EXAM_SECONDS, Math.max(0, Math.round((submittedAt - state.startedAt) / 1000)))
      : EXAM_SECONDS;
    state.finishReason = reason;
    state.endAt = null;
    modalType = null;
    sheetOpen = false;
    reviewFilter = "all";
    reviewIndex = 0;
    saveState();
    ensureTimer();
    render();
    window.scrollTo(0, 0);
  }

  function resetExam() {
    state = initialState();
    reviewFilter = "all";
    reviewIndex = 0;
    modalType = null;
    sheetOpen = false;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("저장된 시험 상태를 삭제하지 못했습니다.", error);
    }
    ensureTimer();
    render();
    window.scrollTo(0, 0);
  }

  function goToQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    state.current = index;
    sheetOpen = false;
    saveState();
    renderExam();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function moveReview(direction) {
    var indices = getFilteredReviewIndices();
    var position = indices.indexOf(reviewIndex);
    var nextPosition = position + direction;
    if (nextPosition < 0 || nextPosition >= indices.length) return;
    reviewIndex = indices[nextPosition];
    renderResult();
    var reviewSection = document.querySelector(".review-workspace");
    if (reviewSection) reviewSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  app.addEventListener("change", function (event) {
    var target = event.target;
    if (
      state.status === "running" &&
      target instanceof HTMLInputElement &&
      target.name === "answer"
    ) {
      state.answers[state.current] = Number(target.value);
      saveState();
      renderExam();
    }
  });

  app.addEventListener("click", function (event) {
    var actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;
    if (actionTarget.hasAttribute("disabled")) return;
    if (actionTarget.matches("[data-action='close-sheet']") && event.target.closest("[data-sheet]")) {
      if (!event.target.closest(".sheet-close")) return;
    }
    var action = actionTarget.getAttribute("data-action");
    if (action === "start") startExam();
    else if (action === "resume") {
      state.status = "running";
      render();
      ensureTimer();
    } else if (action === "previous") goToQuestion(state.current - 1);
    else if (action === "next") goToQuestion(state.current + 1);
    else if (action === "go") goToQuestion(Number(actionTarget.getAttribute("data-index")));
    else if (action === "mark") {
      state.marked[state.current] = !state.marked[state.current];
      saveState();
      renderExam();
    } else if (action === "open-sheet") {
      sheetOpen = true;
      renderExam();
    } else if (action === "close-sheet") {
      sheetOpen = false;
      renderExam();
    } else if (action === "submit") {
      modalType = "submit";
      renderModal();
    } else if (action === "reset") {
      modalType = "reset";
      renderModal();
    } else if (action === "review-go") {
      reviewIndex = Number(actionTarget.getAttribute("data-index"));
      renderResult();
    } else if (action === "review-previous") moveReview(-1);
    else if (action === "review-next") moveReview(1);
    else if (action === "filter") {
      reviewFilter = actionTarget.getAttribute("data-filter") || "all";
      var filtered = getFilteredReviewIndices();
      reviewIndex = filtered.length ? filtered[0] : 0;
      renderResult();
    }
  });

  modalRoot.addEventListener("click", function (event) {
    var actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;
    if (actionTarget.matches("[data-action='close-modal']") && event.target.closest("[data-modal]")) {
      if (event.target.getAttribute("data-action") !== "close-modal") return;
    }
    var action = actionTarget.getAttribute("data-action");
    if (action === "close-modal") {
      modalType = null;
      renderModal();
    } else if (action === "confirm-submit") {
      finishExam("manual");
    } else if (action === "confirm-reset") {
      resetExam();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (modalType) {
        modalType = null;
        renderModal();
      } else if (sheetOpen) {
        sheetOpen = false;
        renderExam();
      }
    }
    if (state.status === "running" && !modalType) {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === "ArrowLeft" && state.current > 0) {
        goToQuestion(state.current - 1);
      } else if (event.key === "ArrowRight" && state.current < questions.length - 1) {
        goToQuestion(state.current + 1);
      }
    }
  });

  if (state.status === "running" && getRemainingSeconds() <= 0) {
    finishExam("timeout");
  } else {
    render();
    ensureTimer();
  }
})();
