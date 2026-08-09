// Content/metadata entry for this Portfolio Website itself. Conforms to the
// ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '@/projects/models';
import { readImageGroup } from '@/shared/types/sectionType';
import icon from '@/assets/icons/text_doc_icon.png';
// Eagerly imports every PNG in this project's folder so they can be used as overview/gallery images.
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const PortfolioInfo: ProjectEntryProperties = {
    id: "portfolio",
    categoryID: "websites",
    name: "Portfolio Website",
    tags: [{skill: {id: "react", name: "React"}}, {skill: {id: "typescript", name: "TypeScript"}}, {skill: {id: "css", name: "CSS"}}],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A personal portfolio website showcasing various projects and skills.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/Portfolio" },
        ]
    }
}