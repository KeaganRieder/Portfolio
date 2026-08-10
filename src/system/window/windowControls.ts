import React, { useState, useRef, useEffect } from 'react';

import type { Position, Size } from "@/shared/types/vectors";
import type { VisibilityControls } from './types';

/**
 * Manages a window's open/minimized/closed state and keeps the shared
 * app registry (used for taskbar, z-index, etc.) in sync with it.
 */
export const WindowVisibilityControls = (visibilityControls: VisibilityControls) => {
    const {
        appid,
        RegistryControls,
        initialVisibility = true,
    } = visibilityControls;
    const [isVisible, setIsVisible] = useState(initialVisibility);
    const [isMinimized, setIsMinimized] = useState(false);

    const previousState = useRef({ isVisible, isMinimized });

    useEffect(() => {
        previousState.current = { isVisible, isMinimized };
    }, [isVisible, isMinimized]);

    const open = () => {
        setIsVisible(true);
        setIsMinimized(false);
        RegistryControls.openAppWindow({ id: appid });
        RegistryControls.bringToFront(appid);
    };

    const close = () => {

        setIsVisible(false);
        setIsMinimized(false);
        RegistryControls.closeAppWindow(appid);
    };

    const minimize = () => {
        setIsMinimized(true);
    };

    return {
        isVisible: isVisible && !isMinimized,
        isMinimized,
        open,
        close,
        minimize,
    };
}

// Window size is capped to a percentage of the viewport OR a max pixel
// size, whichever is smaller, so windows never get comically large.
const getWindowWidth = (percentSize: number, minWidth: number, offset: number) => {
    return Math.min(window.innerWidth * percentSize, minWidth) + offset;
}
const getWindowHeight = (percentSize: number, minHeight: number, offset: number) => {
    return Math.min(window.innerHeight * percentSize, minHeight) + offset;
}

/**
 * Handles a window's size/position state, including centering it within
 * its container and dragging it via mouse or touch on the header.
 */
export const WindowRectControls =
    (
        initialSizeOffset: Size = { width: 0, height: 0 },
        initialPositionOffset: Position = { x: 0, y: 0 },
        windowContainerSize: Size = { width: window.innerWidth, height: window.innerHeight },
    ) => {
        const initialWidth = getWindowWidth(0.8, 1500, initialSizeOffset.width);
        const initialHeight = getWindowHeight(0.8, 900, initialSizeOffset.height);

        const [size, setSize] = useState<Size>({
            width: initialWidth,
            height: initialHeight
        });
        const [position, setPos] = useState<Position>(() => ({
            x: Math.max((windowContainerSize.width - size.width) / 2 + initialPositionOffset.x, 0),
            y: Math.max((windowContainerSize.height - size.height) / 2 + initialPositionOffset.y, 0),
        }));
        const [currentOffset, setCurrentOffset] = useState<Position>({ x: 0, y: 0 });
        const dragOffset = useRef<Position>({ x: 0, y: 0 });

        const [isDragging, setIsDragging] = React.useState(false);

        // Record the pointer's offset from the window's current position so
        // dragging can compute new positions relative to that fixed offset.
        const onMouseDown = (event: React.MouseEvent) => {
            setIsDragging(true);
            dragOffset.current = {
                x: event.clientX - position.x,
                y: event.clientY - position.y
            };
            event.preventDefault();
        }
        const OnTouchStart = (event: React.TouchEvent) => {
            setIsDragging(true);
            const touch = event.touches[0];
            dragOffset.current = {
                x: touch.clientX - position.x,
                y: touch.clientY - position.y
            };
            event.preventDefault();
        }
        useEffect(() => {
            const handleMouseMove = (e: MouseEvent) => {
                if (!isDragging) return;
                setCurrentOffset(
                    {
                        x: e.clientX - dragOffset.current.x,
                        y: e.clientY - dragOffset.current.y
                    }
                )
                setPos(
                    {
                        x: e.clientX - dragOffset.current.x,
                        y: e.clientY - dragOffset.current.y
                    }
                )
            };
            const handleTouchMove = (e: TouchEvent) => {
                if (!isDragging) return;
                const touch = e.touches[0];
                setCurrentOffset(
                    {
                        x: touch.clientX - dragOffset.current.x,
                        y: touch.clientY - dragOffset.current.y
                    }
                )
                setPos(
                    {
                        x: touch.clientX - dragOffset.current.x,
                        y: touch.clientY - dragOffset.current.y
                    }
                )
            }

            const handleMouseUp = () => {
                setIsDragging(false);
            };
            const handleTouchEnd = () => {
                setIsDragging(false);
            }

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            };
        }, [isDragging]);

        // Re-center the window whenever its size changes (e.g. on viewport
        // resize), but only after the user has dragged it at least once
        // (dragOffset non-zero), preserving the drag-relative position.
        useEffect(() => {
            if (dragOffset.current.x !== 0 && dragOffset.current.y !== 0) {
                setPos({
                    x: Math.max((windowContainerSize.width - size.width) / 2 + currentOffset.x, 0),
                    y: Math.max((windowContainerSize.height - size.height) / 2 + currentOffset.y, 0),
                });
            }

        }, [size.width, size.height]);

        // Recompute the capped window size whenever the browser is resized.
        useEffect(() => {
            const handleResize = () => {
                const newWidth = getWindowWidth(0.8, 1500, initialSizeOffset.width);
                const newHeight = getWindowHeight(0.8, 900, initialSizeOffset.height);
                const newSize = { width: newWidth, height: newHeight };

                setSize(newSize);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, [size.width, size.height]);

        return {
            size,
            position,
            onMouseDown,
            OnTouchStart,
            isDragging,
        }
    }
