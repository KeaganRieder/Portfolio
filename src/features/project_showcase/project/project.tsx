import { Application } from "../../../components/application/application";
import type { ProjectEntryProperties, ProjectTag } from "./projectModels";

import { ProjectRenderer } from "./projectRenderer";
import { ImageSection } from "../../../components/projectSections/image";

import "../projectBase.css";
import "./projectSections.css";

const formatProjectTag = (tag: ProjectTag): string => {
    if (tag.name) {
        return tag.name;
    }
    if (tag.skill) {
        return tag.skill.name;
    }
    return "Unknown";
}

export const ProjectOverviewContainer = (projectInfo: ProjectEntryProperties) => {
    const onClick = () => {
        if (!projectInfo.controls?.openProject) {
            console.warn("No openProject control provided for project:", projectInfo.id);
            return;
        }
        projectInfo.controls.openProject(projectInfo.id);
    }
    const overViewContent = () => {
        return (
            <>
                <div className="gallery">
                    {projectInfo.overviewContents.imagePaths?.map((path, index) => (
                        <ImageSection key={index} imageData={path} inGallery={true} hoverConfigs={{ canHover: false }} />
                    ))}
                </div>
                <div className="project-tags">
                    {projectInfo.tags.map((tag, index) => (
                        <span key={index} className="project-tag">{formatProjectTag(tag)}</span>
                    ))}
                </div>
                <div className="project-description">
                    <p>{projectInfo.overviewContents.description}</p>
                </div>
                <div className="project-links">
                    {projectInfo.overviewContents.links.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                    ))}
                </div></>
        );
    }

    if (!projectInfo.content) {
        return <div className="project-overview-noContent" >
            {overViewContent()}
        </div>
    }

    return (
        <>
            <button className="project-overview" onClick={onClick}>
                {overViewContent()}
            </button>
        </>
    );
}

export const ProjectApp: React.FC<ProjectEntryProperties> = (projectInfo: ProjectEntryProperties) => {

    const overViewContent = () => {
        return (
            <>
                <div className="project-overview-noContent" >
                    <div className="gallery">
                        {projectInfo.overviewContents.imagePaths?.map((path, index) => (
                            <ImageSection key={index} imageData={path} inGallery={true} hoverConfigs={{ canHover: false }} />
                        ))}
                    </div>
                    <div className="project-tags">
                        {projectInfo.tags.map((tag, index) => (
                            <span key={index} className="project-tag">{formatProjectTag(tag)}</span>
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
                </div>
            </>
        );
    }
    const body = () => {
        if (!projectInfo.content) {
            return overViewContent();
        }
        return (<>
            {ProjectRenderer(projectInfo.content, projectInfo.applicationData ? projectInfo : undefined)}
        </>);
    }


    if (projectInfo.applicationData) {
        return (<Application
            info={{
                id: projectInfo.id + "_app",
                appName: projectInfo.name,
                tags: [],
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
            content={{ body: body() }}
        />)
    }

    return <></>
}