import React from "react";

export interface SkillEntry {
    id: string;
    categoryID: string;
    name: string;
    hover?: {
        usage: string;
    };
}

export const Skill: React.FC<SkillEntry> = ({ id, name, hover }) => {

    const [isHovered, setIsHovered] = React.useState(false);

    const skillHoverBody = () => {
        if (isHovered && hover) {
            return (
                <div className="skill-hover-body">
                    <p>usage: {hover.usage}</p>
                </div>
            )
        }
        return (<></>);
    };

    const skillBody = () => {
        if (hover) {
            return (
                <div
                    id={id}
                    className="skill-entry-hoverable"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <h3>{name}</h3>
                    {skillHoverBody()}
                </div>
            );
        }
        return (
            <div
                id={id}
                className="skill-entry"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <h3>{name}</h3>

            </div>
        );
    }

    return skillBody();
}
