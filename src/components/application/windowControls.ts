import React, { useState, useRef, useEffect } from 'react';

import type { Position, Size } from "../../types/vectors";
import type { ApplicationState, VisibilityControls } from './definition';
import type { ApplicationRegistryControls } from '../../features/desktop/appRegistry';


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


export const WindowRectControls = (sizeBounds: Size, initialSize: Size = { width: 0, height: 0 }, initialPosition: Position = { x: 0, y: 0 }) => {
    const [size, setSize] = useState<Size>(initialSize);
    const [position, setPos] = useState<Position>(initialPosition);
    const offset = useRef<Position>({ x: 0, y: 0 });

    const [isDragging, setIsDragging] = React.useState(false);


    const onMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true);
        offset.current = {
            x: event.clientX - position.x,
            y: event.clientY - position.y
        };
    }

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

    return {
        size,
        position,
        onMouseDown,
        onMouseMove,
        onMouseUp,
    }
}
