import React from "react";

import { Application } from "../../components/application/application";
import type { applicationDefinition } from "../../components/application/definition";
import { ProjectShowcase } from "../project_showcase/projectShowcase";

import textDocIcon from "../../assets/apps/text_doc.png";

export interface AppRegistryEntry {
    id: string;
    appType: string;
    applicationDefinition: applicationDefinition;
}

export const AppRegistry: AppRegistryEntry[] = [
    {
        id: "about_me",
        appType: "about_me",
        applicationDefinition: {
            id: "about-me-app",
            appName: "About Me",
        }
    },
    {
        id: "project",
        appType: "project",
        applicationDefinition: {
            id: "project-app",
            appName: "Project",
        }
    },
    {
        id: "email",
        appType: "email",
        applicationDefinition: {
            id: "email-app",
            appName: "Email",
        }
    }
];

export const CreateAppsFromRegistry = (
    appContainer: HTMLElement | null,
    shortcutContainer: HTMLElement | null,
    taskbarContainer: HTMLElement | null,
) => {

    return AppRegistry.map(({ appType, applicationDefinition }) => {
        const appDef: applicationDefinition = {
            ...applicationDefinition,
            parent: appContainer,
            shortcutContainer,
            taskbarContainer,
            shortcut: {
                id: `${applicationDefinition.id}-shortcut`,
                appName: applicationDefinition.appName,
                iconPath: textDocIcon,
            },
            taskbarShortcut: {
                id: `${applicationDefinition.id}-taskbar-shortcut`,
                appName: applicationDefinition.appName,
                iconPath: textDocIcon,
            }
        };

        if (appType === "project") {
            return <ProjectShowcase key={appDef.id} {...appDef} />;
        }

        return <Application key={appDef.id} {...appDef} />;
    });
};
