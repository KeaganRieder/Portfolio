import React from 'react';
import ticTacToeDisplayImg from '../../assets/projects/games/tic_tac_toe/board.png';
import soulSyncDisplayImg from '../../assets/projects/games/soul_sync_title.png';
import puddleClickDisplayImg from '../../assets/projects/games/tic_tac_toe/board.png';
import slimeClickerDisplayImg from '../../assets/projects/games/tic_tac_toe/board.png';
import portfolioDisplayImg from '../../assets/projects/games/tic_tac_toe/board.png';
import interactiveCityDisplayImg from '../../assets/projects/art/interactive/cityScape/ex.png';

import perlinGalaxyDisplayImg from '../../assets/projects/art/interactive/perlin_galaxy/galaxy_ex.png';
import homeAmongTheStairs from '../../assets/projects/art/pixel/home_among_the_stars.png';
import snowySkies from '../../assets/projects/art/pixel/snowy_skies.png';
import sunset from '../../assets/projects/art/pixel/sunset.png';

import plantPotRendered from '../../assets/projects/art/3d_modals/plant_pot/PlantPot.png';
import plantPotWorkSpace from '../../assets/projects/art/3d_modals/plant_pot/UnRendered.png';

export interface ProjectInfo {
    projectName: string;
    description?: string;
    displayImg?: string;
    appContent?: React.ReactNode[];
    GitHubUrl?: string;
    demoUrl?: string;
}

export interface ProjectGroupInfo {
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

                appContent: [
                    <>
                        <div className="project-vid">
                            <iframe src={"#"} title={"#"} ></iframe>
                            <p>{"video of the player winning against the AI"}</p>

                        </div>
                        <div className="project-vid">
                            <iframe src={"#"} title={"#"} ></iframe>
                            <p>{"video of the player losing against the AI"}</p>
                        </div>
                    </>
                ],

                displayImg: ticTacToeDisplayImg,
                GitHubUrl: "https://github.com/KeaganRieder/TicTacToe",
            },
            {
                projectName: "Under Us",
                description: "A text based adventure game created for a school project using C++.",
                appContent: [
                    <div className="project-vid">
                        <iframe src={"#"} title={"Play through"} ></iframe>
                        <p>{"Video showcasing the game in action"}</p>
                    </div>
                ],
                GitHubUrl: "https://github.com/KeaganRieder/UnderUs",
            },
            {
                projectName: "Soul Sync",
                description: "A 2 player split screen Coop platforming game, made in Godot.",

                appContent: [
                    <div className="project-vid">
                        <iframe src={"https://www.youtube.com/embed/nJnVt020O08"} title={"Play through"} ></iframe>
                        <p>{"Video showcasing the game in action"}</p>
                    </div>
                ],
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
                displayImg: puddleClickDisplayImg,
                demoUrl: "https://www.figma.com/proto/NhRJj4sD7KLSy60STONtx1/Assignment-1..?node-id=10-26&p=f&t=9i4VD6yduhIHpWIz-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=10%3A26",
            },
            {
                projectName: "Slime Clicker",
                description: "a web game made with HTML, CSS and JavaScript. In which has the player clicking slimes to earn points and buy upgrades.",
                displayImg: slimeClickerDisplayImg,
                GitHubUrl: "https://github.com/KeaganRieder/SlimeClicker",
                demoUrl: "https://keaganrieder.github.io/SlimeClicker/",
            },
            {
                projectName: "Portfolio",
                description: "My portfolio website made with React and Typescript, which is the one you are currently on.",
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
                appContent: [
                    <div className="project-vid">
                        <iframe src={"https://www.youtube.com/embed/xPPZ5PR3LB0"} title={"Play through"} ></iframe>
                        <p>{"Video showcasing the interactive work"}</p>
                    </div>
                ],
                GitHubUrl: "to add",
            },
            {
                projectName: "Missionaries and Cannibals ",
                description: "A C++ program which uses breadth first search to solve the Missionaries and Cannibals problem.",
                appContent: [
                    <div className="project-vid">
                        <iframe src={"https://www.youtube.com/embed/xPPZ5PR3LB0"} title={"Play through"} ></iframe>
                        <p>{"Video showcasing the interactive work"}</p>
                    </div>
                ],
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
                appContent: [
                    <div className="project-vid">
                        <iframe src={"https://www.youtube.com/embed/xPPZ5PR3LB0"} title={"Play through"} ></iframe>
                        <p>{"Video showcasing the interactive work"}</p>
                    </div>
                ],
                displayImg: interactiveCityDisplayImg,
                GitHubUrl: "https://github.com/KeaganRieder/CityScape",
            },
            {
                projectName: "Perlin Galaxy",
                description: "Procedural galaxy generation using Perlin noise algorithms made in unity.",
                appContent: [
                    <div className="project-vid">
                        <iframe src={"https://www.youtube.com/embed/xPPZ5PR3LB0"} title={"Play through"} ></iframe>
                        <p>{"Video showcasing the interactive work"}</p>
                    </div>
                ],
                displayImg: perlinGalaxyDisplayImg,
                GitHubUrl: "https://github.com/KeaganRieder/PerlinNebulaGenerator",
            },
            {
                projectName: "Pixel Art Collection",
                description: "A collection of pixel art pieces created using Aseprite.",
                appContent: [
                    <>
                        <section className='img-grid'>
                            <div>
                                <h3>Home Among The Stairs</h3>
                                <img src={homeAmongTheStairs} alt="Home Among The Stairs" />
                            </div>
                            <div>
                                <h3>Snowy Skies</h3>
                                <img src={snowySkies} alt="Snowy Skies" />
                            </div>
                            <div>
                                <h3>Sunset</h3>
                                <img src={sunset} alt="Sunset" />
                            </div>
                        </section>
                    </>

                ],
            }
        ]
    },
    {
        name: "3d Art Projects",
        projects: [
            {
                projectName: "Plant pot",
                description: "A 3D model of a plant pot and mushroom created using Blender.",
                displayImg: plantPotRendered,
                appContent: [<section className='img-grid'>
                    <div>
                        <h3>Rendered img</h3>
                        <img src={plantPotRendered} alt="Rendered img" />
                    </div>
                    <div>
                        <h3>workSpace</h3>
                        <img src={plantPotWorkSpace} alt="workSpace" />
                    </div>
                </section>],
            },
            {
                projectName: "Alone",
                description: "A 3D render of a lone figure walking through a desolate landscape, created in Blender.",
                displayImg: plantPotRendered,
                appContent: [<section className='img-grid'>
                    <div>
                        <h3>Rendered img</h3>
                        <img src={plantPotRendered} alt="Rendered img" />
                    </div>
                    <div>
                        <h3>workSpace</h3>
                        <img src={plantPotWorkSpace} alt="workSpace" />
                    </div>
                </section>],
            },

        ]
    },

];
