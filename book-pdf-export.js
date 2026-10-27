/**
 * book-pdf-export.js — Export book as PDF
 */
(function () {
    'use strict';

    const CONFIG = {
        autoInjectButtons: true,
        buttonLabel: '📥 PDF',
        confirmHindi: true,
        defaultLang: 'english',
        printDelay: 150,
        cleanupDelay: 1200
    };

    function escHtml(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/\n/g, '<br>');
    }

    function pickText(obj, lang) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[lang] || obj.english || '';
    }

    function getCurrentLang() {
        const badge = document.getElementById('language-badge');
        const txt = ((badge && badge.textContent) || '').trim().toLowerCase();
        if (txt.includes('हिं') || txt.includes('hindi')) return 'hindi';
        return 'english';
    }

    function getBookTitle() {
        const tabs = (window.SUBJECT_TABS && window.SUBJECT_TABS.MAIN_TABS) || [];
        const tab = tabs[window.__currentMainIndex || 0];
        return (tab && pickText(tab.name, 'english')) || 'Book';
    }

    function buildPageHTML(page, pageNum, lang) {
        const chapter = pickText(page.chapterTitle, lang);
        const topic = pickText(page.topicTitle, lang);
        const title = pickText(page.conceptTitle, lang);
        const desc = pickText(page.conceptDesc, lang) || 'No content.';
        const color = page.chapterColor || '#b8a690';

        return `
            <div class="pdf-book-page">
                <div class="book-chapter-tag" style="border-left:3px solid ${color};">${escHtml(chapter)}</div>
                <div class="book-topic-title">${escHtml(topic)}</div>
                <div class="book-concept-title">${escHtml(title)}</div>
                <div class="book-concept-body">${escHtml(desc)}</div>
                <div class="book-page-number">page ${pageNum}</div>
            </div>
        `;
    }

    function exportBookToPDF(pages, lang, bookTitle) {
        if (!pages || !pages.length) {
            alert('No pages to export!');
            return;
        }

        const old = document.getElementById('pdfPrintContainer');
        if (old) old.remove();

        const container = document.createElement('div');
        container.id = 'pdfPrintContainer';
        container.innerHTML = pages.map((p, i) => buildPageHTML(p, i + 1, lang)).join('');
        document.body.appendChild(container);

        const oldTitle = document.title;
        document.title = bookTitle || 'Book';

        setTimeout(() => {
            window.print();
            setTimeout(() => {
                document.title = oldTitle;
                const c = document.getElementById('pdfPrintContainer');
                if (c) c.remove();
            }, CONFIG.cleanupDelay);
        }, CONFIG.printDelay);
    }

    function askLanguage() {
        if (!CONFIG.confirmHindi) return CONFIG.defaultLang;
        const useHindi = confirm('Hindi mein export karein?\n\nOK = Hindi (हिंदी)\nCancel = English');
        return useHindi ? 'hindi' : 'english';
    }

    function handleTopicwisePDF(e) {
        if (e) { e.stopPropagation(); e.preventDefault(); }
        const pages = (window.BookView && window.BookView.getPages) ? window.BookView.getPages() : [];
        exportBookToPDF(pages, askLanguage(), getBookTitle());
    }

    function handleCompletePDF(e) {
        if (e) { e.stopPropagation(); e.preventDefault(); }
        const pages = (window.CompleteBookView && window.CompleteBookView.getPages) ? window.CompleteBookView.getPages() : [];
        exportBookToPDF(pages, askLanguage(), 'Complete Book');
    }

    function makeButton(id, handler) {
        const btn = document.createElement('button');
        btn.id = id;
        btn.type = 'button';
        btn.className = 'book-pdf-btn';
        btn.title = 'Download as PDF';
        btn.textContent = CONFIG.buttonLabel;
        btn.addEventListener('click', handler);
        return btn;
    }

    function ensureButton(buttonId, barSelector, handler, insertBeforeSelector) {
        const existing = document.getElementById(buttonId);
        if (existing) {
            if (!existing.dataset.pdfBound) {
                existing.dataset.pdfBound = '1';
                existing.addEventListener('click', handler);
            }
            return;
        }
        if (!CONFIG.autoInjectButtons) return;

        const bar = document.querySelector(barSelector);
        if (!bar) return;

        const btn = makeButton(buttonId, handler);
        const anchor = insertBeforeSelector ? bar.querySelector(insertBeforeSelector) : null;
        if (anchor) bar.insertBefore(btn, anchor);
        else bar.appendChild(btn);
    }

    function bindAll() {
        ensureButton('bookPdfBtn', '#bookView .book-syllabus-bar', handleTopicwisePDF, '.book-search-box');
        ensureButton('cbPdfBtn', '#completeBookView .book-syllabus-bar', handleCompletePDF, '.book-search-box');
    }

    function init() { bindAll(); }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 1200));
    } else {
        setTimeout(init, 1200);
    }

    // Retry to catch dynamically rendered bars
    let tries = 0;
    const retryIv = setInterval(() => {
        tries++;
        bindAll();
        if (tries > 15) clearInterval(retryIv);
    }, 2500);

    window.BookPDFExport = {
        export: exportBookToPDF,
        exportTopicwise: function (lang) {
            const pages = (window.BookView && window.BookView.getPages) ? window.BookView.getPages() : [];
            exportBookToPDF(pages, lang || getCurrentLang(), getBookTitle());
        },
        exportComplete: function (lang) {
            const pages = (window.CompleteBookView && window.CompleteBookView.getPages) ? window.CompleteBookView.getPages() : [];
            exportBookToPDF(pages, lang || getCurrentLang(), 'Complete Book');
        },
        version: '2.0.0'
    };
})();