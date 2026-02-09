import icon from '../../../../../assets/apps/text_doc.png';

import type { ProjectEntry } from '../../../project';

const images = import.meta.glob('./*.png', { eager: true });

export const TicketTailsInfo: ProjectEntry = {
    id: "ticket_tails",
    categoryID: "video_games",
    name: "Ticket Tails",
    tags: ["C#", "Godot", "GGJAM"],
    iconPath: icon,
    overviewContents: {
        imagePaths: Object.values(images).map((image: any) => image.default),
        description: "A game created as part of a team for the Global Game Jam using C# and Godot.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/Ticket-Tails" },
            { label: "Game Jam", url: "https://globalgamejam.org/games/2026/ticket-tails-4" },
            { label: "Demo Video", url: "https://youtu.be/5hX6XXJyUm8" }
        ]
    }
}