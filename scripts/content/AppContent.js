import { AppStyles } from "../site_styles/ComputerAppStyles.js";

/*
    contains all the content for the about me app
*/
export const AboutMeContent = {
    profilePic: {
        type: "Img",
        style: AppStyles.aboutMe.profilePic,
        content: { name: "profilePic", imgSrc: "apps/elements/logo.gif" }
    },
    bio: {
        type: "bodyText",
        style: AppStyles.aboutMe.bodyText,
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
    skillsSection: {
        type: "skillsSection",
        content: {
            Languages: {
                title: "Languages",
                skills: ["JavaScript", "HTML", "CSS", "C++", "C#"],
            },
            Engines: {
                title: "Engines",
                skills: ["Unity", "Godot"],
            },
            Tools: {
                title: "Tools",
                skills: ["Git", "VSCode", "Blender", "Processing", "Aesprite", "Photoshop", "Illustrator"],
            },
        },
    },
    
    artistStatement: {
        type: "bodyText",
        style: AppStyles.aboutMe.bodyText,
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
};

/*
    contains all the content for the resume app
*/
export const ResumeContent = {
    resume: {
        type: "embedded",
        size: { width: '100%', height: '100%' },
        content: { src: "./assets/apps/pdfs/resume.pdf", type: 'application/pdf' }
    }
}

/*
    contains all the content for the artist cv app
*/
export const ArtistCvContent = {
    resume: {
        type: "embedded",
        size: { width: '100%', height: '100%' },
        content: { src: "./assets/apps/pdfs/artistCv.pdf", type: 'application/pdf' }
    }
}
