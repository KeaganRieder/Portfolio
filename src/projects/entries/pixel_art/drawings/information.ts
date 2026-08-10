// Content/metadata entry for the "Pixel Art Drawings" gallery project. Conforms to the
// ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '@/projects/models';

import { readImageGroup } from '@/shared/types/sectionType';
import icon from '@/assets/icons/photo_icon.png';
// Eagerly imports every PNG in this project's folder so they can be used as overview/gallery images.
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

