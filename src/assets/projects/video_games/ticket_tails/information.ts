// Content/metadata entry for the "Ticket Tails" Global Game Jam C#/Godot project. Conforms to
// the ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/icons/text_doc_icon.png';
// Eagerly imports every PNG in this project's folder so they can be used as overview/gallery images.
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const TicketTailsInfo: ProjectEntryProperties = {
    id: "ticket_tails",
    categoryID: "video_games",
    name: "Ticket Tails",
    tags: [{skill: {id: "csharp", name: "C#"}}, {skill: {id: "godot", name: "Godot"}}, {name: "GGJAM"}],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A game created as part of a team for the Global Game Jam using C# and Godot.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/Ticket-Tails" },
            { label: "Game Jam", url: "https://globalgamejam.org/games/2026/ticket-tails-4" },
        ]
    },
    content: [
        {
            sectionInfo: { type: "video", src: "https://www.youtube.com/embed/5hX6XXJyUm8", alt: "Ticket Tails Video" },
        }
    ]
}