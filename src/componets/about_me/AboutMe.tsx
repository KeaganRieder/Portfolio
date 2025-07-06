import React from 'react';
import type { AppInfo } from '../application/Properties.ts';
import Application from '../application/Application.tsx';
import '../../styles/applications/AboutMe.css';

import textDocIcon from '../../assets/apps/text_doc.png';
import profilePic from '../../assets/apps/profile.gif';

import { Biography, ArtistStatement } from './Content.ts';
import Skills from './Content.ts';
const AboutMe: React.FC = () => {
    const appInfo: AppInfo = {
        name: 'About_Me',
        iconSrc: textDocIcon,

    };

    const content = (
        <>
            <img className='profile-pic' src={profilePic} alt='profile'></img>

            <p >
                {Biography}
            </p>

<div>click here to download resume and artist cv</div>

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

            <p>
                <h2 className='about-me-header'> Artist Statement </h2>

                {ArtistStatement}
            </p>

        </>
    );

    return (
        <>
            <Application appInfo={appInfo} visible={true}>
                {content}
            </Application>
        </>);
}
export default AboutMe;