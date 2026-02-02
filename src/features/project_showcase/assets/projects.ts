import type { ProjectEntry } from "../project";

export const Projects: ProjectEntry[] = [
    {
        id: "project_1",
        categoryID: "web_dev",
        name: "Portfolio Website",
        tags: ["React", "TypeScript", "CSS"],
        overviewContents: {
            description: "A personal portfolio website to showcase my projects and skills.",
            links: [
                { label: "GitHub", url: "temp.com" },
                { label: "Live Demo", url: "temp.com" }
            ]
        }
    },
     {
        id: "project_2",
        categoryID: "test",
        name: "Portfolio Website",
        tags: ["React", "TypeScript", "CSS"],
        overviewContents: {
            description: "A personal portfolio website to showcase my projects and skills.",
            links: [
                { label: "GitHub", url: "temp.com" },
                { label: "Live Demo", url: "temp.com" }
            ]
        }
    },
];