import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/text_doc.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });


export const PlantPotInfo: ProjectEntryProperties = {
    id: "plant_pot",
    categoryID: "3d_models",
    name: "Plant Pot",
    tags: ["3D Model", "Decor", "Blender"],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A detailed 3D model of a plant pot, showcasing both rendered and unrendered views.",
        links: []
    }
}