/*
    contains all the content for the work showcase app
*/
export const WorkDisplayContent = {
    currentProject: {
        title: "Current Projects",
        type: "section",
        works: {

            atomationCode: {
                title: "Atomation-Code",
                content: {
                    highLight: {
                        description: "Atomation code"
                    },
                    overview: {},
                },
            },
            atomationArt: {
                title: "Atomation-Art",
                content: {
                    highLight: {
                        description: "Atomation art"
                    },
                    overview: {
                        artistStatement: {
                            type: "bodyText",
                            // style: 
                            content: {
                                bodyText: `
                                I’m a programmer and artist, currently attending the University of Lethbridge for a BFA in New Media 
                                and a BSC in Computer Science. I enjoy working with various programming languages and tools to 
                                create software that solves problems or generates and makes interactive artwork. When I’m not 
                                writing programs to make or solve problems, I’m drawing pixel art pieces or tile sets and character 
                                models that can be used for games.
                                Programming is a hobby and passion of mine, which I’ve had since middle school. I was introduced
                                and fell in love with the problem-solving aspects and the ability to create things with it. This passion 
                                led me to attend the University of Lethbridge to expand my programming skills. Well, there, I would 
                                find out about the new media program that covered various skills and topics, including video game 
                                design and development. Having a hobby of playing video games and a desire to develop and create
                                games, I added new media as a second major.
                                Besides doing school, I’m currently working on a game called Automation, which combines 
                                elements from automation games and colony sims to create different experiences. The game’s 
                                developer is currently more of a hobby, a way to practice and learn new skills.
                            `}
                        },
                        test:{
                            type:"bodyText",
                            content: {
                                bodyText: "this is a test",
                            }
                        },
                    },
                },
            }
        },
    },

    games: {
        title: "Games",
        type: "section",
        works: {},
    },

    webDev: {
        title: "Web Development",
        type: "section",
        works: {},
    },

    puzzleSolvers: {
        title: "Puzzle Solvers",
        type: "section",
        works: {},
    },

    interactiveArt: {
        title: "Interactive Art",
        type: "section",
        works: {

        },
    },

    pixelArt: {
        title: "pixelArt",
        type: "section",
        works: {
            homeAmongTheStars:{
                title: "Home Among The Stars",
                content:{
highLight: {},
overview:{},
                },
            },
            wintersFirstLight:{
                title: "Winter's First Light",
                content: {
highLight:{},
overview:{},
                },
            },
            sunsRest:{
                title:"Sun's Rest",
                content:{
highLight:{},
overview:{},
                },
            },
            untitled:{
                title: "Untitled",
                content:{
highLight:{},
overview:{},
                },
            },

        },
    },

    BlenderArt: {
        title: "3D Art",
        type: "section",
        works: {},
    },
}