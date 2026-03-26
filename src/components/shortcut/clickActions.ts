export const openLinkInNewTab = (url: string) => () => {
    window.open(url, '_blank');
};

export const openFile = (filePath: string, _fileName: string) => () => {
    window.open(filePath, '_blank');
};