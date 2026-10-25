/**
 * 뷰클래스 아카데미 — 상담 신청 → Google 스프레드시트 수집용 Apps Script
 *
 * 사용법
 *  1. Google 스프레드시트를 만들고 "상담신청" 시트를 준비합니다.
 *  2. 스프레드시트 > 확장 프로그램 > Apps Script > 아래 코드를 붙여넣습니다.
 *  3. 시트 이름(Sheets)과 스프레드시트 ID(Spreadsheet ID)를 아래 상수에 채웁니다.
 *  4. 저장 후 "배포 > 새 배포 > 종류: 웹 앱"을 선택합니다.
 *     - 실행 대상: 나
 *     - 접근 권한: 모든 사용자(Anyone)
 *     (배포 시 로그인 안내가 뜨면 Google 계정으로 진행)
 *  5. 배포가 끝나면 나오는 "https://script.google.com/macros/s/{ID}/exec" URL을
 *     사이트의 assets/js/site-config.js 의 GOOGLE_SHEET_WEBHOOK_URL 에 붙여넣습니다.
 *
 * 시트에 쌓이는 열: 제출 일시 | 이름 | 전화번호 | 관심 과정
 * (첫 실행 시 setupSheet() 를 한 번 실행하면 헤더와 서식이 자동으로 생깁니다)
 */

/** 스프레드시트 ID (URL의 /d/ 뒤에 있는 값). 비워두면 이 스크립트가 있는 스프레드시트를 사용합니다. */
const SPREADSHEET_ID = '';

/** 데이터를 쌓을 시트 이름 */
const SHEET_NAME = '상담신청';

/** 헤더 */
const HEADERS = ['제출 일시', '이름', '전화번호', '관심 과정'];

/**
 * GET: 상태 확인용. 최근 20건을 JSON으로 돌려줍니다.
 * 예: https://script.google.com/macros/s/{ID}/exec
 */
function doGet(e) {
  try {
    const sheet = getSheet_();
    const lastRow = sheet.getLastRow();
    const start = Math.max(2, lastRow - 19);
    const rows = lastRow >= 2 ? sheet.getRange(start, 1, lastRow - start + 1, HEADERS.length).getValues() : [];
    return json_({ ok: true, count: rows.length, rows: rows });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/**
 * POST: 사이트 폼에서 보낸 JSON을 시트 한 줄로 추가합니다.
 * 요청 Content-Type 은 text/plain 이므로 postData.contents 를 그대로 JSON.parse 합니다.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (err) {
    return json_({ ok: false, error: '잠시 후 다시 시도해 주세요.' });
  }

  try {
    const raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '';
    if (!raw) {
      return json_({ ok: false, error: '빈 요청입니다.' });
    }

    let payload;
    try {
      payload = JSON.parse(raw);
    } catch (err) {
      return json_({ ok: false, error: 'JSON 형식이 올바르지 않습니다.' });
    }

    const name = String(payload.name || '').trim();
    const phone = String(payload.phone || '').trim();
    const course = String(payload.course || '').trim();
    const submittedAt = String(payload.submittedAt || '').trim();

    if (name.length < 2) {
      return json_({ ok: false, error: '이름을 입력해주세요' });
    }
    if (!/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(phone.replace(/\s/g, ''))) {
      return json_({ ok: false, error: '올바른 전화번호를 입력해주세요' });
    }

    const sheet = getSheet_();
    sheet.appendRow([
      submittedAt || formatNow_(),
      name,
      phone,
      course
    ]);

    // 알림(이메일) — 원하면 주석을 해제하세요
    // notifyOwner_(sheet.getLastRow());

    return json_({ ok: true, message: '상담 신청이 접수되었어요.' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** 시트 준비: 없으면 만들고 헤더/서식을 정리합니다. (최초 1회 실행) */
function setupSheet() {
  const sheet = getSheet_();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#E8F0EF')
    .setVerticalAlignment('middle');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, HEADERS.length);
  return '완료: ' + sheet.getName();
}

/** 알림 메일(선택) */
function notifyOwner_(rowNumber) {
  const sheet = getSheet_();
  const row = sheet.getRange(rowNumber, 1, 1, HEADERS.length).getValues()[0];
  const subject = '[뷰클래스] 상담 신청 ' + row[1] + ' · ' + row[2];
  const body = '새 상담 신청이 들어왔습니다.\n\n' +
    '이름: ' + row[1] + '\n' +
    '전화번호: ' + row[2] + '\n' +
    '관심 과정: ' + row[3] + '\n' +
    '제출 일시: ' + row[0] + '\n\n' +
    '문의 010-7540-1607';
  MailApp.sendEmail({
    to: 'shinwoo@beauclass.com',
    subject: subject,
    body: body
  });
}

/** 대상 시트 (없으면 생성) */
function getSheet_() {
  const ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('스프레드시트를 찾지 못했습니다. SPREADSHEET_ID 를 확인해 주세요.');
  }
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** JSON 응답 (text/plain) */
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.TEXT);
}

/** 현재 시각 문자열 */
function formatNow_() {
  const d = new Date();
  const pad = function(n) { return String(n).padStart(2, '0'); };
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
    ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}
