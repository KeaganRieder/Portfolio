import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import AppShortcut from './Shortcut.tsx';
import type { AppProperties } from './ApplicationProperties.ts';
import '../../styles/applications/Application.css';
import '../../styles/desktop/Taskbar.css';
import xButton from '../../assets/apps/close_button.png';

type Position = { x: number; y: number };
type Size = { width: number; height: number };

const Application: React.FC<AppProperties> = ({ appInfo, children, visible = false }) => {

    const [isVisible, setIsVisible] = useState(visible);
    const [zIndex, setZIndex] = useState(1000);

    const [shortcutsContainer, setShortcutsContainer] = useState<HTMLElement | null>(null);
    const [appTaskbarContainer, setAppTaskbar] = useState<HTMLElement | null>(null);

    const [size, setSize] = useState<Size>(() => {
        // Calculate dynamic size based on screen dimensions
        const maxWidth = Math.min(window.innerWidth * 0.8, 1500); // Cap at 1200px max
        const maxHeight = Math.min(window.innerHeight * 0.8, 900); // Cap at 800px max
        return {
            width: maxWidth,
            height: maxHeight
        };
    });

    const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
    
    const [dragging, setDragging] = useState(false);
    const offset = useRef<Position>({ x: 0, y: 0 });

    // Center the application when size changes
    useEffect(() => {
        setPos({
            x: (window.innerWidth ) / 2,
            y: (window.innerHeight - 100) / 2
        });
    }, [size.width, size.height]);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // Bring app to front when header is clicked
        bringToFront();
        
        setDragging(true);
        offset.current = {
            x: e.clientX - pos.x,
            y: e.clientY - pos.y,
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    const bringToFront = () => {
        // Get the highest z-index among all applications
        const allApps = document.querySelectorAll('.app');
        let maxZIndex = 1000;
        
        allApps.forEach(app => {
            const currentZIndex = parseInt(window.getComputedStyle(app).zIndex) || 1000;
            if (currentZIndex > maxZIndex) {
                maxZIndex = currentZIndex;
            }
        });
        
        // Set this app's z-index to be higher than all others
        setZIndex(maxZIndex + 1);
    };

    const onMouseMove = (e: MouseEvent) => {

        let newX = e.clientX - offset.current.x;
        let newY = e.clientY - offset.current.y;

        setPos({ x: newX, y: newY });
    };

    const onMouseUp = () => {
        setDragging(false);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };

    useEffect(() => {
        // Find the shortcuts container after component mounts
        const shortcutContainer = document.getElementById('shortcuts');
        setShortcutsContainer(shortcutContainer);

        // Find the taskbar container after component mounts
        const taskbarContainer = document.getElementById('taskbar-shortcuts');
        setAppTaskbar(taskbarContainer);

        // Handle window resize to update app size and position
        const handleResize = () => {
            const maxWidth = Math.min(window.innerWidth * 0.8, 1500);
            const maxHeight = Math.min(window.innerHeight * 0.8, 900);
            const newSize = { width: maxWidth, height: maxHeight };
            
            setSize(newSize);
            // Position will be updated automatically by the useEffect above
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const OpenApp = () => {
        if (!isVisible) {
            setIsVisible(!isVisible);
        }
        // Always bring to front when opened/clicked
        bringToFront();
    }
    const CloseApp = () => {
        if (isVisible) {
            setIsVisible(!isVisible);
        }
    }

    const appShortcut = (
        appInfo.hasShortcut ? (
            <AppShortcut appInfo={appInfo} onClick={OpenApp} />
        ) : null
    );

    const appTaskbar = (
        <div className='taskbar-shortcut' style={{ display: isVisible ? 'flex' : 'none' }} onClick={bringToFront}>
            <img src={appInfo.iconSrc} alt={appInfo.name} className='taskbar-icon' />
            <span className='taskbar-icon-text'>{appInfo.name}</span>
        </div>
    )

    return (
        <>
            <div id={appInfo.name + "_app"} className='app' style={{
                display: isVisible ? 'block' : 'none',
                left: pos.x,
                top: pos.y,
                width: size.width,
                height: size.height,
                zIndex: zIndex,
            }}
            >
                <section className='header' onMouseDown={onMouseDown} style={{
                    cursor: dragging ? 'grabbing' : 'grab'
                }} >
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