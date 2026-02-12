import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { ApplicationShortcut, ApplicationTaskbarShortcut } from "../shortcut/applicationShortcut";
import type { ApplicationDefinition } from "./definition";

import './application.css'

import xButtonIcon from '../../assets/apps/buttons/x_button.png';
import minimizeButtonIcon from '../../assets/apps/buttons/minimize_button.png';
import { WindowRectControls, WindowVisibilityControls } from "./windowControls";

export const Application: React.FC<ApplicationDefinition> = ({ info, visibilityControls, containers, shortcuts, content }) => {

    const visibilityController = WindowVisibilityControls({
        appid: info.id,
        RegistryControls: visibilityControls.RegistryControls,
        initialVisibility: visibilityControls.initialVisibility ?? true,
        zIndex: visibilityControls.zIndex ?? 1,
    });
    const windowRectControls = WindowRectControls(
        { width: 0, height: 0 },
        { x: 0, y: -50 },
        containers?.appContainer ? {
            width: containers.appContainer.clientWidth,
            height: containers.appContainer.clientHeight,
        } : undefined
    );

    const headerElement = useRef<HTMLElement | null>(null);
    const isOpenInRegistry = visibilityControls.RegistryControls.getAppWindowInfo(info.id) !== undefined;

    useEffect(() => {
        if (isOpenInRegistry) {
            visibilityController.open();
        }
    }, [isOpenInRegistry]);

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
            return <ApplicationTaskbarShortcut {...shortcuts.taskbar} parent={containers?.taskbarContainer} />;
        }
        return <></>;
    };

    const appContent = () => {
        return (
            <div className="application-content">
                <div className={"application-content-scroll-container " + (content?.contentContainerStyle || "")}>
                    {content?.body}
                </div>
            </div>
        );
    };

    const appHeader = () => {
        return (
            <div id={`${info.id}-header`} className="application-header"
                onMouseDown={windowRectControls.onMouseDown}
                ref={(element: HTMLElement | null) => { headerElement.current = element; }}
                style={{ cursor: windowRectControls.isDragging ? 'grabbing' : 'grab' }}
            >
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
        const resolvedZIndex = visibilityControls.RegistryControls.getAppWindowZIndex(info.id);
        if (visibilityController.isVisible) {
            return (
                <section id={info.id}
                    className="application" style={{
                        width: `${windowRectControls.size.width}px`,
                        height: `${windowRectControls.size.height}px`,
                        transform: `translate(${windowRectControls.position.x}px, ${windowRectControls.position.y}px)`,
                        zIndex: resolvedZIndex,
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