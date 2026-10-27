/* ==========================================================
   book-page-slider.js — Slider for topicwise / complete book
   ========================================================== */
(function () {
    'use strict';

    const JUMP_DEBOUNCE_MS = 100;

    function bindSlider(opts) {
        const { sliderId, labelId, bookElId, viewObjName } = opts;

        const sliderEl = document.getElementById(sliderId);
        const labelEl = document.getElementById(labelId);
        const bookEl = document.getElementById(bookElId);
        if (!sliderEl) return;

        const wrapEl = sliderEl.parentElement;
        let isDragging = false;
        let inputTimer = null;

        function getView() { return window[viewObjName] || null; }

        function syncSlider(force) {
            if (isDragging && !force) return;
            const view = getView();
            if (!view) return;

            const pages = view.getPages ? (view.getPages() || []) : [];
            const total = pages.length;

            if (!total) {
                sliderEl.max = 0;
                sliderEl.value = 0;
                sliderEl.disabled = true;
                if (labelEl) labelEl.textContent = '0 / 0';
                return;
            }

            sliderEl.disabled = false;
            sliderEl.max = total - 1;

            let spread = 0;
            if (typeof view.getCurrentSpread === 'function') spread = view.getCurrentSpread();
            let idx = spread * 2;
            if (idx >= total) idx = total - 1;

            sliderEl.value = idx;
            if (labelEl) labelEl.textContent = `${idx + 1} / ${total}`;
        }

        function syncWidth() {
            if (!bookEl || !wrapEl) return;
            const rect = bookEl.getBoundingClientRect();
            if (rect.width > 0) {
                wrapEl.style.width = rect.width + 'px';
                wrapEl.style.maxWidth = 'none';
            }
        }

        function doJump(idx) {
            const view = getView();
            if (view && typeof view.jumpToPage === 'function') view.jumpToPage(idx);
        }

        function endDrag() {
            isDragging = false;
            if (inputTimer) { clearTimeout(inputTimer); inputTimer = null; }
        }

        sliderEl.addEventListener('input', function () {
            isDragging = true;
            const idx = parseInt(this.value, 10) || 0;
            const view = getView();
            const total = view && view.getPages ? (view.getPages() || []).length : 0;
            if (labelEl) labelEl.textContent = `${idx + 1} / ${total}`;

            if (inputTimer) clearTimeout(inputTimer);
            inputTimer = setTimeout(() => {
                inputTimer = null;
                doJump(idx);
            }, JUMP_DEBOUNCE_MS);
        });

        sliderEl.addEventListener('change', function () {
            const idx = parseInt(this.value, 10) || 0;
            if (inputTimer) { clearTimeout(inputTimer); inputTimer = null; }
            doJump(idx);
            endDrag();
            this.blur();
            setTimeout(() => syncSlider(true), 80);
        });

        sliderEl.addEventListener('pointerup', function () {
            endDrag();
            this.blur();
            setTimeout(() => syncSlider(true), 80);
        });

        document.addEventListener('book:pagechange', () => {
            if (!isDragging) syncSlider(false);
        });

        if (window.ResizeObserver && bookEl) {
            new ResizeObserver(syncWidth).observe(bookEl);
        }
        window.addEventListener('resize', syncWidth);

        // Wait for view to appear, then sync + patch reload
        let tries = 0;
        const iv = setInterval(() => {
            tries++;
            const view = getView();
            if (view) {
                if (view.reload && !view.reload.__sliderPatched) {
                    const orig = view.reload;
                    view.reload = function () {
                        const r = orig.apply(this, arguments);
                        setTimeout(() => { syncSlider(true); syncWidth(); }, 150);
                        return r;
                    };
                    view.reload.__sliderPatched = true;
                }
                syncSlider(true);
                syncWidth();
                clearInterval(iv);
            } else if (tries > 50) {
                clearInterval(iv);
            }
        }, 200);

        // Also sync on view switch
        document.addEventListener('change', (e) => {
            if (e.target && e.target.name === 'viewMode') {
                setTimeout(() => { syncSlider(true); syncWidth(); }, 200);
            }
        });
    }

    function init() {
        bindSlider({ sliderId: 'bookPageSlider', labelId: 'bookSliderLabel', bookElId: 'book', viewObjName: 'BookView' });
        bindSlider({ sliderId: 'cbPageSlider', labelId: 'cbSliderLabel', bookElId: 'completeBook', viewObjName: 'CompleteBookView' });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();