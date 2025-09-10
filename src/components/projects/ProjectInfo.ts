import ticTacToeDisplayImg from '../../assets/projects/games/tic_tac_toe/board.png';
import soulSyncDisplayImg from '../../assets/projects/games/tic_tac_toe/board.png';
import puddleClickDisplayImg from '../../assets/projects/games/tic_tac_toe/board.png';
import slimeClickerDisplayImg from '../../assets/projects/games/tic_tac_toe/board.png';
import portfolioDisplayImg from '../../assets/projects/games/tic_tac_toe/board.png';
import interactiveCityDisplayImg from '../../assets/projects/art/interactive/cityScape/ex.png';
import PerlinGalaxyDisplayImg from '../../assets/projects/art/interactive/perlin_galaxy/galaxy_ex.png';


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
                description: "A tic tac toe game made in C++, using the minimax algorithm for the AI.",
                hasApp: false,
                appContent: [],
                displayImg: ticTacToeDisplayImg,
                GitHubUrl: "https://github.com/KeaganRieder/TicTacToe",
            },
            {
                projectName: "Under Us",
                description: "A text based adventure game created for a school project using C++.",
                hasApp: false,
                appContent: [],

                GitHubUrl: "https://github.com/KeaganRieder/UnderUs",
            },
             {
                projectName: "Soul Sync",
                description: "A 2 player split screen Coop platforming game, made in Godot.",
                hasApp: false,
                appContent: [],
                displayImg: soulSyncDisplayImg,

                GitHubUrl: "https://github.com/KeaganRieder/SoulSync",
                demoUrl: "https://github.com/KeaganRieder/Soul-Sync"
            }
        ]
    },
    {
        name: "Web Sites",
        projects: [
            {
                projectName: "Puddle Clicker",
                description: "A clicker game made with Figma for my new media web design class. Meant to bring awareness to predatory monetization practices in video games.",
                hasApp: false,
                appContent: [],
                displayImg: puddleClickDisplayImg,
                demoUrl: "https://www.figma.com/proto/NhRJj4sD7KLSy60STONtx1/Assignment-1..?node-id=10-26&p=f&t=9i4VD6yduhIHpWIz-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=10%3A26",
            },
            {
                projectName: "Slime Clicker",
                description: "a web game made with HTML, CSS and JavaScript. In which has the player clicking slimes to earn points and buy upgrades.",
                hasApp: false,
                appContent: [],
                displayImg: slimeClickerDisplayImg,
                GitHubUrl: "https://github.com/KeaganRieder/SlimeClicker",
                demoUrl: "https://keaganrieder.github.io/SlimeClicker/",
            },
            {
                projectName: "Portfolio",
                description: "My portfolio website made with React and Typescript, which is the one you are currently on.",
                hasApp: false,
                appContent: [],
                displayImg: portfolioDisplayImg,
                GitHubUrl: "https://github.com/KeaganRieder?tab=repositories&q=port&type=&language=&sort=",
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
            },
            {
                projectName: "Missionaries and Cannibals ",
                description: "A C++ program which uses breadth first search to solve the Missionaries and Cannibals problem.",
                hasApp: false,
                appContent: [],
                GitHubUrl: "https://github.com/KeaganRieder/Missionaries-and-Cannibals-Problem",
            }
        ]
    },
    {
        name: "Art Projects",
        projects: [
            {
                projectName: "Interactive City Scape",
                description: "An interactive digital art piece made using processing, that allows the user to interact and change a randomly generated cityscape.",
                hasApp: false,
                appContent: [],
                displayImg: interactiveCityDisplayImg,
                GitHubUrl: "https://github.com/KeaganRieder/CityScape",
            },
            {
                projectName: "Perlin Galaxy",
                description: "Procedural galaxy generation using Perlin noise algorithms made in unity.",
                hasApp: false,
                appContent: [],
                displayImg: PerlinGalaxyDisplayImg,
                GitHubUrl: "https://github.com/KeaganRieder/PerlinNebulaGenerator",
            },
            {
                projectName: "Pixel Art Collection",
                description: "A collection of pixel art - to add",
                hasApp: false,
                appContent: [],
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
                displayImg: `#`,
                appContent: [],
            },
           
        ]
    },
    
];
