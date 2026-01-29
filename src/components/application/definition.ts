import type { ShortcutDefinition } from "../shortcut/definition";

export interface applicationDefinition {
    id: string;
    appName: string;
    content?: React.ReactNode;
    parent?: HTMLElement | null;
    shortcutContainer?: HTMLElement | null;
    taskbarContainer?: HTMLElement | null;
    taskbarShortcut?: ShortcutDefinition;
    shortcut?: ShortcutDefinition;
}
