import { SkillEntry, type SkillEntryInfo } from "./skillEntry";

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

    return (<>
        <div id ={id} className="skill-category">
            <h2>{name}</h2>
            <div className="skill-category-skill-list">
                {skillElements}
            </div>

        </div>
    </>
    );
}