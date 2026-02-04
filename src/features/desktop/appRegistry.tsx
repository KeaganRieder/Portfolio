import { useState } from "react";
import type { ApplicationDefinition } from "../../components/application/definition"
import { AboutMe } from "../about_me/aboutMe";
import type { ShortcutDefinition } from "../../components/shortcut/definition";
import { downloadFile, openLinkInNewTab } from "../../components/shortcut/clickActions";

import githubIcon from '../../assets/apps/github.png';
import linkedinIcon from '../../assets/apps/linkedin.png';
import textDocIcon from '../../assets/apps/text_doc.png';

import resume from '../../assets/job_mat/resume.pdf';
import artistCV from '../../assets/job_mat/artistCv.pdf';
import { ApplicationShortcut } from "../../components/shortcut/applicationShortcut";
import { Email } from "../email/email";
import { ProjectRegistry } from "../project_showcase/projectRegistery";

export interface AppRegistryEntry {
    id: string;
    name: string;
    component: React.FC<ApplicationDefinition>;
}

interface AppWindowData {
    id: string;
    zIndex?: number;
}

export interface ApplicationRegistryControls {
    openAppWindow: (windowData: AppWindowData) => void;
    updateAppWindow: (id: string, updatedData: Partial<AppWindowData>) => void;
    getAppWindowInfo: (id: string) => AppWindowData | undefined;
    getListOfOpenWindows: () => AppWindowData[];
    closeAppWindow: (id: string) => void;

    getAppWindowZIndex: (id: string) => number;
    updateAppWindowZIndex: (id: string, updatedZIndex: number) => void;
    bringToFront: (id: string) => void;
}

export const ApplicationRegistry = () => {
    const appRegistry: AppRegistryEntry[] = [
        {
            id: "about_me",
            name: "About Me",
            component: AboutMe,
        },
        {
            id: "email",
            name: "Email",
            component: Email,
        },
    ];
    const shortcutRegistry: ShortcutDefinition[] = [
        {
            id: "github_shortcut",
            appName: "github",
            iconPath: githubIcon,
            parent: null,
            onClickAction: openLinkInNewTab("https://github.com/KeaganRieder")

        },
        {
            id: "linkedin_shortcut",
            appName: "linkedin",
            iconPath: linkedinIcon,
            parent: null,
            onClickAction: openLinkInNewTab("https://www.linkedin.com/in/keagan-rieder/")
        },
        {
            id: "resume_shortcut",
            appName: "resume",
            iconPath: textDocIcon,
            parent: null,
            onClickAction: downloadFile(resume, 'KeaganRieder-Resume.pdf')
        },
        {
            id: "artist_cv_shortcut",
            appName: "artist_cv",
            iconPath: textDocIcon,
            parent: null,
            onClickAction: downloadFile(artistCV, 'KeaganRieder-ArtistCv.pdf')
        }
    ];

    const [openWindows, setOpenWindows] = useState<AppWindowData[]>([]);
    const [shortcutContainer, setShortcutContainer] = useState<HTMLElement | null>(null);
    const [taskbarContainer, setTaskbarContainer] = useState<HTMLElement | null>(null);
    const [appContainer, setAppContainer] = useState<HTMLElement | null>(null);

    const openAppWindow = (windowData: AppWindowData) => {
        if (getAppWindowInfo(windowData.id)) {
            windowData.zIndex = openWindows.length + 1;
            updateAppWindow(windowData.id, windowData);
            return ;
        }

        if (windowData.zIndex === undefined) {
            windowData.zIndex = openWindows.length + 1;
        }
        setOpenWindows(prevWindows => [...prevWindows, windowData]);
    }
    const updateAppWindow = (id: string, updatedData: Partial<AppWindowData>) => {
        setOpenWindows(prevWindows =>
            prevWindows.map(window =>
                window.id === id ? { ...window, ...updatedData } : window
            )
        );
    }
    const getAppWindowInfo = (id: string): AppWindowData | undefined => {
        return openWindows.find(window => window.id === id);
    }
    const getListOfOpenWindows = (): AppWindowData[] => {
        return openWindows;
    }
    const closeAppWindow = (id: string) => {
        console.log("Closing app window:", id);
        setOpenWindows(prevWindows => prevWindows.filter(window => window.id !== id));
    }

    const updateAppWindowZIndex = (id: string, updatedZIndex: number) => {
        updateAppWindow(id, { zIndex: updatedZIndex });
    }

    const getAppWindowZIndex = (id: string): number => {
        const window = openWindows.find(window => window.id === id);
        if (window === undefined || window.zIndex === undefined) {
            const maxZIndex = openWindows.reduce((max, currentWindow) => Math.max(max, currentWindow.zIndex ?? 0), 0);
            return maxZIndex + 1;
        }
        return window.zIndex;
    }

    const bringToFront = (id: string) => {
        const maxZIndex = openWindows.reduce((max, window) => Math.max(max, window.zIndex ?? 0), 0);
        updateAppWindowZIndex(id, maxZIndex + 1);
    }

    const projectRegistry = ProjectRegistry(
        {
            openAppWindow, updateAppWindow, getAppWindowInfo, closeAppWindow,
            getAppWindowZIndex, getListOfOpenWindows, updateAppWindowZIndex,
            bringToFront
        },
        {
            appContainer,
            shortcutContainer,
            taskbarContainer,
        });

    const createProjectsFromRegistry = () => {
        return <>
            {projectRegistry.displayOpen()}
            {projectRegistry.createProjectShowcase()}
        </>;
    };
    const createAppsFromRegistry = () => {
        return appRegistry.map((app) => {
            const AppComponent = app.component;
            return <AppComponent
                key={app.id}
                info={{ id: app.id, appName: app.id }}
                containers={{ shortcutContainer, taskbarContainer, appContainer }}
                visibilityControls={{
                    appid: app.id, zIndex: getAppWindowZIndex(app.id),
                    RegistryControls: {
                        openAppWindow: openAppWindow,
                        updateAppWindow: updateAppWindow,
                        getAppWindowInfo: getAppWindowInfo,
                        closeAppWindow: closeAppWindow,
                        getAppWindowZIndex: getAppWindowZIndex,
                        getListOfOpenWindows: getListOfOpenWindows,
                        updateAppWindowZIndex: updateAppWindowZIndex,
                        bringToFront: bringToFront,
                    }, initialVisibility: false
                }} />;
        });
    }

    const CreateExternalApps = () => {
        return shortcutRegistry.map(shortcut => {
            shortcut.parent = shortcutContainer;
            return <ApplicationShortcut key={shortcut.id} {...shortcut} />;
        });
    }

    return {
        createProjectsFromRegistry,
        createAppsFromRegistry,
        CreateExternalApps,

        setAppContainer,
        setShortcutContainer,
        setTaskbarShortcutContainer: setTaskbarContainer,

        openAppWindow,
        updateAppWindow,
        getAppWindowInfo,
        getListOfOpenWindows,
        closeAppWindow,

        getAppWindowZIndex,
        updateAppWindowZIndex,
        bringToFront,
    };

}

