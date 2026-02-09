import icon from '../../../../assets/apps/text_doc.png';
import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
const images = import.meta.glob('./*.png', { eager: true });

export const MissionariesCannibalsInfo: ProjectEntryProperties = {
    id: "missionaries_cannibals",
    categoryID: "puzzle_solvers",
    name: "Missionaries & Cannibals Problem",
    tags: ["C++", "Backtracking"],
    iconPath: icon,
    overviewContents: {
        imagePaths: Object.values(images).map((image: any) => image.default),
        description: "A program that solves the Missionaries & Cannibals problem using backtracking in C++.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/Missionaries-and-Cannibals-Problem" },

            { label: "Demo", url: "https://www.youtube.com/embed/SS98yc4f5cU" }
        ]
    }
}