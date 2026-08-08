import type { ApplicationRegistryControls } from "../../features/app_registry/appRegistry";
import type { ProjectHelpers } from "../../features/app_registry/registryTypes";
import type { ShortcutDefinition } from "../shortcut/definition";

/** Static identity of an application window: its id, display name, and search/filter tags. */
export interface ApplicationBaseInfo {
    id: string;
    appName: string;
    tags?: string[];
}

/**
 * Config passed to WindowVisibilityControls describing how a window's
 * open/close/minimize state should hook into the shared app registry.
 */
export interface VisibilityControls {
    appid: string;
    zIndex: number;
    RegistryControls: ApplicationRegistryControls;
    initialVisibility?: boolean;
    openFunctionAdditions?: () => void;
    closeFunctionAdditions?: () => void;
    minimizeFunctionAdditions?: () => void;
}

/** Full set of props the Application component needs to render a desktop-style window. */
export interface ApplicationDefinition {
    info: ApplicationBaseInfo;
    visibilityControls: VisibilityControls;
    projectRegistry?: ProjectHelpers;

    // DOM nodes (portals) the window body, desktop shortcut, and taskbar
    // shortcut should be rendered into via ReactDOM.createPortal.
    containers?: {
        appContainer?: HTMLElement | null;
        shortcutContainer?: HTMLElement | null;
        taskbarContainer?: HTMLElement | null;
    };
    // Optional desktop icon and/or taskbar icon that open this application.
    shortcuts?: {
        desktop?: ShortcutDefinition;
        taskbar?: ShortcutDefinition;
    }
    content?: {
        body?: React.ReactNode;
        contentContainerStyle?: string;
        header?: React.ReactNode;
        headerButtons?: React.ReactNode;
    }
}
