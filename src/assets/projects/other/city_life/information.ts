import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import { readImageGroup } from '../../../../types/sectionType';
import icon from '../../../../assets/apps/icons/photo_icon.png';
const images = import.meta.glob('./*.png', { eager: true, import: "default" });

export const CityLifeInfo: ProjectEntryProperties = {
    id: "city_life",
    categoryID: "interactive_art",
    name: "City Life",
    tags: [{name: "Interactive Art"}, {name: "Simulation"}, {skill: {id: "processing", name: "Processing"}}],
    iconPath: icon,
    overviewContents: {
        imagePaths: readImageGroup(images, false),
        description: "An interactive art project simulating city life with dynamic day and night cycles.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/CityScape" },
        ]
    },
    content: [
        {
            sectionInfo: { type: "video", src: "https://www.youtube.com/embed/xPPZ5PR3LB0", alt: "City Life Video" },
        }
    ]
}