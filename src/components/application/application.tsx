import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { ApplicationShortcut } from "../shortcut/applicationShortcut";
import type { ApplicationDefinition } from "./new/definition";

import './application.css'

import xButtonIcon from '../../assets/apps/close_button.png';
import minimizeButtonIcon from '../../assets/apps/close_button.png';
import { WindowControls } from "./controls";
import { WindowVisibilityControls } from "./windowControls";

export const Application: React.FC<ApplicationDefinition> = ({ info,visibilityControls, applicationStateInfo, containers, shortcuts, content }) => {

    const visibilityController = WindowVisibilityControls({
        appid: info.id,
        RegistryControls: visibilityControls.RegistryControls,
        initialVisibility: visibilityControls.initialVisibility ?? true,
        zIndex: visibilityControls.zIndex ?? 1
    });
    const windowControls = WindowControls(
        { x: window.innerWidth, y: window.innerHeight },
        {
            x: Math.min(window.innerWidth * 1, 1700),
            y: Math.min(window.innerHeight * 0.9, 800)
        },
        { x: 100, y: 100 });

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

    const createContentContainer = () => {
        return (
            <div className="application-content">
                <div className="application-content-scroll-container">
                    {content?.body}
                </div>
            </div>
        );
    };
    const createHeader = () => {
        return (
            <div id={`${info.id}-header`} className="application-header" onMouseDown={windowControls.onMouseDown}
                ref={(element: HTMLElement | null) => { headerElement.current = element; }}>
                <h1>{info.appName}</h1>
                {content?.header && (
                    <div className="application-header-slot">{content.header}</div>
                )}
                <div className="header-button-group">
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

    return (
        <>
            {TryToCreateShortcut()}
            {TryToCreateTaskbarShortcut()}
            <section id={info.id}
                className="application" style={{
                    top: windowControls.position.y, left: windowControls.position.x,
                    width: windowControls.size.x, height: windowControls.size.y,
                    zIndex: visibilityControls.zIndex
                }}>
                {createHeader()}
                {createContentContainer()}
            </section>
        </>
    );
}