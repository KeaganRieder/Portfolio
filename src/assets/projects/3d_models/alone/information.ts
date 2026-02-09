import icon from '../../../../assets/apps/text_doc.png';
import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
const images = import.meta.glob('./*.png', { eager: true });

export const AloneInfo: ProjectEntryProperties = {
    id: "alone",
    categoryID: "3d_models",
    name: "Alone",
    tags: ["3D Model", "Video", "Blender"],
    iconPath: icon,
    overviewContents: {
        imagePaths: Object.values(images).map((image: any) => image.default),
        description: "A detailed 3D model of a solitary figure walking through a war torn environment.",
        links: [
            { label: "Video", url: "https://www.youtube.com/embed/C0PK1KK15_A" }
        ]
    }
}