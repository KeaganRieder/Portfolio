import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AppShortcut from './Shortcut.tsx';
import type { AppProperties } from './Properties.ts';
import '../../styles/applications/Application.css';
import xButton from '../../assets/apps/close_button.png';
 

const Application: React.FC<AppProperties> = ({ appInfo, children, visible = false }) => {

    const [isVisible, setIsVisible] = useState(visible);

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

    // const appTaskbarIcon = (
    //     <div> todo </div>
    // )

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
            {ReactDOM.createPortal(appShortcut, document.getElementById('shortcuts')!)}
        </>
    );
}

export default Application;