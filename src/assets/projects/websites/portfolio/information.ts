import icon from '../../../../assets/apps/text_doc.png';
import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';

const images = import.meta.glob('./*.png', { eager: true });

export const PortfolioInfo: ProjectEntryProperties = {
    id: "portfolio",
    categoryID: "websites",
    name: "Portfolio Website",
    tags: ["JavaScript", "React", "CSS"],
    iconPath: icon,
    overviewContents: {
        imagePaths: Object.values(images).map((image: any) => image.default),
        description: "A personal portfolio website showcasing various projects and skills.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/Portfolio" },
        ]
    }
}