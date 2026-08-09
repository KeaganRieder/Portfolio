// Content/metadata entry for the "Under Us" C++ text-based adventure group project. Conforms to
// the ProjectEntryProperties shape defined in projectModels.ts.
import type { ProjectEntryProperties } from '@/projects/models';
import { readImageGroup } from '@/shared/types/sectionType';
import icon from '@/assets/icons/text_doc_icon.png';
// Eagerly imports every PNG in this project's folder so they can be used as overview/gallery images.
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