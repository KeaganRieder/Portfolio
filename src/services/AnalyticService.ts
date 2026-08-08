type GtagFunction = (command: string, eventName: string, params?: Record<string, unknown>) => void;

export const ButtonClickedEvent = (id: string, param?: Record<string, unknown>) => {
    const gtag = (window as unknown as { gtag?: GtagFunction }).gtag;
    if (typeof window !== 'undefined' && gtag) {
        gtag('event', id, param);
    }
    else {
        console.warn('Google Analytics not initialized');
    }
};