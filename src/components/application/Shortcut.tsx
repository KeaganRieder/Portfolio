import React from 'react';

import '../../styles/applications/Shortcuts.css';
import type { ShortcutProperties } from './ShortcutProperties';

const AppShortcut: React.FC<ShortcutProperties> = ({ name, iconSrc, fileName, fileUrl, linkUrl, action }) => {
    const trackEvent = (
        eventName: string,
        params?: Record<string, any>
    ) => {
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", eventName, params);
            console.log("gtag event tracked:", eventName, params);
        } else {
            console.warn("gtag not found");
        }
    };
    
    const clickAction = () => {
        if (action) {
            action();
        } else if (linkUrl) {
            window.open(linkUrl, '_blank');
        } else if (fileUrl && fileName) {
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = fileName;
            link.click();
        }
        trackEvent('shortcut_click', { shortcut_name: name });
    };
    
    return (
        <button className="shortcut" onClick={clickAction}>
            <img
                src={iconSrc}
                alt={name + '_icon'}
                className="shortcut-icon"
            />
            <p className="shortcut-label">{name}</p>
        </button>
    );
}

export default AppShortcut;