import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/icons/blender_icon.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });


export const PlantPotInfo: ProjectEntryProperties = {
    id: "plant_pot",
    categoryID: "3d_models",
    name: "Plant Pot",
    tags: [{name: "3D Model"}, {name: "Decor"}, {skill: {id: "blender", name: "Blender"}}],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A detailed 3D model of a plant pot, showcasing both rendered and unrendered views.",
        links: []
    },
    content: [
        {
            sectionInfo: { type: "gallery", imageData: readImageGroup(images, true) },
        }
    ]
}