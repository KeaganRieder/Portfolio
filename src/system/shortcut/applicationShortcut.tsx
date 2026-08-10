import React from "react";
import ReactDOM from "react-dom";
import { ButtonClickedEvent } from "@/system/services/analyticService";
import type { ShortcutDefinition } from "./types";

/**
 * Desktop icon button that triggers an app's open action and logs an
 * analytics event. Renders via a portal into `parent` if provided,
 * otherwise inline.
 */
export const ApplicationShortcut: React.FC<ShortcutDefinition> = ({ id, appName, parent, iconPath, onClickAction }) => {

    const onClickHandler = () => {
        if (onClickAction) {
            onClickAction();
        }
        ButtonClickedEvent(appName, { shortcut_name: appName });
    }

    const createButton = () => {
        return (<button id={id} onClick={onClickHandler}>
            <img className ="shortcut-icon" src={iconPath} alt={`${appName} icon`} />
            <h2>{appName}</h2>
        </button>);
    }

    if (parent) {
        return ReactDOM.createPortal(createButton(), parent);
    }

    return <>{createButton()}</>;
};

/**
 * Taskbar icon variant of the app shortcut: icon-only button that shows a
 * name tooltip on hover (positioned via the button's bounding rect), and
 * triggers the same open action + analytics event as the desktop shortcut.
 */
export const ApplicationTaskbarShortcut: React.FC<ShortcutDefinition> = ({ id, appName, parent, iconPath, onClickAction }) => {

    const [isHovered, setIsHovered] = React.useState(false);
    const [tooltipPosition, setTooltipPosition] = React.useState<{ left: number; top: number }>({ left: 0, top: 0 });

    const onClickHandler = () => {
        if (onClickAction) {
            onClickAction();
        }
        ButtonClickedEvent(appName, { shortcut_name: appName });
    };

    // Position the tooltip using the button's own screen rect so it lines
    // up above/at the icon regardless of where it sits in the taskbar.
    const onMouseEnterHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({ left: rect.left + rect.width / 2, top: rect.top });
        setIsHovered(true);
    };

    const onMouseLeaveHandler = () => {
        setIsHovered(false);
    };

    const shortcutContent = (
        <div className="taskbar-shortcut">
            <button
                id={id}
                onClick={onClickHandler}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
            >
                <img className ="shortcut-icon" src={iconPath} alt={`${appName} icon`} />
            </button>
            {isHovered && (
                <div className="shortcut-info" style={{ left: tooltipPosition.left, top: tooltipPosition.top }}>
                    <h2>{appName}</h2>
                </div>
            )}
        </div>
    );

    if (parent) {
        return <>{ReactDOM.createPortal(shortcutContent, parent)}</>;
    }

    return <>{shortcutContent}</>;
};