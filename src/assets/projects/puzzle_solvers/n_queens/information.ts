import icon from '../../../../assets/apps/text_doc.png';
import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';

export const NQueensInfo: ProjectEntryProperties = {
    id: "n_queens",
    categoryID: "puzzle_solvers",
    name: "N Queens",
    tags: ["C++","Backtracking"],
    iconPath: icon,
    overviewContents: {
        imagePaths: [],
        description: "A program that solves the N Queens puzzle using backtracking in C++.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/NQueens" },
            { label: "Showcase", url: "https://www.youtube.com/embed/-P1VA-zGbr0" }
        ]
    }
}