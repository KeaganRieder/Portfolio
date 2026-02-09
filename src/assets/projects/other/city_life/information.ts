import icon from '../../../../assets/apps/text_doc.png';
import type { ProjectEntryProperties } from '../../../../features/project_showcase/project/projectModels';
import nightTime from './nightTime.png';

export const CityLifeInfo: ProjectEntryProperties = {
    id: "city_life",
    categoryID: "interactive_art",
    name: "City Life",
    tags: ["Interactive Art", "Simulation"],
    iconPath: icon,
    overviewContents: {
        imagePaths: [nightTime],
        description: "An interactive art project simulating city life with dynamic day and night cycles.",
        links: [
            { label: "GitHub", url: "https://github.com/KeaganRieder/CityScape" },
            { label: "Live Demo", url: "https://www.youtube.com/embed/xPPZ5PR3LB0" }
        ]
    }
}