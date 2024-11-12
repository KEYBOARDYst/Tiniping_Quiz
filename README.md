# 캐치! 티니핑 퀴즈 프로그램

## 링크

- 배포 링크: [캐치!티니핑 퀴즈 게임 시작하기](https://keyboardyst.github.io/Tiniping_Quiz/)
- 튜토리얼 영상: [캐치!티니핑 퀴즈 게임 만들기](https://www.youtube.com)
- 카카오 Developers 설정: [카카오 Developers 설정하기](https://www.youtube.com)

## 기능 설명

1. **게임 설정**: 상단 제한시간, 카테고리, 문제 개수를 설정합니다.
2. **게임 시작**: START 버튼을 눌러 티니핑 캐릭터 사진이 나타나고, 입력칸과 설정한 제한시간에 맞춘 카운트다운이 시작됩니다.
3. **정답 입력**: 캐릭터 이름을 맞출 경우 다음 문제로 넘어가고, 틀릴 경우 게임이 종료됩니다.

## 폴더 구조

```
📂 Tiniping_Quiz

├── 📂 public # 이미지 파일 디렉토리
  ├── 📂 tiniping # 티니핑 json 파일과 티니핑 캐릭터 이미지
  ├── 🖼️ background.png # 배경 이미지
  └── 🖼️ favicon.ico # 파비콘 아이콘
├── 📂 src # Firebase 설정 파일
  ├── 📄 index.js # 메인 js 파일
  ├── 📄 Tiniping.js # 게임 로직 파일
  └── 📄 tiniping.css # 스타일 CSS 파일
└── 📄 package.json
```
- public 폴더 내 이미지/json 파일 : [구글 드라이브 다운받기](https://drive.google.com/file/d/1a7g-7ed_KMtx3M-kp7hmDqwqfA8ZZPXP/view?usp=drive_link)

## 기술 스택

[![Skills](https://skillicons.dev/icons?i=js,css,react)](https://skillicons.dev)

- `JavaScript`: 게임 로직 및 동적 기능 구현
- `CSS3`: 레이아웃과 스타일링
- `React`: 전체 코드 작성 라이브러리

## 다운로드 및 실행 방법

1. 해당 저장소를 로컬 환경으로 클론

   ```bash
   git clone https://github.com/KEYBOARDYst/Tiniping_Quiz.git
   ```

2. `env` 설정
    ```bash
    REACT_APP_KAKAO_KEY=카카오톡 Developers를 활용한 애플리케이션 JavaScript 키
    REACT_APP_URL=접속 URL
    ```
3. `node_modules` 설치
   ```bash
   # npm install
   ```
4. React 프로젝트 시작
   ```bash
   # npm run start
   ```

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FKEYBOARDYst%2FAPTGame&count_bg=%23F56B8F&title_bg=%23292929&icon=&icon_color=%23F56B8F&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
