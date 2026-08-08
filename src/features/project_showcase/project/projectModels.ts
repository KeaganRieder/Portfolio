import type { VisibilityControls } from "../../../components/application/definition";
import type { SectionType, ImageData } from "../../../types/sectionType";
import type { Skill } from "../../../types/skill";

/** A label chip shown on a project card: either a free-text name or a reference to a Skill. */
export type ProjectTag = {
    name?: string;
    skill?: Skill;
}
/**
 * Full data model for a single project entry. Drives both the compact overview
 * card (ProjectOverviewContainer) and, when applicationData is present, the
 * full project window rendered by ProjectApp via ProjectRenderer's `content` sections.
 */
export interface ProjectEntryProperties {
    id: string;
    name: string;
    tags: ProjectTag[];
    categoryID: string;
    iconPath: string;

    controls?: {
        openProject: (id: string) => void;
    }
    overviewContents: {
        imagePaths?: ImageData[];
        description: string;
        links: { label: string; url: string }[];
    };
    applicationData?: {
        visibilityControls: VisibilityControls;
        containers?: {
            appContainer?: HTMLElement | null;
            shortcutContainer?: HTMLElement | null;
            taskbarContainer?: HTMLElement | null;
        };
    }
    content?: {
        sectionInfo: SectionType;
        styleName?: string;
    }[]
}
