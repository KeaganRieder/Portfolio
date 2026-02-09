import { Application } from "../../../components/application/application";
import type { ProjectEntryProperties } from "./projectModels";

import "../styles/projectBase.css";
import "../styles/ProjectSections.css";



import { ProjectRenderer } from "./ProjectRenderer";

export const ProjectOverviewContainer = (projectInfo: ProjectEntryProperties) => {
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

export const ProjectApp: React.FC<ProjectEntryProperties> = (projectInfo: ProjectEntryProperties) => {

    const body = () => {
        return (<>
            {ProjectRenderer(projectInfo.content)}
        </>);
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
    
    return <></>

}