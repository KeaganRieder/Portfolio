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
                appInfo={{ name: 'email', iconSrc: emailIcon, }}

                onClick={() => { window.open('mailto:kagan@rieder.ca', '_blank'); }
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
            <AppShortcut
                appInfo={{ name: 'resume', iconSrc: textDocIcon, }}

                onClick={() => {
                    const fileName = 'KeaganRieder-Resume.pdf';
                    const link = document.createElement('a');
                    link.href = `${resume}`;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                }
            />
            <AppShortcut
                appInfo={{ name: 'artist_cv', iconSrc: textDocIcon, }}

                onClick={() => {
                    const fileName = 'KeaganRieder-ArtistCv.pdf';
                    const link = document.createElement('a');
                    link.href = `${artistCV}`;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
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
            <TaskBar />
        </>

    )
}

export default Desktop
