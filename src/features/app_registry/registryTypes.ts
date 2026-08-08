import type { ReactNode } from "react";
import type { VisibilityControls } from "../../components/application/definition";
import type { skillExample } from "../../types/skill";

// "app"      -> hand-written sections like About Me / Email
// "project"  -> a single project window (from ProjectsEntries)
// "category" -> a folder of projects, grouped by categoryID
// "project_showcase" -> the one fixed "browse all projects" window
export type RegistryEntryKind = "app" | "project" | "category" | "project_showcase";

export interface RenderContext {
    visibilityControls: VisibilityControls;
    containers?: {
        appContainer?: HTMLElement | null;
        shortcutContainer?: HTMLElement | null;
        taskbarContainer?: HTMLElement | null;
    };
}

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
export interface ProjectHelpers {
    skillExamples: { examples: Record<string, skillExample[]> };
    openProject: (id: string) => void;
}
