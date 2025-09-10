export interface ProjectInfo{
    projectName: string;
    description?: string;
    displayImg?: string;
    hasApp?: boolean;
    appContent : React.ReactNode[];
    GitHubUrl?: string;
    demoUrl?: string;
}

export interface ProjectGroupInfo{
    name: string;
    projects: ProjectInfo[];
}

export const projectData: ProjectGroupInfo[] = [
    {
        name: "Games",
        projects: [
            {
                projectName: "Tic Tac Toe",
                description: "A classic tic-tac-toe game implementation with win/loss detection.",
                hasApp: false,
                appContent: [],
                GitHubUrl: "https://github.com/KeaganRieder/TicTacToe",
            },
            {
                projectName: "Under Us",
                description: "to add",
                hasApp: false,
                appContent: [],
                GitHubUrl: "to add",
            },
             {
                projectName: "to add",
                description: "to add",
                hasApp: false,
                appContent: [],
                GitHubUrl: "#",
            }
        ]
    },
    {
        name: "Web Sites",
        projects: [
            {
                projectName: "Puddle Clicker",
                description: "",
                hasApp: false,
                appContent: [],
                demoUrl: "#",
            },
            {
                projectName: "Slime Clicker",
                description: "",
                hasApp: false,
                appContent: [],
                GitHubUrl: "#",
                demoUrl: "#",
            },
            {
                projectName: "Portfolio",
                description: "this site",
                hasApp: false,
                appContent: [],
                GitHubUrl: "#",
                demoUrl: "#",
            },
        ]
    },
    {
        name: "Puzzle Solvers",
        projects: [
            {
                projectName: "N-Queen Problem",
                description: "Solution to the classic N-Queen chess problem using backtracking.",
                hasApp: false,
                appContent: [],
                GitHubUrl: "to add",
            }
        ]
    },
    {
        name: "Art Projects",
        projects: [
            {
                projectName: "Interactive City Scape",
                description: "An interactive digital art piece featuring city landscapes.",
                hasApp: false,
                appContent: [],
                GitHubUrl: "#",
                demoUrl: "#"
            },
            {
                projectName: "Perlin Galaxy",
                description: "Procedural galaxy generation using Perlin noise algorithms.",
                hasApp: false,
                appContent: [],
                GitHubUrl: "#",
            },
            {
                projectName: "Pixel Art Collection",
                description: "A collection of pixel art including landscapes and scenes.",
                hasApp: false,
                appContent: [],
                GitHubUrl: "#",
            }
        ]
    },
    {
        name: "3d Art Projects",
        projects: [
            {
                projectName: "Plant pot",
                description: "A 3D model of a plant pot with realistic textures.",
                hasApp: true,
                appContent: [],
            },
            {
                projectName: "to be name",
                description: "description here",
                hasApp: true,
                appContent: [],
                demoUrl: "#"

            }
        ]
    },
    
];
