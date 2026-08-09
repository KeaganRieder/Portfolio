import type { VisibilityControls } from "@/system/window/types";
import { ProjectOverviewContainer } from "./project";
import { Application } from "@/system/window/application";

import type { ProjectEntryProperties } from "./models";

import "./category.css";
import "./projectBase.css";

/**
 * Describes one project category (a folder of related projects) and the
 * controls/app data it needs to render both as a desktop button and as a
 * full Application window listing its projects.
 */
export interface ProjectCategoryEntry {
    id: string;
    name: string;
    projects: ProjectEntryProperties[];

    controls: {
        openCategory: (id: string) => void;
        openProject: (id: string) => void;
    }
    buttonInfo?: {
        iconPath: string;
    }
    applicationData?: {
        visibilityControls: VisibilityControls;
        containers?: {
            appContainer?: HTMLElement | null;
            shortcutContainer?: HTMLElement | null;
            taskbarContainer?: HTMLElement | null;
        };
        iconPath: string;
    }
}

/** Renders the clickable folder-style icon/button used to open a project category. */
export const ProjectCategoryButton = (categoryInfo: ProjectCategoryEntry) => {

    return (<>
        {
            <button id={categoryInfo.id + "_button"} className="category-button"
                onClick={() => categoryInfo.controls?.openCategory(categoryInfo.id)}>
                <img src={categoryInfo.buttonInfo?.iconPath} alt="category icon" />
                <h3>{categoryInfo.name}</h3>
            </button>
        }
    </>);
}

/**
 * Application window for a single project category: lists every project in
 * the category as an overview card and wires each one's click handler back
 * to the category's openProject control so the app registry can open it.
 */
export const ProjectCategoryApp: React.FC<ProjectCategoryEntry> = ({ id, name, controls, projects, applicationData }) => {
    const projectEntries = projects.map((project) => {
        // Mutates the shared project object to inject the open-project callback;
        // relies on ProjectOverviewContainer being re-rendered with this same reference.
        project.controls = {
            openProject: controls.openProject,
        };
        return (
            <ProjectOverviewContainer key={project.id} {...project} />
        );
    });

    /** Wraps the mapped project overview cards in the category window's body layout. */
    const bodyContent = () => {
        return (
            <div className="project-list">
                {projectEntries}
            </div>
        );
    }

    // Only render the Application window if the caller supplied application-level
    // data (visibility/containers); category entries used solely for listing don't.
    const categoryApp = () => {
        if (applicationData) {
            return (<Application
                info={{
                    id: id + "_app",
                    appName: name,
                }}
                visibilityControls={applicationData.visibilityControls!}
                containers={applicationData.containers}
                shortcuts={{
                    taskbar: {
                        id: id + "_task_shortcut",
                        appName: name,
                        iconPath: applicationData.iconPath,
                    },
                }}
                content={{ body: bodyContent(), }}
            />)
        }
    }

    return (<>
        {categoryApp()}
    </>);

}