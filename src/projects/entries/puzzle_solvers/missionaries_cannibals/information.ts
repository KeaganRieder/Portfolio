// Content/metadata entry for the "Missionaries & Cannibals Problem" C++ backtracking solver.
// Conforms to the ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '@/projects/models';
import { readImageGroup } from '@/shared/types/sectionType';
import icon from '@/assets/icons/terminal_icon.png';
// Eagerly imports every PNG in this project's folder so they can be used as overview/gallery images.
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const MissionariesCannibalsInfo: ProjectEntryProperties = {
    id: "missionaries_cannibals",
    categoryID: "puzzle_solvers",
    name: "Missionaries & Cannibals Problem",
    tags: [{ skill: { id: "cpp", name: "C++" } }, { name: "Backtracking" }],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A program that solves the Missionaries & Cannibals problem using backtracking in C++.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/Missionaries-and-Cannibals-Problem" },
        ]
    },
    content: [
        {
            sectionInfo: {
                type: "embed",
                src: `${import.meta.env.BASE_URL}games/missionaries_cannibals/index.html`,
                title: "Missionaries & Cannibals Solver",
                height: 500,
            },
        },
        { sectionInfo: { type: "subHeader", text: `About` } },
        {
            sectionInfo: {
                type: "body", text: `The Missionaries and Cannibals Problem, is stated as followed:
        - 3 missionaries and 3 cannibals are on one side of the river and wish to cross it using the boat they found
        - The boat can only hold 2 people at once and needs a driver (so 1 person must always go between sides)
        - The missionaries can never be outnumbered by the cannibals` }
        },
        { sectionInfo: { type: "link", label: "Learn More", url: "https://github.com/KeaganRieder/Missionaries-and-Cannibals-Problem" } },
    ]
}