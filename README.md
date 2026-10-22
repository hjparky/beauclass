# 뷰클래스 아카데미 (Beauclass Academy) 로컬 리버스 엔지니어링 웹사이트

본 프로젝트는 `https://saeropin.com/site/beauclass` 웹사이트 전체 구조 및 정적 자원을 완전 자동 승인 모드(Non-interactive Mode)로 리버스 엔지니어링하여, 외부 인터넷 연결 없이도 로컬 환경에서 100% 독립 동작하도록 재구성한 오프라인 웹 패키지입니다.

---

## 📁 디렉터리 및 파일 구조

```
beauclass/
├── index.html                   # 메인 랜딩 페이지 전체 (Hero, 과정, 강사진, Q&A, 위치 등)
├── curriculum.html              # 교육과정 (커리큘럼) 전용 독립 페이지
├── about.html                   # 학원 소개 및 강사진 전용 독립 페이지
├── teachers.html                # 강사진 상세 소개 전용 페이지 (about.html 동일)
├── apply.html                   # 수강신청 및 입학 상담 안내 독립 페이지
├── faq.html                     # 자주 묻는 질문 (Q&A 아코디언) 독립 페이지
├── contact.html                 # 오시는 길 & 위치 안내 독립 페이지
├── event-sassoon-2027.html      # 2027 런던 사순 아카데미 한국 컬렉션 세미나 상세 페이지
├── student.html                 # 수강생 이야기 및 후기 페이지
├── policy.html                  # 서비스 운영정책 및 개인정보처리방침
│
├── teacher-parkjinyoung.html    # 박진영 수석 강사 상세 프로필
├── teacher-kwonshinwoo.html     # 권신우 교육디렉터 상세 프로필
├── teacher-kimyujeong.html      # 김유정 주강사 상세 프로필
├── teacher-james-greaves.html   # James Greaves 크리에이티브 디렉터 프로필
├── teacher-riess-hatcher.html   # Riess Hatcher 교장 프로필
│
├── teachers-section.html        # index.html / teachers.html 공용 강사진 섹션 스니펫 (동기화 원본)
│
├── assets/
│   ├── css/
│   │   ├── main.css             # 메인 스타일시트
│   │   ├── pretendard.css       # Pretendard 웹폰트 스타일시트
│   │   └── google-fonts.css     # Manrope / Noto Sans KR 폰트 스타일시트
│   ├── js/
│   │   └── site-interactive.js  # Hero 슬라이더, 과정 필터링, FAQ 등 오프라인 인터랙티브 스크립트
│   ├── images/                  # 총 48개 전체 고화질 이미지/로고/작품/강사 사진
│   └── fonts/                   # 로컬 나눔스퀘어네오 및 구글 웹폰트 파일 (131개)
│
└── site/
    └── beauclass/               # 원본 URL 경로 호환용 리다이렉트 미러 구조
        ├── event/
        ├── teacher/
        ├── policy.html
        ├── student.html
        ├── manifest.webmanifest  # 로컬 PWA 매니페스트 (아이콘/시작 URL)
        ├── icon-192.png          # PWA 아이콘 192x192
        └── icon-512.png          # PWA 아이콘 512x512
```

---

## 🚀 로컬 실행 방법

### 방법 1. 브라우저에서 직접 파일 열기
- `index.html` 파일을 더블클릭하거나 크롬/웨일/엣지 브라우저 창으로 드래그 앤 드롭하여 바로 열 수 있습니다.
- 모든 링크가 상대 경로(`./...`)로 완벽하게 연결되어 있어 상호 이동이 자연스럽게 동작합니다.

### 방법 2. 로컬 웹 서버 실행 (권장)
VS Code 터미널 또는 파워쉘에서 해당 폴더로 이동 후 아래 명령어를 실행합니다:
```bash
python -m http.server 8080
```
브라우저에서 `http://localhost:8080/index.html`로 접속하면 실제 웹사이트와 완전히 동일한 환경에서 탐색할 수 있습니다.

---

## 🛠 리버스 엔지니어링 핵심 처리 내용

1. **Next.js RSC 의존성 제거 및 정적 자립화**
   - 클라이언트 라우터 하이재킹 스크립트를 제거하고, 순수 DOM 구조를 기반으로 오프라인 네비게이션이 동작하도록 최적화.
2. **반응형 상호작용 복원 (`site-interactive.js`)**
   - Hero 캐러셀 슬라이더 (좌우 화살표, 인디케이터 도트, 5초 자동 롤링, 터치/스와이프 지원).
   - 과정(Curriculum) 카테고리 탭 필터 (전체/뷰클래스/트렌드/사순 온라인) 및 경력별 필터(3년 이하 / 3년 이상).
   - FAQ 아코디언 열기/닫기 인터랙션.
3. **완전한 정적 자원(Assets) 로컬 추출**
   - Firebase Storage에 분산되어 있던 48종 이미지 일괄 추출 및 해시/식별자 기반 로컬화.
   - 외부 웹폰트 의존성을 없애기 위해 폰트 바이너리 다운로드 및 CSS 상대 경로 재연결.
