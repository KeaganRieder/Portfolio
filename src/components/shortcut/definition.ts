export interface ShortcutDefinition {
    id: string;
    appName: string;
    parent?: HTMLElement | null;
    iconPath: string;
    onClickAction?: () => void;
}