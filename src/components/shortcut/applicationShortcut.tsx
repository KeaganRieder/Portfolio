import React from "react";
import ReactDOM from "react-dom";
import { ButtonClickedEvent } from "../../services/AnalyticService";
import type { ShortcutDefinition } from "./definition";

export const ApplicationShortcut: React.FC<ShortcutDefinition> = ({ id, appName, parent, iconPath, onClickAction }) => {

    const onClickHandler = () => {
        if (onClickAction) {
            onClickAction();
        }
        ButtonClickedEvent(appName, { shortcut_name: appName });
    }

    const createButton = () => {
        return (<button id={id} onClick={onClickHandler}>
            <img src={iconPath} alt={`${appName} icon`} />
            <h2>{appName}</h2>
        </button>);
    }

    // Render into provided parent via portal when available to keep buttons colocated.
    if (parent) {
        return ReactDOM.createPortal(createButton(), parent);
    }

    return <>{createButton()}</>;
};