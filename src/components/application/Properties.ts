export interface AppInfo {
    name: string;
    iconSrc: string;
}

export interface ShortcutProperties {
    appInfo: AppInfo; 
    onClick: () => void; 
}

export interface AppProperties {
    appInfo: AppInfo; 
    children: React.ReactNode;
    visible?: boolean; 
}