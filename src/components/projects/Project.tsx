import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Application from '../application/Application.tsx';

import textDocIcon from '../../assets/apps/text_doc.png';
import type { ProjectInfo } from './ProjectInfo.ts';

import '../../styles/applications/Project.css';

const Project: React.FC<ProjectInfo> = ({ projectName, description, hasApp, appContent, GitHubUrl, demoUrl,displayImg }) => {
    const [projectApplicationContainer, setProjectApplicationContainer] = React.useState<HTMLElement | null>(null);

 useEffect(() => {
        // Find the project application container after component mounts
        const projectContainer = document.getElementById('root');
        setProjectApplicationContainer(projectContainer);
    }, []);

    const githubLink = (
        GitHubUrl ? (
            <div className="project-link">
                <a href={GitHubUrl} target="_blank" rel="noopener noreferrer"> Github </a>
            </div>
        ) : null

    )
    const demoLink = (
        demoUrl ? (
            <div className="project-link">
                <a href={demoUrl} target="_blank" rel="noopener noreferrer"> Demo </a>
            </div>
        ) : null
    )
    const projectOverview = (
        <div className="project-overview">
            <h2>{projectName}</h2>
            {displayImg && <img src={displayImg} alt={`${projectName}_display`} className="project-image" />}
            <p>{description}</p>
            {githubLink}
            {demoLink}
        </div>
    )

    const projectApp = (
        hasApp ? (
            projectApplicationContainer && ReactDOM.createPortal(
                <Application appInfo={{
                    name: projectName,
                    iconSrc: textDocIcon,
                    hasShortcut: false,
                }} visible={false}>
                    {appContent}
                </Application>, projectApplicationContainer)
        ) : null
    );

    return (
        <>
            {projectOverview}
            {projectApp}
        </>
    );
}

export default Project;