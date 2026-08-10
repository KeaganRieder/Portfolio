import type { SkillEntryInfo } from "@/windows/about_me/skillEntry";

/**
 * Flat list of skills shown in the About Me app. Each entry's categoryID
 * groups it under a heading (e.g. "languages", "tools", "engines") in the
 * UI, and the optional `hover` data (usage frequency, example projects)
 * drives the hover popup rendered by SkillEntry.
 */
export const Skills: SkillEntryInfo[] = [
    {
        skill: {
            id: "csharp",
            name: "C#"
        },
        categoryID: "languages",
        hover: {
            usage: "Weekly"
        }
    },
    {
        skill: {
            id: "cpp",
            name: "C++"
        },
        categoryID: "languages",
        hover: {
            usage: "Weekly"
        }
    },
    {
        skill: {
            id: "html",
            name: "HTML"
        },
        categoryID: "languages",
        hover: {
            usage: "Daily"
        }
    },

    {
        skill: {
            id: "javascript",
            name: "JavaScript"
        },
        categoryID: "languages",
        hover: {
            usage: "semi-Daily"
        }
    },
    {
        skill: {
            id: "typescript",
            name: "TypeScript"
        },
        categoryID: "languages",
        hover: {
            usage: "semi-Daily"
        }
    },
    {
        skill: {
            id: "react",
            name: "React"
        },
        categoryID: "languages",
        hover: {
            usage: "semi-Daily"
        }
    },
    {
        skill: {
            id: "godot",
            name: "Godot"
        },
        categoryID: "engines",
    },
    {
        skill: {
            id: "git",
            name: "Git"
        },
        categoryID: "tools",
    },
    {
        skill: {
            id: "blender",
            name: "Blender"
        },
        categoryID: "tools",
    },
    {
        skill: {
            id: "aesprite",
            name: "Aesprite"
        },
        categoryID: "tools",
    }
];