import type { VisibilityControls } from "../../../components/application/definition";
import type { SectionType, ImageData } from "../../../types/sectionType";
import type { Skill } from "../../../types/skill";

export type ProjectTag = {
    name?: string;
    skill?: Skill;
}
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
