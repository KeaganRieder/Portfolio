import React, { useState, useRef, useEffect } from 'react';

import type { Position, Size } from "../../types/vectors";
import type { VisibilityControls } from './definition';

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
        RegistryControls.closeAppWindow(appid);
    };

    return {
        isVisible: isVisible && !isMinimized,
        isMinimized,
        open,
        close,
        minimize,
    };
}

const getWindowWidth = (percentSize: number, minWidth: number, offset: number) => {
    return Math.min(window.innerWidth * percentSize, minWidth) + offset;
}
const getWindowHeight = (percentSize: number, minHeight: number, offset: number) => {
    return Math.min(window.innerHeight * percentSize, minHeight) + offset;
}

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

        const onMouseDown = (event: React.MouseEvent) => {
            setIsDragging(true);
            dragOffset.current = {
                x: event.clientX - position.x,
                y: event.clientY - position.y
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

            const handleMouseUp = () => {
                setIsDragging(false);
            };

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }, [isDragging]);

        useEffect(() => {
            if (dragOffset.current.x !== 0 && dragOffset.current.y !== 0) {
                setPos({
                    x: Math.max((windowContainerSize.width - size.width) / 2 + currentOffset.x, 0),
                    y: Math.max((windowContainerSize.height - size.height) / 2 + currentOffset.y, 0),
                });
            }

        }, [size.width, size.height]);

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
            isDragging,
        }
    }
