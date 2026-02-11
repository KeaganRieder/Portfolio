import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/text_doc.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const PuddleClickerInfo: ProjectEntryProperties = {
    id: "puddle_clicker",
    categoryID: "websites",
    name: "Puddle Clicker",
    tags: ["Figma"],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A clicker game for my new media web design class. Meant to bring awareness to predatory monetization practices in video games.",
        links: [
            { label: "Demo", url: "https://www.figma.com/proto/NhRJj4sD7KLSy60STONtx1/Assignment-1..?node-id=10-26&p=f&t=9i4VD6yduhIHpWIz-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=10%3A26" }
        ]
    }
}