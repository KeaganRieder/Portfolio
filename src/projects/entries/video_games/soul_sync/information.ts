// Content/metadata entry for the "Soul Sync" Godot co-op platformer. Conforms to the
// ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '@/projects/models';
import { readImageGroup } from '@/shared/types/sectionType';
import icon from '@/assets/icons/text_doc_icon.png';
// Eagerly imports every PNG in this project's folder so they can be used as overview/gallery images.
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const SoulSyncInfo: ProjectEntryProperties = {
    id: "soul_sync",
    categoryID: "video_games",
    name: "Soul Sync",
    tags: [{ skill: { id: "csharp", name: "C#" } }, { name: "Godot" }],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A 2 player split screen Coop platforming game, made in Godot.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/SoulSync" },
            { label: "Exhibit", url: "https://ulethnewmedia.com/2025/soul-sync/" }
        ]
    },
    content: [
        { sectionInfo: { type: "header", text: `Gameplay Showcase`, } },
        {
            sectionInfo: { type: "video", src: "https://www.youtube.com/embed/nJnVt020O08", alt: "Soul Sync Gameplay Video" },
        },
        {
            sectionInfo: {
                type: "link",
                label: "GitHub",
                url: "https://github.com/KeaganRieder/SoulSync"
            }
        },
        {
            sectionInfo: {
                type: "link",
                label: "Download",
                url: "https://github.com/KeaganRieder/Soul-Sync-Compiled"
            }
        },
        
        { sectionInfo: { type: "subHeader", text: `My Role`, } },
        {
            sectionInfo: {
                type: "body",
                text: ` I was one of 3 group members working on this assignment, my role was the group lead mangling the members ensuring they were getting what was needed done. 
                They both focused on creating the art for the project well I was the one who programed`,
            },
        },
        { sectionInfo: { type: "subHeader", text: `About`, } },
        {
            sectionInfo: {
                type: "body",
                text: `Soul Sync is a 2D split-screen co-op platformer where two players take on the roles of unique characters, 
                each designed to complement the other's weaknesses with their own strengths and abilities. 
                Teamwork and coordination are key as you navigate challenging levels and overcome obstacles together.`,
            },
        },
        { sectionInfo: { type: "subHeader", text: `Learn More:`, } },
        {
            sectionInfo: {
                type: "link",
                label: "Exhibit",
                url: "https://ulethnewmedia.com/2025/soul-sync/"
            }
        },
    ]
}