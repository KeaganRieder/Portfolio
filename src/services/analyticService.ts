type GtagFunction = (command: string, eventName: string, params?: Record<string, unknown>) => void;

/**
 * Reports a button-click interaction to Google Analytics (via the global `gtag` function) as
 * a custom event named `id`, with optional extra event params. No-ops with a console warning
 * if gtag/GA hasn't been initialized on the page (e.g. during local dev).
 */
export const ButtonClickedEvent = (id: string, param?: Record<string, unknown>) => {
    const gtag = (window as unknown as { gtag?: GtagFunction }).gtag;
    if (typeof window !== 'undefined' && gtag) {
        gtag('event', id, param);
    }
    else {
        console.warn('Google Analytics not initialized');
    }
};