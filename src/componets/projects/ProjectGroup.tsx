import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// TODO: Planned feature - commenting out to fix build errors
// import textDocIcon from '../../assets/apps/text_doc.png';
// import Project from './Project.tsx';

import folderIcon from '../../assets/apps/folder.png';

import '../../styles/applications/Project.css';


export interface ProjectGroupInfo {
    name: string;
    // projects: Project[];
    isActive?: boolean;
    onClick?: () => void; 
}

const ProjectGroup: React.FC<ProjectGroupInfo> = ({name, onClick, isActive}) => {

    // TODO: Planned feature - commenting out to fix build errors
    // const [isOpen, setIsOpen] = useState(false);
    const [categoryContainer, setGroupContainer] = useState<HTMLElement | null>(null);
    const [groupContainer, setProjectContainer] = useState<HTMLElement | null>(null);


    useEffect(() => {
    
        const categoryContainer = document.getElementById('category-container');
        setGroupContainer(categoryContainer);

        const groupContainer = document.getElementById('project-group-container');
        setProjectContainer(groupContainer);

    }, []);


    const groupOverview = (
        <div className='project-group' onClick={() => { if (onClick) onClick(); }}>
            <img src={folderIcon} alt='folder icon' className='project-group-icon' />
            <h2 className='project-group-label'>{name}</h2>
        </div>
    );

    const projectOverviewContainer = (
        <div id={name + "_project_group"} className='project-container' >
            {name} projects will appear here.
            {/* <div className='project-overview'>
                <h2>project ex</h2>
                <p> desc goes here</p>
            </div>
             <div className='project-overview'>
                <h2>project ex</h2>
                <p> desc goes here</p>
            </div> */}
        </div>
    );


    return (
        <>
            {groupContainer && isActive && ReactDOM.createPortal(projectOverviewContainer, groupContainer)}
            {categoryContainer && ReactDOM.createPortal(groupOverview, categoryContainer)}
        </>
    );
};

export default ProjectGroup;