import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import icon from '../../../../assets/apps/text_doc.png';

export const NQueensInfo: ProjectEntryProperties = {
    id: "n_queens",
    categoryID: "puzzle_solvers",
    name: "N Queens",
    tags: [{skill: {id: "cpp", name: "C++"}}, {name: "Backtracking"}],
    iconPath: icon,
    overviewContents: {
        imagePaths: [],
        description: "A program that solves the N Queens puzzle using backtracking in C++.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/NQueens" },
        ]
    },
    content: [
        {
            sectionInfo: { type: "video", src: "https://www.youtube.com/embed/-P1VA-zGbr0", alt: "N Queens Video" },
        }
    ]
}