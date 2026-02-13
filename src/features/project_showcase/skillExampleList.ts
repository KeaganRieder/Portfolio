import { useRef, useState } from "react";
import { Skills } from "../about_me/assets/skills";
import type { ProjectTag } from "./project/projectModels";
import type { skillExample } from "../../types/skill";

const getSkillList = () => {
    const skillList: string[] = [];
    Skills.forEach((skillEntry) => {
        if (!skillList.includes(skillEntry.skill.id)) {
            skillList.push(skillEntry.skill.id);
        }
    });
    return skillList;
};

export const SkillExamples = () => {
    const skillList = useRef(getSkillList());
    const [examples, setExamples] = useState<Record<string, skillExample[]>>({});

    const skillExists = (skill: string): boolean => skillList.current.includes(skill);

    const checkProjectSkillTags = (projectTags: ProjectTag[]): string[] => {
        const validSkills: string[] = [];
        projectTags.forEach((tag) => {
            if (tag.skill && skillExists(tag.skill.id)) {
                validSkills.push(tag.skill.id);
            } 
        });
        return validSkills;
    }

    const addExample = (projectTags: ProjectTag[], projectInfo: { id: string; name: string }) => {
        const validSkills = checkProjectSkillTags(projectTags);

        validSkills.forEach((skillId) => {
            setExamples((prev) => {
                const existingExamples = prev[skillId] || [];
                const alreadyExists = existingExamples.some((example) => example.projectId === projectInfo.id);

                if (alreadyExists) return prev;

                const nextExample: skillExample = {
                    projectId: projectInfo.id,
                    projectName: projectInfo.name,
                };
                return {
                    ...prev,
                    [skillId]: [...existingExamples, nextExample],
                };
            });
        });
    };

    return {
        skillList: skillList.current,
        examples,
        addExample,
    };
};





