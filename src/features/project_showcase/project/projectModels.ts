import type { VisibilityControls } from "../../../components/application/definition";
import type { SectionType } from "../../../types/sectionType";

export interface ProjectEntryProperties {
    id: string;
    name: string;
    tags: string[];
    categoryID: string;
    iconPath: string;

    controls?: {
        openProject: (id: string) => void;
    }
    overviewContents: {
        imagePaths?: string[];
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
