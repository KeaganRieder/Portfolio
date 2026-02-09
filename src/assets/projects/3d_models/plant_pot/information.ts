import icon from '../../../../assets/apps/text_doc.png';
import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';

const images = import.meta.glob('./*.png', { eager: true });

export const PlantPotInfo: ProjectEntryProperties = {
    id: "plant_pot",
    categoryID: "3d_models",
    name: "Plant Pot",
    tags: ["3D Model", "Decor", "Blender"],
    iconPath: icon,
    overviewContents: {
        imagePaths: Object.values(images).map((image: any) => image.default),
        description: "A detailed 3D model of a plant pot, showcasing both rendered and unrendered views.",
        links: []
    }
}