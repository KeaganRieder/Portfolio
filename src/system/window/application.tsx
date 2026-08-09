import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { ApplicationShortcut, ApplicationTaskbarShortcut } from "@/system/shortcut/applicationShortcut";
import type { ApplicationDefinition } from "./types";

import './application.css'

import xButtonIcon from '@/assets/buttons/x_button.png';
import minimizeButtonIcon from '@/assets/buttons/minimize_button.png';
import { WindowRectControls, WindowVisibilityControls } from "./windowControls";

/**
 * Renders a draggable, focusable desktop-style application window (with
 * header, minimize/close buttons, and scrollable content area), portaled
 * into `containers.appContainer`. Also renders its optional desktop and
 * taskbar shortcuts, which open the window when clicked.
 */
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

    // If the registry already lists this app as open (e.g. it was opened
    // via a shortcut elsewhere before this instance mounted), sync local
    // visibility state to match on mount/registry change.
    useEffect(() => {
        if (isOpenInRegistry) {
            visibilityController.open();
        }
    }, [isOpenInRegistry]);

    // Renders the desktop shortcut icon (if provided), wiring its click
    // handler to open this window.
    const TryToCreateShortcut = () => {
        if (shortcuts?.desktop) {
            shortcuts.desktop.onClickAction = visibilityController.open;
            return <ApplicationShortcut {...shortcuts.desktop} parent={containers?.shortcutContainer} />;
        }
        return <></>;
    };

    // Renders the taskbar icon, but only while the window is open or
    // minimized (i.e. not when it's fully closed).
    const TryToCreateTaskbarShortcut = () => {
        if ((visibilityController.isVisible || visibilityController.isMinimized) && shortcuts?.taskbar) {
            shortcuts.taskbar.onClickAction = visibilityController.open;
            return <ApplicationTaskbarShortcut {...shortcuts.taskbar} parent={containers?.taskbarContainer} />;
        }
        return <></>;
    };

    // Scrollable body wrapper for the window's custom content.
    const appContent = () => {
        return (
            <div className="application-content">
                <div className={"application-content-scroll-container " + (content?.contentContainerStyle || "")}>
                    {content?.body}
                </div>
            </div>
        );
    };

    // Draggable title bar with the app name, optional extra header content,
    // and the minimize/close buttons. Mouse/touch down here starts a drag.
    const appHeader = () => {
        return (
            <div id={`${info.id}-header`} className="application-header"
                onMouseDown={windowRectControls.onMouseDown}
                onTouchStart={windowRectControls.OnTouchStart}
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
                        <img className="minimize-button" src={minimizeButtonIcon} alt="Minimize" />
                    </button>
                    <button onClick={visibilityController.close}>
                        <img src={xButtonIcon} alt="Close" />
                    </button>
                </div>
            </div>
        );
    }

    // Full window: sized/positioned via inline styles from windowRectControls,
    // stacked using the registry-resolved z-index, and only rendered when
    // visible (returns nothing while closed/minimized).
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
                    // Clicking anywhere on the window brings it to front.
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