import React from 'react';
import type { ShortcutProperties } from './Properties.ts';
import '../../styles/applications/Shortcuts.css';

const AppShortcut: React.FC<ShortcutProperties> = ({ appInfo, onClick }) => {
    return (
        <button className="shortcut" onClick={onClick}>
            <img
                src={appInfo.iconSrc}
                alt={appInfo.name + '_icon'}
                className="shortcut-icon"
            />
            <p className="shortcut-label">{appInfo.name }</p>
        </button>
    );
}

export default AppShortcut;