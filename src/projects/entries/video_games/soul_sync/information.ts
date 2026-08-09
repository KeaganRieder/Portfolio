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