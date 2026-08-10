// Content/metadata entry for the "Plant Pot" 3D model project. Conforms to the
// ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '@/projects/models';
import { readImageGroup } from '@/shared/types/sectionType';
import icon from '@/assets/icons/blender_icon.png';
// Eagerly imports every PNG in this project's folder so they can be used as overview/gallery images.
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