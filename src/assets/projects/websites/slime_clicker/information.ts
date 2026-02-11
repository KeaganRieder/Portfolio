import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/text_doc.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const SlimeClickerInfo: ProjectEntryProperties = {
    id: "slime_clicker",
    categoryID: "websites",
    name: "Slime Clicker",
    tags: ["Html", "CSS", "JavaScript"],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A web game which has the player clicking slimes to earn points and buy upgrades.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/SlimeClicker" },

            { label: "Demo", url: "https://keaganrieder.github.io/SlimeClicker/" }
        ]
    }
}