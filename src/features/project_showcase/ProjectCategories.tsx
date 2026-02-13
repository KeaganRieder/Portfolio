import type { VisibilityControls } from "../../components/application/definition";
import { ProjectOverviewContainer } from "./project/project";
import { Application } from "../../components/application/application";

import type { ProjectEntryProperties } from "./project/projectModels";

import "./styles/category.css";
import "./styles/projectBase.css";

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

export const ProjectCategoryApp: React.FC<ProjectCategoryEntry> = ({ id, name, controls, projects, applicationData }) => {
    const projectEntries = projects.map((project) => {
        project.controls = {
            openProject: controls.openProject,
        };
        return (
            <ProjectOverviewContainer key={project.id} {...project} />
        );
    });

    const bodyContent = () => {
        return (
            <div className="project-list">
                {projectEntries}
            </div>
        );
    }

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