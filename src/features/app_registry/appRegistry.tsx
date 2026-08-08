import { Fragment, useState } from "react";
import type { ApplicationDefinition } from "../../components/application/definition"
import type { ShortcutDefinition } from "../../components/shortcut/definition";
import { openLinkInNewTab } from "../../components/shortcut/clickActions";

import { ApplicationShortcut } from "../../components/shortcut/applicationShortcut";
import { buildRegistryEntries } from "./buildRegistryEntries";
import type { RegistryEntry, RegistryEntryKind } from "./registryTypes";

import githubIcon from '../../assets/apps/icons/github_icon.png';
import linkedinIcon from '../../assets/apps/icons/linkedin_icon.png';
import textDocIcon from '../../assets/apps/icons/text_doc_icon.png';

/**
 * The contract a feature folder must fulfil to "register" itself as a
 * hand-written app (as opposed to an auto-generated project/category
 * window). Dropping an appEntry.ts that exports one of these is enough to
 * make an app appear as a desktop window - see appsEntries.ts.
 */
export interface AppRegistryEntry {
    id: string;
    name: string;
    icon: string;
    component: React.FC<ApplicationDefinition>;
}

// Tracks which windows are currently open and their stacking order.
interface AppWindowData {
    id: string;
    zIndex?: number;
}

export type AppType = RegistryEntryKind;

// Minimal shape returned by search, enough to identify and open a matching entry.
export interface AppLookupResult {
    id: string;
    name: string;
    type: AppType;
}

/** Public API exposed to the rest of the UI (taskbar, search, shortcuts) for managing app windows. */
export interface ApplicationRegistryControls {
    openAppWindow: (windowData: AppWindowData) => void;
    updateAppWindow: (id: string, updatedData: Partial<AppWindowData>) => void;
    getAppWindowInfo: (id: string) => AppWindowData | undefined;
    getListOfOpenWindows: () => AppWindowData[];
    closeAppWindow: (id: string) => void;

    searchAndOpenApp: (queryOrResult: string | AppLookupResult) => boolean;

    getAppWindowZIndex: (id: string) => number;
    updateAppWindowZIndex: (id: string, updatedZIndex: number) => void;
    bringToFront: (id: string) => void;
}

// window ids get a "_app" suffix for everything except plain apps, matching
// what the old separate app/project registries each did independently.
const windowIdFor = (id: string, kind: RegistryEntryKind): string => {
    if (kind === "app") return id;
    if (kind === "project_showcase") return "project_showcase_app";
    return `${id}_app`; // project | category
};

/**
 * Central hub of the desktop-simulation UI: owns the set of open windows,
 * their z-order, and the container DOM nodes (desktop, taskbar, shortcuts).
 * It combines the statically registered apps (About Me, Email, ...) with
 * dynamically generated project/category/showcase windows (via
 * buildRegistryEntries) into one uniform list of openable "entries", and
 * exposes controls (open/close/focus/search) used throughout the app.
 */
export const ApplicationRegistry = () => {
    const [openWindows, setOpenWindows] = useState<AppWindowData[]>([]);
    const [shortcutContainer, setShortcutContainer] = useState<HTMLElement | null>(null);
    const [taskbarContainer, setTaskbarContainer] = useState<HTMLElement | null>(null);
    const [appContainer, setAppContainer] = useState<HTMLElement | null>(null);

    const openAppWindow = (windowData: AppWindowData) => {
        if (getAppWindowInfo(windowData.id)) {
            windowData.zIndex = openWindows.length + 1;
            updateAppWindow(windowData.id, windowData);
            return;
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

    // single low-level "open by window id" helper - every entry kind funnels through this
    const openWindowById = (windowId: string) => {
        openAppWindow({ id: windowId });
        bringToFront(windowId);
    };
    const openProject = (id: string) => openWindowById(windowIdFor(id, "project"));
    const openCategory = (id: string) => openWindowById(windowIdFor(id, "category"));
    const openEntry = (entry: RegistryEntry) => openWindowById(windowIdFor(entry.id, entry.kind));

    // Rebuilt each render (cheap - just maps over the already-globbed
    // AppsEntries/ProjectsEntries) so openProject/openCategory always close
    // over the current openWindows state rather than a stale first-render copy.
    const { entries, categories, projectHelpers } = buildRegistryEntries({ openProject, openCategory });
    const entryMap = new Map(entries.map((entry) => [entry.id, entry] as const));

    // Case-insensitive substring match against entry id/name, used by the search UI.
    const getSearchResults = (query: string): AppLookupResult[] => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return [];

        const results = new Map<string, AppLookupResult>();
        entries.forEach((entry) => {
            if (entry.id.toLowerCase().includes(normalized) || entry.name.toLowerCase().includes(normalized)) {
                results.set(`${entry.kind}:${entry.id}`, { id: entry.id, name: entry.name, type: entry.kind });
            }
        });

        return Array.from(results.values()).sort((a, b) => a.name.localeCompare(b.name));
    };

    // Accepts either a raw search string or an already-resolved AppLookupResult
    // (e.g. from a search dropdown selection) and opens the matching window.
    const searchAndOpenApp = (queryOrResult: string | AppLookupResult): boolean => {
        const candidate = (() => {
            if (typeof queryOrResult !== "string") return queryOrResult;
            const normalized = queryOrResult.trim().toLowerCase();
            if (!normalized) return undefined;
            const matches = getSearchResults(normalized);
            return matches.find(match => match.id.toLowerCase() === normalized || match.name.toLowerCase() === normalized) ?? matches[0];
        })();

        if (!candidate) return false;
        const entry = entryMap.get(candidate.id);
        if (!entry) return false;

        openEntry(entry);
        return true;
    };

    const registryControls: ApplicationRegistryControls = {
        openAppWindow, updateAppWindow, getAppWindowInfo, getListOfOpenWindows, closeAppWindow,
        searchAndOpenApp,
        getAppWindowZIndex, updateAppWindowZIndex, bringToFront,
    };

    // Static desktop shortcuts that link out to external sites (not app windows).
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
            onClickAction: openLinkInNewTab("https://keaganrieder.github.io/Resume-Site/")
        },
    ];

    // Replaces the old createAppsFromRegistry / createProjectsFromRegistry / displayOpen split.
    // Eager entries (apps, showcase) always mount; everything else mounts once opened.
    const renderAll = () => {
        return entries.map((entry) => {
            const windowId = windowIdFor(entry.id, entry.kind);
            const isOpen = openWindows.some(w => w.id === windowId);
            if (!entry.eager && !isOpen) return null;

            return (
                <Fragment key={windowId}>
                    {entry.render({
                        visibilityControls: {
                            appid: windowId,
                            zIndex: getAppWindowZIndex(windowId),
                            RegistryControls: registryControls,
                            initialVisibility: false,
                        },
                        containers: { appContainer, shortcutContainer, taskbarContainer },
                    })}
                </Fragment>
            );
        });
    };

    // Renders the external-link shortcuts (GitHub, LinkedIn, resume) into the shortcut container.
    const CreateExternalApps = () => {
        return shortcutRegistry.map(shortcut => {
            shortcut.parent = shortcutContainer;
            return <ApplicationShortcut key={shortcut.id} {...shortcut} />;
        });
    }

    return {
        renderAll,
        CreateExternalApps,

        setAppContainer,
        setShortcutContainer,
        setTaskbarShortcutContainer: setTaskbarContainer,
        searchAndOpenApp,
        getSearchResults,

        openAppWindow,
        updateAppWindow,
        getAppWindowInfo,
        getListOfOpenWindows,
        closeAppWindow,

        getAppWindowZIndex,
        updateAppWindowZIndex,
        bringToFront,

        categories,
        projectHelpers,
    };
}
