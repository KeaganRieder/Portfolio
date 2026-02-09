import icon from '../../../../../assets/apps/text_doc.png';

import type { ProjectEntry } from '../../../project';

const images = import.meta.glob('./*.png', { eager: true });

export const soulSyncInfo: ProjectEntry = {
    id: "soul_sync",
    categoryID: "video_games",
    name: "Soul Sync",
    tags: ["C#","Godot"],
    iconPath: icon,
    overviewContents: {
        imagePaths: Object.values(images).map((image: any) => image.default),
        description: "A 2 player split screen Coop platforming game, made in Godot.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/SoulSync" },

            { label: "Demo", url: "https://www.youtube.com/embed/nJnVt020O08" }
        ]
    }
}