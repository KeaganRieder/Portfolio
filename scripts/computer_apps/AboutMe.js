import ContainerElement from "../elements/ContainerElement.js";
import { BodyTextElement, HeaderTextElement } from "../elements/TextElements.js";
import ComputerApp from "./ComputerApp.js";
import { AboutMeStyles } from "../site_styles/ComputerAppStyles.js";
import { appColors} from "../site_styles/SiteColors.js";

/*
    Extends computer app to create an app which contains about me content
*/
class AboutMe extends ComputerApp {
    constructor(appInfo, content, parents) {
        super(appInfo, content, parents);
        
    }

    // creates an element that is unique to the app
    createSpecializedElement(element) {
        switch (element.type) {
            case "skillsSection":
                return this.createSkillsSection(element);
            default:
                return null;
        }
    }

    // creates a section that show off my skill
    createSkillsSection(element) {
        let skillsSection = new ContainerElement("skillsSection", AboutMeStyles.skills.body.main, this.contentContainer.GetBody());
        let header = new HeaderTextElement("h2", { title: "Skills" }, AboutMeStyles.skills.text.header, skillsSection.GetBody());
        for (let section in element.content) {
            // console.log(element.content[section]);
            this.createSkillsSubSection(element.content[section], skillsSection);
        }
        return skillsSection;
    }

    // creates sub sections for the skills section
    createSkillsSubSection(section, parent) {
      
        let subsectionContainer = new ContainerElement(null, AboutMeStyles.skills.body.sub, parent.GetBody());
        let header = new HeaderTextElement("h3", section, AboutMeStyles.skills.text.subHeader, subsectionContainer.GetBody());
        section.skills.forEach(skill => {
            new BodyTextElement({bodyText: skill}, AboutMeStyles.skills.text.body, subsectionContainer.GetBody());
        });
    }
}
export default AboutMe;