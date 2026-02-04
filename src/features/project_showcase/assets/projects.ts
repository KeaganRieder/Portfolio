import type { ProjectEntry } from "../project";

export const Projects: ProjectEntry[] = [
    {
        id: "project_hello_world",
        categoryID: "demo_projects",
        name: "Hello World App",
        tags: ["Demo", "Example"],
        iconPath: "https://via.placeholder.com/100",
        overviewContents: {
            imagePaths: ["https://via.placeholder.com/300x200"],
            description: "A simple Hello World application demonstrating basic functionality.",
            links: [
                { label: "GitHub", url: "" },
                { label: "Live Demo", url: "" }
            ]
        }
    },
    {
        id: "project_hello_world_2",
        categoryID: "demo_projects",
        name: "Hello World App",
        tags: ["Demo", "Example"],
        iconPath: "https://via.placeholder.com/100",
        overviewContents: {
            imagePaths: ["https://via.placeholder.com/300x200","https://via.placeholder.com/300x200",
                "https://via.placeholder.com/300x200"
            ],
            description: "A simple Hello World application demonstrating basic functionality.",
            links: [
                { label: "GitHub", url: "" },
                { label: "Live Demo", url: "" }
            ]
        }
    },
    {
        id: "project_hello_world",
        categoryID: "demo_projects-2",
        name: "Hello World App",
        tags: ["Demo", "Example"],
        iconPath: "https://via.placeholder.com/100",
        overviewContents: {
            imagePaths: ["https://via.placeholder.com/300x200"],
            description: "A simple Hello World application demonstrating basic functionality.",
            links: [
                { label: "GitHub", url: "" },
                { label: "Live Demo", url: "" }
            ]
        }
    },
    {
        id: "project_hello_world",
        categoryID: "demo_projects-3",
        name: "Hello World App",
        tags: ["Demo", "Example"],
        iconPath: "https://via.placeholder.com/100",
        overviewContents: {
            imagePaths: ["https://via.placeholder.com/300x200"],
            description: "A simple Hello World application demonstrating basic functionality.",
            links: [
                { label: "GitHub", url: "" },
                { label: "Live Demo", url: "" }
            ]
        }
    }
];