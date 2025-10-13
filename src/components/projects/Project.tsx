import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Application from '../application/Application.tsx';

import textDocIcon from '../../assets/apps/text_doc.png';
import type { ProjectInfo } from './ProjectInfo.tsx';

import '../../styles/applications/Project.css';

const Project: React.FC<ProjectInfo> = ({ projectName, description, appContent, GitHubUrl, demoUrl, displayImg }) => {
    const [projectApplicationContainer, setProjectApplicationContainer] = useState<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

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

    const hasApp = appContent;

    const handleProjectClick = () => {
        if (hasApp) {
            setIsVisible(true);
            console.log(`Opening ${projectName} application`);
        }
    };

    const handleCloseApp = () => {
        setIsVisible(false);
        console.log(`Closing ${projectName} application`);
    };

    const clickableProjectOverview = hasApp ? (
        <div
            className="project-overview clickable"
            onClick={handleProjectClick}
            style={{ cursor: 'pointer' }}
        >
            <h2>{projectName}</h2>
            {displayImg && <img src={displayImg} alt={`${projectName}_display`} className="project-image" />}
            <p>{description}</p>
            {githubLink}
            {demoLink}
        </div>
    ) : projectOverview;

    const projectApp = (
        isVisible && (appContent) && projectApplicationContainer ? (
            ReactDOM.createPortal(
                <Application appInfo={{
                    name: projectName,
                    iconSrc: textDocIcon,
                    hasShortcut: false,
                }}
                visible={isVisible}
                onClose={handleCloseApp}
                initialZIndex={10000}>
                    {appContent}
                </Application>, projectApplicationContainer)
        ) : null
    );

    return (
        <>
            {clickableProjectOverview}
            {projectApp}
        </>
    );
}

export default Project;