import type React from "react";
import { Application } from "../../components/application/application";
import type { VisibilityControls } from "../../components/application/definition";
import { ProjectCategoryButton, type ProjectCategoryEntry } from "./ProjectCategories";

import folderIcon from "../../assets/apps/folder.png";

import './styles/category.css'

export interface ProjectShowcaseProps {
    categories: ProjectCategoryEntry[];
    visibilityControls: VisibilityControls;
    containers: {
        appContainer?: HTMLElement | null;
        shortcutContainer?: HTMLElement | null;
        taskbarContainer?: HTMLElement | null;
    };
    controls: {
        openCategory: (id: string) => void;
        openProject: (id: string) => void;
    }
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ categories, visibilityControls, containers, controls }) => {
    const categoryButtons = () => {
        if (!categories.length) {
            return <p>No projects available yet.</p>;
        }

        return <div className="category-button-container">
            {categories.map((category) => (
                <ProjectCategoryButton
                    key={category.id}
                    {...category}
                    controls={{
                        openCategory: controls.openCategory,
                        openProject: controls.openProject,
                    }}
                    buttonInfo={{ iconPath: folderIcon }}
                />
            ))}
        </div>

    };

    return (
        <Application
            info={{
                id: "project_showcase",
                appName: "Projects",
                tags: ["portfolio", "projects"],
            }}
            visibilityControls={visibilityControls}
            containers={containers}
            shortcuts={{
                desktop: {
                    id: "project_showcase_shortcut",
                    appName: "Projects",
                    iconPath: folderIcon,
                },
                taskbar: {
                    id: "project_showcase_task_shortcut",
                    appName: "Projects",
                    iconPath: folderIcon,
                },
            }}
            content={{ body: categoryButtons() }}
        />
    );
};