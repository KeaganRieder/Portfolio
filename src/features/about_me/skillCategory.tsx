import { SkillEntry, type SkillEntryInfo } from "./skillEntry";

import './styles/skill.css';

export interface SkillCategoryEntry {
    id: string;
    name: string;
    skills: SkillEntryInfo[];
}

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