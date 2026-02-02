import React, { useEffect, useState } from "react";

import type { ApplicationDefinition } from "../../components/application/definition";
import { Biography } from "./assets/biography";
import { Application } from "../../components/application/application";

import { SkillCategory, type SkillCategoryEntry } from "./skillCategory";
import type { SkillEntry } from "./skill";
import { Skills } from "./assets/skills";

import './aboutMe.css'

import profilePic from './assets/profile.gif';
import textDocIcon from '../../assets/apps/text_doc.png';

import resume from '../../assets/job_mat/resume.pdf';
import artistCV from '../../assets/job_mat/artistCv.pdf';

export const AboutMe: React.FC<ApplicationDefinition> = ({ info, visibilityControls, containers }) => {
    const [skillCategories] = useState<SkillCategoryEntry[]>(() => {
        const categoryMap = new Map<string, SkillCategoryEntry>();

        Skills.forEach((skill: SkillEntry) => {
            const existing = categoryMap.get(skill.categoryID) ?? {
                id: skill.categoryID,
                name: skill.categoryID,
                skills: [] as SkillEntry[]
            };

            if (!existing.skills.find(s => s.id === skill.id)) {
                existing.skills = [...existing.skills, skill];
            }

            categoryMap.set(skill.categoryID, existing);
        });

        return Array.from(categoryMap.values());
    });

    const shortcut = () => {
        return (
            {
                desktop: {
                    id: info.id + "_shortcut",
                    appName: info.appName,
                    iconPath: textDocIcon,

                }, taskbar: {
                    id: info.id + "_shortcut",
                    appName: info.appName,
                    iconPath: textDocIcon,
                }
            }
        );
    };

    const skillsSection = () => {
        return (
            <section className="skills-section">
                <h2>Skills</h2>
                {skillCategories.map((category) => (
                    <SkillCategory key={category.id} {...category} />
                ))}
            </section>
        );
    }

    const Bio = () => {
        return (
            <>
                <section className="biography">
                    <div >
                        <p> {Biography} </p>
                        <div className="job-materials">
                            <a href={resume} download="KeaganRieder-Resume.pdf">
                                <p>click here to download my Resume</p>
                            </a>
                            <a href={artistCV} download="KeaganRieder-ArtistCv.pdf">
                                <p>click here to download my Artist CV</p>
                            </a>
                        </div>
                    </div>

                    <img src={profilePic} alt="Profile Picture" />

                </section>
            </>
        );
    }

    const aboutMeBodyContent = () => {
        return (
            <>
                {Bio()}
                {skillsSection()}
            </>
        );
    }

    return (
        <Application
            info={info}
            visibilityControls={visibilityControls}
            containers={containers}
            shortcuts={shortcut()}
            content={{ body: aboutMeBodyContent() }}
        />

    );
}