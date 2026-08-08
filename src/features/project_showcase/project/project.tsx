import { Application } from "../../../components/application/application";
import type { ProjectEntryProperties, ProjectTag } from "./projectModels";

import { ProjectRenderer } from "./projectRenderer";
import { ImageSection } from "../../../components/projectSections/image";

import "../projectBase.css";
import "./projectSections.css";

/** Resolves a ProjectTag to its display label, preferring an explicit name over a linked skill. */
const formatProjectTag = (tag: ProjectTag): string => {
    if (tag.name) {
        return tag.name;
    }
    if (tag.skill) {
        return tag.skill.name;
    }
    return "Unknown";
}

/**
 * Compact preview card for a project shown inside a category listing: gallery
 * thumbnail, tags, description and links. If the project has detailed `content`
 * sections it becomes clickable to open the full ProjectApp window; otherwise
 * it renders as a static, non-interactive card.
 */
export const ProjectOverviewContainer = (projectInfo: ProjectEntryProperties) => {
    const onClick = () => {
        if (!projectInfo.controls?.openProject) {
            console.warn("No openProject control provided for project:", projectInfo.id);
            return;
        }
        projectInfo.controls.openProject(projectInfo.id);
    }
    /** Builds the shared overview markup: gallery, tags, description, and external links. */
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

/**
 * Full-window Application for a single project. Prefers rendering the rich
 * `content` sections via ProjectRenderer; falls back to the same overview
 * layout used by ProjectOverviewContainer when no detailed content exists.
 */
export const ProjectApp: React.FC<ProjectEntryProperties> = (projectInfo: ProjectEntryProperties) => {

    // Duplicated (not reused) from ProjectOverviewContainer's overViewContent
    // fallback, intentionally kept local to this component.
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
    // Only pass applicationInfo through to ProjectRenderer (needed for image hover/
    // fullscreen wiring) when this project actually has application data to give it.
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