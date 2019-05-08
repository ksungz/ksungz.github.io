---
layout: post
title:  "RESTful api란"
subtitle: "메모해봅시다."
type: "타입"
blog: true
text: true
author: "Suzkim"
post-header: true
header-img: "img/header.jpg"
order: 8
---

# RESTful api

<br>

## REST 란?
- **Re**presentaional
- **S**tate
- **T**ransfer

<br>

### 네트워크 아키텍쳐 원리모음
>사이트의 구성원리

<br>

### REST 아키텍쳐의 6가지 제한 조건
- 클라이언트/서버 구조
- 무상태 (Stateless)
- 캐시 처리 가능 (Cacheable)
- 계층화 (Layered System)
- Code on demand (optional)
- 인터페이스 일관성

<br>

HTTP에는 이미 REST 원칙이 녹아 들어 있다.
<br><br><br>
우리는 Route에만 신경쓰면 REST하게 사이트를 만들 수 있다.
>REST하게 만든다 <-> URL 주소만 보고도 수행하려는 동작을 눈치챌 수 있게 만드는 것.

<br>
url의 의미중 **명사**가 **리소스**, **동사**를 **메소드**로 만든다.


| 메소드               | 리소스             | ID              | 의미            |
| :------------------ | :----------------- |:--------------- |:--------------- |
| GET                 | posts              |                 | 글 목록을 봅니다.|
| POST                | posts              |                 | 글을 생성합니다. |
| PUT                 | posts              | :id             | 글을 수정합니다. |
| DELETE              | posts              | :id             | 글을 삭제합니다. |


- 글 목록<sub>(posts)</sub>을 봅니다.<sub>(GET)</sub>
- 글<sub>(posts)</sub>을 생성합니다.<sub>(POST)</sub>
- 글<sub>(posts)</sub>을 수정합니다.<sub>(PUT)</sub>
- 글<sub>(posts)</sub>을 삭제합니다.<sub>(DELETE)</sub>


### 어떤 메소드를 써야 할까
|                     | 수행하기 전, 후     | 반복 수행한 결과 | 리소스의 수      |
| :------------------ | :----------------- |:--------------- |:--------------- |
| GET                 | 같다                | 같다            | 같다            |
| POST                | 다르다              | 다르다          | 많아진다         |
| PUT                 | 다르다              | 같다            | 같다            |
| DELETE              | 다르다              | 다르다          | 적어진다         |


### 어떤게 RESTful?
- PUT /dogs/1/isSick (X)
- PUT /dogs/1?isSick=true (O)

>id와 리소스 이외의 정보를 URI에 담으면 안된다.

- POST /login (X)
- POST /users/login (X)
- POST /session (O)

>"무엇" (명사)을 생성하는지 생각해보아야 한다.



