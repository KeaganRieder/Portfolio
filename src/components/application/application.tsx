import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { ApplicationShortcut } from "../shortcut/applicationShortcut";
import type { ApplicationDefinition } from "./definition";

import './application.css'

import xButtonIcon from '../../assets/apps/x_icon.png';
import minimizeButtonIcon from '../../assets/apps/minimize_Icon.png';
import { WindowRectControls, WindowVisibilityControls } from "./windowControls";

export const Application: React.FC<ApplicationDefinition> = ({ info, visibilityControls, containers, shortcuts, content }) => {

    const [containerSize, setContainerSize] = useState<{ width: number, height: number }>({
        width: window.innerWidth,
        height: window.innerHeight 
    });

    useEffect(() => {
        const updateContainerSize = () => {
            const target = containers?.appContainer;
            if (target) {
                const rect = target.getBoundingClientRect();
                setContainerSize({ width: rect.width, height: rect.height });
            } else {
                setContainerSize({ width: Math.min(window.innerWidth * 1, 1700), height: Math.min(window.innerHeight * 0.9, 800) });
            }
        };

        updateContainerSize();
        window.addEventListener('resize', updateContainerSize);
        return () => window.removeEventListener('resize', updateContainerSize);
    }, [containers?.appContainer]);

    const visibilityController = WindowVisibilityControls({
        appid: info.id,
        RegistryControls: visibilityControls.RegistryControls,
        initialVisibility: visibilityControls.initialVisibility ?? true,
        zIndex: visibilityControls.zIndex ?? 1,
    });
    const windowRectControls = WindowRectControls(
        containerSize,
        { width: 0, height: 0 },
        { x: 0, y: -50 }
    );

    const headerElement = useRef<HTMLElement | null>(null);

    const TryToCreateShortcut = () => {
        if (shortcuts?.desktop) {
            shortcuts.desktop.onClickAction = visibilityController.open;
            return <ApplicationShortcut {...shortcuts.desktop} parent={containers?.shortcutContainer} />;
        }
        return <></>;
    };
    
    const TryToCreateTaskbarShortcut = () => {
        if ((visibilityController.isVisible || visibilityController.isMinimized) && shortcuts?.taskbar) {
            shortcuts.taskbar.onClickAction = visibilityController.open;
            return <ApplicationShortcut {...shortcuts.taskbar} parent={containers?.taskbarContainer} />;
        }
        return <></>;
    };

    const appContent = () => {
        return (
            <div className="application-content">
                <div className="application-content-scroll-container">
                    {content?.body}
                </div>
            </div>
        );
    };

    const appHeader = () => {
        return (
            <div id={`${info.id}-header`} className="application-header" onMouseDown={windowRectControls.onMouseDown}
                ref={(element: HTMLElement | null) => { headerElement.current = element; }}>
                <h1>{info.appName}</h1>

                {content?.header && (
                    <div className="application-header-slot">{content.header}</div>
                )}

                <div className="header-button-group">
                    {content?.headerButtons}
                    <button onClick={visibilityController.minimize}>
                        <img src={minimizeButtonIcon} alt="Minimize" />
                    </button>
                    <button onClick={visibilityController.close}>
                        <img src={xButtonIcon} alt="Close" />
                    </button>
                </div>
            </div>
        );
    }

    const appBody = () => {
        if (visibilityController.isVisible) {
            return (
                <section id={info.id}
                    className="application" style={{
                        width: `${windowRectControls.size.width}px`,
                        height: `${windowRectControls.size.height}px`,
                        transform: `translate(${windowRectControls.position.x}px, ${windowRectControls.position.y}px)`,
                        zIndex: visibilityControls.zIndex,
                    }}
                    onMouseDown={() => visibilityControls.RegistryControls.bringToFront(info.id)}>
                    {appHeader()}
                    {appContent()}
                </section>
            );
        }
        return <></>;
    }

    return (
        <>
            {TryToCreateShortcut()}
            {TryToCreateTaskbarShortcut()}
            {ReactDOM.createPortal(appBody(), containers?.appContainer || document.body)}
        </>
    );
}