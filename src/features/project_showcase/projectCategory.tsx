import ReactDOM from "react-dom";

import { Project, type ProjectEntry } from "./project";

export interface ProjectCategoryEntry {
    id: string;
    name: string;
    button: {
        iconPath: string;
        onClick: (id: string) => void;
        container: HTMLElement | null;
    };
    page: {
        isCurrentlyVisible: boolean;
        projects: ProjectEntry[];
        container: HTMLElement | null;
    }
}

export const ProjectCategory: React.FC<ProjectCategoryEntry> = ({ id, name, button, page }) => {
    const projectElements = page.projects.map((project) => {
        return (
            <Project key={project.id} {...project} />
        );
    });

    if (!page.container || !button.container) {
        return null;
    }

    const projectCategoryPage = () => {
        if (!page.isCurrentlyVisible) {
            return <></>;
        }
        return (<>
            <div id={id} className="project-category">
                <h2>{name}</h2>
                <div className="project-list">
                    {projectElements}
                </div>

            </div>
        </>);
    }

    const projectCategoryButton = () => {
        return (
            <button onClick={() => button.onClick(id)}>
                <img src={button.iconPath} alt="folder icon" />
                <h3>{name}</h3>
            </button>
        );

    }

    return (<>
        {ReactDOM.createPortal(projectCategoryPage(), page.container)}
        {ReactDOM.createPortal(projectCategoryButton(), button.container)}
    </>);
}