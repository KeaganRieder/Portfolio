import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/text_doc.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const SoulSyncInfo: ProjectEntryProperties = {
    id: "soul_sync",
    categoryID: "video_games",
    name: "Soul Sync",
    tags: ["C#","Godot"],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A 2 player split screen Coop platforming game, made in Godot.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/SoulSync" },

            { label: "Demo", url: "https://www.youtube.com/embed/nJnVt020O08" }
        ]
    }
}