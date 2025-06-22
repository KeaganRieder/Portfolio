import React from 'react';
import type { AppProperties } from './Types';
import Shortcut from './Shortcut';
import '../../styles/ApplicationStyles.css';

const Application: React.FC<AppProperties> = ({
    appInfo,
    content,
    onClose,
    contentRenderer,
    appStyles,
    customActions
}) => {

    const open

    return (
        <div>
            <h1>{appInfo.name}</h1>
            <p>{appInfo.text}</p>
            
        </div>
    );
};

export default Application;
