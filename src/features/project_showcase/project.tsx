import React from "react";

export interface ProjectEntry {
    id: string;
    categoryID: string;
    name: string;
    tags: string[];

    overviewContents: {
        imagePaths?: string[];
        description: string;
        links: { label: string; url: string }[];
    };
}
export const Project: React.FC<ProjectEntry> = ({ id, name, tags, overviewContents }) => {

    const overviewBody = () => {
        return (
            <>
                <section className="project-overview">
                    <div className="project-images">
                        {overviewContents.imagePaths?.map((path, index) => (
                            <img key={index} src={path} alt={`${name} screenshot ${index + 1}`} />
                        ))}
                    </div>
                    <div className="project-tags">
                        {tags.map((tag, index) => (
                            <span key={index} className="project-tag">{tag}</span>
                        ))}
                    </div>
                    <div className="project-description">
                        <p>{overviewContents.description}</p>
                    </div>
                    <div className="project-links">
                        {overviewContents.links.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                        ))}
                    </div>
                </section>
            </>
        );
    }

    const projectPage = () => {
        return (<>
            {/* to implement */}
        </>);
    }

    return (<>
        {overviewBody()}
        {projectPage()}

    </>);
}



