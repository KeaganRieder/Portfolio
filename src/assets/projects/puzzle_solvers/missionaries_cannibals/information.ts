import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/text_doc.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const MissionariesCannibalsInfo: ProjectEntryProperties = {
    id: "missionaries_cannibals",
    categoryID: "puzzle_solvers",
    name: "Missionaries & Cannibals Problem",
    tags: [{skill: {id: "cpp", name: "C++"}}, {name: "Backtracking"}],
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
            sectionInfo: { type: "video", src: "https://www.youtube.com/embed/SS98yc4f5cU", alt: "Missionaries & Cannibals Problem Video" },
        }
    ]
}