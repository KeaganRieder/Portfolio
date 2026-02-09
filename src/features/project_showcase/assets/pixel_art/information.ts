import type { ProjectEntry } from '../../project';

import icon from '../../../../assets/apps/text_doc.png';
const images = import.meta.glob('./*.png', { eager: true });

export const PixelArtDrawingsInfo: ProjectEntry = {
    id: "pixel_art_drawings",
    categoryID: "pixel_art",
    name: "Pixel Art Drawings",
    tags: ["Aseprite"],
    iconPath: icon,
    overviewContents: {
        imagePaths: Object.values(images).map((image: any) => image.default),
        description: "A collection of pixel art pieces.",
        links: []
    }
}