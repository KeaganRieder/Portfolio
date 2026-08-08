// Content/metadata entry for the "Tic Tac Toe" C++ minimax AI project. Conforms to the
// ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/icons/text_doc_icon.png';
// Eagerly imports every PNG in this project's folder so they can be used as overview/gallery images.
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const TicTacToeInfo: ProjectEntryProperties = {
    id: "tic_tac_toe",
    categoryID: "video_games",
    name: "Tic Tac Toe",
    tags: [{skill: {id: "cpp", name: "C++"}}, {name: "Minimax Algorithm"}],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A tic tac toe game made in C++, using the minimax algorithm for the AI.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/TicTacToe" },

            { label: "Showcase-Win", url: "https://www.youtube.com/embed/DdnN6_jJuMg" },
            { label: "Showcase-Loss", url: "https://www.youtube.com/embed/uUZJBoQ-Ke8" },

        ]
    },
    content: [
        {
            sectionInfo: { type: "subHeader", text: "Player Win Example" },
        },
        {
            sectionInfo: { type: "video", src: "https://www.youtube.com/embed/DdnN6_jJuMg", alt: "Tic Tac Toe Showcase Win Video" },
        },
        {
            sectionInfo: { type: "subHeader", text: "Player loss Example" },
        },
        {
            sectionInfo: { type: "video", src: "https://www.youtube.com/embed/uUZJBoQ-Ke8", alt: "Tic Tac Toe Showcase Loss Video" },
        }
    ]
}