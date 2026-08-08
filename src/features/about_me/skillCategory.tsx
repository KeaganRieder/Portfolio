import { SkillEntry, type SkillEntryInfo } from "./skillEntry";

import './skill.css';

/** A single named group of skills (e.g. "languages"), built by grouping the flat Skills list by categoryID. */
export interface SkillCategoryEntry {
    id: string;
    name: string;
    skills: SkillEntryInfo[];
}

/** Renders one skill-category column: a heading plus its list of SkillEntry items. */
export const SkillCategory: React.FC<SkillCategoryEntry> = ({id, name, skills }) => {

    const skillElements = skills.map((skill) => {
        return (
            <SkillEntry
                key={skill.skill.id}
                skill={skill.skill}
                categoryID={skill.categoryID}
                hover={skill.hover}
            />
        );
    });

// Capitalizes the category id/name for display (categories are stored lowercase, e.g. "languages").
const getTitle = () => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

    return (<>
        <div id ={id} className="skill-category">
            <h2 className="section-title">{getTitle()}</h2>
            <div className="skill-category-skill-list">
                {skillElements}
            </div>

        </div>
    </>
    );
}