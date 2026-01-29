import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { ApplicationShortcut } from "../shortcut/applicationShortcut";
import type { applicationDefinition } from "./definition";

import './application.css'

import xButtonIcon from '../../assets/apps/close_button.png';
import minimizeButtonIcon from '../../assets/apps/close_button.png';
import type { Position, Size } from "../../types/vectors";
import { clamp } from "../../utils/math";

export const Application: React.FC<applicationDefinition> = ({ id, appName, parent, shortcutContainer, taskbarContainer, content, headerContent, shortcut, taskbarShortcut }) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [isMinimize, setIsMinimize] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [zIndex, setZIndex] = React.useState(1);
    const [size, setSize] = useState<Size>(() => {
        const maxWidth = Math.min(window.innerWidth * 1, 1700); // Cap at 1200px max
        const maxHeight = Math.min(window.innerHeight * 0.9, 800); // Cap at 800px max
        return {
            width: maxWidth,
            height: maxHeight
        };
    });
    const [position, setPos] = useState<Position>({ x: 0, y: 0 });
    const offset = useRef<Position>({ x: 0, y: 0 });
    const headerRef = useRef<HTMLElement | null>(null);

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
        bringToFront();
    }

    const openApplication = () => {
        setIsOpen(true);
        setIsMinimize(false);
        bringToFront();
    }
    const closeApplication = () => {
        setIsOpen(false);
        setIsMinimize(false);
    }
    const minimizeApplication = () => {
        setIsOpen(false);
        setIsMinimize(true);
    }

    const bringToFront = () => {
        const allApps = document.querySelectorAll('.app');
        let maxZIndex = Math.max(1, 100);
        allApps.forEach(app => {
            const currentZIndex = parseInt(window.getComputedStyle(app).zIndex) || 1000;
            if (currentZIndex > maxZIndex) {
                maxZIndex = currentZIndex;
            }
        });

        setZIndex(maxZIndex + 1);
    };

    const TryToCreateShortcut = () => {
        if (shortcut) {
            shortcut.onClickAction = openApplication;
            return <ApplicationShortcut {...shortcut} parent={shortcutContainer} />;
        }
        return <></>;
    };
    const TryToCreateTaskbarShortcut = () => {
        if ((isOpen || isMinimize) && taskbarShortcut) {
            taskbarShortcut.onClickAction = openApplication;
            return <ApplicationShortcut {...taskbarShortcut} parent={taskbarContainer} />;
        }
        return <></>;
    };

    const createApp = () => {
        if (!isOpen) return <></>;
        const createContentContainer = () => {
            return (
                <div className="application-content">
                    <div className="application-content-scroll-container">
                        {content}
                    </div>
                </div>
            );
        };
        const createHeader = () => {
            return (
                <div id={`${id}-header`} className="application-header" onMouseDown={onMouseDown} ref={(element: HTMLElement | null) => { headerRef.current = element; }}>
                    <h1>{appName}</h1>
                    {headerContent && (
                        <div className="application-header-slot">{headerContent}</div>
                    )}
                    <div className="header-button-group">
                        <button onClick={minimizeApplication}>
                            <img src={minimizeButtonIcon} alt="Minimize" />
                        </button>
                        <button onClick={closeApplication}>
                            <img src={xButtonIcon} alt="Close" />
                        </button>
                    </div>
                </div>
            );
        }
        return (
            <section id={id}
                className="application" style={{ top: position.y, left: position.x, width: size.width, height: size.height, zIndex: zIndex }}>
                {createHeader()}
                {createContentContainer()}
            </section>);
    }

    useEffect(() => {
        const parentWidth = parent?.clientWidth ?? window.innerWidth;
        const parentHeight = parent?.clientHeight ?? window.innerHeight;
        const newSize = {
            width: Math.min(parentWidth * 1, 1700),
            height: Math.min(parentHeight * 0.9, 800)
        };

        setSize(newSize);
        setPos({
            x: (parentWidth / 2) - (newSize.width / 2),
            y: (parentHeight / 2) - (newSize.height / 2)
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const parentWidth = parent?.clientWidth ?? window.innerWidth;
            const parentHeight = parent?.clientHeight ?? window.innerHeight;
            const newSize = {
                width: Math.min(parentWidth * 1, 1700),
                height: Math.min(parentHeight * 0.9, 800)
            };

            setSize(newSize);
            setPos(prev => {
                const maxX = Math.max(0, parentWidth - newSize.width);
                const maxY = Math.max(0, parentHeight - newSize.height);
                return {
                    x: clamp(prev.x, 0, maxX),
                    y: clamp(prev.y, 0, maxY)
                };
            });
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [parent]);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPos({
                    x: e.clientX - offset.current.x,
                    y: e.clientY - offset.current.y
                });
            }
        };

        const onMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        if (headerRef.current) {
            headerRef.current.style.cursor = isDragging ? "grabbing" : "grab";
        }

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [isDragging, headerRef]);

    return (
        <>
            {TryToCreateShortcut()}
            {TryToCreateTaskbarShortcut()}
            {ReactDOM.createPortal(createApp(), parent!)}
        </>
    );
};