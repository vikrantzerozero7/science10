/* ==========================================================
   booklogic.js — Book view (Topicwise = all subjects under
   current MAIN tab, Complete = all main tabs).
   Chapter filter is IGNORED in topicwise — tab changes must
   never shrink the book back to a single sub-tab.
   ========================================================== */
(function () {
    'use strict';

    const FLIP_MS = 450;

    /* ================= HELPERS ================= */

    function formatText(text) {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;').replace(/\n/g, '<br>');
    }

    function esc(s) {
        return s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;') : '';
    }

    function textOf(obj, lang) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[lang] || obj.english || '';
    }

    function stopVoiceViewer() {
        if (window.VoiceConceptViewer && window.VoiceConceptViewer.stop) window.VoiceConceptViewer.stop();
    }

    function getLang() {
        const badge = document.getElementById('language-badge');
        const txt = ((badge && badge.textContent) || '').trim().toLowerCase();
        return (txt.includes('हिं') || txt.includes('hindi')) ? 'hindi' : 'english';
    }

    function getConfigById(id) {
        if (window.__CONFIG_DISCOVERY && window.__CONFIG_DISCOVERY.findConfigById) {
            try { return window.__CONFIG_DISCOVERY.findConfigById(id); } catch (e) { /* ignore */ }
        }
        const globalKey = id.toUpperCase().replace(/-/g, '_') + '_CONFIG';
        return (window[globalKey] && window[globalKey].chapters) ? window[globalKey] : null;
    }

    function isTextEntryFocused() {
        const ae = document.activeElement;
        if (!ae) return false;
        if (ae.tagName === 'TEXTAREA') return true;
        if (ae.tagName === 'INPUT') {
            const t = (ae.type || 'text').toLowerCase();
            return ['text', 'search', 'email', 'url', 'tel', 'password', 'number',
                    'date', 'datetime-local', 'month', 'time', 'week', 'range'].includes(t);
        }
        return ae.isContentEditable === true;
    }

    /* ================= SUBJECT RESOLUTION ================= */

    // Resolve all subjects under a given main tab.
    // Handles leaf main tabs (own config) and child sub-tabs under
    // any of the common property names.
    function getSubjectsForMainTab(mainTab) {
        if (!mainTab || !mainTab.id) return [];

        const out = [];
        const seen = new Set();

        const push = (id, name) => {
            if (!id || seen.has(id)) return;
            const cfg = getConfigById(id);
            if (!cfg || !cfg.chapters) return;
            seen.add(id);
            out.push({ id, name: name || { english: id, hindi: id }, config: cfg });
        };

        // 1. Main tab itself may be a leaf subject
        push(mainTab.id, mainTab.name || mainTab.title);

        // 2. Children under whichever property the app uses
        const children =
            mainTab.subTabs || mainTab.subtabs ||
            mainTab.children ||
            mainTab.subjects ||
            mainTab.tabs ||
            mainTab.items ||
            [];

        children.forEach(sub => {
            if (!sub) return;
            const subId = sub.id || sub.key;
            const subName = sub.name || sub.title || sub.label;
            push(subId, subName);
        });

        return out;
    }

    /* ================= PAGE COLLECTION ================= */

    function collectTopicwisePages() {
        const mainTabs = (window.SUBJECT_TABS && window.SUBJECT_TABS.MAIN_TABS) || [];
        const mainIdx = window.__currentMainIndex || 0;
        const mainTab = mainTabs[mainIdx];

        if (!mainTab) return { pages: [], configs: [] };

        // All subjects (sub-tabs) belonging to the current main tab
        const subjectEntries = getSubjectsForMainTab(mainTab);
        if (!subjectEntries.length) return { pages: [], configs: [] };

        // ❗ No chapter filter here — topicwise always shows the whole main tab.
        // Sub-tab / chapter changes must not collapse the book.
        const configs = subjectEntries.map(e => ({
            id: e.id,
            name: e.name,
            config: e.config
        }));

        const pages = [];
        subjectEntries.forEach(({ id, config }) => {
            (config.chapters || []).forEach(ch => {
                (ch.topics || []).forEach(tp => {
                    (tp.concepts || []).forEach(cn => {
                        pages.push({
                            subjectId: id,
                            chapterId: ch.id,
                            topicId: tp.id,
                            conceptId: cn.id,
                            chapterTitle: ch.display_name || ch.name || ch.title || { english: 'Chapter' },
                            chapterColor: ch.color || '#b8a690',
                            topicTitle: tp.display_name || tp.name || tp.title || { english: '' },
                            conceptTitle: cn.display_name || cn.name || cn.title || { english: '' },
                            conceptDesc: cn.description || cn.desc || cn.content || { english: '' }
                        });
                    });
                });
            });
        });

        return { pages, configs };
    }

    function collectCompletePages() {
        const mainTabs = (window.SUBJECT_TABS && window.SUBJECT_TABS.MAIN_TABS) || [];
        const seen = new Set();
        const configs = [];

        // Complete = every subject across every main tab
        mainTabs.forEach(mainTab => {
            const subjects = getSubjectsForMainTab(mainTab);
            subjects.forEach(sub => {
                if (seen.has(sub.id)) return;
                seen.add(sub.id);
                configs.push({
                    id: sub.id,
                    name: sub.name,
                    mainTabName: mainTab.name,
                    config: sub.config
                });
            });
        });

        const pages = [];
        configs.forEach(({ id, name, config }) => {
            (config.chapters || []).forEach(ch => {
                (ch.topics || []).forEach(tp => {
                    (tp.concepts || []).forEach(cn => {
                        pages.push({
                            subjectId: id,
                            chapterId: ch.id,
                            topicId: tp.id,
                            conceptId: cn.id,
                            chapterTitle: ch.display_name || ch.name || ch.title || config.title || name,
                            chapterColor: ch.color || '#b8a690',
                            topicTitle: tp.display_name || tp.name || tp.title || { english: '' },
                            conceptTitle: cn.display_name || cn.name || cn.title || { english: '' },
                            conceptDesc: cn.description || cn.desc || cn.content || { english: '' }
                        });
                    });
                });
            });
        });

        return { pages, configs };
    }

    /* ================= BOOK ENGINE ================= */

    function createBookEngine(opts) {
        const { id, els, collectFn, getSyllabusTitle, buildSyllabusHTML } = opts;

        let PAGES = [];
        let CONFIGS = [];
        let TOTAL_SPREADS = 0;
        let isAnimating = false;
        let pendingJump = -1;
        let leftLang = 'english';
        let rightLang = 'english';
        let currentSpread = 0;
        let searchQuery = '';
        let searchMatches = [];
        let searchCurrent = -1;

        function spreadIndices(spread) {
            if (spread === 0) return { left: -1, right: 0 };
            return {
                left: 2 * spread - 1 < PAGES.length ? 2 * spread - 1 : -1,
                right: 2 * spread < PAGES.length ? 2 * spread : -1
            };
        }

        function buildPageHTML(index, lang, pageNum) {
            if (index < 0 || index >= PAGES.length) return `<div class="book-empty-message">—</div>`;
            const p = PAGES[index];
            return `
                <div class="book-lang-toggle">
                    <button class="book-lang-btn ${lang === 'english' ? 'active' : ''}" data-lang="english">EN</button>
                    <button class="book-lang-btn ${lang === 'hindi' ? 'active' : ''}" data-lang="hindi">हिं</button>
                </div>
                <div class="book-chapter-tag" style="border-left:3px solid ${p.chapterColor || '#b8a690'};">
                    ${formatText(textOf(p.chapterTitle, lang))}
                </div>
                <div class="book-topic-title">${formatText(textOf(p.topicTitle, lang))}</div>
                <div class="book-concept-title">${formatText(textOf(p.conceptTitle, lang))}</div>
                <div class="book-concept-body">${formatText(textOf(p.conceptDesc, lang) || 'No content.')}</div>
                <div class="book-page-number">page ${pageNum}</div>
            `;
        }

        function renderInto(container, index, lang, pageNum) {
            if (index === -1) {
                container.innerHTML = buildSyllabusHTML(PAGES, CONFIGS, getSyllabusTitle());
                bindSyllabusClicks(container);
                return;
            }
            container.innerHTML = buildPageHTML(index, lang, pageNum);
            container.querySelectorAll('.book-lang-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    stopVoiceViewer();
                    if (container === els.leftPage) leftLang = btn.dataset.lang;
                    else rightLang = btn.dataset.lang;
                    refreshAll();
                });
            });
        }

        function bindSyllabusClicks(container) {
            container.querySelectorAll('[data-page-index]').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idx = parseInt(el.getAttribute('data-page-index'), 10);
                    if (!isNaN(idx)) jumpToPage(idx);
                });
            });
        }

        function refreshAll() {
            if (!PAGES.length) {
                els.leftPage.innerHTML = `<div class="book-empty-message">No pages available</div>`;
                els.rightPage.innerHTML = `<div class="book-empty-message">No pages available</div>`;
                els.progressFill.style.width = '0%';
                els.progressCounter.textContent = '0 / 0';
                els.progressLabel.textContent = '— no content —';
                els.leftBtn.disabled = true;
                els.rightBtn.disabled = true;
                return;
            }

            const sp = spreadIndices(currentSpread);

            if (sp.left === -1) renderInto(els.leftPage, -1, leftLang, 0);
            else renderInto(els.leftPage, sp.left, leftLang, sp.left + 1);

            if (sp.right === -1) els.rightPage.innerHTML = `<div class="book-empty-message">— end of book —</div>`;
            else renderInto(els.rightPage, sp.right, rightLang, sp.right + 1);

            updateProgress();
            updateButtons();
            dispatchPageChange(sp);
            reapplyHighlights();

            if (window.VoiceConceptViewer && window.VoiceConceptViewer.refreshButtons) {
                setTimeout(window.VoiceConceptViewer.refreshButtons, 50);
            }
        }

        function updateProgress() {
            const sp = spreadIndices(currentSpread);
            let shown = sp.right >= 0 ? sp.right + 1 : (sp.left >= 0 ? sp.left + 1 : PAGES.length);
            const percent = PAGES.length > 0 ? (shown / PAGES.length) * 100 : 0;
            els.progressFill.style.width = percent + '%';
            els.progressCounter.textContent = `${shown} / ${PAGES.length}`;

            const p = sp.right >= 0 ? PAGES[sp.right] : (sp.left >= 0 ? PAGES[sp.left] : null);
            if (p) {
                const lang = sp.right >= 0 ? rightLang : leftLang;
                els.progressLabel.textContent = `${textOf(p.topicTitle, lang)} › ${textOf(p.conceptTitle, lang)}`;
            } else {
                els.progressLabel.textContent = '— Syllabus —';
            }
        }

        function updateButtons() {
            els.leftBtn.disabled = currentSpread <= 0;
            els.rightBtn.disabled = currentSpread >= TOTAL_SPREADS - 1;
        }

        function dispatchPageChange(sp) {
            const idx = sp.right >= 0 ? sp.right : sp.left;
            if (idx < 0 || !PAGES[idx]) return;
            const p = PAGES[idx];
            document.dispatchEvent(new CustomEvent('book:pagechange', {
                detail: {
                    bookId: id, pageIndex: idx, spread: currentSpread,
                    totalSpreads: TOTAL_SPREADS,
                    chapterId: p.chapterId,
                    topicId: p.topicId || null,
                    subjectId: p.subjectId || null
                }
            }));
        }

        function performFlip(direction) {
            if (isAnimating) return;
            if (direction === 'forward' && currentSpread >= TOTAL_SPREADS - 1) return;
            if (direction === 'backward' && currentSpread <= 0) return;

            stopVoiceViewer();
            isAnimating = true;

            const nextSpread = direction === 'forward' ? currentSpread + 1 : currentSpread - 1;
            const cur = spreadIndices(currentSpread);
            const nxt = spreadIndices(nextSpread);

            let frontHtml = '', backHtml = '';

            if (direction === 'forward') {
                frontHtml = cur.right >= 0 ? buildPageHTML(cur.right, rightLang, cur.right + 1) : `<div class="book-empty-message">—</div>`;
                backHtml = nxt.left === -1 ? buildSyllabusHTML(PAGES, CONFIGS, getSyllabusTitle()) : buildPageHTML(nxt.left, leftLang, nxt.left + 1);
            } else {
                frontHtml = cur.left === -1 ? buildSyllabusHTML(PAGES, CONFIGS, getSyllabusTitle()) : buildPageHTML(cur.left, leftLang, cur.left + 1);
                backHtml = nxt.right >= 0 ? buildPageHTML(nxt.right, rightLang, nxt.right + 1) : `<div class="book-empty-message">—</div>`;
            }

            els.faceFront.innerHTML = frontHtml;
            els.faceBack.innerHTML = backHtml;

            els.flipPage.classList.add('active');
            els.flipPage.classList.remove('anim-forward', 'anim-backward');
            els.flipShadow.classList.add('active');
            els.flipShadow.classList.remove('anim-forward', 'anim-backward');
            void els.flipPage.offsetWidth;

            const animClass = direction === 'forward' ? 'anim-forward' : 'anim-backward';
            els.flipPage.classList.add(animClass);
            els.flipShadow.classList.add(animClass);

            setTimeout(() => {
                currentSpread = nextSpread;
                refreshAll();
                els.flipPage.classList.remove('active', 'anim-forward', 'anim-backward');
                els.flipShadow.classList.remove('active', 'anim-forward', 'anim-backward');
                els.flipPage.style.transform = 'rotateY(0deg)';
                els.flipShadow.style.transform = 'rotateY(0deg)';
                isAnimating = false;
                drainPending();
            }, FLIP_MS);
        }

        function jumpToPage(pageIdx) {
            if (pageIdx < 0 || pageIdx >= PAGES.length) return;
            if (isAnimating) { pendingJump = pageIdx; return; }
            const targetSpread = Math.ceil(pageIdx / 2);
            if (targetSpread === currentSpread) {
                dispatchPageChange(spreadIndices(currentSpread));
                return;
            }
            currentSpread = targetSpread;
            refreshAll();
        }

        function drainPending() {
            if (pendingJump >= 0) {
                const p = pendingJump;
                pendingJump = -1;
                jumpToPage(p);
            }
        }

        /* ---- Search ---- */
        function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

        function pageText(p, lang) {
            return [textOf(p.chapterTitle, lang), textOf(p.topicTitle, lang),
                    textOf(p.conceptTitle, lang), textOf(p.conceptDesc, lang)].join('\n');
        }

        function findMatches(q) {
            const lang = rightLang;
            const needle = q.toLowerCase();
            const out = [];
            for (let i = 0; i < PAGES.length; i++) {
                if (pageText(PAGES[i], lang).toLowerCase().includes(needle)) out.push(i);
            }
            return out;
        }

        function highlightIn(container, q) {
            if (!container || !q) return;
            const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
                acceptNode(node) {
                    if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                    const p = node.parentElement;
                    if (!p) return NodeFilter.FILTER_REJECT;
                    const tag = p.tagName;
                    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'MARK') return NodeFilter.FILTER_REJECT;
                    if (p.classList && (p.classList.contains('book-lang-toggle') || p.classList.contains('book-page-number'))) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                }
            });
            const targets = [];
            let n;
            while ((n = walker.nextNode())) targets.push(n);

            const re = new RegExp(escRe(q), 'gi');
            targets.forEach(textNode => {
                const text = textNode.nodeValue;
                if (!re.test(text)) { re.lastIndex = 0; return; }
                re.lastIndex = 0;
                const frag = document.createDocumentFragment();
                let last = 0, m;
                while ((m = re.exec(text)) !== null) {
                    if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
                    const mark = document.createElement('mark');
                    mark.className = 'search-hit';
                    mark.textContent = m[0];
                    frag.appendChild(mark);
                    last = m.index + m[0].length;
                }
                if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
                textNode.parentNode.replaceChild(frag, textNode);
            });
        }

        function clearHighlights() {
            document.querySelectorAll('mark.search-hit').forEach(m => {
                const p = m.parentNode;
                p.replaceChild(document.createTextNode(m.textContent), m);
                p.normalize();
            });
        }

        function markCurrentDOM() {
            document.querySelectorAll('mark.search-hit.current').forEach(m => m.classList.remove('current'));
            if (searchCurrent < 0 || !searchMatches.length) return;
            let count = 0;
            [els.leftPage, els.rightPage].forEach(c => {
                c.querySelectorAll('mark.search-hit').forEach(m => {
                    if (count === searchCurrent) m.classList.add('current');
                    count++;
                });
            });
            const cur = document.querySelector('mark.search-hit.current');
            if (cur) cur.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }

        function reapplyHighlights() {
            if (!searchQuery) return;
            highlightIn(els.leftPage, searchQuery);
            highlightIn(els.rightPage, searchQuery);
            markCurrentDOM();
        }

        function performSearch() {
            const q = (els.searchInput.value || '').trim();
            searchQuery = q;
            clearHighlights();

            if (!q) {
                searchMatches = [];
                searchCurrent = -1;
                els.searchNav.classList.remove('visible');
                els.searchStatus.classList.remove('visible');
                return;
            }

            searchMatches = findMatches(q);
            els.searchStatus.classList.add('visible');
            els.searchNav.classList.add('visible');

            if (!searchMatches.length) {
                searchCurrent = -1;
                els.searchStatus.textContent = `No matches for "${q}"`;
                els.searchLeft.disabled = true;
                els.searchRight.disabled = true;
                return;
            }

            searchCurrent = 0;
            updateSearchStatus();
            jumpToSearchMatch(0);
        }

        function updateSearchStatus() {
            if (!searchMatches.length) {
                els.searchLeft.disabled = true;
                els.searchRight.disabled = true;
                return;
            }
            els.searchStatus.textContent = `${searchCurrent + 1} / ${searchMatches.length} matches`;
            els.searchLeft.disabled = false;
            els.searchRight.disabled = false;
        }

        function jumpToSearchMatch(i) {
            if (i < 0 || i >= searchMatches.length) return;
            jumpToPage(searchMatches[i]);
            setTimeout(() => { reapplyHighlights(); updateSearchStatus(); }, 30);
        }

        function clearSearch() {
            searchQuery = '';
            searchMatches = [];
            searchCurrent = -1;
            els.searchInput.value = '';
            clearHighlights();
            els.searchNav.classList.remove('visible');
            els.searchStatus.classList.remove('visible');
        }

        /* ---- Syllabus dropdown ---- */
        let syllabusOpen = false;

        function buildSyllabusDropdown() {
            const lang = getLang();
            let html = '';
            let pageIdx = 0;

            if (!CONFIGS.length) {
                els.syllabusList.innerHTML = `<div class="book-empty-message">No content</div>`;
                return;
            }

            CONFIGS.forEach(({ name, config }) => {
                const subName = textOf(name, lang);
                const subFirst = pageIdx;
                let count = 0;
                (config.chapters || []).forEach(ch =>
                    (ch.topics || []).forEach(tp => (count += (tp.concepts || []).length))
                );

                html += `<div class="book-syllabus-group">`;
                html += `<div class="book-syllabus-group-title" data-page-index="${subFirst}"><span>${esc(subName)}</span><span class="count">${count}</span></div>`;

                (config.chapters || []).forEach(ch => {
                    (ch.topics || []).forEach(tp => {
                        const concepts = tp.concepts || [];
                        if (!concepts.length) return;
                        const topicName = textOf(tp.display_name || tp.name || tp.title, lang);
                        const topicFirst = pageIdx;
                        html += `<div class="book-syllabus-topic" data-page-index="${topicFirst}"><span>${esc(topicName)}</span></div>`;
                        concepts.forEach(cn => {
                            const cname = textOf(cn.display_name || cn.name || cn.title, lang);
                            html += `<div class="book-syllabus-concept" data-page-index="${pageIdx}">${esc(cname)}</div>`;
                            pageIdx++;
                        });
                    });
                });
                html += `</div>`;
            });

            els.syllabusList.innerHTML = html;
            els.syllabusList.querySelectorAll('[data-page-index]').forEach(el => {
                el.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const idx = parseInt(this.getAttribute('data-page-index'), 10);
                    if (!isNaN(idx)) { jumpToPage(idx); closeSyllabus(); }
                });
            });
        }

        function openSyllabus() {
            syllabusOpen = true;
            buildSyllabusDropdown();
            els.syllabusPanel.classList.add('open');
            els.syllabusBtn.classList.add('open');
        }

        function closeSyllabus() {
            syllabusOpen = false;
            els.syllabusPanel.classList.remove('open');
            els.syllabusBtn.classList.remove('open');
        }

        function toggleSyllabus() { syllabusOpen ? closeSyllabus() : openSyllabus(); }

        /* ---- Reload ---- */
        function reload() {
            const result = collectFn();
            PAGES = result.pages;
            CONFIGS = result.configs;
            TOTAL_SPREADS = PAGES.length === 0 ? 0 : 1 + Math.ceil((PAGES.length - 1) / 2);
            currentSpread = 0;
            pendingJump = -1;
            leftLang = 'english';
            rightLang = 'english';
            isAnimating = false;
            clearSearch();
            closeSyllabus();
            refreshAll();
        }

        /* ---- Event bindings ---- */
        els.leftBtn.addEventListener('click', () => performFlip('backward'));
        els.rightBtn.addEventListener('click', () => performFlip('forward'));

        document.addEventListener('keydown', (e) => {
            const viewEl = els.viewRoot;
            if (!viewEl || !viewEl.classList.contains('active')) return;
            if (isTextEntryFocused()) return;
            if (e.key === 'ArrowRight') { e.preventDefault(); performFlip('forward'); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); performFlip('backward'); }
        });

        els.syllabusBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleSyllabus(); });

        document.addEventListener('click', (e) => {
            if (!syllabusOpen) return;
            const bar = els.syllabusBtn.closest('.book-syllabus-bar');
            if (els.syllabusPanel.contains(e.target)) return;
            if (bar && bar.contains(e.target)) return;
            closeSyllabus();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && syllabusOpen) closeSyllabus();
        });

        document.addEventListener('languagechange', () => {
            if (syllabusOpen) buildSyllabusDropdown();
            if (searchQuery) setTimeout(performSearch, 60);
        });

        els.searchBtn.addEventListener('click', (e) => { e.stopPropagation(); performSearch(); });
        els.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); performSearch(); }
        });
        els.searchInput.addEventListener('input', function () {
            if (!this.value.trim() && searchQuery) clearSearch();
        });
        els.searchLeft.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!searchMatches.length) return;
            searchCurrent = (searchCurrent - 1 + searchMatches.length) % searchMatches.length;
            jumpToSearchMatch(searchCurrent);
        });
        els.searchRight.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!searchMatches.length) return;
            searchCurrent = (searchCurrent + 1) % searchMatches.length;
            jumpToSearchMatch(searchCurrent);
        });

        document.addEventListener('keydown', (e) => {
            const viewEl = els.viewRoot;
            if (!viewEl || !viewEl.classList.contains('active')) return;
            if (!searchMatches.length) return;
            if (e.key === 'F3') {
                e.preventDefault();
                if (e.shiftKey) searchCurrent = (searchCurrent - 1 + searchMatches.length) % searchMatches.length;
                else searchCurrent = (searchCurrent + 1) % searchMatches.length;
                jumpToSearchMatch(searchCurrent);
            }
        });

        return {
            reload,
            refresh: refreshAll,
            jumpToPage,
            getPages: () => PAGES,
            getCurrentSpread: () => currentSpread,
            getTotalSpreads: () => TOTAL_SPREADS,
            isAnimating: () => isAnimating,
            setLanguage: (lang) => { rightLang = lang; refreshAll(); }
        };
    }

    /* ================= VIEW MODE SWITCHER ================= */
    function initViewModeSwitcher() {
        const container = document.getElementById('container');
        const bookView = document.getElementById('bookView');
        const completeView = document.getElementById('completeBookView');
        const heatmapView = document.getElementById('heatmapView');

        function switchView(mode) {
            stopVoiceViewer();
            if (container) container.classList.add('hidden');
            [bookView, completeView, heatmapView].forEach(v => v && v.classList.remove('active'));

            if (mode === 'book' && bookView) {
                bookView.classList.add('active');
                document.body.setAttribute('data-view', 'book');
                if (window.BookView && window.BookView.reload) setTimeout(() => window.BookView.reload(), 30);
            } else if (mode === 'complete' && completeView) {
                completeView.classList.add('active');
                document.body.setAttribute('data-view', 'complete');
                if (window.CompleteBookView && window.CompleteBookView.reload) setTimeout(() => window.CompleteBookView.reload(), 30);
            } else if (mode === 'heatmap' && heatmapView) {
                heatmapView.classList.add('active');
                document.body.setAttribute('data-view', 'heatmap');
                if (window.HeatmapView && window.HeatmapView.refresh) window.HeatmapView.refresh();
            } else {
                if (container) {
                    container.classList.remove('hidden');
                    document.body.setAttribute('data-view', 'mindmap');
                }
            }
        }

        document.querySelectorAll('input[name="viewMode"]').forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.checked) switchView(this.value);
                document.querySelectorAll('.view-mode-radio-group .radio-label').forEach(l => {
                    const r = l.querySelector('input');
                    l.classList.toggle('checked', r && r.checked);
                });
            });
            const label = radio.closest('.radio-label');
            if (label) label.classList.toggle('checked', radio.checked);
        });

        const checked = document.querySelector('input[name="viewMode"]:checked');
        setTimeout(() => switchView(checked ? checked.value : 'mindmap'), 100);
        window.switchView = switchView;
    }

    /* ================= TOPICWISE BOOK ================= */
    function initTopicwiseBook() {
        const els = {
            viewRoot: document.getElementById('bookView'),
            leftPage: document.getElementById('bookLeftPage'),
            rightPage: document.getElementById('bookRightPage'),
            flipPage: document.getElementById('flipPage'),
            faceFront: document.getElementById('faceFront'),
            faceBack: document.getElementById('faceBack'),
            flipShadow: document.getElementById('flipShadow'),
            leftBtn: document.getElementById('bookLeftBtn'),
            rightBtn: document.getElementById('bookRightBtn'),
            progressFill: document.getElementById('bookProgressFill'),
            progressLabel: document.getElementById('bookProgressLabel'),
            progressCounter: document.getElementById('bookProgressCounter'),
            syllabusBtn: document.getElementById('bookSyllabusBtn'),
            syllabusPanel: document.getElementById('bookSyllabusPanel'),
            syllabusList: document.getElementById('bookSyllabusList'),
            searchInput: document.getElementById('bookSearchInput'),
            searchBtn: document.getElementById('bookSearchBtn'),
            searchNav: document.getElementById('bookSearchNav'),
            searchLeft: document.getElementById('bookSearchLeftBtn'),
            searchRight: document.getElementById('bookSearchRightBtn'),
            searchStatus: document.getElementById('bookSearchStatus')
        };

        if (!els.leftPage || !els.rightPage) return;

        // Syllabus title reflects the CURRENT MAIN TAB (not sub-tab)
        const getSubjectTitle = () => {
            const mainTabs = (window.SUBJECT_TABS && window.SUBJECT_TABS.MAIN_TABS) || [];
            const mainTab = mainTabs[window.__currentMainIndex || 0];
            return (mainTab && (mainTab.name || mainTab.title)) || { english: 'Subject', hindi: 'विषय' };
        };

        const engine = createBookEngine({
            id: 'topicwise',
            els,
            collectFn: collectTopicwisePages,
            getSyllabusTitle: getSubjectTitle,
            buildSyllabusHTML: function (pages, configs, title) {
                const lang = getLang();
                const mainName = textOf(title, lang) || 'Subject';
                let html = `
                    <div class="syllabus-page">
                        <div class="syllabus-header">
                            <div class="syllabus-title">${formatText(mainName)}</div>
                            <div class="syllabus-subtitle">Topicwise · ${pages.length} pages · ${configs.length} subject${configs.length === 1 ? '' : 's'}</div>
                        </div>
                        <div class="syllabus-scroll">
                `;

                if (!configs.length) {
                    html += `<div class="book-empty-message">No content</div>`;
                } else {
                    let pageIdx = 0;
                    configs.forEach(({ name, config }) => {
                        const subName = textOf(name, lang);
                        const subFirst = pageIdx;
                        let count = 0;
                        (config.chapters || []).forEach(ch =>
                            (ch.topics || []).forEach(tp => (count += (tp.concepts || []).length))
                        );

                        html += `<div class="syllabus-subtopic-block">`;
                        html += `<div class="syllabus-subtopic-name" data-page-index="${subFirst}"><span>${formatText(subName)}</span><span class="syllabus-count">${count}</span></div>`;

                        (config.chapters || []).forEach(ch => {
                            (ch.topics || []).forEach(tp => {
                                const concepts = tp.concepts || [];
                                if (!concepts.length) return;
                                const topicName = textOf(tp.display_name || tp.name || tp.title, lang);
                                const topicFirst = pageIdx;
                                html += `<div class="syllabus-topic-block">`;
                                html += `<div class="syllabus-topic-name" data-page-index="${topicFirst}">${formatText(topicName)}</div>`;
                                html += `<div class="syllabus-concepts">`;
                                concepts.forEach(cn => {
                                    const cnName = textOf(cn.display_name || cn.name || cn.title, lang);
                                    html += `<div class="syllabus-concept" data-page-index="${pageIdx}">${formatText(cnName)}</div>`;
                                    pageIdx++;
                                });
                                html += `</div></div>`;
                            });
                        });
                        html += `</div>`;
                    });
                }
                html += `</div></div>`;
                return html;
            }
        });

        window.BookView = engine;

        // Reload when tabs ready (fixes empty-on-boot when configs load slowly)
        document.addEventListener('subjectTabsReady', () => {
            console.log('📖 booklogic: subjectTabsReady → reloading topicwise');
            setTimeout(() => engine.reload(), 100);
        });

        // Reload when the current sub-tab changes
        document.addEventListener('subjectChanged', () => {
            setTimeout(() => engine.reload(), 30);
        });

        // Reload when the current MAIN tab changes
        document.addEventListener('mainTabChanged', () => {
            setTimeout(() => engine.reload(), 30);
        });
        document.addEventListener('mainTabChange', () => {
            setTimeout(() => engine.reload(), 30);
        });

        // Safety boot reloads in case events don't fire
        setTimeout(() => engine.reload(), 500);
        setTimeout(() => engine.reload(), 1200);
    }

    /* ================= COMPLETE BOOK ================= */
    function initCompleteBook() {
        const els = {
            viewRoot: document.getElementById('completeBookView'),
            leftPage: document.getElementById('cbLeftPage'),
            rightPage: document.getElementById('cbRightPage'),
            flipPage: document.getElementById('cbFlipPage'),
            faceFront: document.getElementById('cbFaceFront'),
            faceBack: document.getElementById('cbFaceBack'),
            flipShadow: document.getElementById('cbFlipShadow'),
            leftBtn: document.getElementById('cbLeftBtn'),
            rightBtn: document.getElementById('cbRightBtn'),
            progressFill: document.getElementById('cbProgressFill'),
            progressLabel: document.getElementById('cbProgressLabel'),
            progressCounter: document.getElementById('cbProgressCounter'),
            syllabusBtn: document.getElementById('cbSyllabusBtn'),
            syllabusPanel: document.getElementById('cbSyllabusPanel'),
            syllabusList: document.getElementById('cbSyllabusList'),
            searchInput: document.getElementById('cbSearchInput'),
            searchBtn: document.getElementById('cbSearchBtn'),
            searchNav: document.getElementById('cbSearchNav'),
            searchLeft: document.getElementById('cbSearchLeftBtn'),
            searchRight: document.getElementById('cbSearchRightBtn'),
            searchStatus: document.getElementById('cbSearchStatus')
        };

        if (!els.leftPage || !els.rightPage) return;

        const engine = createBookEngine({
            id: 'complete',
            els,
            collectFn: collectCompletePages,
            getSyllabusTitle: () => ({ english: 'Complete Book', hindi: 'संपूर्ण पुस्तक' }),
            buildSyllabusHTML: function (pages, configs, title) {
                const lang = getLang();
                let html = `
                    <div class="syllabus-page">
                        <div class="syllabus-header">
                            <div class="syllabus-title">Complete Book</div>
                            <div class="syllabus-subtitle">${pages.length} pages · ${configs.length} subject${configs.length === 1 ? '' : 's'}</div>
                        </div>
                        <div class="syllabus-scroll">
                `;

                if (!configs.length) {
                    html += `<div class="book-empty-message">No content</div>`;
                } else {
                    let pageIdx = 0;
                    configs.forEach(({ name, config }) => {
                        const subName = textOf(name, lang);
                        const subFirst = pageIdx;
                        let count = 0;
                        (config.chapters || []).forEach(ch =>
                            (ch.topics || []).forEach(tp => (count += (tp.concepts || []).length))
                        );

                        html += `<div class="syllabus-subtopic-block">`;
                        html += `<div class="syllabus-subtopic-name" data-page-index="${subFirst}"><span>${formatText(subName)}</span><span class="syllabus-count">${count}</span></div>`;

                        (config.chapters || []).forEach(ch => {
                            (ch.topics || []).forEach(tp => {
                                const concepts = tp.concepts || [];
                                if (!concepts.length) return;
                                const topicName = textOf(tp.display_name || tp.name || tp.title, lang);
                                const topicFirst = pageIdx;
                                html += `<div class="syllabus-topic-block">`;
                                html += `<div class="syllabus-topic-name" data-page-index="${topicFirst}">${formatText(topicName)}</div>`;
                                html += `<div class="syllabus-concepts">`;
                                concepts.forEach(cn => {
                                    const cnName = textOf(cn.display_name || cn.name || cn.title, lang);
                                    html += `<div class="syllabus-concept" data-page-index="${pageIdx}">${formatText(cnName)}</div>`;
                                    pageIdx++;
                                });
                                html += `</div></div>`;
                            });
                        });
                        html += `</div>`;
                    });
                }
                html += `</div></div>`;
                return html;
            }
        });

        window.CompleteBookView = engine;

        // Reload when tabs ready
        document.addEventListener('subjectTabsReady', () => {
            console.log('📚 booklogic: subjectTabsReady → reloading complete');
            setTimeout(() => engine.reload(), 150);
        });

        // Safety boot reloads
        setTimeout(() => engine.reload(), 600);
        setTimeout(() => engine.reload(), 1400);
    }

    /* ================= BOOT ================= */
    function boot() {
        initTopicwiseBook();
        initCompleteBook();
        initViewModeSwitcher();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        setTimeout(boot, 0);
    }
})();