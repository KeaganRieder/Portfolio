// Content/metadata entry for the "Slime Clicker" HTML/JS/CSS web game. Conforms to the
// ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/icons/text_doc_icon.png';
// Eagerly imports every PNG in this project's folder so they can be used as overview/gallery images.
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const SlimeClickerInfo: ProjectEntryProperties = {
    id: "slime_clicker",
    categoryID: "websites",
    name: "Slime Clicker",
    tags: [{ skill: { id: "html", name: "HTML" } }, { skill: { id: "javascript", name: "JavaScript" } }, { name: "CSS" }],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A web game which has the player clicking slimes to earn points and buy upgrades.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/SlimeClicker" },
            { label: "The Site", url: "https://keaganrieder.github.io/SlimeClicker/" }
        ]
    }
}