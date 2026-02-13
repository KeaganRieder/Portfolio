export const ButtonClickedEvent = (id: string, param?: Record<string,any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', id, param);
    }
    else {
        console.warn('Google Analytics not initialized');
    }
};