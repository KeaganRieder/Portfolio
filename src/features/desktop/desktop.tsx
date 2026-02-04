import React, { useEffect, useState } from "react";

import './desktop.css'

// import textDocIcon from '../../assets/apps/text_doc.png';
import { ApplicationRegistry } from "./appRegistry";
import SearchBar from "../../components/search_bar/serachBar";

export const Desktop: React.FC = () => {

    const [currentTime, setCurrentTime] = useState(new Date());

    const appRegistry = ApplicationRegistry();

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
                <div id="taskbar-shortcut-container">
                    <div className="taskbar-shortcut-scroll-container"
                        ref={(element: HTMLElement | null) => appRegistry.setTaskbarShortcutContainer(element)}
                    >
                    </div>
                </div>
            );
        };
        const taskbarSearchBar = () => {
            return (
                <div id="taskbar-searchbar-container">
                    <SearchBar placeholder="Search..." onSearchChange={(query: string) => {
                        // console.log("Searching for: " + query);
                    }} />
                </div>
            );
        }
        return (
            <section id="taskbar">
                {taskbarSearchBar()}
                {createClock()}
                {createShortcutContainer()}

            </section>
        );
    };

    const createDesktopContainer = () => {
        return (
            <>
                <section id="app-container" ref={(element: HTMLElement | null) => appRegistry.setAppContainer(element)}>
                    <section
                        id="shortcut-container"
                        ref={(element: HTMLElement | null) => appRegistry.setShortcutContainer(element)}
                    />
                </section>
                {appRegistry.CreateExternalApps()}
                {appRegistry.createAppsFromRegistry()}
                {appRegistry.createProjectsFromRegistry()}
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