import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';

import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/icons/photo_icon.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const PixelArtDrawingsInfo: ProjectEntryProperties = {
    id: "pixel_art_drawings",
    categoryID: "pixel_art",
    name: "Pixel Art Drawings",
    tags: [{skill: {id: "aesprite", name: "Aesprite"}}, {name: "Pixel Art"}, {name: "Drawings"}],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, true),
        description: "A collection of pixel art pieces.",
        links: []
    },
    content: [
        {
            sectionInfo: { type: "gallery", imageData: readImageGroup(images, true) },
        }
    ]
}

