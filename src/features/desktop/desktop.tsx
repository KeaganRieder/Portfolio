
import React, { useEffect, useState } from "react";
import { ApplicationShortcut } from "../../components/shortcut/applicationShortcut";

import './desktop.css'

import textDocIcon from '../../assets/apps/text_doc.png';
import { ApplicationRegistry } from "./appRegistry";

export const Desktop: React.FC = () => {

    const [currentTime, setCurrentTime] = useState(new Date());
    const [shortcutContainer, setShortcutContainer] = useState<HTMLElement | null>(null);
    const [taskbarContainer, setTaskbarContainer] = useState<HTMLElement | null>(null);
    const [appContainer, setAppContainer] = useState<HTMLElement | null>(null);

    const appRegistry = ApplicationRegistry(shortcutContainer!, taskbarContainer!, appContainer!);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const createTaskbar = () => {
        const createClock = () => {
            return (
                <div id="taskbar-clock">
                    <div className='time'>{formatTime(currentTime)}</div>
                    <div className='date'>{formatDate(currentTime)}</div>
                </div>
            );
        };
        const createShortcutContainer = () => {
            return (
                <div
                    id="taskbar-shortcut-container"
                    ref={(element: HTMLElement | null) => setTaskbarContainer(element)}>
                </div>
            );
        };

        return (
            <section id="taskbar">
                {createClock()}
                {createShortcutContainer()}
            </section>
        );
    };

    const createDesktopContainer = () => {
        return (
            <>
                <section id="app-container" ref={(element: HTMLElement | null) => setAppContainer(element)}>
                    <section
                        id="shortcut-container"
                        ref={(element: HTMLElement | null) => setShortcutContainer(element)}
                    />
                </section>
            </>
        );
    };

    return (
        <section id="desktop" className="desktop">
            {createDesktopContainer()}
            {createTaskbar()}
        </section>
    );
};