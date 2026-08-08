/** Props shared by desktop and taskbar shortcut buttons (icon, label, click action, portal target). */
export interface ShortcutDefinition {
    id: string;
    appName: string;
    parent?: HTMLElement | null;
    iconPath: string;
    onClickAction?: () => void;
}