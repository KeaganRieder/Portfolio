import React from "react";
import type { Skill, skillExample } from "../../types/skill";

import './skill.css';

/**
 * Describes one skill and, optionally, how it should behave on hover:
 * a usage-frequency label and/or a list of example projects that can be
 * opened (via `examples.open`) to demonstrate that skill.
 */
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

/**
 * Renders a single skill name. If hover data (usage or example projects)
 * is present, the entry becomes interactive and reveals that info on
 * mouse-over; otherwise it's just a static label.
 */
export const SkillEntry: React.FC<SkillEntryInfo> = ({ skill, hover }) => {

    const [isHovered, setIsHovered] = React.useState(false);

    // Renders a button that opens the given project window when clicked, used as an "example of this skill" link.
    const exampleButton = (id: string, projectName: string) => {
        return (
            <>
                <button className="example-button" onClick={() => hover?.examples?.open(id)}>
                    <p>{projectName}</p>
                </button>
            </>
        )
    }

    // Content shown only while hovered: usage frequency and/or example-project buttons.
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


    // Decides whether this skill has anything worth showing on hover; if so, renders
    // the interactive "hoverable" variant with mouse handlers, otherwise a static entry.
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
