import React, { useState, useEffect } from 'react';

import Application from '../application/Application.tsx';
import ProjectGroup from './ProjectGroup.tsx';
import type { AppInfo } from '../application/Properties.ts';

import folderIcon from '../../assets/apps/folder.png';
import backButton from '../../assets/apps/close_button.png';
import forwardButton from '../../assets/apps/close_button.png';

import '../../styles/applications/Project.css';


const Projects: React.FC = () => {

    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const appInfo: AppInfo = {
        name: 'Projects',
        iconSrc: folderIcon,
    };

    const backButtonClick = () => {
        setActiveCategory(null); // Close any open category and return to main view
    }

    const setOpenCategory = (categoryName: string) => {
        setActiveCategory(categoryName);
    }



    const projectCategoryList = (
        <>
            <section id='category-container' className='project-container' style={{ display: activeCategory === null ? 'flex' : 'none' }}>
                <ProjectGroup name='Game Development' onClick={() => setOpenCategory('Game Development')} isActive={activeCategory === 'Game Development'} />
                <ProjectGroup name='Puzzle solvers' onClick={() => setOpenCategory('Puzzle solvers')} isActive={activeCategory === 'Puzzle solvers'} />
                <ProjectGroup name='Web Development' onClick={() => setOpenCategory('Web Development')} isActive={activeCategory === 'Web Development'} />
                <ProjectGroup name='Pixel Art' onClick={() => setOpenCategory('Pixel Art')} isActive={activeCategory === 'Pixel Art'} />
                <ProjectGroup name='3D modelling' onClick={() => setOpenCategory('3D modelling')} isActive={activeCategory === '3D modelling'} />
            </section>
        </>
    );

    const content = (
        <>
            <section className='project-container-header'>
                 {activeCategory && (
                    <button onClick={backButtonClick}>
                        <img src={backButton} alt='backButton' />
                    </button>
                )}
                <h1 className='category title'> {activeCategory || ""} </h1>
               
            </section>

            <section id='project-group-container' style={{ width: '100%', height: '100%', display: activeCategory ? 'flex' : 'none' }}>
                
            </section>
            {projectCategoryList}
        </>
    );

    return (
        <Application appInfo={appInfo} visible={false}>
            {content}
        </Application>
    );
};

export default Projects;