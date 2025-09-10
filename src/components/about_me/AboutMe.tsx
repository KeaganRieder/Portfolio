import React from 'react';
import Application from '../application/Application.tsx';
import JobMaterials from './JobMaterials.tsx';
import Skills from './Content.ts';

import textDocIcon from '../../assets/apps/text_doc.png';
import profilePic from '../../assets/apps/profile.gif';

import { Biography, ArtistStatement } from './Content.ts';
import type { AppInfo } from '../application/ApplicationProperties.ts';

import '../../styles/applications/AboutMe.css';

const AboutMe: React.FC = () => {
    const appInfo: AppInfo = {
        name: 'About_Me',
        iconSrc: textDocIcon,
        hasShortcut: true,
    };

    const content = (
        <>
            <img className='profile-pic' src={profilePic} alt='profile'></img>

            <p >
                {Biography}
            </p>

            <JobMaterials />

            <div className='skills-container'>
                <h2 className='about-me-header'> Skills</h2>
                <ul className='skills-list'>
                    {Skills.map((skillCategory: { category: string; skills: string[] }, index: number) => (
                        <li key={index} className='skillCategory'>
                            <h3>{skillCategory.category}</h3>
                            <ul>
                                {skillCategory.skills.map((skill: string, skillIndex: number) => (
                                    <li key={skillIndex}>{skill}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <h2 className='about-me-header'> Artist Statement </h2>
            <p>

                {ArtistStatement}
            </p>

        </>
    );

    return (
        <>
            <Application appInfo={appInfo} visible={false}>
                {content}
            </Application>
        </>);
}
export default AboutMe;