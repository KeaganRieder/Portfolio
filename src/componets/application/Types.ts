/*
base info of an application
*/
export interface AppInfo {
    name: string;
    text: string;
    iconSrc: string;
}

export interface AppContent {
    content: string; // HTML content or path to content
    type: string; // Type of content (e.g., 'img', 'text', ect.)
    style: React.CSSProperties; // Style for the content
}

export interface ShortcutProperties {
    appInfo: AppInfo; // Information about the app
    onOpen: () => void; // Callback when the shortcut is clicked

}

export interface AppProperties {
    appInfo: AppInfo; // Information about the app
    content: AppContent[]; // Array of content for the app
    onClose?: () => void; // Optional callback when the app is closed

    contentRenderer?: (content: AppContent, index: number) => React.ReactNode; // Custom renderer for content
    appStyles?: {
        headerStyle?: React.CSSProperties; // Style for the header
        BodyStyle?: React.CSSProperties; // Style for the main body of the app
        footerStyle?: React.CSSProperties; // Style for the footer
    }
    customActions?: {
        onOpen?: () => void; // Callback when the app is opened
        onResize?: () => void; // Callback when the app is resized
        beforeClose?: () => boolean; // Function to check if the app can be closed
    };
}