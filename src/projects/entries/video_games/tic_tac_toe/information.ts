// Content/metadata entry for the "Tic Tac Toe" C++ minimax AI project. Conforms to the
// ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '@/projects/models';
import { readImageGroup } from '@/shared/types/sectionType';
import icon from '@/assets/icons/terminal_icon.png';
// Eagerly imports every PNG in this project's folder so they can be used as overview/gallery images.
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const TicTacToeInfo: ProjectEntryProperties = {
    id: "tic_tac_toe",
    categoryID: "video_games",
    name: "Tic Tac Toe",
    tags: [{ skill: { id: "cpp", name: "C++" } }, { name: "Minimax Algorithm" }],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A tic tac toe game made in C++, using the minimax algorithm for the AI.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/TicTacToe" },
        ]
    },
    content: [
        {
            sectionInfo: {
                type: "embed",
                src: `${import.meta.env.BASE_URL}games/tic_tac_toe/index.html`,
                title: "Tic Tac Toe",
                height: 560,
            },
        },
        {
            sectionInfo: {
                type: "link",
                label: "The Code",
                url: "https://github.com/KeaganRieder/TicTacToe"
            },
        },
    ]
}