// courseData.js - 뷰클래스 아카데미 8개 전체 교육과정 상세 커리큘럼 데이터
const COURSES_DATA = [
  {
    id: "course-senior",
    title: "4060 시니어 고객을 위한 트렌드 헤어 A to Z",
    level: "3단계 실전",
    category: "커트 · 세미나",
    duration: "6주 · 주 1회 · 회차당 3~4시간 · 정원 8명~10명",
    price: "80만원",
    sessionsCount: 5,
    curriculum: [
      {
        session: "1회차",
        title: "Modern Precision Line & 골격 분석",
        detail: "시니어 두상 골격 진단, 처진 페이스라인 리프팅 베이스 앵글 설계, 정수리 볼륨 포인트 설정"
      },
      {
        session: "2회차",
        title: "Commercial Graduation (커머셜 그래주에이션)",
        detail: "무게감 제어 미디움/숏 그래주에이션, 네이프 라인 슬림화 및 모던 라인 컨트롤"
      },
      {
        session: "3회차",
        title: "트렌드 볼륨 숏보브 & 레이어드 믹스",
        detail: "볼륨 밸런싱 레이어, 텍스처라이징 기법을 활용한 가벼움과 풍성함의 조화"
      },
      {
        session: "4회차",
        title: "살롱 실전 시니어 펌 연계 컷 테크닉",
        detail: "뿌리 볼륨펌 매칭 커트존 형성, 손질이 쉬운 맞춤형 모류 교정 컷"
      },
      {
        session: "5회차",
        title: "시니어 카운슬링 & 완성도 높은 살롱 스타일링",
        detail: "고객 맞춤 상담법, 롤 브러시 블로우 드라이 테크닉, 홈케어 스타일링 티칭 노하우"
      }
    ]
  },
  {
    id: "course-women-basic",
    title: "여성 베이직 커트",
    level: "2단계 기초",
    category: "커트",
    duration: "총 12회 · 주 1회 · 최대 10명",
    price: "160만원",
    sessionsCount: 12,
    curriculum: [
      {
        session: "1회차",
        title: "Basic One-Length (원랭스 아웃라인 기초)",
        detail: "가위 테크닉, 바른 자세와 텐션 컨트롤, 완벽한 호라이즌탈 원랭스 라인 형성"
      },
      {
        session: "2회차",
        title: "Diagonal Forward One-Length (A라인 원랭스)",
        detail: "전경 슬라이스 각도 유지, 앞쪽으로 길어지는 정교한 라인 밸런스 트레이닝"
      },
      {
        session: "3회차",
        title: "Diagonal Back One-Length (V라인 원랭스)",
        detail: "후경 슬라이스 빗질과 텐션, 백 센터 중심의 자연스러운 곡선 라인 컨트롤"
      },
      {
        session: "4회차",
        title: "Classic Graduation Low (로우 그래주에이션)",
        detail: "45도 시술각 제어, 무게선 형성 원리와 베이스 라인의 안정적인 연결"
      },
      {
        session: "5회차",
        title: "Commercial Medium Graduation (미디움 그래주에이션)",
        detail: "미디움 보브 디자인, 사이드와 백의 무게감 연결 및 밸런싱 테크닉"
      },
      {
        session: "6회차",
        title: "Short Graduation & 페이스라인 디자인",
        detail: "숏 그래주에이션, 페이스라인 감싸는 라운드 그래주에이션 실전"
      },
      {
        session: "7회차",
        title: "Uniform Layered (유니폼 레이어 기초)",
        detail: "90도 동일 길이 레이어 커트, 두상 형태에 따른 가이드 이동 테크닉"
      },
      {
        session: "8회차",
        title: "Square Layered (스퀘어 레이어)",
        detail: "두상 평면화 스퀘어 테크닉, 불필요한 무게감 제거와 모던 텍스처 형성"
      },
      {
        session: "9회차",
        title: "Round Layered (라운드 레이어)",
        detail: "부드러운 실루엣의 라운드 테크닉, 롱/미디움 기장의 내추럴 무브먼트 연출"
      },
      {
        session: "10회차",
        title: "Graduation & Layer Combination (복합 디자인 1)",
        detail: "그래주에이션의 무게감과 레이어의 볼륨 분산 결합 디자인"
      },
      {
        session: "11회차",
        title: "Salon Trendy Bob & 질감 조절",
        detail: "살롱 인기 테슬컷, 단발 보브 응용 디자인 및 슬라이싱/포인팅 질감 테크닉"
      },
      {
        session: "12회차",
        title: "여성 살롱 디자인 종합 테스트 & 디플로마 평가",
        detail: "고객 진단부터 완성까지 전 과정 모델 실습, 1:1 피드백 및 테크닉 총정리"
      }
    ]
  },
  {
    id: "course-men-basic",
    title: "남성 베이직 커트 & 스타일링",
    level: "2단계 기초",
    category: "남성",
    duration: "총 6회 · 주 1회 · 회차당 8시간 · 최대 10명",
    price: "60만원",
    sessionsCount: 6,
    curriculum: [
      {
        session: "1회차",
        title: "Clipper & Comb Work (클리퍼 테크닉 기초)",
        detail: "클리퍼 파지와 오버콤 테크닉, 페이드 기초 높이 설정 및 베이스 페이딩"
      },
      {
        session: "2회차",
        title: "Square Layered Men's Cut (남성 스퀘어 라인)",
        detail: "남성 골격의 단점을 보완하는 스퀘어 형태 구축 및 톱/사이드 연결"
      },
      {
        session: "3회차",
        title: "살롱 댄디 & 시스루 댄디 커트",
        detail: "내추럴한 앞머리 질감 처리, 구젯나루와 네이프 라인 클린업 테크닉"
      },
      {
        session: "4회차",
        title: "아이비리그컷 & 드롭컷 실전",
        detail: "짧은 남성 머리 라인 정밀 제어, 두상 굴곡 보정 및 다운펌 연계 컷존 설정"
      },
      {
        session: "5회차",
        title: "리프컷 & 가일 스타일 (미디움 남성 헤어)",
        detail: "흐름감 있는 리프 라인 디자인, 가르마 분할 및 텍스처라이징 기법"
      },
      {
        session: "6회차",
        title: "남성 살롱 왁스 스타일링 & 포마드 피니시",
        detail: "모질별 드라이 방법, 왁스/포마드 연출법, 살롱 고객 응대 및 스피드 커트 노하우"
      }
    ]
  },
  {
    id: "course-color",
    title: "뷰클래스 컬러 교육",
    level: "2단계 기초",
    category: "컬러",
    duration: "총 9회(실전 6회 코스) · 주 1회 · 최대 10명",
    price: "80만원",
    sessionsCount: 6,
    curriculum: [
      {
        session: "1회차",
        title: "Color Theory & Hair Pigment (색채학 원리)",
        detail: "모발 언더톤 분석, 멜라닌 색소와 보색 메커니즘, 레벨 스케일 정밀 진단"
      },
      {
        session: "2회차",
        title: "Perfect Gray Coverage (완벽 새치 커버 & 패션 그레이)",
        detail: "어둡지 않은 밝은 새치 커버 포뮬러, 얼룩 없는 도포 테크닉"
      },
      {
        session: "3회차",
        title: "Bleach & Decolorization (손상 없는 탈색 테크닉)",
        detail: "탈색제 배합 비율, 두피 보호 도포법, 얼룩 없는 톤업 테크닉"
      },
      {
        session: "4회차",
        title: "Toning & Pastel Neutralization (보색 토닝)",
        detail: "애쉬/베이지/밀크티 톤 타겟 조색 포뮬라, 샴푸대 퀵 토닝 노하우"
      },
      {
        session: "5회차",
        title: "Balayage & Shadow Root (발레아쥬 디자인)",
        detail: "자연스러운 그라데이션 에어터치, 위빙 호일워크 및 섀도우 루트 기법"
      },
      {
        session: "6회차",
        title: "Salon Color Recipe & 고객 카운슬링",
        detail: "고단가 컬러 상담 화법, 퍼스널 컬러 매칭, 손상 최소화 후처리 클리닉 연계"
      }
    ]
  },
  {
    id: "course-sassoon27-seminar",
    title: "2027 사순 트렌드 CUT&COLOR 한국 컬렉션 세미나",
    level: "세미나",
    category: "세미나",
    duration: "1day · 오후 6:00 ~ 9:00",
    price: "15만원",
    sessionsCount: 8,
    curriculum: [
      {
        session: "1회차",
        title: "Session 1: 한국 미용의 트렌드와 브랜딩 노하우 (K-Style & Branding)",
        detail: "살롱 브랜딩의 방향성과 사순 철학의 융합 패러다임 제시"
      },
      {
        session: "2회차",
        title: "Session 2: 현장 실전 기술의 정수 (Perm & Detail Styling)",
        detail: "한국 고객들이 가장 선호하는 펌 테크닉과 디테일한 감성 스타일링 현장 시연"
      },
      {
        session: "3회차",
        title: "Session 3: 살롱 브랜딩의 해법 (Artist Value & Fandom)",
        detail: "단순 기술 시연을 넘어 디자이너로서의 팬덤을 구축하는 브랜딩 전략"
      },
      {
        session: "4회차",
        title: "Session 4: 런던 사순 마스터 팀의 글로벌 트렌드 비전 공유",
        detail: "Riess Hatcher & James Greaves의 2027 헤어 트렌드 전망 및 철학 강연"
      },
      {
        session: "5회차",
        title: "Session 5: 2027 SASSOON 컬렉션 메인 모델 라이브 컷 시연",
        detail: "사순 마스터 아티스트의 기하학적 정밀 라인 컨트롤 라이브 데모"
      },
      {
        session: "6회차",
        title: "Session 6: 2027 글로벌 컬러 트렌드 & 퓨어 테크닉",
        detail: "입체감을 극대화하는 사순 시그니처 섹셔닝 및 조색 라이브 시연"
      },
      {
        session: "7회차",
        title: "Session 7: 모델 런웨이 피날레 & 테크니컬 분석",
        detail: "완성된 전체 모델 런웨이 워킹, 구조 분석 및 스타일별 크리틱"
      },
      {
        session: "8회차",
        title: "Session 8: Q&A 인터랙티브 세션 & 네트워킹",
        detail: "런던 사순 팀과의 심층 질의응답 및 살롱 현장 적용 가이드북 공유"
      }
    ]
  },
  {
    id: "course-sassoon27-oneday",
    title: "2027 사순 트렌드 CUT&COLOR Follow along 1day course",
    level: "3단계 실전",
    category: "커트 · 세미나",
    duration: "1Day · 오전 10:00~13:00 / 오후 14:00~17:00 · 30명",
    price: "55만 원 (컬렉션 티켓 포함)",
    sessionsCount: 4,
    curriculum: [
      {
        session: "1회차",
        title: "트렌드 컬렉션 키 테크닉 브리핑 & 두상 다이어그램",
        detail: "2027 컬렉션 핵심 라인과 각도 분석, 정밀 도해도(Diagram) 해석"
      },
      {
        session: "2회차",
        title: "Step-by-Step Hands-on Cut Session (1:1 밀착 코칭)",
        detail: "사순 디렉터의 지휘 아래 1단계씩 동시 커트 실습 및 자세/텐션 교정"
      },
      {
        session: "3회차",
        title: "Creative Disconnection & 질감 테크닉",
        detail: "디스커넥션 기법을 활용한 형태 변형과 무게감 재배치 실전"
      },
      {
        session: "4회차",
        title: "살롱 커머셜 변형 노하우 & 개별 크리틱",
        detail: "한국 살롱 고객에게 즉각 적용 가능한 응용 변형 팁 전수 및 디플로마 수여"
      }
    ]
  },
  {
    id: "course-sassoon27-abc-cut",
    title: "런던사순아카데미 Live 교육코스 ABC CUT PURE COURSE",
    level: "3단계 실전",
    category: "커트 · 월요일반",
    duration: "총 8회 · 오후 6:00~10:00 · 월요일반 · 15명",
    price: "230만 원 (VAT 별도)",
    sessionsCount: 8,
    curriculum: [
      {
        session: "1회차",
        title: "Lines: One-Length Precision Line (호라이즌탈 & A/V 라인)",
        detail: "사순의 가장 순수한 원랭스 라인, 바디 포지션과 텐션의 궁극적 일치"
      },
      {
        session: "2회차",
        title: "Graduation: Triangular Graduation (클래식 밥 & 웨이트)",
        detail: "삼각형 구조의 트라이앵글 그래주에이션, 후방 무게감과 슬림한 사이드 연출"
      },
      {
        session: "3회차",
        title: "Graduation: Round Graduation (라운드 실루엣 제어)",
        detail: "두상 곡면을 따라 흐르는 부드러운 라운드 그래주에이션 완성"
      },
      {
        session: "4회차",
        title: "Graduation: Square Graduation (스퀘어 라인 박스형 제어)",
        detail: "모던하고 구조적인 형태감을 형성하는 평면적 스퀘어 그래주에이션"
      },
      {
        session: "5회차",
        title: "Layers: Round Layered (두상 밀착 라운드 레이어)",
        detail: "모든 지점에서 두상 곡률 90도를 유지하는 정교한 무게 제거 테크닉"
      },
      {
        session: "6회차",
        title: "Layers: Square Layered (남녀 공용 모던 스퀘어 레이어)",
        detail: "평면 가이드를 이용한 남성미와 현대적 텍스처를 살리는 레이어링"
      },
      {
        session: "7회차",
        title: "Combination: Pure Lines & Graduation/Layer 융합",
        detail: "사순 ABC 기본기 3대 요소를 자유자재로 혼합하는 창의적 조합"
      },
      {
        session: "8회차",
        title: "Live 종합 실기 테스트 & 런던 사순 본원 디플로마 취득",
        detail: "런던 본원 디렉터 라이브 평가, 1:1 개별 테크니컬 피드백 및 수료"
      }
    ]
  },
  {
    id: "course-sassoon27-trend",
    title: "런던사순아카데미 Live 교육코스 2027 TREND COLLECTION COURSE",
    level: "3단계 실전",
    category: "컬러",
    duration: "총 6회 · 오후 6:00~10:00 · 화요일반 · 15명",
    price: "260만 원 (VAT 별도)",
    sessionsCount: 6,
    curriculum: [
      {
        session: "1회차",
        title: "2027 Trend Collection Concept & Geometric Sectioning",
        detail: "최신 컬렉션 테마 해석, 기하학적 블록 섹셔닝과 컬러 존 배치"
      },
      {
        session: "2회차",
        title: "Trend Cut Work: Advanced Disconnection Cut",
        detail: "단차와 길이를 과감히 분리하여 극대화된 텍스처를 창출하는 디스커넥션"
      },
      {
        session: "3회차",
        title: "Trend Color Work: Multi-Dimensional Color Placement",
        detail: "모발 무브먼트에 따라 색감이 입체적으로 변하는 다차원 컬러 테크닉"
      },
      {
        session: "4회차",
        title: "Creative CUT & COLOR Harmony (컷과 컬러의 일체화)",
        detail: "커트 선과 컬러 배치가 시너지를 내는 오뜨꾸뛰르 살롱 믹스매치"
      },
      {
        session: "5회차",
        title: "Commercial Transformation (살롱 고객 맞춤 변형)",
        detail: "아방가르드 컬렉션을 일반 살롱 고객에게 자연스럽게 접목하는 상업화 팁"
      },
      {
        session: "6회차",
        title: "포트폴리오 비주얼 디렉팅 & 런던 사순 트렌드 디플로마",
        detail: "작품 스타일링 및 비주얼 촬영 연출법, 최종 크리틱 및 디플로마 수여"
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = COURSES_DATA;
}
