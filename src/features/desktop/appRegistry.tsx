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

interface AppRegistryEntry {
    id: string;
    component: React.FC<ApplicationDefinition>;
}

interface AppWindowData {
    id: string;
    zIndex?: number;
}

export interface ApplicationRegistryControls {
    addAppWindowFunction: (windowData: AppWindowData) => void;
    removeAppWindowFunction: (id: string) => void;
    updateAppWindowFunction: (id: string, updatedData: Partial<AppWindowData>) => void;
}

export const ApplicationRegistry = (desktopShortcutContainer: HTMLElement, desktopTaskbarContainer: HTMLElement, desktopAppContainer: HTMLElement) => {
    const appRegistry: AppRegistryEntry[] = [
        {
            id: "about_me",
            component: AboutMe,
        },
        {
            id: "email",
            component: AboutMe,
        },
        {
            id: "project_showcase",
            component: AboutMe,
        }
    ];
    const shortcutRegistry: ShortcutDefinition[] = [
        {
            id: "github-shortcut",
            appName: "github",
            iconPath: githubIcon,
            parent: null,
            onClickAction: openLinkInNewTab("https://github.com/KeaganRieder")

        },
        {
            id: "linkedin-shortcut",
            appName: "linkedin",
            iconPath: linkedinIcon,
            parent: null,
            onClickAction: openLinkInNewTab("https://www.linkedin.com/in/keagan-rieder/")
        },
        {
            id: "resume-shortcut",
            appName: "resume",
            iconPath: textDocIcon,
            parent: null,
            onClickAction: downloadFile(resume, 'KeaganRieder-Resume.pdf')
        },
        {
            id: "artist-cv-shortcut",
            appName: "artist_cv",
            iconPath: textDocIcon,
            parent: null,
            onClickAction: downloadFile(artistCV, 'KeaganRieder-ArtistCv.pdf')
        }
    ];

    const [openWindows, setOpenWindows] = useState<AppWindowData[]>([]);

    const [shortcutContainer, setShortcutContainer] = useState<HTMLElement >(desktopShortcutContainer);
    const [taskbarContainer, setTaskbarContainer] = useState<HTMLElement >(desktopTaskbarContainer);
    const [appContainer, setAppContainer] = useState<HTMLElement >(desktopAppContainer);

    const addAppWindow = (windowData: AppWindowData) => {
        if (windowData.zIndex === undefined) {
            windowData.zIndex = openWindows.length + 1;
        }
        setOpenWindows(prevWindows => [...prevWindows, windowData]);
    }

    const removeAppWindow = (id: string) => {
        setOpenWindows(prevWindows => prevWindows.filter(window => window.id !== id));
    }

    const updateAppWindow = (id: string, updatedData: Partial<AppWindowData>) => {
        setOpenWindows(prevWindows =>
            prevWindows.map(window =>
                window.id === id ? { ...window, ...updatedData } : window
            )
        );
    }

    const updateAppWindowZIndex = (id: string, updatedZIndex: number) => {
        updateAppWindow(id, { zIndex: updatedZIndex });
    }

    const bringToFront = (id: string) => {
        const maxZIndex = openWindows.reduce((max, window) => window.zIndex && window.zIndex > max ? window.zIndex : max, 0);
        updateAppWindowZIndex(id, maxZIndex + 1);
    }

    const createAppsWindow = (id: string) => {
        const appEntry = appRegistry.find(app => app.id === id);
        if (appEntry) {
            const newWindowData: AppWindowData = {
                id: appEntry.id,
                zIndex: openWindows.length + 1,
            };
            addAppWindow(newWindowData);
        }
    }

    const createAppsFromRegistry = () => {
        return appRegistry.map(app => {
            const AppComponent = app.component;
            createAppsWindow(app.id);
            return <AppComponent
                key={app.id}
                info={{ id: app.id, appName: app.id }}
                containers={{ shortcutContainer, taskbarContainer, appContainer }}
                visibilityControls={{
                    appid: app.id, zIndex: openWindows.length + 1,
                    RegistryControls: {
                        addAppWindowFunction: addAppWindow,
                        removeAppWindowFunction: removeAppWindow,
                        updateAppWindowFunction: updateAppWindow
                    }, initialVisibility: false
                }} />;

        });
    }

    const CreateAppsToExternal = () => {
        return shortcutRegistry.map(shortcut => {
            return <ApplicationShortcut key={shortcut.id} {...shortcut} />;
        });
    }

    return {
        createAppsFromRegistry,
        CreateAppsToExternal,
        addAppWindow,
        removeAppWindow,
        updateAppWindow,
        bringToFront,
    };

}

