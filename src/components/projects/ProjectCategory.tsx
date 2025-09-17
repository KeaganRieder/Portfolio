import React from 'react';
import Project from './Project';

import folderIcon from '../../assets/apps/folder.png';
import type { ProjectInfo } from './ProjectInfo.tsx';
import '../../styles/applications/Project.css';

export interface ProjectCategoryInfo {
    categoryName: string;
    projects: ProjectInfo[];
    isActive?: boolean;
    onClick?: () => void;
}

const ProjectCategory: React.FC<ProjectCategoryInfo> = ({ categoryName, projects, isActive, onClick }) => {

    const showcaseButton = (
        <div className='project-category-button' onClick={() => { if (onClick) onClick(); }}>
            <img src={folderIcon} alt='folder icon' />
            <h3>{categoryName}</h3>
        </div>
    )

const projectOverviewContainer = (
    <div className='project-overview-container'>
        { projects.map((project, index) => (<Project 
                        key={`${categoryName}-${project.projectName}-${index}`}
                        projectName={project.projectName}
                        description={project.description}
                        vidInfo={project.vidInfo}
                        appContent={project.appContent}
                        GitHubUrl={project.GitHubUrl}
                        demoUrl={project.demoUrl}
                        displayImg={project.displayImg}
                    />))}
    </div>
)

    return (
        <div>
            {!isActive &&showcaseButton}
            {isActive && projectOverviewContainer}
        </div>
    );
};

export default ProjectCategory;
