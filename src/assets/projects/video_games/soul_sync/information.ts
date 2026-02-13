import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/icons/text_doc_icon.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const SoulSyncInfo: ProjectEntryProperties = {
    id: "soul_sync",
    categoryID: "video_games",
    name: "Soul Sync",
    tags: [{skill: {id: "csharp", name: "C#"}}, {name: "Godot"}],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A 2 player split screen Coop platforming game, made in Godot.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/SoulSync" },
            {label: "Exhibit", url: "https://ulethnewmedia.com/2025/soul-sync/" }
        ]
    },
    content: [
        {
            sectionInfo: { type: "video", src: "https://www.youtube.com/embed/nJnVt020O08", alt: "Soul Sync Gameplay Video" },
        }
    ]
}