import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/icons/blender_icon.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const AloneInfo: ProjectEntryProperties = {
    id: "alone",
    categoryID: "3d_models",
    name: "Alone",
    tags: [{name: "3D Model"}, {name: "Video"}, {skill: {id: "blender", name: "Blender"}}],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A detailed 3D model of a solitary figure walking through a war torn environment.",
        links: []
    },
    content: [
        {
            sectionInfo: { type: "video", src: "https://www.youtube.com/embed/C0PK1KK15_A", alt: "Alone 3D Model Video" },
        }
    ]
}