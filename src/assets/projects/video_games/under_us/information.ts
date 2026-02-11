import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/text_doc.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const UnderUsInfo: ProjectEntryProperties = {
    id: "under_us",
    categoryID: "video_games",
    name: "Under Us",
    tags: [{skill: {id: "cpp", name: "C++"}}, {name: "SOLID"}, {name: "Gtest"}],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "A text based adventure game created in a group for school using C++.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/UnderUs" },
        ]
    }
}