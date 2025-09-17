export interface AppInfo {
    name: string;
    iconSrc: string;
    hasShortcut?: boolean;
}

export interface ShortcutProperties {
    appInfo: AppInfo; 
    onClick: () => void; 
}

export interface AppProperties {
    appInfo: AppInfo; 
    children: React.ReactNode;
    visible?: boolean;
    onClose?: () => void;
    initialZIndex?: number;
}