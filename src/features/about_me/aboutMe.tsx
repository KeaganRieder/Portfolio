import React, { useMemo } from "react";

import type { ApplicationDefinition } from "../../components/application/definition";
import { Biography } from "./assets/biography";
import { Application } from "../../components/application/application";

import { SkillCategory, type SkillCategoryEntry } from "./skillCategory";
import type { SkillEntryInfo } from "./skillEntry";
import { Skills } from "./assets/skills";

import './styles/aboutMe.css'
import './styles/skill.css'

import profilePic from './assets/profile.gif';
import textDocIcon from '../../assets/apps/icons/text_doc_icon.png';

import resume from '../../assets/job_mat/resume.pdf';
import artistCV from '../../assets/job_mat/artistCv.pdf';

export const AboutMe: React.FC<ApplicationDefinition> = ({ info, visibilityControls, containers, projectRegistry }) => {
    const skillCategories = useMemo<SkillCategoryEntry[]>(() => {
        const categoryMap = new Map<string, SkillCategoryEntry>();

        Skills.forEach((skill: SkillEntryInfo) => {
            const existing = categoryMap.get(skill.categoryID) ?? {
                id: skill.categoryID,
                name: skill.categoryID,
                skills: [] as SkillEntryInfo[],
            };

            if (!existing.skills.find((skillEntry) => skillEntry.skill.id === skill.skill.id)) {
                const exampleProjects = projectRegistry?.skillExamples?.examples[skill.skill.id] ?? [];
                const hover = skill.hover ?? {};

                const skillWithExamples: SkillEntryInfo = {
                    ...skill,
                    hover: {
                        ...hover,
                        examples: {
                            open: projectRegistry?.openProject ?? (() => {}),
                            projects: exampleProjects,
                        },
                    },
                };

                existing.skills = [...existing.skills, skillWithExamples];
            }

            categoryMap.set(skill.categoryID, existing);
        });

        return Array.from(categoryMap.values());
    }, [projectRegistry?.skillExamples?.examples, projectRegistry?.openProject]);

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