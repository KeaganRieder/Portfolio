import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/text_doc.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const PortfolioInfo: ProjectEntryProperties = {
    id: "portfolio",
    categoryID: "websites",
    name: "Portfolio Website",
    tags: ["JavaScript", "React", "CSS"],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A personal portfolio website showcasing various projects and skills.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/Portfolio" },
        ]
    }
}