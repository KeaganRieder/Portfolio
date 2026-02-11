import type { ApplicationRegistryControls } from "../../features/desktop/appRegistry";
import type { ShortcutDefinition } from "../shortcut/definition";

export interface ApplicationState {
    value: any;
    setValue: (id: string, value: any) => void;
}

export interface ApplicationBaseInfo {
    id: string;
    appName: string;
    tags?: string[];
}

export interface VisibilityControls {
    appid: string;
    zIndex: number;
    RegistryControls: ApplicationRegistryControls;
    initialVisibility?: boolean;
    openFunctionAdditions?: () => void;
    closeFunctionAdditions?: () => void;
    minimizeFunctionAdditions?: () => void;
}

export interface ApplicationDefinition {
    info: ApplicationBaseInfo;
    visibilityControls: VisibilityControls;
    containers?: {
        appContainer?: HTMLElement | null;
        shortcutContainer?: HTMLElement | null;
        taskbarContainer?: HTMLElement | null;
    };
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