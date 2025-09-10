// import { useState, useEffect } from 'react';
import AppShortcut from '../application/Shortcut';
import AboutMe from '../about_me/AboutMe';
import ProjectShowcase from '../projects/ProjectShowcase';
import TaskBar from './Taskbar';

import '../../styles/desktop/Desktop.css';

import emailIcon from '../../assets/apps/email.png';
import githubIcon from '../../assets/apps/github.png';
import linkedinIcon from '../../assets/apps/linkedin.png';


const Desktop: React.FC = () => {

    // site navigation container
    const shortcutContainer = (
        <section id='shortcuts' className='shortcut-container'>
            <AppShortcut
                appInfo={{ name: 'email', iconSrc: emailIcon, }}

                onClick={() => { window.open("mailto:'kagan@rieder.ca'", "_blank") }
                }
            />
            <AppShortcut
                appInfo={{ name: 'linkedin', iconSrc: linkedinIcon, }}

                onClick={() => { window.open("https://www.linkedin.com/in/keagan-rieder/", "_blank") }
                }
            />
            <AppShortcut
                appInfo={{ name: 'github', iconSrc: githubIcon, }}

                onClick={() => { window.open("https://github.com/KeaganRieder", "_blank") }
                }
            />
        </section>
    )

    
    return (
        <>
            <div id='desktop' className='desktop'>
                {shortcutContainer}
                <AboutMe />
                <ProjectShowcase />
            </div>
            <TaskBar/>
        </>

    )
}

export default Desktop
