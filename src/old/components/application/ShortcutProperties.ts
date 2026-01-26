export interface ShortcutProperties {
    name: string;
    iconSrc: string; 
    fileName?: string; 
    fileUrl?: string; 
    linkUrl?: string;
    action?: () => void;
}
