// 뷰클래스 사이트 런타임 설정
// 이 파일은 배포 전에 값을 채우면 모든 페이지에 적용됩니다.
// 값이 비어 있으면 폼 제출은 접수되지 않고 안내 메시지만 표시됩니다.
window.BEAUCLASS_CONFIG = {
    // Google Apps Script 웹앱 URL
    // 만들기: Google 스프레드시트 > 확장 프로그램 > Apps Script > doPost 코드 붙여넣기
    //         > 배포 > 새 배포 > 종류: 웹 앱 > 실행 대상: 나 > 접근 권한: 모든 사용자
    //         > 배포 후 "https://script.google.com/macros/s/..../exec" URL 복사
    GOOGLE_SHEET_WEBHOOK_URL: 'https://script.google.com/macros/s/AKfycbyXCJQGlPrX5AAKcAiys5S_6-m2Qg_0G1nPRRtItvDNkuZeqTJ6vp-oQ8ggU5ooP_V4Zg/exec',

    // 접수가 되었을 때 화면에 보여줄 안내 문구
    LEAD_SUCCESS_MESSAGE: '상담 신청이 접수되었어요. 학원에서 확인하고 전화드릴게요.',

    // 접수 실패(또는 설정 없음) 시 안내할 연락처
    LEAD_CONTACT_PHONE: '010-7540-1607'
};
