import { Application } from "../../components/application/application";
import type { VisibilityControls } from "../../components/application/definition";

import "./styles/project.css";

export interface ProjectEntry {
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
        demos: { label: string; url: string }[];

    }
}

export const ProjectOverviewContainer = (projectInfo: ProjectEntry) => {
    const onClick = () => {
        if (!projectInfo.controls?.openProject) {
            console.warn("No openProject control provided for project:", projectInfo.id);
            return;
        }
        projectInfo.controls.openProject(projectInfo.id);
    }

    return (
        <>
            <button className="project-overview" onClick={onClick}>
                <div className="project-images">
                    {projectInfo.overviewContents.imagePaths?.map((path, index) => (
                        <img key={index} src={path} alt={`${projectInfo.name} screenshot ${index + 1}`} />
                    ))}
                </div>
                <div className="project-tags">
                    {projectInfo.tags.map((tag, index) => (
                        <span key={index} className="project-tag">{tag}</span>
                    ))}
                </div>
                <div className="project-description">
                    <p>{projectInfo.overviewContents.description}</p>
                </div>
                <div className="project-links">
                    {projectInfo.overviewContents.links.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                    ))}
                </div>
            </button>
        </>
    );
}

export const ProjectApp: React.FC<ProjectEntry> = (projectInfo: ProjectEntry) => {

    const body = () => {
        return (<>
            {/* <h2>{projectInfo.name}</h2> */}
            {/* {overView()} */}
        </>);
    }

    const overView = () => {
        return (
            <>
                <section className="project-overview">
                    <div className="project-images">
                        {projectInfo.overviewContents.imagePaths?.map((path, index) => (
                            <img key={index} src={path} alt={`${projectInfo.name} screenshot ${index + 1}`} />
                        ))}
                    </div>
                    <div className="project-tags">
                        {projectInfo.tags.map((tag, index) => (
                            <span key={index} className="project-tag">{tag}</span>
                        ))}
                    </div>
                    <div className="project-description">
                        <p>{projectInfo.overviewContents.description}</p>
                    </div>
                    <div className="project-links">
                        {projectInfo.overviewContents.links.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                        ))}
                    </div>
                </section>
            </>
        );
    }

    if (projectInfo.applicationData) {
        return (<Application
            info={{
                id: projectInfo.id + "_app",
                appName: projectInfo.name,
                tags: projectInfo.tags,
            }}
            visibilityControls={projectInfo.applicationData.visibilityControls!}
            containers={projectInfo.applicationData.containers}
            shortcuts={{
                taskbar: {
                    id: projectInfo.id + "_task_shortcut",
                    appName: projectInfo.name,
                    iconPath: projectInfo.iconPath,
                },
            }}
            content={{ body: body(), }}
        />)
    }
    return (
        <>
        </>
    )
}