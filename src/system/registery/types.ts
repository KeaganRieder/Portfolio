import type { ReactNode } from "react";
import type { VisibilityControls } from "@/system/window/types";
import type { skillExample } from "@/shared/types/skill";

// "app"      -> hand-written sections like About Me / Email
// "project"  -> a single project window (from ProjectsEntries)
// "category" -> a folder of projects, grouped by categoryID
// "project_showcase" -> the one fixed "browse all projects" window
export type RegistryEntryKind = "app" | "project" | "category" | "project_showcase";

/** Data every registry entry's render function needs: window visibility state and DOM mount points. */
export interface RenderContext {
    visibilityControls: VisibilityControls;
    containers?: {
        appContainer?: HTMLElement | null;
        shortcutContainer?: HTMLElement | null;
        taskbarContainer?: HTMLElement | null;
    };
}

/**
 * A single window the desktop can open, uniform across hand-written apps,
 * individual projects, project categories, and the project showcase.
 * ApplicationRegistry works entirely in terms of these so it doesn't need
 * to know the specifics of any one kind.
 */
export interface RegistryEntry {
    id: string;
    name: string;
    kind: RegistryEntryKind;
    // eager entries are always mounted, and rely on Application's own visibility
    // state to show/hide (matches how apps + the showcase behaved before).
    // non-eager entries (projects, categories) are only mounted once opened.
    eager?: boolean;
    render: (ctx: RenderContext) => ReactNode;
}

// What AboutMe (and any future app) receives via the `projectRegistry` prop -
// intentionally small, just what apps actually need from the project side.
/**
 * Bridges the app-registration system with the project-showcase system:
 * apps like AboutMe use this to look up which projects demonstrate a given
 * skill and to open those projects as windows.
 */
export interface ProjectHelpers {
    skillExamples: { examples: Record<string, skillExample[]> };
    openProject: (id: string) => void;
}
