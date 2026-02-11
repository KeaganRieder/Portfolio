import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/text_doc.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const TicketTailsInfo: ProjectEntryProperties = {
    id: "ticket_tails",
    categoryID: "video_games",
    name: "Ticket Tails",
    tags: ["C#", "Godot", "GGJAM"],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A game created as part of a team for the Global Game Jam using C# and Godot.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/Ticket-Tails" },
            { label: "Game Jam", url: "https://globalgamejam.org/games/2026/ticket-tails-4" },
            { label: "Demo Video", url: "https://youtu.be/5hX6XXJyUm8" }
        ]
    }
}