// mobile-notifications.js
// Native Android notifications with scheduling + browser fallback
(function () {
    'use strict';

    const isCapacitor = typeof window.Capacitor !== 'undefined'
        && window.Capacitor.isNativePlatform
        && window.Capacitor.isNativePlatform();

    let LocalNotifications = null;
    let permissionOK = false;
    let browserTimer = null;
    let appInForeground = !document.hidden;

    const CFG = {
        CHANNEL_ID: 'study_flashcards_v3',
        CHANNEL_NAME: 'Study Flashcards',
        CHANNEL_DESC: 'Flashcard study reminders',
        SMALL_ICON: 'ic_stat_icon_config_sample',
        ICON_COLOR: '#667eea',
        SCHEDULE_COUNT: 60,
        SCHEDULE_INTERVAL_MIN: 5,
        TEST_DELAY_MS: 3000,
        NOTIF_GROUP: 'flashcards_group'
    };

    /* ---- App state ---- */

    document.addEventListener('visibilitychange', () => {
        const next = !document.hidden;
        if (next === appInForeground) return;
        appInForeground = next;

        if (appInForeground) {
            pauseNotifications();
        } else {
            resumeNotifications();
        }
    });

    async function pauseNotifications() {
        if (!isCapacitor || !LocalNotifications) return;
        try {
            const pending = await LocalNotifications.getPending();
            if (pending.notifications.length) {
                await LocalNotifications.cancel({ notifications: pending.notifications });
            }
        } catch (e) { /* ignore */ }
    }

    async function resumeNotifications() {
        if (!isCapacitor || !LocalNotifications || !permissionOK) return;
        scheduleFlashcards(CFG.SCHEDULE_COUNT, CFG.SCHEDULE_INTERVAL_MIN);
    }

    /* ---- Init ---- */

    async function init() {
        if (!isCapacitor) {
            initBrowserMode();
            return;
        }
        try {
            LocalNotifications = window.Capacitor.Plugins.LocalNotifications;
            if (!LocalNotifications) return;

            const perm = await LocalNotifications.checkPermissions();
            if (perm.display !== 'granted') {
                const req = await LocalNotifications.requestPermissions();
                if (req.display !== 'granted') return;
            }
            permissionOK = true;

            try {
                await LocalNotifications.createChannel({
                    id: CFG.CHANNEL_ID,
                    name: CFG.CHANNEL_NAME,
                    description: CFG.CHANNEL_DESC,
                    importance: 4,
                    visibility: 1,
                    vibration: true,
                    lights: true,
                    lightColor: CFG.ICON_COLOR
                });
            } catch (e) { /* ignore */ }

            setTimeout(sendTest, CFG.TEST_DELAY_MS);

            window.addEventListener('allCardsReady', () => {
                if (!appInForeground) {
                    scheduleFlashcards(CFG.SCHEDULE_COUNT, CFG.SCHEDULE_INTERVAL_MIN);
                }
            });

            if (!appInForeground) {
                scheduleFlashcards(CFG.SCHEDULE_COUNT, CFG.SCHEDULE_INTERVAL_MIN);
            }
        } catch (e) {
            console.warn('Notification init failed:', e.message);
        }
    }

    /* ---- Browser fallback ---- */

    async function initBrowserMode() {
        if (typeof Notification === 'undefined') return;
        if (Notification.permission === 'default') {
            try { await Notification.requestPermission(); } catch (e) { /* ignore */ }
        }
        if (Notification.permission !== 'granted') return;

        permissionOK = true;

        setTimeout(() => {
            if (!appInForeground) sendBrowserNotification('🎓 Ready!', 'Notifications are working.');
        }, CFG.TEST_DELAY_MS);

        setTimeout(startBrowserInterval, 5000);
    }

    function sendBrowserNotification(title, body) {
        if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
        if (appInForeground) return;
        try { new Notification(title, { body, tag: 'card-' + Date.now() }); } catch (e) { /* ignore */ }
    }

    function startBrowserInterval() {
        if (browserTimer) clearInterval(browserTimer);
        browserTimer = setInterval(() => {
            if (appInForeground) return;
            const cards = window.allCards;
            if (!cards || !cards.length) return;
            const c = cards[Math.floor(Math.random() * cards.length)];
            sendBrowserNotification(`🎴 ${c.subject || 'Concept'}`, c.name || c.body || 'Tap to learn!');
        }, CFG.SCHEDULE_INTERVAL_MIN * 60 * 1000);
    }

    /* ---- Native ---- */

    function buildLargeBody(card) {
        const name = card.name || card.body || 'Tap to learn something new!';
        const subject = card.subject || card.title || 'Study';
        return `📖 ${name}\n\n📚 Subject: ${subject}\n\n👆 Tap to read more.`;
    }

    function fallbackCards() {
        return [
            { subject: '🌍 General Knowledge', name: 'National symbols of India' },
            { subject: '📜 Constitution', name: 'Article 14: Equality before law' },
            { subject: '🏛️ Polity', name: 'Fundamental Rights (Articles 12-35)' },
            { subject: '📅 History', name: 'Indian Independence: 15 August 1947' },
            { subject: '🗺️ Geography', name: 'Longest river in India: Ganges' },
            { subject: '💡 Science', name: 'SI unit of force: Newton' }
        ];
    }

    async function sendTest() {
        if (!LocalNotifications || !permissionOK) return;
        try {
            await LocalNotifications.schedule({
                notifications: [{
                    id: 1,
                    title: '🎓 Ready!',
                    body: 'Notifications are working.',
                    largeBody: '🎓 Ready!\n\n✅ Notifications are working.\n\n📚 Flashcards will appear at intervals.',
                    summaryText: CFG.CHANNEL_NAME,
                    channelId: CFG.CHANNEL_ID,
                    smallIcon: CFG.SMALL_ICON,
                    iconColor: CFG.ICON_COLOR,
                    style: 'bigtext',
                    schedule: { at: new Date(Date.now() + 100) },
                    autoCancel: true,
                    visibility: 1,
                    priority: 2,
                    sound: 'default',
                    vibrate: true,
                    group: CFG.NOTIF_GROUP,
                    groupSummary: false
                }]
            });
        } catch (e) { /* ignore */ }
    }

    async function scheduleFlashcards(count, intervalMin, retries) {
        if (!LocalNotifications || !permissionOK || appInForeground) return;
        if (typeof retries === 'undefined') retries = 10;

        let pool = window.allCards;
        if (!pool || !Array.isArray(pool) || !pool.length) {
            if (retries > 0) {
                setTimeout(() => scheduleFlashcards(count, intervalMin, retries - 1), 500);
                return;
            }
            pool = fallbackCards();
        }

        try {
            const pending = await LocalNotifications.getPending();
            if (pending.notifications.length) {
                await LocalNotifications.cancel({ notifications: pending.notifications });
            }

            const now = Date.now();
            const notifications = [];

            for (let i = 0; i < count; i++) {
                const card = pool[Math.floor(Math.random() * pool.length)];
                const at = new Date(now + (i + 1) * intervalMin * 60 * 1000);
                notifications.push({
                    id: 100 + i,
                    title: `🎴 ${card.subject || card.title || 'Study'}`,
                    body: card.name || card.body || 'Tap to learn!',
                    largeBody: buildLargeBody(card),
                    summaryText: CFG.CHANNEL_NAME,
                    channelId: CFG.CHANNEL_ID,
                    smallIcon: CFG.SMALL_ICON,
                    iconColor: CFG.ICON_COLOR,
                    style: 'bigtext',
                    schedule: { at, allowWhileIdle: true },
                    autoCancel: true,
                    visibility: 1,
                    priority: 2,
                    sound: 'default',
                    vibrate: true,
                    group: CFG.NOTIF_GROUP,
                    groupSummary: false
                });
            }

            await LocalNotifications.schedule({ notifications });
        } catch (e) {
            console.warn('Schedule failed:', e.message);
        }
    }

    /* ---- Public API ---- */

    window.MobileNotifications = {
        init,
        showNotification: async (title, body) => {
            if (appInForeground) return;
            if (!isCapacitor) {
                sendBrowserNotification(title, body);
                return;
            }
            if (!LocalNotifications || !permissionOK) return;
            try {
                await LocalNotifications.schedule({
                    notifications: [{
                        id: Math.floor(Math.random() * 10000),
                        title, body,
                        largeBody: body + '\n\n👆 Tap to read more.',
                        summaryText: CFG.CHANNEL_NAME,
                        channelId: CFG.CHANNEL_ID,
                        smallIcon: CFG.SMALL_ICON,
                        iconColor: CFG.ICON_COLOR,
                        style: 'bigtext',
                        schedule: { at: new Date(Date.now() + 100) },
                        visibility: 1,
                        priority: 2,
                        group: CFG.NOTIF_GROUP,
                        groupSummary: false
                    }]
                });
            } catch (e) { /* ignore */ }
        },
        test: sendTest,
        schedule: (count, minutes) => {
            if (!isCapacitor) return;
            scheduleFlashcards(count || CFG.SCHEDULE_COUNT, minutes || CFG.SCHEDULE_INTERVAL_MIN);
        },
        cancelAll: async () => {
            if (!LocalNotifications) return;
            try {
                const pending = await LocalNotifications.getPending();
                if (pending.notifications.length) {
                    await LocalNotifications.cancel({ notifications: pending.notifications });
                }
            } catch (e) { /* ignore */ }
        },
        getPendingCount: async () => {
            if (!LocalNotifications) return 0;
            try {
                const pending = await LocalNotifications.getPending();
                return pending.notifications.length;
            } catch (e) { return 0; }
        },
        getAppState: () => appInForeground ? 'ON' : 'OFF'
    };

    function bootstrap() { setTimeout(init, 1000); }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
        bootstrap();
    }
})();