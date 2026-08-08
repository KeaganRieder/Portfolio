import React, { useMemo } from "react";

import type { ApplicationDefinition } from "../../components/application/definition";
import { Biography } from "./assets/biography";
import { Application } from "../../components/application/application";

import { SkillCategory, type SkillCategoryEntry } from "./skillCategory";
import type { SkillEntryInfo } from "./skillEntry";
import { Skills } from "./assets/skills";

import './aboutMe.css'
import './skill.css'

import profilePic from './assets/profile.gif';


export const AboutMe: React.FC<ApplicationDefinition> = ({ info, visibilityControls, containers, projectRegistry, shortcuts }) => {
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

    const skillsSection = () => {
        return (
            <section className="skills-section">
                <h2 className="section-title">Skills</h2>
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
                            <a href="https://keaganrieder.github.io/Resume-Site/" target="_blank" rel="noopener noreferrer">
                                <p>My Resume</p>
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
            shortcuts={shortcuts}
            content={{ body: aboutMeBodyContent() }}
        />

    );
}
