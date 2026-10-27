/* ============================================================
   voice-viewer-script.js — FINAL
   English tab → sirf English voice (Hinglish bhi English mein)
   Hindi tab   → Devanagari = Hindi voice
                 Hinglish general words = Hindi voice
                 Technical English words = English voice
   ============================================================ */
(function () {
    'use strict';

    console.log('[Voice] Script loading...');

    var synth = window.speechSynthesis || null;
    var currentUtterance = null;
    var speakSeq = 0;
    var leftBtnEl = null;
    var rightBtnEl = null;
    var cbLeftBtnEl = null;
    var cbRightBtnEl = null;

    /* ============================================================
       LANGUAGE HELPER — returns 'english' or 'hindi'
       ============================================================ */
    function getPageLanguage(pageEl) {
        if (!pageEl) return 'english';
        var activeBtn = pageEl.querySelector('.book-lang-btn.active');
        if (activeBtn && activeBtn.getAttribute('data-lang') === 'hindi') {
            return 'hindi';
        }
        return 'english';
    }

    /* ============================================================
       SYMBOL → SPEECH MAP
       ============================================================ */
    function speechifySymbols(text, lang) {
        if (!text) return '';
        var isHi = (lang === 'hindi');

        var W = isHi ? {
            plus: ' प्लस ', minus: ' माइनस ', times: ' गुणा ', divide: ' बटा ',
            equals: ' बराबर ', notEquals: ' बराबर नहीं ', approx: ' लगभग ',
            less: ' से कम ', greater: ' से ज़्यादा ',
            lessEq: ' से कम या बराबर ', greaterEq: ' से ज़्यादा या बराबर ',
            plusMinus: ' प्लस माइनस ',
            sqrt: ' square root ', cubeRoot: ' cube root ',
            pi: ' पाई ', infinity: ' अनंत ', degree: ' डिग्री ', percent: ' प्रतिशत ',
            per: ' प्रति ', sum: ' का योग ', integral: ' का समाकल ',
            delta: ' डेल्टा ', theta: ' थीटा ', alpha: ' अल्फा ', beta: ' बीटा ',
            gamma: ' गामा ', mu: ' म्यू ', sigma: ' सिग्मा ', omega: ' ओमेगा ',
            lambda: ' लैम्ब्डा ',
            squared: ' square ', cubed: ' cube ', fourth: ' to the fourth ',
            toPower: function (n) { return ' to the power ' + n + ' '; },
            rightArrow: ' से ', leftArrow: ' से ', arrow: ' से '
        } : {
            plus: ' plus ', minus: ' minus ', times: ' times ', divide: ' divided by ',
            equals: ' equals ', notEquals: ' not equal to ', approx: ' approximately ',
            less: ' less than ', greater: ' greater than ',
            lessEq: ' less than or equal to ', greaterEq: ' greater than or equal to ',
            plusMinus: ' plus or minus ',
            sqrt: ' square root of ', cubeRoot: ' cube root of ',
            pi: ' pi ', infinity: ' infinity ', degree: ' degrees ', percent: ' percent ',
            per: ' per ', sum: ' sum of ', integral: ' integral of ',
            delta: ' delta ', theta: ' theta ', alpha: ' alpha ', beta: ' beta ',
            gamma: ' gamma ', mu: ' mu ', sigma: ' sigma ', omega: ' omega ',
            lambda: ' lambda ',
            squared: ' squared ', cubed: ' cubed ', fourth: ' to the fourth ',
            toPower: function (n) { return ' to the power ' + n + ' '; },
            rightArrow: ' to ', leftArrow: ' from ', arrow: ' to '
        };

        return text
            .replace(/\b(km|m|cm|mm|kg|g|ml|l|hr|min|sec)\s*\/\s*(hr|h|min|s|sec)\b/gi, '$1' + W.per + '$2')
            .replace(/≠/g, W.notEquals).replace(/≈/g, W.approx)
            .replace(/≤/g, W.lessEq).replace(/≥/g, W.greaterEq)
            .replace(/±/g, W.plusMinus)
            .replace(/×|✕|✖/g, W.times).replace(/÷/g, W.divide)
            .replace(/√/g, W.sqrt).replace(/∛/g, W.cubeRoot)
            .replace(/∞/g, W.infinity).replace(/π/g, W.pi)
            .replace(/°/g, W.degree).replace(/%/g, W.percent)
            .replace(/∑/g, W.sum).replace(/∫/g, W.integral)
            .replace(/Δ|δ/g, W.delta).replace(/θ/g, W.theta)
            .replace(/α/g, W.alpha).replace(/β/g, W.beta)
            .replace(/γ/g, W.gamma).replace(/μ/g, W.mu)
            .replace(/σ/g, W.sigma).replace(/ω/g, W.omega)
            .replace(/λ/g, W.lambda)
            .replace(/²/g, W.squared).replace(/³/g, W.cubed).replace(/⁴/g, W.fourth)
            .replace(/\^2\b/g, W.squared).replace(/\^3\b/g, W.cubed)
            .replace(/\^(\d+)/g, function (_, n) { return W.toPower(n); })
            .replace(/→|➜|⇒/g, W.rightArrow)
            .replace(/←|⇐/g, W.leftArrow)
            .replace(/↔/g, W.arrow)
            .replace(/\s*\+\s*/g, W.plus)
            .replace(/\s*[−–]\s*/g, W.minus)
            .replace(/\s*=\s*/g, W.equals)
            .replace(/\s*<\s*/g, W.less)
            .replace(/\s*>\s*/g, W.greater)
            .replace(/\s*\/\s*/g, W.divide)
            .replace(/·|•/g, W.times)
            .replace(/[\u201C\u201D\u2018\u2019]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    /* ============================================================
       SMART CHUNK SPLITTER
       (Hindi tab ke liye — Hinglish + technical split)
       ============================================================ */
    function splitByScript(text) {
        if (!text) return [];

        var generalHinglishWords = new Set([
            "a", "an", "the", "is", "am", "are", "was", "were", "be", "been",
            "ka", "ki", "ke", "ko", "mein", "hai", "hain", "karta", "karti", "karte",
            "hota", "hoti", "hote", "se", "par", "aur", "ya", "yeh", "woh", "kya",
            "kaise", "kyun", "liye", "bina", "saath", "prakar", "niyam", "siddhant",
            "karan", "upyog", "bhav", "mul", "dhan", "labh", "hani", "wala", "wale",
            "wali", "sui", "ghanta", "ghoomti", "prati", "gati", "badhne", "ghatne",
            "karna", "karne", "sakte", "sakta", "sakti", "jayega", "jayegi", "hoga",
            "hogi", "diya", "gaya", "gayi", "padta", "padti", "banta", "banti",
            "nikal", "nikle", "nikalti", "milta", "milti", "dikhta", "dikhti",
            "lagta", "lagti", "kahte", "kehte", "bolte", "chalta", "chalti", "rehta",
            "rehti", "pattern", "line", "point", "value", "system", "method",
            "example", "problem", "question", "answer", "formula", "calculate",
            "find", "number", "total", "time", "day", "year", "month", "hour",
            "minute", "second", "meter", "weight", "length", "speed", "distance",
            "current", "voltage", "power", "energy", "phase", "circuit", "load",
            "supply", "input", "output", "test", "measure", "reading", "scale",
            "error", "factor", "frequency", "wave", "signal", "type", "part", "use",
            "and", "or", "but", "for", "with", "without", "from", "to", "of", "in", "on"
        ]);

        var re = /([\u0900-\u097F][\u0900-\u097F\s.,;:!?।'"()\-–—]*)|([A-Za-z0-9][A-Za-z0-9\s.,;:!?।'"()\-–—]*)/g;

        var rawChunks = [];
        var m;
        while ((m = re.exec(text)) !== null) {
            if (m[1]) {
                rawChunks.push({ script: 'devanagari', text: m[1].trim() });
            } else if (m[2]) {
                rawChunks.push({ script: 'latin', text: m[2].trim() });
            }
        }

        var finalChunks = [];

        for (var i = 0; i < rawChunks.length; i++) {
            var chunk = rawChunks[i];

            if (chunk.script === 'devanagari') {
                finalChunks.push(chunk);
                continue;
            }

            var words = chunk.text.split(/\s+/);
            var currentSentence = [];
            var currentType = null;

            for (var j = 0; j < words.length; j++) {
                var rawWord = words[j];
                var cleanWord = rawWord.toLowerCase().replace(/[^a-z0-9]/g, '');

                if (!cleanWord) {
                    if (currentSentence.length > 0) currentSentence.push(rawWord);
                    continue;
                }

                var isGeneral = generalHinglishWords.has(cleanWord);
                var wordType = isGeneral ? 'hinglish' : 'english';

                if (currentType === null) {
                    currentType = wordType;
                    currentSentence.push(rawWord);
                } else if (currentType === wordType) {
                    currentSentence.push(rawWord);
                } else {
                    finalChunks.push({ script: currentType, text: currentSentence.join(' ') });
                    currentSentence = [rawWord];
                    currentType = wordType;
                }
            }

            if (currentSentence.length > 0) {
                finalChunks.push({ script: currentType, text: currentSentence.join(' ') });
            }
        }

        var merged = [];
        for (var k = 0; k < finalChunks.length; k++) {
            var c = finalChunks[k];
            if (!c.text) continue;
            var last = merged[merged.length - 1];
            if (last && last.script === c.script) {
                last.text = (last.text + ' ' + c.text).replace(/\s+/g, ' ').trim();
            } else {
                merged.push({ script: c.script, text: c.text });
            }
        }
        return merged;
    }

    /* ============================================================
       FEMALE VOICE HINTS
       ============================================================ */
    var FEMALE_HINTS = [
        'swara', 'heera', 'kalpana', 'neerja', 'aditi', 'raveena',
        'lekha', 'veena', 'priya', 'google hindi', 'microsoft kalpana',
        'microsoft swara', 'microsoft heera',
        'female', 'woman', 'girl', 'zira', 'hazel', 'susan', 'eva',
        'linda', 'catherine', 'samantha', 'karen', 'moira', 'tessa',
        'fiona', 'victoria', 'allison', 'ava', 'serena', 'siri',
        'google uk english female', 'google us english female',
        'ivy', 'joanna', 'salli', 'kimberly'
    ];

    function isFemaleVoice(v) {
        if (!v || !v.name) return false;
        var n = v.name.toLowerCase();
        for (var i = 0; i < FEMALE_HINTS.length; i++) {
            if (n.indexOf(FEMALE_HINTS[i]) !== -1) return true;
        }
        return false;
    }

    function langMatches(voiceLang, targetLang) {
        if (!voiceLang) return false;
        var v = voiceLang.toLowerCase().replace(/_/g, '-');
        var t = targetLang.toLowerCase();
        return v === t || v.indexOf(t + '-') === 0;
    }

    /* ---- Voice cache: ONE voice per language, chosen once ---- */
    var voiceCache = { hindi: null, english: null };

    function pickFemaleVoice(lang) {
        if (!synth) return null;

        var cacheKey = (lang === 'hindi') ? 'hindi' : 'english';
        if (voiceCache[cacheKey]) return voiceCache[cacheKey];

        var voices = synth.getVoices() || [];
        if (!voices.length) return null;

        var target = (lang === 'hindi') ? 'hi' : 'en';
        var sameLang = voices.filter(function (v) {
            return langMatches(v.lang, target);
        });
        if (!sameLang.length) sameLang = voices.slice();

        // 1. Local branded female first
        var branded = sameLang.filter(function (v) {
            var n = (v.name || '').toLowerCase();
            return isFemaleVoice(v) &&
                (n.indexOf('microsoft') !== -1 || n.indexOf('google') !== -1);
        });
        var localBranded = branded.filter(function (v) { return v.localService; });
        if (localBranded.length) {
            voiceCache[cacheKey] = localBranded[0];
            console.log('[Voice] 🎯 Cached LOCAL ' + lang + ' voice:', localBranded[0].name);
            return localBranded[0];
        }

        // 2. Any local female-hinted voice
        var hintedLocal = sameLang.filter(function (v) {
            return isFemaleVoice(v) && v.localService;
        });
        if (hintedLocal.length) {
            voiceCache[cacheKey] = hintedLocal[0];
            console.log('[Voice] 🎯 Cached LOCAL ' + lang + ' voice:', hintedLocal[0].name);
            return hintedLocal[0];
        }

        // 3. Any branded female
        if (branded.length) {
            voiceCache[cacheKey] = branded[0];
            console.log('[Voice] 🎯 Cached ' + lang + ' voice:', branded[0].name);
            return branded[0];
        }

        // 4. Any female-hinted voice
        var hinted = sameLang.filter(isFemaleVoice);
        if (hinted.length) {
            voiceCache[cacheKey] = hinted[0];
            console.log('[Voice] 🎯 Cached ' + lang + ' voice:', hinted[0].name);
            return hinted[0];
        }

        // 5. Explicit "female"
        var explicit = sameLang.filter(function (v) {
            return (v.name || '').toLowerCase().indexOf('female') !== -1;
        });
        if (explicit.length) {
            voiceCache[cacheKey] = explicit[0];
            console.log('[Voice] 🎯 Cached ' + lang + ' voice:', explicit[0].name);
            return explicit[0];
        }

        // 6. Deterministic fallback
        var fallback = sameLang.slice().sort(function (a, b) {
            return (a.name || '').localeCompare(b.name || '');
        });
        voiceCache[cacheKey] = fallback[0] || voices[0] || null;
        if (voiceCache[cacheKey]) {
            console.log('[Voice] 🎯 Cached ' + lang + ' fallback voice:', voiceCache[cacheKey].name);
        }
        return voiceCache[cacheKey];
    }

    /* Clear voice cache when voices load/change */
    if (synth && typeof synth.onvoiceschanged !== 'undefined') {
        synth.onvoiceschanged = function () {
            voiceCache.hindi = null;
            voiceCache.english = null;
            console.log('[Voice] 🔄 Voice cache cleared');
        };
    }

    /* ============================================================
       CARD EXTRACTION
       ============================================================ */
    function pageHasConcept(pageEl) {
        if (!pageEl) return false;
        if (pageEl.querySelector('.syllabus-page')) return false;
        var title = pageEl.querySelector('.book-concept-title');
        if (!title || !title.textContent.trim()) return false;
        return true;
    }

    function extractMainCardText(pageEl) {
        if (!pageHasConcept(pageEl)) return '';

        var title = pageEl.querySelector('.book-concept-title');
        var body  = pageEl.querySelector('.book-concept-body');
        var lang  = getPageLanguage(pageEl);

        var parts = [];

        if (title && title.textContent.trim()) {
            var titleText = speechifySymbols(title.textContent.trim(), lang);
            if (titleText) parts.push(titleText);
        }

        if (body && body.textContent.trim()) {
            var bodyText = body.textContent
                .replace(/\r\n/g, '\n')
                .replace(/\n{2,}/g, '। ')
                .replace(/\n/g, ' ')
                .replace(/\.\.+/g, '.')
                .trim();

            bodyText = speechifySymbols(bodyText, lang);

            if (bodyText.length > 3000) {
                bodyText = bodyText.slice(0, 3000).replace(/\s+\S*$/, '') + '।';
            }

            if (bodyText && !/[।.!?]$/.test(bodyText)) bodyText += '।';
            if (bodyText) parts.push(bodyText);
        }

        return parts.join('। ');
    }

    /* ============================================================
       STOP
       ============================================================ */
    function stopSpeaking(reason) {
        speakSeq++;
        var wasSpeaking = false;
        if (synth && (synth.speaking || synth.pending)) {
            wasSpeaking = true;
            try { synth.cancel(); } catch (e) {}
        }
        currentUtterance = null;
        [leftBtnEl, rightBtnEl, cbLeftBtnEl, cbRightBtnEl].forEach(function (b) {
            if (b) b.classList.remove('vcv-speaking');
        });
        if (wasSpeaking) {
            console.log('[Voice] ⏹️ Speech stopped — reason:', reason || 'unknown');
        }
    }

    /* ============================================================
       CHUNKED SPEAKER — tab-aware
       English tab → sab kuch English voice mein
       Hindi tab   → Devanagari + Hinglish = Hindi, technical = English
       ============================================================ */
    function speakChunks(chunks, btnEl, onDone, pageLang) {
        var idx = 0;
        var mySeq = speakSeq;
        var keepAliveTimer = null;
        var fallbackTimer = null;

        function clearTimers() {
            if (keepAliveTimer) { clearInterval(keepAliveTimer); keepAliveTimer = null; }
            if (fallbackTimer) { clearTimeout(fallbackTimer); fallbackTimer = null; }
        }

        // Long chunks ko sentence boundaries par tod do
        function capChunkSize(list, maxLen) {
            var out = [];
            for (var i = 0; i < list.length; i++) {
                var c = list[i];
                var text = c.text;
                if (text.length <= maxLen) {
                    out.push(c);
                    continue;
                }
                var pieces = text.split(/(?<=[।.!?])\s+/);
                var buf = '';
                for (var p = 0; p < pieces.length; p++) {
                    var piece = pieces[p];
                    if (!piece) continue;
                    if ((buf + ' ' + piece).trim().length > maxLen && buf) {
                        out.push({ script: c.script, text: buf.trim() });
                        buf = piece;
                    } else {
                        buf = (buf ? buf + ' ' : '') + piece;
                    }
                }
                if (buf.trim()) out.push({ script: c.script, text: buf.trim() });
            }
            return out;
        }

        chunks = capChunkSize(chunks, 200);

        function next() {
            if (mySeq !== speakSeq) { clearTimers(); return; }
            if (idx >= chunks.length) {
                clearTimers();
                if (onDone) onDone();
                return;
            }

            var chunk = chunks[idx++];
            var chunkLang;

            // ---- TAB-AWARE VOICE SELECTION ----
            if (pageLang === 'english') {
                // English tab: sab kuch English voice mein (Hinglish bhi)
                chunkLang = 'english';
            } else {
                // Hindi tab: Devanagari + Hinglish = Hindi, technical = English
                if (chunk.script === 'devanagari' || chunk.script === 'hinglish') {
                    chunkLang = 'hindi';
                } else {
                    chunkLang = 'english';
                }
            }

            var voice = pickFemaleVoice(chunkLang);

            if (!voice && synth.getVoices().length === 0) {
                idx--;
                setTimeout(next, 300);
                return;
            }

            var u = new SpeechSynthesisUtterance(chunk.text);
            u.rate   = chunkLang === 'hindi' ? 1.05 : 1.15;
            u.pitch  = chunkLang === 'hindi' ? 1.0  : 1.05;
            u.volume = 1.0;

            if (voice) {
                u.voice = voice;
                u.lang  = chunkLang === 'hindi' ? 'hi-IN' : (voice.lang || 'en-US');
            } else {
                u.lang = chunkLang === 'hindi' ? 'hi-IN' : 'en-US';
            }

            console.log('[Voice] 🎙️ [tab=' + pageLang + '][' + chunkLang + '] (' +
                chunk.text.length + ' ch) ' +
                (voice ? voice.name : 'default') +
                ' → ' + chunk.text.slice(0, 60));

            var finished = false;
            var endFired = false;

            clearTimers();

            // Aggressive keep-alive every 5s
            keepAliveTimer = setInterval(function () {
                if (finished || mySeq !== speakSeq) { clearTimers(); return; }
                if (synth.speaking) {
                    try {
                        synth.resume();
                        synth.pause();
                        synth.resume();
                    } catch (e) {}
                }
            }, 5000);

            // Fallback if onend never fires
            var estimatedMs = Math.max(4000, chunk.text.length * 120);
            fallbackTimer = setTimeout(function () {
                if (finished || mySeq !== speakSeq) return;
                if (!endFired) {
                    console.warn('[Voice] 🚨 onend NEVER fired — Chrome dropped it!');
                } else {
                    console.warn('[Voice] ⏰ Fallback timeout — forcing next');
                }
                finished = true;
                clearTimers();
                next();
            }, estimatedMs + 8000);

            u.onstart = function () { };

            u.onend = function () {
                endFired = true;
                if (finished || mySeq !== speakSeq) return;
                finished = true;
                clearTimers();
                next();
            };

            u.onerror = function (e) {
                if (finished || mySeq !== speakSeq) return;
                finished = true;
                clearTimers();
                if (e.error && e.error !== 'interrupted' && e.error !== 'canceled') {
                    console.warn('[Voice] chunk error:', e.error);
                }
                next();
            };

            currentUtterance = u;
            synth.speak(u);
        }

        next();
    }

    /* ============================================================
       SPEAK PAGE
       ============================================================ */
    function speakPage(pageEl, btnEl) {
        if (!synth) {
            console.warn('[Voice] ❌ speechSynthesis not supported');
            return;
        }
        if (!pageEl || !pageHasConcept(pageEl)) {
            console.warn('[Voice] ❌ This page has no concept');
            return;
        }
        var text = extractMainCardText(pageEl);
        if (!text) {
            console.warn('[Voice] ❌ No text found');
            return;
        }

        var pageLang = getPageLanguage(pageEl);
        console.log('[Voice] 🌐 Page tab:', pageLang);
        console.log('[Voice] 📏 Text length:', text.length, 'chars');

        try { synth.cancel(); } catch (e) {}
        var mySeq = ++speakSeq;

        var chunks = splitByScript(text);
        if (!chunks.length) {
            console.warn('[Voice] ❌ No chunks');
            return;
        }
        console.log('[Voice] 🧩 Chunks:', chunks.length);

        if (btnEl) btnEl.classList.add('vcv-speaking');

        var chunkCount = Math.ceil(text.length / 140);
        var safetyMs = Math.max(180000, chunkCount * 25000 + 120000);
        console.log('[Voice] ⏱️ Safety timeout:', Math.round(safetyMs / 1000), 'sec');

        var safetyTimer = setTimeout(function () {
            if (mySeq !== speakSeq) return;
            if (synth && (synth.speaking || synth.pending)) {
                console.warn('[Voice] ⏱️ Safety fired but synth active — extending 60s');
                safetyTimer = setTimeout(function () {
                    if (mySeq !== speakSeq) return;
                    console.warn('[Voice] ⏱️ Safety timeout (final)');
                    stopSpeaking('safety-timeout-final');
                }, 60000);
                return;
            }
            console.warn('[Voice] ⏱️ Safety timeout — synth idle');
            stopSpeaking('safety-timeout');
        }, safetyMs);

        // pageLang pass karo speakChunks ko
        speakChunks(chunks, btnEl, function () {
            if (mySeq !== speakSeq) return;
            clearTimeout(safetyTimer);
            console.log('[Voice] ✅ Speech ended');
            if (btnEl) btnEl.classList.remove('vcv-speaking');
            currentUtterance = null;
        }, pageLang);
    }

    /* ============================================================
       PAGE BUTTONS
       ============================================================ */
    function makePageButton(pageId, label) {
        var btn = document.createElement('button');
        btn.className = 'vcv-page-speak-btn';
        btn.type = 'button';
        btn.innerHTML = '🔊';
        btn.title = 'Speak ' + label + ' concept';
        btn.setAttribute('aria-label', 'Speak ' + label + ' concept');
        btn.dataset.pageId = pageId;
        var lastClick = 0;

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();

            var now = Date.now();
            if (now - lastClick < 500) {
                console.log('[Voice] 🖱️ Double click ignored');
                return;
            }
            lastClick = now;

            if (synth && synth.speaking) {
                console.log('[Voice] Stopping...');
                stopSpeaking('user-click-stop');
                return;
            }

            var pageEl = document.getElementById(pageId);
            if (!pageEl) return;
            speakPage(pageEl, btn);
        });

        return btn;
    }

    function attachButtonToPage(pageEl, pageId, label, refSetter) {
        if (!pageEl) return;
        if (pageEl.querySelector('.vcv-page-speak-btn')) return;
        if (!pageHasConcept(pageEl)) return;

        var btn = makePageButton(pageId, label);
        pageEl.appendChild(btn);
        refSetter(btn);
        console.log('[Voice] ✅ Page button attached:', label);
    }

    function createAllPageButtons() {
        var bookLeft  = document.getElementById('bookLeftPage');
        var bookRight = document.getElementById('bookRightPage');
        attachButtonToPage(bookLeft, 'bookLeftPage', 'left', function(b) { leftBtnEl = b; });
        attachButtonToPage(bookRight, 'bookRightPage', 'right', function(b) { rightBtnEl = b; });

        var cbLeft  = document.getElementById('cbLeftPage');
        var cbRight = document.getElementById('cbRightPage');
        attachButtonToPage(cbLeft, 'cbLeftPage', 'left', function(b) { cbLeftBtnEl = b; });
        attachButtonToPage(cbRight, 'cbRightPage', 'right', function(b) { cbRightBtnEl = b; });
    }

    /* ============================================================
       SIDEBAR BUTTON
       ============================================================ */
    function createSidebarButton() {
        var host = document.getElementById('view-mode-section')
                || document.getElementById('instructions-section')
                || document.getElementById('content-section');

        if (host && !host.querySelector('.vcv-entry-btn')) {
            var sb = document.createElement('button');
            sb.type = 'button';
            sb.className = 'vcv-entry-btn';
            sb.innerHTML = '🔊 Speak Right Page';
            sb.addEventListener('click', function (e) {
                e.stopPropagation();
                if (synth && synth.speaking) {
                    stopSpeaking('sidebar-click');
                } else {
                    var rp = document.getElementById('bookRightPage');
                    if (rp) speakPage(rp, rightBtnEl);
                }
            });
            host.appendChild(sb);
            console.log('[Voice] ✅ Sidebar button created');
        }
    }

    function initAll() {
        console.log('[Voice] initAll — body:', !!document.body);
        if (!document.body) {
            setTimeout(initAll, 100);
            return;
        }
        createAllPageButtons();
        createSidebarButton();
    }

    /* ============================================================
       PUBLIC API
       ============================================================ */
    window.VoiceConceptViewer = {
        speakPage: function () {
            var rp = document.getElementById('bookRightPage');
            if (rp) speakPage(rp, rightBtnEl);
        },
        speakLeft: function () {
            var lp = document.getElementById('bookLeftPage');
            if (lp) speakPage(lp, leftBtnEl);
        },
        speakRight: function () {
            var rp = document.getElementById('bookRightPage');
            if (rp) speakPage(rp, rightBtnEl);
        },
        stop: function () { stopSpeaking('api-call'); },
        getVoices: function () {
            return synth ? synth.getVoices() : [];
        },
        refreshButtons: createAllPageButtons,
        speechifySymbols: speechifySymbols,
        splitByScript: splitByScript,
        clearVoiceCache: function () {
            voiceCache.hindi = null;
            voiceCache.english = null;
            console.log('[Voice] 🧹 Voice cache cleared manually');
        },
        setRate: function (hindiRate, englishRate) {
            window.__vcvRates = {
                hindi: hindiRate || 1.05,
                english: englishRate || 1.15
            };
            console.log('[Voice] ⚡ Rates set:', window.__vcvRates);
        }
    };

    console.log('[Voice] Public API exposed:', Object.keys(window.VoiceConceptViewer));

    /* ============================================================
       AUTO START
       ============================================================ */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(initAll, 50);
            setTimeout(initAll, 600);
            setTimeout(initAll, 1500);
        });
    } else {
        setTimeout(initAll, 50);
        setTimeout(initAll, 600);
        setTimeout(initAll, 1500);
    }

    window.addEventListener('load', function () {
        setTimeout(initAll, 300);
    });

    /* ============================================================
       PAGE CHANGE / LANGUAGE TOGGLE
       ============================================================ */
    var _pageChangeTimer = null;
    document.addEventListener('book:pagechange', function () {
        if (_pageChangeTimer) clearTimeout(_pageChangeTimer);
        _pageChangeTimer = setTimeout(function () {
            _pageChangeTimer = null;
            if (synth && synth.speaking) {
                console.log('[Voice] 📄 Page change — stopping speech');
                stopSpeaking('page-change');
            }
            createAllPageButtons();
        }, 300);
    });

    var _langChangeTimer = null;
    document.addEventListener('languagechange', function () {
        if (_langChangeTimer) clearTimeout(_langChangeTimer);
        _langChangeTimer = setTimeout(function () {
            _langChangeTimer = null;
            if (synth && synth.speaking) {
                console.log('[Voice] 🌐 Language change — stopping speech');
                stopSpeaking('language-change');
            }
            createAllPageButtons();
        }, 300);
    });

    console.log('[Voice] Script ready ✅');
})();