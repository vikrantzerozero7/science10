// popup.js
// Random Flash Card Popup - Har 20 minute mein ek random concept card flash karega
// FREE SIZE CARD: content ke hisaab se auto width + auto height
// ✅ Adapted for index.html — CONFIG_REGISTRY based (history, geography, democracy)
// ✅ REMOVED: card body click → chatbot auto-open behaviour
// ✅ ADDED: Subtopic (source) shown on the side, bigger badges
(function() {
    'use strict';

    console.log('🎴 Popup: Starting...');

    // ============================================================
    // CONFIGURATION
    // ============================================================
    const POPUP_CONFIG = {
        INTERVAL_MS: 3 * 60 * 1000,     // 20 minutes (adjust as needed)
        AUTO_HIDE_MS: 30 * 1000,        // 30 seconds auto-hide
        SHOW_ON_FIRST_LOAD: true,
        FIRST_DELAY_MS: 5000,
        MAX_RECENT: 50,
        POSITION: 'bottom-left',        // bottom-left | bottom-right | top-left | top-right | center
        MAX_WIDTH: '90vw',
        MAX_HEIGHT: '90vh'
    };

    // ============================================================
    // ALL CARDS POOL
    // ============================================================
    let allCards = [];
    let isPoolReady = false;
    let recentIds = [];
    let popupTimer = null;
    let autoHideTimer = null;
    let currentCard = null;

    // ============================================================
    // ✅ CONFIG_MAP — index.html ke CONFIG_REGISTRY se EXACT match
    // Globals expose hone chahiye (window.HISTORY_CONFIG, etc.)
    // ============================================================
    const CONFIG_MAP = {
        history:    () => window.HISTORY_CONFIG,
        geography:  () => window.GEOGRAPHY10_CONFIG,
        democracy:  () => window.DEMOCRACY_CONFIG,
		science10:  () => window.SCIENCE_CLASS10_CONFIG,
		mathematics2:  () => window.MATHEMATICS2_CONFIG
    };

    function getConfig(subjectId) {
        const getter = CONFIG_MAP[subjectId];
        return getter ? getter() : null;
    }

    // ============================================================
    // BUILD CARD POOL
    // ============================================================
    function parseConfigToCards(config, subjectId, targetArray) {
        if (!config || !config.chapters) return 0;
        const subjectTitle = config.title?.english || config.id || subjectId;
        let count = 0;

        for (const chapter of config.chapters) {
            if (!chapter.topics) continue;
            const chapterName = chapter.display_name?.english || chapter.id || 'Unknown';

            for (const topic of chapter.topics) {
                if (!topic.concepts) continue;
                const topicName = topic.display_name?.english || topic.id || 'Unknown';

                for (const concept of topic.concepts) {
                    const name = concept.display_name?.english || concept.display_name?.hindi || '';
                    const desc = concept.description?.english || concept.description?.hindi || '';

                    if (name || desc) {
                        targetArray.push({
                            id: concept.id || `${subjectId}_${chapter.id}_${topic.id}_${Math.random()}`,
                            name: name || 'Concept',
                            description: desc,
                            subject: subjectTitle,
                            subjectId: subjectId,
                            chapter: chapterName,
                            topic: topicName
                        });
                        count++;
                    }
                }
            }
        }
        return count;
    }

    function buildCardPool() {
        allCards = [];
        let total = 0;
        const loaded = [];
        const missing = [];

        for (const subjectId in CONFIG_MAP) {
            const config = getConfig(subjectId);
            if (config && config.chapters) {
                const n = parseConfigToCards(config, subjectId, allCards);
                total += n;
                loaded.push(`${subjectId}(${n})`);
            } else {
                missing.push(subjectId);
            }
        }

        isPoolReady = true;
        console.log(`🎴 Popup: Loaded ${total} cards from ${loaded.length} subjects`);
        if (missing.length > 0) {
            console.warn(`🎴 Popup: Missing configs (${missing.length}):`, missing);
        }
        return total;
    }

    // ============================================================
    // PICK RANDOM CARD (recent avoid)
    // ============================================================
    function pickRandomCard() {
        if (!isPoolReady) buildCardPool();
        if (allCards.length === 0) return null;

        let pool = allCards.filter(c => !recentIds.includes(c.id));
        if (pool.length === 0) {
            recentIds = [];
            pool = allCards;
        }

        const card = pool[Math.floor(Math.random() * pool.length)];

        recentIds.push(card.id);
        if (recentIds.length > POPUP_CONFIG.MAX_RECENT) {
            recentIds.shift();
        }
        return card;
    }

    // ============================================================
    // POPUP UI — FREE SIZE
    // ============================================================
    let popupEl = null;
    let styleInjected = false;

    function injectStyles() {
        if (styleInjected) return;
        styleInjected = true;

        const css = `
        .flashcard-popup {
            position: fixed;
            z-index: 9997;
            width: auto;
            height: auto;
            min-width: 320px;
            max-width: ${POPUP_CONFIG.MAX_WIDTH};
            max-height: ${POPUP_CONFIG.MAX_HEIGHT};
            display: inline-flex;
            flex-direction: column;
            background: #ffffff;
            border-radius: 14px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18),
                        0 0 0 1px rgba(102, 126, 234, 0.15);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            overflow: hidden;
            transform: translateY(30px) scale(0.95);
            opacity: 0;
            pointer-events: none;
            transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                        opacity 0.3s ease;
            border-top: 4px solid #667eea;
        }
        .flashcard-popup.show {
            transform: translateY(0) scale(1);
            opacity: 1;
            pointer-events: auto;
        }
        .flashcard-popup.bottom-left  { bottom: 24px; left: 24px; }
        .flashcard-popup.bottom-right { bottom: 24px; right: 24px; }
        .flashcard-popup.top-left     { top: 24px; left: 24px; }
        .flashcard-popup.top-right    { top: 24px; right: 24px; }
        .flashcard-popup.center {
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0.95);
        }
        .flashcard-popup.center.show {
            transform: translate(-50%, -50%) scale(1);
        }

        .flashcard-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 18px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            flex-shrink: 0;
        }
        .flashcard-header-left {
            display: flex;
            align-items: center;
            gap: 8px;
            min-width: 0;
        }
        .flashcard-icon { font-size: 20px; flex-shrink: 0; }
        .flashcard-header-title {
            font-size: 12.5px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            opacity: 0.95;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .flashcard-close {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: #fff;
            width: 28px;
            height: 28px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
            flex-shrink: 0;
        }
        .flashcard-close:hover { background: rgba(255, 255, 255, 0.35); }

        .flashcard-body {
            padding: 18px 22px 16px;
            flex: 1 1 auto;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
        }

        /* ✅ Subject + Subtopic side-by-side row */
        .flashcard-meta {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 12px;
        }
        .flashcard-subject {
            display: inline-block;
            font-size: 13px;
            font-weight: 700;
            color: #667eea;
            background: #eef2ff;
            padding: 6px 14px;
            border-radius: 20px;
            white-space: normal;
            word-break: break-word;
            line-height: 1.4;
            letter-spacing: 0.2px;
        }
        /* ✅ Subtopic (source) badge */
        .flashcard-subtopic {
            display: inline-block;
            font-size: 13px;
            font-weight: 700;
            color: #2f855a;
            background: #f0fff4;
            border: 1.5px solid #c6f6d5;
            padding: 6px 14px;
            border-radius: 20px;
            white-space: normal;
            word-break: break-word;
            line-height: 1.4;
            max-width: 100%;
            letter-spacing: 0.2px;
        }
        .flashcard-subtopic::before {
            content: '📌 ';
            font-size: 12px;
        }

        .flashcard-name {
            font-size: 18px;
            font-weight: 700;
            color: #2d3748;
            margin: 0 0 10px 0;
            line-height: 1.35;
            word-break: break-word;
        }
        .flashcard-desc {
            font-size: 13.5px;
            color: #4a5568;
            line-height: 1.65;
            margin: 0;
            white-space: pre-wrap;
            word-break: break-word;
        }
        .flashcard-desc code {
            background: #f1f3f5;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 12.5px;
        }
        .flashcard-path {
            font-size: 11.5px;
            color: #a0aec0;
            margin-top: 14px;
            padding-top: 10px;
            border-top: 1px dashed #e2e8f0;
            line-height: 1.5;
            word-break: break-word;
        }
        .flashcard-progress {
            height: 3px;
            background: #e2e8f0;
            position: relative;
            overflow: hidden;
            flex-shrink: 0;
        }
        .flashcard-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            width: 100%;
            transform-origin: left;
            animation: flashcardProgress linear forwards;
        }
        @keyframes flashcardProgress {
            from { transform: scaleX(1); }
            to   { transform: scaleX(0); }
        }
        .flashcard-body::-webkit-scrollbar { width: 6px; }
        .flashcard-body::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 4px;
        }
        .flashcard-body::-webkit-scrollbar-track { background: transparent; }

        @media (max-width: 480px) {
            .flashcard-popup {
                min-width: 0;
                max-width: calc(100vw - 16px);
                max-height: calc(100vh - 100px);
                left: 8px !important;
                right: 8px !important;
            }
            .flashcard-popup.bottom-left,
            .flashcard-popup.bottom-right {
                bottom: 80px !important;
            }
            .flashcard-subject,
            .flashcard-subtopic {
                font-size: 12px;
                padding: 5px 12px;
            }
            .flashcard-name { font-size: 16px; }
            .flashcard-desc { font-size: 13px; }
        }
        `;

        const style = document.createElement('style');
        style.id = 'flashcard-popup-styles';
        style.textContent = css;
        document.head.appendChild(style);
    }

    function createPopupElement() {
        if (popupEl) return popupEl;
        injectStyles();

        popupEl = document.createElement('div');
        popupEl.className = `flashcard-popup ${POPUP_CONFIG.POSITION}`;
        popupEl.id = 'flashcardPopup';

        popupEl.innerHTML = `
            <div class="flashcard-header">
                <div class="flashcard-header-left">
                    <span class="flashcard-icon">🎴</span>
                    <span class="flashcard-header-title">Did You Know?</span>
                </div>
                <button class="flashcard-close" id="flashcardClose" title="Close">✕</button>
            </div>
            <div class="flashcard-body">
                <div class="flashcard-meta">
                    <span class="flashcard-subject" id="flashcardSubject"></span>
                    <span class="flashcard-subtopic" id="flashcardSubtopic"></span>
                </div>
                <h3 class="flashcard-name" id="flashcardName"></h3>
                <p class="flashcard-desc" id="flashcardDesc"></p>
                <div class="flashcard-path" id="flashcardPath"></div>
            </div>
            <div class="flashcard-progress">
                <div class="flashcard-progress-bar" id="flashcardProgressBar"></div>
            </div>
        `;

        document.body.appendChild(popupEl);

        // ✅ Sirf close button ka handler — body click handler REMOVED
        popupEl.querySelector('#flashcardClose').addEventListener('click', hidePopup);

        return popupEl;
    }

    // ============================================================
    // SHOW / HIDE
    // ============================================================
    function showPopup(card) {
        if (!card) return;
        currentCard = card;

        const el = createPopupElement();

        el.querySelector('#flashcardSubject').textContent = card.subject || 'General';
        el.querySelector('#flashcardSubtopic').textContent = card.topic || 'Subtopic';
        el.querySelector('#flashcardName').textContent = card.name || 'Concept';
        el.querySelector('#flashcardDesc').textContent = card.description || 'No description available.';
        el.querySelector('#flashcardPath').textContent = `📂 ${card.chapter} › ${card.topic}`;

        const bar = el.querySelector('#flashcardProgressBar');
        bar.style.animation = 'none';
        void bar.offsetWidth;
        bar.style.animation = `flashcardProgress ${POPUP_CONFIG.AUTO_HIDE_MS}ms linear forwards`;

        el.classList.add('show');

        clearTimeout(autoHideTimer);
        autoHideTimer = setTimeout(hidePopup, POPUP_CONFIG.AUTO_HIDE_MS);

        console.log(`🎴 Popup shown: ${card.name} (${card.subject} › ${card.topic})`);
    }

    function hidePopup() {
        if (!popupEl) return;
        popupEl.classList.remove('show');
        clearTimeout(autoHideTimer);
    }

    // ============================================================
    // TIMER LOOP
    // ============================================================
    function flashNextCard() {
        const card = pickRandomCard();
        if (card) showPopup(card);
    }

    function startTimer() {
        if (popupTimer) clearInterval(popupTimer);
        popupTimer = setInterval(() => {
            flashNextCard();
        }, POPUP_CONFIG.INTERVAL_MS);
        console.log(`🎴 Popup: Timer started — every ${POPUP_CONFIG.INTERVAL_MS / 60000} min`);
    }

    // ============================================================
    // INIT
    // ============================================================
    function init() {
        console.log('🎴 Popup: Initializing...');

        buildCardPool();

        if (allCards.length === 0) {
            console.warn('🎴 Popup: No cards found. Retrying in 2s...');
            setTimeout(init, 2000);
            return;
        }

        startTimer();

        if (POPUP_CONFIG.SHOW_ON_FIRST_LOAD) {
            setTimeout(flashNextCard, POPUP_CONFIG.FIRST_DELAY_MS);
        }

        window.flashcardPopup = {
            show: flashNextCard,
            hide: hidePopup,
            getPoolSize: () => allCards.length,
            rebuild: () => { buildCardPool(); }
        };

        console.log('🎴 Popup: Ready! Cards:', allCards.length);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(init, 1500);
        });
    } else {
        setTimeout(init, 1500);
    }

})();