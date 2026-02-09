import icon from '../../../../../assets/apps/text_doc.png';

import type { ProjectEntry } from '../../../project';

const images = import.meta.glob('./*.png', { eager: true });

export const UnderUsInfo: ProjectEntry = {
    id: "under_us",
    categoryID: "video_games",
    name: "Under Us",
    tags: ["C++","SOLID Design","Gtest"],
    iconPath: icon,
    overviewContents: {
        imagePaths: Object.values(images).map((image: any) => image.default),
        description: "A text based adventure game created in a group for school using C++.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/UnderUs" },
        ]
    }
}