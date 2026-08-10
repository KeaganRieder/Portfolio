// Content/metadata entry for the "Slime Clicker" HTML/JS/CSS web game. Conforms to the
// ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '@/projects/models';
import { readImageGroup } from '@/shared/types/sectionType';
import icon from '@/assets/icons/text_doc_icon.png';
// Eagerly imports every PNG in this project's folder so they can be used as overview/gallery images.
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const SlimeClickerInfo: ProjectEntryProperties = {
    id: "slime_clicker",
    categoryID: "video_games",
    name: "Slime Clicker",
    tags: [{ skill: { id: "html", name: "HTML" } }, { skill: { id: "javascript", name: "JavaScript" } }, { name: "CSS" }],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A web game which has the player clicking slimes to earn points and buy upgrades.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/SlimeClicker" },
            { label: "The Site", url: "https://keaganrieder.github.io/SlimeClicker/" }
        ]
    },
    content: [
        {
            sectionInfo: {
                type: "embed",
                src: "https://keaganrieder.github.io/SlimeClicker/",
                title: "Slime Clicker",
                height: 700,
            },
        },
         {sectionInfo: {
                type: "link",
                label: "GitHub",
                url: "https://github.com/KeaganRieder/SlimeClicker" 
            }
        },
        {sectionInfo: {
                type: "link",
                label: "The Site", url: "https://keaganrieder.github.io/SlimeClicker/"
            }
        },
        { sectionInfo: { type: "subHeader", text: `About`, } },
        {
            sectionInfo: {
                type: "body",
                text: `SlimeClicker is a simple yet addictive web game built with vanilla JavaScript.
                Click on slimes to defeat them, collect slime balls, and purchase upgrades to become stronger. 
                Face increasingly challenging groups of slimes as you progress through endless encounters.`,
            },
        },
    ],
}