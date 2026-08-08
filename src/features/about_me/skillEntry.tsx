import React from "react";
import type { Skill, skillExample } from "../../types/skill";

import './skill.css';

export interface SkillEntryInfo {
    skill: Skill;
    categoryID: string;

    hover?: {
        usage?: string;
        examples?:
        {
            open: (projectId: string) => void;
            projects: skillExample[];
        }
    };
}

export const SkillEntry: React.FC<SkillEntryInfo> = ({ skill, hover }) => {

    const [isHovered, setIsHovered] = React.useState(false);

    const exampleButton = (id: string, projectName: string) => {
        return (
            <>
                <button className="example-button" onClick={() => hover?.examples?.open(id)}>
                    <p>{projectName}</p>
                </button>
            </>
        )
    }

    const skillHoverBody = () => {

        if (isHovered && hover) {
            return (
                <div>
                    {hover.usage? <p>usage: {hover.usage}</p> : null}
                    <div className="example-button-container">
                        <h3>Examples</h3>
                        {hover.examples?.projects.map((example) => exampleButton(example.projectId, example.projectName))}
                    </div>
                </div>
            )
        }
        return (<></>);
    };


    const skillBody = () => {
        if (hover && (hover.usage || (hover.examples && hover.examples.projects.length > 0))) {
            return (
                <div
                    id={skill.id}
                    className="skill-entry-hoverable"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <h3 className="skill-title">{skill.name}</h3>
                    {skillHoverBody()}
                </div>
            );
        }
        return (
            <div
                id={skill.id}
                className="skill-entry"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <h3 className="skill-title">{skill.name}</h3>

            </div>
        );
    }

    return skillBody();
}
