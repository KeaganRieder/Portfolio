import React from 'react';
import type { ShortcutProperties } from './Types';
import '../../styles/ApplicationStyles.css';

const Shortcut: React.FC<ShortcutProperties> = ({ appInfo, onOpen }) => {
    return (
        <div
            className="shortcut"
            onClick={onOpen}        >
            <img src={appInfo.iconSrc} alt={appInfo.name} className="shortcut-icon" />
            <h4 className="shortcut-text">{appInfo.name}</h4>
        </div>
    );
};

export default Shortcut;
