import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/text_doc.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const TicTacToeInfo: ProjectEntryProperties = {
    id: "tic_tac_toe",
    categoryID: "video_games",
    name: "Tic Tac Toe",
    tags: ["C++","Minimax Algorithm"],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A tic tac toe game made in C++, using the minimax algorithm for the AI.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/TicTacToe" },

            { label: "Showcase-Win", url: "https://www.youtube.com/embed/DdnN6_jJuMg" },
            { label: "Showcase-Loss", url: "https://www.youtube.com/embed/uUZJBoQ-Ke8" },
            
        ]
    }
}