// Content/metadata entry for the "Alone" 3D model project (a Blender character walking through
// a war torn scene). Conforms to the ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '@/projects/models';
import { readImageGroup } from '@/shared/types/sectionType';
import icon from '@/assets/icons/blender_icon.png';
// Eagerly imports every PNG in this project's folder so they can be used as overview/gallery images.
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

import imgOne from './content/un-textured1.png'
import imgTwo from './content/un-textured2.png'
import imgThree from './content/un-textured3.png'


export const AloneInfo: ProjectEntryProperties = {
    id: "alone",
    categoryID: "3d_models",
    name: "Alone",
    tags: [{ name: "3D Model" }, { name: "Video" }, { skill: { id: "blender", name: "Blender" } }],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A detailed 3D model of a solitary figure walking through a war torn environment.",
        links: []
    },
    content: [
        {
            sectionInfo: { type: "video", src: "https://www.youtube.com/embed/C0PK1KK15_A", alt: "Alone" },
        },
        {
            sectionInfo: { type: "header", text: `About` },
        },
        {
            sectionInfo: {
                type: "body", text: `Alone was a video I made using blender for a new media assignment. I've always been a fan of post apocalyptic themes and wanted to create something that, so alone was made. Which feature a lone wander walking through an abandon trench scavenging things and then leaving to gaze upon a ruined city.`},
        },
        {
            sectionInfo: { type: "imageWithDescription", imageData: { name: "Trench View", src:imgOne }, description: "", enlargeable: false },
        },
        {
            sectionInfo: { type: "imageWithDescription", imageData: { name: "Char With City", src: imgTwo }, description: "", enlargeable: false },
        },
        {
            sectionInfo: { type: "imageWithDescription", imageData: { name: "Unrendered Character View", src: imgThree }, description: "", enlargeable: false },
        },
    ]
}