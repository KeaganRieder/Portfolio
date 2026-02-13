export const openLinkInNewTab = (url: string) => () => {
    window.open(url, '_blank');
};

export const downloadFile = (filePath: string, fileName: string) => () => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.click();
};