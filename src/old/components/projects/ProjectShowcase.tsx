import React, { useState } from 'react';

import Application from '../application/Application.tsx';
import ProjectCategory from './ProjectCategory.tsx';
import type { AppInfo } from '../application/ApplicationProperties.ts';
import { projectData } from './ProjectInfo.tsx';

import folderIcon from '../../assets/apps/folder.png';
import backButton from '../../assets/apps/close_button.png';

const appInfo: AppInfo = {
    name: 'Projects',
    iconSrc: folderIcon,
    hasShortcut: true,
}

const ProjectShowcase: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const backButtonClick = () => {
        setActiveCategory(null);
    }

    const setOpenCategory = (categoryName: string) => {
        setActiveCategory(categoryName);
    }

    // Find the active category data
    const activeCategoryData = activeCategory
        ? projectData.find(group => group.name === activeCategory)
        : null;

    const formatContent = (
        <>
            <section className='project-header-container'>
                {activeCategory && (
                    <button onClick={backButtonClick}>
                        <img src={backButton} alt='backButton' />
                    </button>
                )}
                <h2 >
                    {activeCategory || "Select a Project Category"}
                </h2>
            </section>
            <section className='project-category-container'>
                {!activeCategory ? (
                    projectData.map((projectGroup, index) => (
                        <ProjectCategory
                            key={`${projectGroup.name}-${index}`}
                            categoryName={projectGroup.name}
                            projects={projectGroup.projects}
                            isActive={false}
                            onClick={() => setOpenCategory(projectGroup.name)}
                        />
                    ))
                ) : (
                    activeCategoryData && (
                        <ProjectCategory
                            categoryName={activeCategoryData.name}
                            projects={activeCategoryData.projects}
                            isActive={true}
                        />
                    )
                )}
            </section>
        </>
    )

    return (
        <Application appInfo={appInfo}>
            {formatContent}
        </Application>
    )
}


export default ProjectShowcase;