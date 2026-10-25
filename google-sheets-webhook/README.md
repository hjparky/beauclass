# 상담 신청 → Google 스프레드시트 수집

`남기기`(상담 신청) / `참가 신청하기` 폼이 Google 스프레드시트로 접수되는 설정 안내입니다.

## 1. Apps Script 배포

1. Google 스프레드시트 생성 → **확장 프로그램 > Apps Script**
2. `Code.gs` 내용을 붙여넣기
3. `Code.gs` 상단의 `SPREADSHEET_ID`(선택), `SHEET_NAME` 값 확인
4. 저장 후 **배포 > 새 배포 > 종류: 웹 앱**
   - 실행 대상: **나**
   - 접근 권한: **모든 사용자**
5. 배포 후 나오는 `https://script.google.com/macros/s/{ID}/exec` URL 복사
6. 최초 1회 `setupSheet()` 를 실행하면 `상담신청` 시트에 헤더(`제출 일시 | 이름 | 전화번호 | 관심 과정`)가 만들어집니다

## 2. 사이트에 URL 연결

`assets/js/site-config.js` 의 `GOOGLE_SHEET_WEBHOOK_URL` 에 붙여넣습니다.

```js
window.BEAUCLASS_CONFIG = {
    GOOGLE_SHEET_WEBHOOK_URL: 'https://script.google.com/macros/s/AKfycbXXXXXXXX/exec',
    ...
};
```

URL은 다음 순서로 해석됩니다.

| 우선순위 | 위치 | 용도 |
|---|---|---|
| 1 | `localStorage['beauclass.sheetWebhookUrl']` | 배포 없이 즉시 테스트 (콘솔에서 `localStorage.setItem('beauclass.sheetWebhookUrl', 'https://...')`) |
| 2 | `assets/js/site-config.js` → `GOOGLE_SHEET_WEBHOOK_URL` | 기본 설정 (추천) |
| 3 | `<meta name="google-sheet-webhook-url" content="...">` | 페이지별 덮어쓰기 |
| 4 | `process.env.GOOGLE_SHEET_WEBHOOK_URL` | 번들러/빌드 환경변수 주입 |

## 3. 전송되는 payload

`POST` · `mode: 'cors'` · `Content-Type: text/plain;charset=UTF-8` (프리플라이트 없음)

```json
{
  "name": "박훈진",
  "phone": "01075401607",
  "course": "4060 시니어 고객을 위한 트렌드 헤어 A to Z",
  "submittedAt": "2026-10-22 18:32:00"
}
```

- `course`: 상담 신청 폼은 `<select>` 선택값, 행사 페이지 참가 신청 폼은 선택한 프로그램 목록(여러 개면 `, ` 로 연결)
- `submittedAt`: 제출 시점 로컬 시간(`YYYY-MM-DD HH:MM:SS`)

## 4. 참고

- 시트에 폰번호가 중복으로 쌓이게 되면 `submittedAt`+`phone` 기준으로 정리하세요.
- CORS 오류가 나면 Apps Script 배포 설정의 **접근 권한이 "모든 사용자"인지** 먼저 확인하세요. 응답 본문은 `text/plain`으로 받습니다.
- 메일 알림이 필요하면 `Code.gs` 의 `notifyOwner_()` 호출(주석 처리된 부분)을 해제하세요.
