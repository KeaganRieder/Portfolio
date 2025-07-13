import React from 'react';
import Application from '../application/Application.tsx';
import textDocIcon from '../../assets/apps/text_doc.png';
import type { AppInfo } from '../application/Properties.ts';

import '../../styles/applications/Project.css';

export interface ProjectInfo {
    name: string;
}

const Project: React.FC<ProjectInfo> = (ProjectInfo) => {

    const appInfo: AppInfo = {
        name: 'Project',
        iconSrc: textDocIcon,
    };

    // TODO: Planned feature - commenting out to fix build errors
    // const projectOverview = (
    //     <div >
    //         <h2>{ProjectInfo.name}</h2>
    //         {/* <img></img> todo figure out */}
    //         <p>This section will contain details about the project, including its name and category.</p>
    //     </div>
    // );

    const content = (
        <></>
    );

    return (
        <Application appInfo={appInfo} visible={false}>
            {content}
        </Application>
    );
};

export default Project;