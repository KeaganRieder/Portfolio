/** Curried click-handler factory: opens the given URL in a new browser tab. */
export const openLinkInNewTab = (url: string) => () => {
    window.open(url, '_blank');
};