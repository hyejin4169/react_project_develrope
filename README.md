😎 Devel-rope
=============
코드와 매일 같이 싸움하는 개발자들(Developers)을 위한 하늘에서 내려온 동아줄(rope) 같은 앱!
<p>개발자들끼리 다양한 질문을 올리고, 트러블슈팅도 하고, 각종 지식을 공유할 수 있는 커뮤니티 입니다. 😊<br><br>

![텍스트](https://media.vlpt.us/images/hyejin4169/post/6a87cf28-b81f-460f-b6f9-52d63743b821/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-17%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.22.51.png "Devel-rope")<br><br><br><br>

## ![텍스트](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdyJwn8%2FbtrtAPpuDdu%2FKtweKbXYo9gHezNhVy33p1%2Fimg.png "Devel-rope_Logo")  <br>
- 개발을 하다가 부딪힌 문제를 공유하고 해답을 빠르게 찾을 수 있습니다.
- 서로의 일상을 자유롭게 공유할 수 있습니다.

## 📆 제작 기간 및 팀원 소개 👨‍💻👩‍💻
- 2021-02-11 ~ 2021-02-17
- 정현수 [GitHub](https://github.com/ricky0813) : 유저(로그인, 회원가입) 및 댓글 담당
- 윤혜진 [GitHub](https://github.com/hyejin4169) : 이미지 업로드 및 포스팅 담당

## 💻 Front-end
- 이번 프로젝트는 프론트엔드 2명, 백엔드 3명이 함께 진행한 프로젝트 입니다.
- 우선적으로 기본적인 CRUD기능의 구현에 집중하였고, 세부적인 내실을 다지는데 집중하였습니다. 

## 🌎 Website
[사이트 바로가기](http://devel-rope.site/)

## 🎬 데모 영상 링크
[데모영상 바로가기](https://youtu.be/LiMiTonWZqk)

## 📝노션 설계 페이지
[노션 바로가기](https://lofty-palladium-0d5.notion.site/2-SA-57c267cb80e8418791bd8e42a15d68d7)

## 📋와이어 프레임 
![텍스트](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOclKv%2FbtrtACX4X7Z%2Fy8DQBJMYKMPLKQ9hVgww6k%2Fimg.png "와이어프레임")

<br><br><br>
## 🛠 Front-end 기술 스택 및 개발 환경 🔨
<br>
<p align="center">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/axios-007CE2?style=for-the-badge&logo=axios&logoColor=white">
</br>
<img src="https://img.shields.io/badge/reactrouterdom-375BD2?style=for-the-badge&logo=reactrouterdom&logoColor=white">
<img src="https://img.shields.io/badge/styledcomponents-181717?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
<img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">


 <br><br><br>
 ## 🔗API 상세

|                | Method | URL                                    | REQ                                           | RES    
|----------------|--------|----------------------------------------|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------|
|회원가입 | POST | /api/join | { email: password: nickname: git: blog: blogtype: } | { ‘ok’: true, message: ‘회원가입 성공’ } OR { ‘ok’: false, errorMessage:’회원가입 실패’ }
|이메일 중복검사 | POST | /api/join/check | { email: } | { ‘ok’: true, message: ‘사용가능한 이메일입니다.’ } OR { ‘ok’: false, errorMessage:’이미 사용중인 이메일입니다.’ }
|닉네임 중복검사 | POST | /api/join/check | { nickname: } |  { ‘ok’: true, message: ‘사용가능한 닉네임입니다.’ } OR { ‘ok’: false, errorMessage:’이미 사용중인 닉네임입니다.’ }
|로그인 | POST | /api/login | { email: password: } | token: nickname: userId: userIcon: { 'ok':true, message:’로그인 성공’ } OR { ‘ok’: false, errorMessage:’로그인 실패’ }
|전체 포스트 불러오기 |  GET  | /api/post | | { 'ok': true, result: [{ //imgUrl: userId: userIcon: postId: nickname: content: //replyNumber: //like_cnt: date: }] }
|다른 일부 유저 관련 정보 불러오기 | GET | /api/user | { headers:{ authorization:token } headers: { "Authorization": Bearer ${localStorage.getItem("token")}, } | { 'ok': true, result: [{ userIcon: nickname: email: git: blog: }] }
|다른 모든 유저 관련 정보 불러오기 | GET | /api/users | { headers:{ authorization:token } headers: { "Authorization": Bearer ${localStorage.getItem("token")}, } | { 'ok': true, result: [{ userIcon: nickname: email: git: blog: }] }
|내 로그인 정보 불러오기 | GET | /api/auth |  { headers:{ authorization:token } headers: { "Authorization": Bearer ${localStorage.getItem("token")}, } | { 'ok': true, result: [{ email: userId: userIcon: nickname: }] }
|post 생성 | POST | /api/post | { userId: nickname: content: userIcon: imgUrl: date: //comment_cnt: } | { ‘ok’: true, message: ‘생성 성공’ } OR { ‘ok’: false, message:’생성 실패’ }
|post 불러오기 | GET | /api/detail:/:postId | { postId: } | { ‘ok’: true, result: [{ content: nickname: userId: userIcon: imgUrl: date: postId: //comment_cnt: }] }
|post 수정하기 | PUT | /api/item/:postId | { content: userId: imgUrl: postId } | { ‘ok’: true, message: ‘수정 성공’, } OR { ‘ok’: false, message:’수정 실패’ }
|post 삭제하기 | DELETE | api/item/:postId | { postId: } | { ‘ok’: true, message: ‘삭제 성공’ } OR { ‘ok’: false, message:’삭제 실패’ }
|comment 불러오기 | GET | /api/comment/:postId | { postId: } | { ‘ok’: true, result: [{ comment: userId: nickname: postId: commentId: userIcon: date: }] }
|comment 수정하기 | PUT | /api/comment/:commentId | { comment: } | { ‘ok’: true, message: ‘수정 성공’ } OR { ‘ok’: false, message:’수정 실패’ } 



<br><br><br>
## ✔🗒️ 페이지 & 기능
### * 로그인, 회원가입
    :JWT를 사용하여 로그인과 회원가입을 구현
    :아이디 및 닉네임 중복 확인과 비밀번호 2차 확인 가능 (최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자)
    :입력한 블로그 및 깃허브 주소가 양식에 맞지 않을 경우 사용자에게 표시
    :회원정보 DB에 저장, 회원가입 완료 후 로그인 페이지로 이동    
### * 메인 페이지
    :모든 유저가 작성한 글을 시간 순서대로 확인 가능
    :특정 글 클릭 시 해당 글의 디테일한 정보 확인 가능
    :페이지 좌측에 랜덤으로 유저 리스트 최대 5명까지 확인 가능 (더 많은 유저 보기 버튼 클릭 시 모달창 디스플레이 되어 모든 유저 확인 가능)
    :본인이 작성한 글에 한하여 수정 및 삭제 아이콘이 표시되어 수정, 삭제 가능
### * 글 작성 페이지
    :작성 시 이미지 업로드 가능 및 첨부된 이미지 미리보기 구현
### * 글 상세 페이지
    :모든 유저가 작성한 댓글을 시간 순서대로 확인 가능
    :댓글 작성, 수정, 삭제 가능
    :댓글 갯수 카운트 가능 (추가 시 +1, 삭제 시 -1)
<br><br><br>    

## **❓ Why? Axios**

- 호환성이 좋고, 코드 작성이 간결하여 리액트 프로젝트에 적합하다고 판단하여 사용하였습니다.
<br><br><br>
## **⚙️ Troubleshooting**

- 게시글 이미지를 수정하고 새로운 게시글을 작성할 때, 이전에 업로드한 이미지가 preview로 남아있는 버그-> redux 모듈에 setPreview 미들웨어를 null값으로 dispatch하여 해결
- 메인페이지에서 삭제 아이콘을 누르면 바로 삭제가 되지 않고 상세페이지로 이동되어 상세페이지에서 삭제를 진행해야 했음-> stopPropagation() 메서드를 사용하여 해결 (부모요소랑 자식요소에 둘 다 온클릭이 걸려있을때 영향 받지 않게 막으려고 사용)
- 글을 작성하거나 수정할 때마다 새로고침되는 문제-> useEffect를 app.js로 옮겨서 해결
- 글을 작성할 때 줄바꿈이 반영이 되지 않는 문제-> white-space: pre-wrap;으로 \n을 개행으로 인식하게 하여 해결
