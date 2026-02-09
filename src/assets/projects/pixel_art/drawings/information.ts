import icon from '../../../../assets/apps/text_doc.png';
import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
const images = import.meta.glob('./*.png', { eager: true });

export const PixelArtDrawingsInfo: ProjectEntryProperties = {
    id: "pixel_art_drawings",
    categoryID: "pixel_art",
    name: "Pixel Art Drawings",
    tags: ["Aseprite"],
    iconPath: icon,
    overviewContents: {
        imagePaths: Object.values(images).map((image: any) => image.default),
        description: "A collection of pixel art pieces.",
        links: []
    },
    content: [
        {
            sectionInfo: { type: "gallery", imagePaths: Object.values(images).map((image: any) => image.default) },
            styleName: "pixelated-image"
        }
    ]
}