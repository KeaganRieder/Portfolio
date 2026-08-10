// Content/metadata entry for the "N Queens" C++ backtracking puzzle solver. Conforms to the
// ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '@/projects/models';
import icon from '@/assets/icons/terminal_icon.png';

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
            { label: "GitHub", url: "https://github.com/KeaganRieder/N-Queens" },
        ]
    },
    content: [
        {
            sectionInfo: {
                type: "embed",
                src: `${import.meta.env.BASE_URL}games/n_queens/index.html`,
                title: "N Queens Solver",
                height: 600,
            },
        },
        { sectionInfo: { type: "subHeader", text: `About` } },
        {
            sectionInfo: {
                type: "body", text: `The n queens problem describe as when provided amount of queens represented as 'n' place them on a chessboard of size s x s, such that no two queens are threatening one another.

                The solution for this problem is one in which place all n queens on a s x s board where no two queen are in the same column, row or diagonal. Which leads to the following restrictions about what s and n can equal in order to have a solution
                
                1. if s = 1 then n = 1
                2. for all instances where s < 3, n < s
                3. for all instances where s >= 4, n <= s

                With the restrictions on n and s now in place, the solution fir this problem can be found through the use of the backtracking algorithm.` }
        },
        { sectionInfo: { type: "link", label: "The Code", url: "https://github.com/KeaganRieder/N-Queens" } },
    ]
}