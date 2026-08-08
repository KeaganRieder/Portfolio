import type { ApplicationRegistryControls } from "../../features/app_registry/appRegistry";
import type { ProjectHelpers } from "../../features/app_registry/registryTypes";
import type { ShortcutDefinition } from "../shortcut/definition";

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
    projectRegistry?: ProjectHelpers;

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
