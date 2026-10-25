/**
 * Beauclass Academy - Reverse Engineered Interactive Script
 * Provides offline-capable interactions for Hero slider, Course filtering, FAQ accordion, and navigation.
 */

// [전역] 사순 세미나 카드 전용 3개 탭 전환 함수
window.switchSeminarTab = function(e, tabId) {
    if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
    }

    const targetBtn = e ? (e.currentTarget || e.target) : null;
    if (!targetBtn) return;

    const container = targetBtn.closest('.course-curriculum-accordion') || targetBtn.closest('article') || targetBtn.parentElement.parentElement;
    if (!container) return;

    // 1. 모든 탭 버튼 비활성화
    const allBtns = container.querySelectorAll('.seminar-tabs-nav .tab-btn');
    allBtns.forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = 'transparent';
        btn.style.color = '#666';
        btn.style.boxShadow = 'none';
    });

    // 2. 클릭된 버튼 활성화
    targetBtn.classList.add('active');
    targetBtn.style.background = '#ffffff';
    targetBtn.style.color = '#1E1B1C';
    targetBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.08)';

    // 3. 모든 탭 패널 숨기기
    const allPanels = container.querySelectorAll('.semi-tab-panel');
    allPanels.forEach(panel => {
        panel.style.setProperty('display', 'none', 'important');
    });

    // 4. 클릭한 탭 패널만 보이기
    const targetPanel = container.querySelector('#' + tabId);
    if (targetPanel) {
        targetPanel.style.setProperty('display', 'block', 'important');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // 1. Hero Image Slider Carousel
    const track = document.querySelector('.pc-ac-hero-track');
    const cards = document.querySelectorAll('.pc-ac-hero-card');
    const dots = document.querySelectorAll('.pc-ac-hero-dot');
    const prevBtn = document.querySelector('.pc-ac-hero-arrow[aria-label="이전 사진"]');
    const nextBtn = document.querySelector('.pc-ac-hero-arrow[aria-label="다음 사진"]');
    const counterSpan = document.querySelector('.pc-ac-hero-ctl span');

    if (cards.length > 0) {
        let currentIndex = 0;
        const total = cards.length;

        function updateSlider(index) {
            currentIndex = (index + total) % total;
            cards.forEach((c, i) => {
                if (i === currentIndex) {
                    c.classList.add('on');
                    c.style.transform = 'scale(1)';
                    c.style.opacity = '1';
                } else {
                    c.classList.remove('on');
                    c.style.transform = 'scale(0.92)';
                    c.style.opacity = '0.72';
                }
            });

            dots.forEach((d, i) => {
                if (i === currentIndex) {
                    d.classList.add('on');
                    d.setAttribute('aria-selected', 'true');
                } else {
                    d.classList.remove('on');
                    d.setAttribute('aria-selected', 'false');
                }
            });

            if (counterSpan) {
                counterSpan.textContent = String(currentIndex + 1).padStart(2, '0');
            }

            if (track) {
                const card = cards[currentIndex];
                const cardLeft = card.offsetLeft;
                const cardWidth = card.offsetWidth;
                const trackWidth = track.offsetWidth;
                track.scrollTo({
                    left: cardLeft - (trackWidth - cardWidth) / 2,
                    behavior: 'smooth'
                });
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                updateSlider(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                updateSlider(currentIndex + 1);
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => updateSlider(idx));
        });

        cards.forEach((card, idx) => {
            card.addEventListener('click', () => updateSlider(idx));
        });

        let autoSlide = setInterval(() => updateSlider(currentIndex + 1), 5000);
        if (track) {
            track.addEventListener('mouseenter', () => clearInterval(autoSlide));
            track.addEventListener('mouseleave', () => {
                autoSlide = setInterval(() => updateSlider(currentIndex + 1), 5000);
            });
        }
    }

    // 2. Course Category Filtering
    const courseSection = document.getElementById('courses');
    if (courseSection) {
        const catButtons = courseSection.querySelectorAll('[role="tablist"]:not([aria-label="사진 고르기"]) button');
        const courseCards = courseSection.querySelectorAll('.ac-cards > article');

        catButtons.forEach((btn, idx) => {
            btn.addEventListener('click', function() {
                catButtons.forEach(b => {
                    b.setAttribute('aria-selected', 'false');
                    b.style.background = 'transparent';
                    b.style.color = '#6B6567';
                    b.style.boxShadow = 'none';
                });
                btn.setAttribute('aria-selected', 'true');
                btn.style.background = '#FFFFFF';
                btn.style.color = '#1E1B1C';
                btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';

                courseCards.forEach((card, cIdx) => {
                    const title = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : '';
                    const cId = card.getAttribute('data-course-id') || '';

                    // 1. 사순 트렌드 2: 세미나 & Follow along
                    const isSassoonTrend = cId.includes('seminar') || cId.includes('oneday') || 
                        (title.includes('세미나') && !title.includes('live') && !title.includes('Live')) || 
                        title.includes('Follow along');

                    // 2. 사순 라이브 온라인 2: ABC CUT PURE & Live Trend Collection
                    const isSassoonOnline = cId.includes('abc_cut') || cId.includes('trend_course') || cId.includes('trend-course') || 
                        title.includes('live') || title.includes('Live') || title.includes('LIVE') || 
                        title.includes('ABC CUT') || title.includes('TREND COLLECTION');

                    // 3. 뷰클래스 4: 시니어, 여성 베이직, 남성 베이직, 컬러
                    const isBeauclass = !isSassoonTrend && !isSassoonOnline;

                    if (idx === 0) { 
                        // 전체 과정 8
                        card.style.display = 'block';
                    } else if (idx === 1) { 
                        // 사순 트렌드 2 (2027 사순 트렌드 세미나, Follow along)
                        card.style.display = (isSassoonTrend || cIdx === 0 || cIdx === 1) ? 'block' : 'none';
                    } else if (idx === 2) { 
                        // 사순 라이브 온라인 2 (ABC CUT PURE, Live Trend Collection)
                        card.style.display = (isSassoonOnline || cIdx === 2 || cIdx === 3) ? 'block' : 'none';
                    } else if (idx === 3) { 
                        // 뷰클래스 4 (4060 시니어, 여성 베이직, 남성 베이직, 컬러)
                        card.style.display = (isBeauclass && cIdx >= 4) ? 'block' : 'none';
                    }
                });
            });
        });

        // Level Filter buttons (경력별 필터)
        const levelButtons = courseSection.querySelectorAll('.ac-find button');
        levelButtons.forEach((btn, idx) => {
            btn.addEventListener('click', function() {
                const isPressed = btn.getAttribute('aria-pressed') === 'true';
                levelButtons.forEach(b => {
                    b.setAttribute('aria-pressed', 'false');
                    b.style.background = '#FFFFFF';
                    b.style.color = '#1E1B1C';
                });

                if (!isPressed) {
                    btn.setAttribute('aria-pressed', 'true');
                    btn.style.background = '#3E6A6E';
                    btn.style.color = '#F6F5F2';

                    courseCards.forEach((card, cIdx) => {
                        if (idx === 0) {
                            card.style.display = (cIdx === 1 || cIdx === 2 || cIdx === 3) ? 'block' : 'none';
                        } else {
                            card.style.display = (cIdx === 0 || cIdx >= 4) ? 'block' : 'none';
                        }
                    });
                } else {
                    courseCards.forEach(card => card.style.display = 'block');
                }
            });
        });
    }

    // 2-1. Course Consultation & Curriculum Accordion Interaction
    const courseCardsList = document.querySelectorAll('.ac-cards > article');
    if (courseCardsList.length > 0) {
        const fallbackCourses = (typeof COURSES_DATA !== 'undefined') ? COURSES_DATA : [];

        // 사순 트렌드 세미나 전용 행사 컨텐츠
        const EVENT_CONTENTS_LIST = [
            { title: "한국 미용의 트렌드와 브랜딩 노하우 (K-Style & Branding)", detail: "살롱 브랜딩의 방향성과 사순 철학의 융합 패러다임 제시" },
            { title: "현장 실전 기술의 정수 (Perm & Detail Styling)", detail: "한국 고객들이 가장 선호하는 펌 테크닉과 디테일한 감성 스타일링 현장 시연" },
            { title: "살롱 브랜딩의 해법 (Artist Value & Fandom)", detail: "단순 기술 시연을 넘어 디자이너로서의 팬덤을 구축하는 브랜딩 전략" },
            { title: "런던 사순 마스터 팀의 글로벌 트렌드 비전 공유", detail: "Riess Hatcher & James Greaves의 2027 헤어 트렌드 전망 및 철학 강연" },
            { title: "2027 SASSOON 컬렉션 메인 모델 라이브 컷 시연", detail: "사순 마스터 아티스트의 기하학적 정밀 라인 컨트롤 라이브 데모" },
            { title: "2027 글로벌 컬러 트렌드 & 퓨어 테크닉", detail: "입체감을 극대화하는 사순 시그니처 섹셔닝 및 조색 라이브 시연" },
            { title: "모델 런웨이 피날레 & 테크니컬 분석", detail: "완성된 전체 모델 런웨이 워킹, 구조 분석 및 스타일별 크리틱" },
            { title: "Q&A 인터랙티브 세션 & 네트워킹", detail: "런던 사순 팀과의 심층 질의응답 및 살롱 현장 적용 가이드북 공유" }
        ];

        // 사순 트렌드 세미나 전용 타임테이블
        const TIMETABLE_LIST = [
            { time: "17:30 ~ 18:00", title: "OPENING & 입장 등록", desc: "참가자 등록, 좌석 안내, 오프닝 영상 상영 및 사전 준비" },
            { time: "18:00 ~ 19:00", title: "SESSION 1: 사순 글로벌 아티스트팀 프레젠테이션", desc: "4명의 한국인 모델 라이브 커트 & 컬러 시연 (Sassoon Global Team)<br><span style='color:#3E6A6E;font-size:11.5px;'>* 사순 정통 아카데믹 기법 및 시즌 컬렉션 디테일 해설</span>" },
            { time: "19:00 ~ 19:10", title: "Intermission (쉬는 시간)", desc: "세션 전환 및 무대 정비" },
            { time: "19:10 ~ 20:40", title: "SESSION 2: 사순 글로벌 아티스트팀 프레젠테이션", desc: "4명의 한국인 모델 라이브 커트 & 컬러 시연 (Sassoon Global Team)<br><span style='color:#3E6A6E;font-size:11.5px;'>* 사순 정통 아카데믹 기법 및 시즌 컬렉션 디테일 해설</span>" },
            { time: "20:40 ~ 20:50", title: "Closing & 피날레", desc: "전체 모델 피날레 런웨이 및 단체 기념 촬영, 마무리" }
        ];

        courseCardsList.forEach((card, index) => {
            const courseTitleEl = card.querySelector('h3');
            const courseTitle = courseTitleEl ? courseTitleEl.textContent.trim() : `과정 ${index + 1}`;
            const courseId = card.getAttribute('data-course-id') || '';

            // 1. 상담 신청 버튼 설정
            const counselBtn = card.querySelector('.btn-course-counsel') || card.querySelector('a[href*="apply-"], a[href^="tel:"]');
            if (counselBtn) {
                const applyUrl = './apply.html#apply';
                counselBtn.setAttribute('href', applyUrl);
                counselBtn.setAttribute('data-course-title', courseTitle);
                counselBtn.setAttribute('title', `'${courseTitle}' 과정 상담 신청하기`);
            }

            // [정밀 분기 조건] 첫 번째 카드를 제외한 나머지는 무조건 커리큘럼 회차 모드
            const isSassoonSeminarOnly = (index === 0) || (
                (courseId === 'apply-seminar' || courseTitle.includes('한국 컬렉션 세미나')) && 
                !courseTitle.includes('Follow along') && 
                !courseTitle.includes('Live') && 
                !courseTitle.includes('live') && 
                !courseTitle.includes('ABC CUT')
            );

            const isSassoonCard = courseId.includes('sassoon') || courseTitle.includes('사순');

            if (isSassoonCard) {
                const imgEl = card.querySelector('img');
                if (imgEl && !imgEl.closest('a')) {
                    imgEl.style.cursor = 'pointer';
                    imgEl.title = '2027 사순 트렌드 과정 상세 보기';
                    imgEl.addEventListener('click', () => {
                        window.location.href = './event-sassoon-2027.html';
                    });
                }
                if (courseTitleEl && !courseTitleEl.querySelector('a')) {
                    courseTitleEl.style.cursor = 'pointer';
                    courseTitleEl.title = '2027 사순 트렌드 과정 상세 보기';
                    courseTitleEl.addEventListener('click', () => {
                        window.location.href = './event-sassoon-2027.html';
                    });
                }
            }

            // 2. 커리큘럼 / 세미나 일정 토글 버튼 설정
            const curriculumBtn = card.querySelector('.btn-curriculum-toggle') || Array.from(card.querySelectorAll('button')).find(b => b.textContent.includes('커리큘럼') || b.textContent.includes('세미나 일정'));
            
            if (curriculumBtn) {
                // [강제 텍스트 수정] HTML 기본 텍스트에 세미나 일정 + 로 고정된 카드들을 자바스크립트로 강제 초기화
                if (!isSassoonSeminarOnly) {
                    const courseInfo = fallbackCourses.find(c => c.id === courseId) || fallbackCourses[index];
                    const curLen = (courseInfo && courseInfo.curriculum) ? courseInfo.curriculum.length : 8;
                    curriculumBtn.textContent = `커리큘럼 ${curLen}회 +`;
                } else {
                    curriculumBtn.textContent = `세미나 일정 +`;
                }

                let detailContainer = card.querySelector('.course-curriculum-accordion');
                if (!detailContainer) {
                    detailContainer = document.createElement('div');
                    detailContainer.className = 'course-curriculum-accordion';
                    detailContainer.style.display = 'none';
                    detailContainer.style.marginTop = '14px';
                    detailContainer.style.paddingTop = '14px';
                    detailContainer.style.borderTop = '1px solid color-mix(in srgb, #6B6567 20%, transparent)';
                    detailContainer.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

                    let html = '';

                    // [첫 번째 사순 세미나 카드에만 3개 탭 주입]
                    if (isSassoonSeminarOnly) {
                        html = `
                        <p style="margin:0 0 12px;font-size:13.5px;color:#495057;line-height:1.6">2027년 커트&컬러 트렌드 기술과 디자인 한국모델 8명 라이브 데몬으로 한국스타일 감성으로 보여주는 무대 예요 트렌드에 대한 많은 영감을 받는 자리가 될거예요</p>
                        
                        <div class="seminar-tabs-nav" style="display: flex; gap: 8px; background: #f1f3f5; padding: 6px; border-radius: 12px; margin: 0 0 16px 0;">
                            <button type="button" class="tab-btn active" data-tab-target="tab-overview-${index}" style="flex: 1; border: none; border-radius: 8px; background: #ffffff; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.08); font-size:14px; color:#1E1B1C; padding:9px 0;">개요</button>
                            <button type="button" class="tab-btn" data-tab-target="tab-content-${index}" style="flex: 1; border: none; border-radius: 8px; background: transparent; font-weight: bold; cursor: pointer; color: #666; font-size:14px; padding:9px 0;">행사 컨텐츠</button>
                            <button type="button" class="tab-btn" data-tab-target="tab-date-${index}" style="flex: 1; border: none; border-radius: 8px; background: transparent; font-weight: bold; cursor: pointer; color: #666; font-size:14px; padding:9px 0;">2027.12.01 (화)</button>
                        </div>

                        <!-- 1. [개요] 탭 패널 -->
                        <div id="tab-overview-${index}" class="semi-tab-panel" style="display: block; font-size: 13.5px; line-height: 1.65; color: #333; background: #f8f9fa; padding: 14px 16px; border-radius: 10px;">
                            <p style="margin: 0 0 4px 0;"><b>행사명:</b> 2026 한국 사순 컬렉션 (Korea Sassoon Collection)</p>
                            <p style="margin: 0 0 4px 0;"><b>일시:</b> 2026년 12월 1일 (화) 18:00 ~ 21:00</p>
                            <p style="margin: 0 0 4px 0;"><b>슬로건/주제:</b> 뿌리 깊은 기술이 만드는 프로페셔널 (The Sassoon Way & Korean Artistry)</p>
                            <p style="margin: 0 0 12px 0;"><b>주최/주관:</b> 뷰클래스아카데미 present by LONDON SASSOON ACADEMY</p>
                            <p style="margin: 0 0 4px 0; font-weight: bold; color: #3E6A6E;">행사 목적</p>
                            <p style="margin: 0 0 3px 0;">* 사순(Sassoon)의 정교한 정통 기술 이론과 한국 트렌드의 결합 제시</p>
                            <p style="margin: 0;">* 사순 글로벌 아티스트 팀이 직접 선정한 한국인 모델 8인의 헤어 커트 & 컬러 라이브 시연</p>
                        </div>

                        <!-- 2. [행사 컨텐츠] 탭 패널 -->
                        <div id="tab-content-${index}" class="semi-tab-panel" style="display: none;">
                            <div style="margin-bottom:12px;display:flex;align-items:center;justify-content:space-between">
                                <span style="font-size:12px;font-weight:800;color:#3E6A6E;letter-spacing:0.04em">핵심 행사 컨텐츠</span>
                                <span style="font-size:11px;color:#6B6567">살롱 실전 테크닉</span>
                            </div>
                            <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px">`;
                        
                        EVENT_CONTENTS_LIST.forEach(item => {
                            html += `
                                <li style="display:flex;gap:12px;padding:12px 14px;border-radius:10px;background:#f8f9fa;border:1px solid #e9ecef;box-shadow:0 1px 2px rgba(0,0,0,0.03);align-items:flex-start">
                                    <span style="flex:none;font-size:14px;color:#3E6A6E;margin-top:1px">•</span>
                                    <div style="flex:1;min-width:0">
                                        <p style="margin:0;font-size:13.5px;font-weight:700;color:#1E1B1C;line-height:1.4">${item.title}</p>
                                        <p style="margin:4px 0 0;font-size:12.5px;color:#6B6567;line-height:1.45">${item.detail}</p>
                                    </div>
                                </li>`;
                        });
                        html += `</ul></div>

                        <!-- 3. [2027.12.01 (화)] 탭 패널 -->
                        <div id="tab-date-${index}" class="semi-tab-panel" style="display: none;">
                            <div style="margin-bottom:12px;display:flex;align-items:center;justify-content:space-between">
                                <span style="font-size:12px;font-weight:800;color:#3E6A6E;letter-spacing:0.04em">2027 SEOUL VIBE of SASSOON 타임테이블</span>
                                <span style="font-size:11px;color:#6B6567">행사 당일 일정</span>
                            </div>
                            <div style="display:flex;flex-direction:column;gap:10px;">`;
                        
                        TIMETABLE_LIST.forEach(item => {
                            html += `
                                <div style="display:flex;gap:12px;padding:12px 14px;border-radius:10px;background:#f8f9fa;border:1px solid #e9ecef;align-items:flex-start;">
                                    <div style="flex:none;width:110px;">
                                        <span style="display:inline-block;font-size:12px;font-weight:800;color:#3E6A6E;background:#ffffff;padding:3px 8px;border-radius:6px;border:1px solid color-mix(in srgb, #3E6A6E 25%, transparent);">${item.time}</span>
                                    </div>
                                    <div style="flex:1;min-width:0;">
                                        <p style="margin:0;font-size:13.5px;font-weight:700;color:#1E1B1C;line-height:1.4">${item.title}</p>
                                        <p style="margin:4px 0 0;font-size:12.5px;color:#6B6567;line-height:1.45">${item.desc}</p>
                                    </div>
                                </div>`;
                        });
                        html += `</div></div>`;
                    } else {
                        // [나머지 모든 카드들: ABC CUT PURE 포함 회차별 커리큘럼 리스트 출력]
                        const courseInfo = fallbackCourses.find(c => c.id === courseId) || fallbackCourses[index];
                        const curriculumList = (courseInfo && courseInfo.curriculum) ? courseInfo.curriculum : [];

                        html = `<div style="margin-bottom:8px;display:flex;align-items:center;justify-content:space-between">
                            <span style="font-size:12px;font-weight:800;color:#3E6A6E;letter-spacing:0.04em">전체 회차별 커리큘럼 (${curriculumList.length}회차)</span>
                            <span style="font-size:11px;color:#6B6567">살롱 실전 테크닉</span>
                        </div>`;

                        if (curriculumList.length > 0) {
                            html += `<ol style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px">`;
                            curriculumList.forEach((item) => {
                                html += `
                                    <li style="display:flex;gap:10px;padding:8px 10px;border-radius:10px;background:color-mix(in srgb, #3E6A6E 5%, transparent);border:1px solid color-mix(in srgb, #6B6567 15%, transparent);align-items:flex-start">
                                        <span style="flex:none;font-size:11.5px;font-weight:800;color:#3E6A6E;background:#FFFFFF;padding:2px 6px;border-radius:6px;border:1px solid color-mix(in srgb, #3E6A6E 25%, transparent)">${item.session}</span>
                                        <div style="flex:1;min-width:0">
                                            <p style="margin:0;font-size:13px;font-weight:700;color:#1E1B1C;line-height:1.4">${item.title}</p>
                                            <p style="margin:3px 0 0;font-size:12px;color:#6B6567;line-height:1.45">${item.detail}</p>
                                        </div>
                                    </li>
                                `;
                            });
                            html += `</ol>`;
                        } else {
                            html += `<p style="margin:0;font-size:12px;color:#6B6567">상세 커리큘럼 준비 중입니다. 전화 상담을 통해 안내받으실 수 있습니다.</p>`;
                        }
                    }

                    card.appendChild(detailContainer);
                    detailContainer.innerHTML = html;

                    // 탭 버튼에 이벤트 연결
                    if (isSassoonSeminarOnly) {
                        const tabBtns = detailContainer.querySelectorAll('.seminar-tabs-nav .tab-btn');
                        tabBtns.forEach(tBtn => {
                            tBtn.addEventListener('click', function(evt) {
                                const targetId = this.getAttribute('data-tab-target');
                                window.switchSeminarTab(evt, targetId);
                            });
                        });
                    }
                }

                // 토글 버튼 클릭 이벤트
                curriculumBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const isOpen = curriculumBtn.getAttribute('aria-expanded') === 'true';
                    const targetState = !isOpen;

                    curriculumBtn.setAttribute('aria-expanded', String(targetState));

                    if (targetState) {
                        curriculumBtn.textContent = isSassoonSeminarOnly ? `세미나 일정 닫기 ▲` : `커리큘럼 닫기 ▲`;
                        curriculumBtn.style.background = '#3E6A6E';
                        curriculumBtn.style.color = '#F6F5F2';
                        curriculumBtn.style.borderColor = '#3E6A6E';

                        detailContainer.style.display = 'block';
                        detailContainer.style.opacity = '0';
                        detailContainer.style.transform = 'translateY(-6px)';
                        requestAnimationFrame(() => {
                            detailContainer.style.opacity = '1';
                            detailContainer.style.transform = 'translateY(0)';
                        });
                    } else {
                        // 기본 상태의 버튼 텍스트 설정
                        if (isSassoonSeminarOnly) {
                            curriculumBtn.textContent = `세미나 일정 +`;
                        } else {
                            const courseInfo = fallbackCourses.find(c => c.id === courseId) || fallbackCourses[index];
                            const curLen = (courseInfo && courseInfo.curriculum) ? courseInfo.curriculum.length : 8;
                            curriculumBtn.textContent = `커리큘럼 ${curLen}회 +`;
                        }

                        curriculumBtn.style.background = 'transparent';
                        curriculumBtn.style.color = '#1E1B1C';
                        curriculumBtn.style.borderColor = 'color-mix(in srgb, #6B6567 28%, transparent)';

                        detailContainer.style.opacity = '0';
                        detailContainer.style.transform = 'translateY(-6px)';
                        setTimeout(() => {
                            detailContainer.style.display = 'none';
                        }, 250);
                    }
                });
            }
        });
    }

    // 3. FAQ Accordion smooth toggle
    const faqs = document.querySelectorAll('.ac-faq');
    faqs.forEach(faq => {
        faq.addEventListener('toggle', function() {
            if (faq.open) {
                faqs.forEach(other => {
                    if (other !== faq && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });

    // 4. Event Page Gallery Carousel (.ev-gal)
    const galSection = document.querySelector('.ev-gal');
    if (galSection) {
        const galViewport = galSection.querySelector('.ev-gal-viewport') || galSection.querySelector('div[style*="touch-action"]');
        const galTrack = galSection.querySelector('.ev-gal-track');
        const galFigs = galSection.querySelectorAll('.ev-gal-fig');
        const counter = galSection.querySelector('span[aria-live="polite"]');
        const prevBtns = galSection.querySelectorAll('button[aria-label="앞 사진"]');
        const nextBtns = galSection.querySelectorAll('button[aria-label="다음 사진"]');
        const dots = galSection.querySelectorAll('button[aria-label*="사진"]:not([aria-label="앞 사진"]):not([aria-label="다음 사진"])');

        if (galTrack && galFigs.length > 0) {
            let galIndex = 1;
            const total = galFigs.length;

            function updateGallery(index, smooth = true) {
                galIndex = (index + total) % total;

                galFigs.forEach((fig, i) => {
                    if (i === galIndex) {
                        fig.setAttribute('aria-hidden', 'false');
                        fig.style.transform = 'scale(1)';
                        fig.style.opacity = '1';
                        fig.style.zIndex = '2';
                    } else {
                        fig.setAttribute('aria-hidden', 'true');
                        fig.style.transform = 'scale(0.88)';
                        fig.style.opacity = '0.45';
                        fig.style.zIndex = '1';
                    }
                });

                if (dots.length > 0) {
                    dots.forEach((dot, i) => {
                        if (i === galIndex) {
                            dot.setAttribute('aria-current', 'true');
                            dot.style.width = '26px';
                            dot.style.background = '#FFFFFF';
                        } else {
                            dot.setAttribute('aria-current', 'false');
                            dot.style.width = '8px';
                            dot.style.background = '#6B6567';
                        }
                    });
                }

                if (counter) {
                    counter.innerHTML = `${galIndex + 1}<!-- --> / <!-- -->${total}`;
                }

                const activeFig = galFigs[galIndex];
                const vp = galViewport || galTrack.parentElement;
                if (vp && activeFig) {
                    const vpWidth = vp.offsetWidth;
                    const figOffsetLeft = activeFig.offsetLeft;
                    const figWidth = activeFig.offsetWidth;
                    const translateX = (vpWidth / 2) - (figOffsetLeft + figWidth / 2);

                    if (!smooth) {
                        galTrack.style.transition = 'none';
                    } else {
                        galTrack.style.transition = 'transform .6s cubic-bezier(.34,1.56,.64,1)';
                    }
                    galTrack.style.transform = `translateX(${translateX}px)`;
                }
            }

            prevBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    updateGallery(galIndex - 1);
                });
            });

            nextBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    updateGallery(galIndex + 1);
                });
            });

            dots.forEach((dot, idx) => {
                dot.addEventListener('click', (e) => {
                    e.preventDefault();
                    updateGallery(idx);
                });
            });

            galFigs.forEach((fig, idx) => {
                fig.addEventListener('click', () => {
                    if (galIndex !== idx) {
                        updateGallery(idx);
                    }
                });
            });

            let isDragging = false;
            let startX = 0;
            let currentX = 0;

            const handleDragStart = (e) => {
                isDragging = true;
                startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                currentX = startX;
            };

            const handleDragMove = (e) => {
                if (!isDragging) return;
                currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            };

            const handleDragEnd = () => {
                if (!isDragging) return;
                isDragging = false;
                const diff = currentX - startX;
                if (Math.abs(diff) > 40) {
                    if (diff > 0) {
                        updateGallery(galIndex - 1);
                    } else {
                        updateGallery(galIndex + 1);
                    }
                }
            };

            const vpElement = galViewport || galTrack.parentElement;
            if (vpElement) {
                vpElement.addEventListener('touchstart', handleDragStart, { passive: true });
                vpElement.addEventListener('touchmove', handleDragMove, { passive: true });
                vpElement.addEventListener('touchend', handleDragEnd);

                vpElement.addEventListener('mousedown', handleDragStart);
                window.addEventListener('mousemove', handleDragMove);
                window.addEventListener('mouseup', handleDragEnd);
            }

            window.addEventListener('resize', () => {
                updateGallery(galIndex, false);
            });

            setTimeout(() => {
                updateGallery(galIndex, false);
            }, 50);
        }
    }

    // 5. Event Page Program State Management
    const evPickNav = document.querySelector('.ev-pick');
    if (evPickNav) {
        const pickButtons = evPickNav.querySelectorAll('button');

        const EVENT_PROGRAMS = [
            {
                id: 'apply-seminar',
                tag: '1day · 8회차',
                title: '2027 사순 트렌드 컬렉션 한국 세미나',
                date: '2026년 12월 1일(화)',
                time: '오후 6:00 ~ 9:00',
                location: '추후 안내',
                price: '15만 원',
                image: './assets/images/event_1791552725914_q0ifu.jpg',
                overview: `행사명: 2026 한국 사순 컬렉션 (Korea Sassoon Collection)
일시: 2026년 12월 1일 (화) 18:00 ~ 20:30
슬로건/주제: 뿌리 깊은 기술이 만드는 프로페셔널 (The Sassoon Way & Korean Artistry)
주최/주관: 뷰클래스아카데미 present by LONDON SASSOON ACADEMY

행사 목적
- 사순(Sassoon)의 정교한 정통 기술 이론과 한국 트렌드의 결합 제시
- 국내 최고 아티스트들의 스타일링·펌·브랜딩 노하우 공유
- 사순 글로벌 아티스트 팀이 직접 선정한 한국인 모델 8인의 헤어 커트 & 컬러 라이브 시연
- 현장 디자이너들이 즉각 응용 가능한 실전 디자인 레시피 전수`,
                curriculumCount: '8회',
                curriculum: [
                    { num: 1, title: 'Session 1: 한국 미용의 트렌드와 브랜딩 노하우 (K-Style & Branding)' },
                    { num: 2, title: '현장 실전 기술의 정수: 한국 고객들이 가장 선호하는 펌(Perm) 테크닉과 디테일한 감성 스타일링 현장 시연' },
                    { num: 3, title: '살롱 브랜딩의 해법: 단순 기술 시연을 넘어 디자이너로서의 팬덤을 구축하는 브랜딩 전략' },
                    { num: 4, title: 'Session 2: 사순 글로벌팀 × 한국인 모델 8인 (Original Sassoon Technique)' },
                    { num: 5, title: '동양인 모질/두상에 최적화된 사순 기법: 두상·모질에 맞춘 베이직 및 기하학적 커트·컬러 정밀 적용' },
                    { num: 6, title: '압도적인 라이브 퀄리티: 정교한 핑거 워크, 정밀 섹셔닝, 라이트닝/컬러링 테크닉 시연' },
                    { num: 7, title: "'전통 철학'과 '현장 실전'의 유기적 결합" },
                    { num: 8, title: "세션 1의 살롱 실전성과 세션 2의 정통 아카데믹 철학이 만난 명확한 비전 제시" }
                ],
                whenSchedule: '2026년 12월 1일(화) 개강',
                whenTime: '오후 6:00 ~ 9:00',
                whenCount: '1day · 8회차'
            },
            {
                id: 'apply-oneday',
                tag: '1day · 4회차',
                title: '2027 사순 트렌드 Follow along 1day course',
                date: '2026년 12월 2일(수)',
                time: '오전 10:00~13:00 / 오후 14:00~17:00 중 택 1',
                location: '뷰클래스 아카데미 메인 실습홀 (신촌)',
                price: '55만 원 (컬렉션 티켓 포함)',
                image: './assets/images/page_oneday_a.jpg',
                overview: `행사명: 2027 사순 트렌드 Follow Along 1day Hands-on Course
일시: 2026년 12월 2일 (수) (오전반 10:00~13:00 / 오후반 14:00~17:00)
대상: 컬렉션 무대의 작품을 가발 워크로 직접 완벽하게 마스터하고 싶은 디자이너
특전: 런던 사순 아카데미 공식 수료 디플로마(Diploma) 수여 및 컬렉션 세미나 티켓 포함

과정 특징
- 컬렉션 무대에서 선보인 핵심 커트 & 컬러 테크닉을 1:1 핸즈온 코칭으로 전수
- 사순 인터내셔널 디렉터의 정밀한 가이드에 맞추어 스텝 바이 스텝 동시 커트 진행
- 형태 변형(Disconnection) 및 동양인 고객 맞춤형 살롱 커머셜 스타일 변형 팁 지도`,
                curriculumCount: '4회',
                curriculum: [
                    { num: 1, title: '트렌드 컬렉션 키 테크닉 브리핑 & 정밀 두상 도해도(Diagram) 분석' },
                    { num: 2, title: 'Step-by-Step Hands-on Cut Session (런던 사순 디렉터의 1:1 자세·텐션 밀착 교정)' },
                    { num: 3, title: 'Creative Disconnection & 질감 테크닉을 활용한 입체적 텍스처 형성' },
                    { num: 4, title: '살롱 실전 커머셜 변형 팁 전수, 개별 테크니컬 크리틱 및 사순 디플로마 수여' }
                ],
                whenSchedule: '2026년 12월 2일(수) 개강',
                whenTime: '오전 10:00~13:00 / 오후 14:00~17:00 중 하나 (정원 30명)',
                whenCount: '1day · 4회차'
            },
            {
                id: 'apply-abc-cut',
                tag: '정규 코스 · 월요일반 (총 8회)',
                title: '런던-한국 live online ABC CUT PURE 디플로마 COURSE',
                date: '2027년 1월 25일(월) 개강 (총 8회)',
                time: '매주 월요일 오후 6:00 ~ 10:00 (회당 4시간)',
                location: '뷰클래스 아카데미 라이브 스튜디오 & 런던 본원 온라인 직결',
                price: '230만 원 (VAT 별도)',
                image: './assets/images/course_1791705665636_sassoon27_abc_cut.jpg',
                overview: `과정명: 런던-한국 Live Online ABC Cut Pure Diploma Course
일정: 2027년 1월 25일(월)부터 매주 월요일 8회차 진행
대상: 사순 정통 기하학적 커트(Line, Graduation, Layer)의 기본기를 완벽히 체계화하고자 하는 헤어 디자이너
특전: 런던 사순 아카데미 본원 공식 정규 디플로마(Diploma) 발급

과정 특징
- 사순 교육의 정수인 Line, Graduation, Layer 메커니즘을 기초부터 단계별 집중 훈련
- 런던 사순 아카데미 마스터 아티스트와 실시간 양방향 라이브 코칭 & 국내 전담 수석 강사 듀얼 지도
- 손동작, 시술각, 바디 포지션을 원점부터 정밀 교정하여 어떤 헤어스타일도 설계 가능한 도해도 능력 배양`,
                curriculumCount: '8회',
                curriculum: [
                    { num: 1, title: 'Lines: One-Length Precision Line (호라이즌탈 & A/V 라인 완벽 컨트롤)' },
                    { num: 2, title: 'Graduation: Triangular Graduation (클래식 밥 & 슬림 사이드 라인)' },
                    { num: 3, title: 'Graduation: Round Graduation (두상 곡면을 따라 흐르는 부드러운 라운드 볼륨)' },
                    { num: 4, title: 'Graduation: Square Graduation (모던하고 구조적인 박스형태 제어)' },
                    { num: 5, title: 'Layers: Round Layered (두상 밀착 라운드 레이어 & 불필요한 무게 제거)' },
                    { num: 6, title: 'Layers: Square Layered (남녀 공용 모던 스퀘어 레이어 & 내추럴 텍스처)' },
                    { num: 7, title: 'Combination: Pure Lines & Graduation/Layer 융합 크리에이티브 디자인' },
                    { num: 8, title: 'Live 종합 실기 테스트 & 런던 사순 본원 디플로마 취득' }
                ],
                whenSchedule: '2027년 1월 25일(월)부터 총 8회',
                whenTime: '매주 월요일 오후 6:00 ~ 10:00 (소수 정예 15명)',
                whenCount: '정규 과정 · 8회차 디플로마 코스'
            },
            {
                id: 'apply-trend-course',
                tag: '정규 코스 · 화요일반 (총 6회)',
                title: '런던-한국 live online 2027 TREND COLLECTION 디플로마 COURSE',
                date: '2027년 1월 26일(화) 개강 (총 6회)',
                time: '매주 화요일 오후 6:00 ~ 10:00 (회당 4시간)',
                location: '뷰클래스 아카데미 라이브 스튜디오 & 런던 본원 온라인 직결',
                price: '260만 원 (VAT 별도)',
                image: './assets/images/course_1791705696962_sassoon27_trend.jpg',
                overview: `과정명: 런던-한국 Live Online 2027 Trend Collection Diploma Course
일정: 2027년 1월 26일(화)부터 매주 화요일 6회차 진행
대상: 글로벌 하이엔드 사순 트렌드 디자인을 살롱 실무와 개인 브랜딩에 접목하고 싶은 디자이너
특전: 런던 사순 아카데미 본원 트렌드 컬렉션 공식 수료 디플로마(Diploma) 발급

과정 특징
- 2027년 최신 사순 컬렉션의 아방가르드한 커트 구조와 창의적 컬러 배치를 심층 분석
- 기하학적 블록 섹셔닝과 모발의 움직임에 따라 색감이 변하는 다차원 컬러 테크닉 전수
- 최신 컬렉션 테크닉을 한국 살롱 고객의 실전 스타일로 전환하는 커머셜라이징 노하우 체득`,
                curriculumCount: '6회',
                curriculum: [
                    { num: 1, title: '2027 Trend Collection Concept & Geometric Sectioning 기하학적 블록 배치' },
                    { num: 2, title: 'Trend Cut Work: Advanced Disconnection Cut 단차 분리를 통한 텍스처 극대화' },
                    { num: 3, title: 'Trend Color Work: Multi-Dimensional Color Placement 다차원 컬러 테크닉' },
                    { num: 4, title: 'Creative Cut & Color Harmony (컷과 컬러의 일체화 오뜨꾸뛰르 살롱 매칭)' },
                    { num: 5, title: 'Commercial Transformation (컬렉션 테크닉의 살롱 고객 맞춤 상업화 팁)' },
                    { num: 6, title: '포트폴리오 비주얼 디렉팅 연출 & 런던 사순 트렌드 디플로마 수여' }
                ],
                whenSchedule: '2027년 1월 26일(화)부터 총 6회',
                whenTime: '매주 화요일 오후 6:00 ~ 10:00 (소수 정예 15명)',
                whenCount: '정규 과정 · 6회차 디플로마 코스'
            }
        ];

        function switchProgramDetail(index) {
            const prog = EVENT_PROGRAMS[index];
            if (!prog) return;

            pickButtons.forEach((b, i) => {
                const isSelected = (i === index);
                b.setAttribute('aria-pressed', String(isSelected));
                if (isSelected) {
                    b.style.border = '2px solid #3E6A6E';
                    b.style.background = 'color-mix(in srgb, #3E6A6E 12%, transparent)';
                    const topSpan = b.querySelector('span:first-child');
                    if (topSpan) {
                        topSpan.style.color = '#3E6A6E';
                        topSpan.style.fontWeight = '800';
                    }
                } else {
                    b.style.border = '1px solid color-mix(in srgb, #6B6567 28%, transparent)';
                    b.style.background = '#FFFFFF';
                    const topSpan = b.querySelector('span:first-child');
                    if (topSpan) {
                        topSpan.style.color = '#6B6567';
                        topSpan.style.fontWeight = '700';
                    }
                }
            });

            const previewSection = document.querySelector('section[aria-label="한눈에 보기"]');
            if (previewSection) {
                const badgeSpan = previewSection.querySelector('div:first-child span');
                if (badgeSpan) badgeSpan.textContent = prog.tag;

                const titleH3 = previewSection.querySelector('h3');
                if (titleH3) titleH3.textContent = prog.title;

                const dds = previewSection.querySelectorAll('dl dd');
                if (dds.length >= 4) {
                    dds[0].textContent = prog.date;
                    dds[1].textContent = prog.time;
                    dds[2].textContent = prog.location;
                    dds[3].textContent = prog.price;
                }
            }

            const evOv = document.getElementById('ev-ov');
            if (evOv) {
                const img = evOv.querySelector('img');
                if (img) {
                    img.src = prog.image;
                    img.alt = `${prog.title} 사진`;
                }
                const p = evOv.querySelector('p');
                if (p) {
                    p.textContent = prog.overview;
                }
            }

            const evCur = document.getElementById('ev-cur');
            if (evCur) {
                const countBadge = evCur.querySelector('div > span');
                if (countBadge) countBadge.textContent = prog.curriculumCount;

                const ol = evCur.querySelector('ol');
                if (ol) {
                    let itemsHtml = '';
                    prog.curriculum.forEach((item, cIdx) => {
                        const topBorder = cIdx > 0 ? 'border-top:1px solid color-mix(in srgb, #6B6567 28%, transparent);' : '';
                        itemsHtml += `<li style="display:flex;gap:12px;padding:13px 0;${topBorder}">
                            <span style="width:46px;flex:none;font-size:13.5px;font-weight:800;color:#3E6A6E">${item.num}</span>
                            <div style="min-width:0"><strong style="display:block;font-size:15px;line-height:1.45">${item.title}</strong></div>
                        </li>`;
                    });
                    ol.innerHTML = itemsHtml;
                }
            }

            const evWhen = document.getElementById('ev-when');
            if (evWhen) {
                const badge = evWhen.querySelector('div > span');
                if (badge) badge.textContent = prog.whenCount;

                const ps = evWhen.querySelectorAll('div > div > p');
                if (ps.length >= 2) {
                    ps[0].textContent = prog.whenSchedule;
                    ps[1].textContent = prog.whenTime;
                }
            }
        }

        pickButtons.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                switchProgramDetail(idx);
            });
        });
    }
});