// import { useState, useEffect } from 'react';
import AppShortcut from '../application/Shortcut';
import AboutMe from '../about_me/AboutMe';
import ProjectShowcase from '../projects/ProjectShowcase';
import TaskBar from './Taskbar';

import '../../styles/desktop/Desktop.css';

import resume from '../../assets/job_mat/resume.pdf';
import artistCV from '../../assets/job_mat/artistCv.pdf';

import emailIcon from '../../assets/apps/email.png';
import githubIcon from '../../assets/apps/github.png';
import linkedinIcon from '../../assets/apps/linkedin.png';
import textDocIcon from '../../assets/apps/text_doc.png';

const Desktop: React.FC = () => {

    // site navigation container
    const shortcutContainer = (
        <section id='shortcuts' className='shortcut-container'>
            <AppShortcut
                name='email'
                iconSrc={emailIcon}
                action={() => { window.open('mailto:kagan@rieder.ca', '_blank'); }}
            />
            <AppShortcut
                name='linkedin'
                iconSrc={linkedinIcon}
                linkUrl="https://www.linkedin.com/in/keagan-rieder/"
            />
            <AppShortcut
                name='github'
                iconSrc={githubIcon}
                linkUrl="https://github.com/KeaganRieder"
            />
            <AppShortcut
                name='resume'
                iconSrc={textDocIcon}
                fileName='KeaganRieder-Resume.pdf'
                fileUrl={resume}
            />
            <AppShortcut
                name='artist_cv'
                iconSrc={textDocIcon}
                fileName='KeaganRieder-ArtistCv.pdf'
                fileUrl={artistCV}
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
            <TaskBar />
        </>

    )
}

export default Desktop
