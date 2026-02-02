import React, { useState, useRef, useEffect } from 'react';

import type { Position, Size } from "../../types/vectors";
import type { VisibilityControls } from './definition';

export const WindowVisibilityControls = (visibilityControls: VisibilityControls) => {
    const { appid, RegistryControls, initialVisibility = true } = visibilityControls;
    const [isVisible, setIsVisible] = useState(initialVisibility);
    const [isMinimized, setIsMinimized] = useState(false);

    const previousState = useRef({ isVisible, isMinimized });

    useEffect(() => {
        previousState.current = { isVisible, isMinimized };
    }, [isVisible, isMinimized]);

    const open = () => {
        setIsVisible(true);
        setIsMinimized(false);
        RegistryControls.addAppWindowFunction({ id: appid });
        RegistryControls.bringToFrontFunction(appid);
    };

    const close = () => {
        setIsVisible(false);
        setIsMinimized(false);
        RegistryControls.removeAppWindowFunction(appid);
    };

    const minimize = () => {
        setIsMinimized(true);
        RegistryControls.removeAppWindowFunction(appid);
    };

    return {
        isVisible: isVisible && !isMinimized,
        isMinimized,
        open,
        close,
        minimize,
    };
}

export const WindowRectControls = (sizeBounds: Size, initialSizeOffset: Size = { width: 0, height: 0 }, initialPositionOffset: Position = { x: 0, y: 0 }) => {
    const initialWidth = Math.min(window.innerWidth * 1, 1700) + initialSizeOffset.width;
    const initialHeight = Math.min(window.innerHeight * 0.8, 800) + initialSizeOffset.height;

    const [size, setSize] = useState<Size>({
        width: initialWidth,
        height: initialHeight
    });

    const [position, setPos] = useState<Position>(() => ({
        x: Math.max((sizeBounds.width - initialWidth ) / 2 + initialPositionOffset.x, 0),
        y: Math.max((sizeBounds.height - initialHeight ) / 2 + initialPositionOffset.y, 0),
    }));
    const offset = useRef<Position>({ x: 0, y: 0 });

    const [isDragging, setIsDragging] = React.useState(false);


    const onMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true);
        offset.current = {
            x: event.clientX - position.x,
            y: event.clientY - position.y
        };
        event.preventDefault();
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            setPos({
                x: e.clientX - offset.current.x,
                y: e.clientY - offset.current.y
            });
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

    return {
        size,
        position,
        onMouseDown,
    }
}
