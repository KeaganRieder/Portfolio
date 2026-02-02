import { Skill, type SkillEntry } from "./skill";

export interface SkillCategoryEntry {
    id: string;
    name: string;
    skills: SkillEntry[];
}

export const SkillCategory: React.FC<SkillCategoryEntry> = ({id, name, skills }) => {

    const skillElements = skills.map((skill) => {
        return (
            <Skill
                id={skill.id}
                categoryID={skill.categoryID}
                name={skill.name}
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