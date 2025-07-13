import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import AppShortcut from './Shortcut.tsx';
import type { AppProperties } from './Properties.ts';
import '../../styles/applications/Application.css';
import '../../styles/desktop/Taskbar.css';
import xButton from '../../assets/apps/close_button.png';


const Application: React.FC<AppProperties> = ({ appInfo, children, visible = false }) => {

    const [isVisible, setIsVisible] = useState(visible);
    const [shortcutsContainer, setShortcutsContainer] = useState<HTMLElement | null>(null);
    const [appTaskbarContainer, setAppTaskbar] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // Find the shortcuts container after component mounts
        const shortcutContainer = document.getElementById('shortcuts');
        setShortcutsContainer(shortcutContainer);

        // Find the taskbar container after component mounts
        const taskbarContainer = document.getElementById('taskbar-shortcuts');
        setAppTaskbar(taskbarContainer);
    }, []);

    const OpenApp = () => {
        if (!isVisible) {
            setIsVisible(!isVisible);
        }
    }
    const CloseApp = () => {
        if (isVisible) {
            setIsVisible(!isVisible);
        }
    }

    const appShortcut = (
        <AppShortcut appInfo={appInfo} onClick={OpenApp} />
    );

    const appTaskbar = (
        <div className='taskbar-shortcut' style={{ display: isVisible ? 'flex' : 'none' }} onClick={OpenApp}>
            <img src={appInfo.iconSrc} alt={appInfo.name} className='taskbar-icon' />
            <span className='taskbar-icon-text'>{appInfo.name}</span>
        </div>
    )

    return (
        <>
            <div id={appInfo.name + "_app"} className='app' style={{ display: isVisible ? 'block' : 'none' }}>
                <section className='header'>
                    <h1 className='title'> {appInfo.name} </h1>
                    <button className='x-button' onClick={CloseApp}>
                        <img src={xButton} alt='closeBut' className='x-button-icon' />
                    </button>
                </section>

                <section className='content'>
                    {children}
                </section>
            </div>
            {shortcutsContainer && ReactDOM.createPortal(appShortcut, shortcutsContainer)}
            {appTaskbarContainer && ReactDOM.createPortal(appTaskbar, appTaskbarContainer)}
        </>
    );
}

export default Application;