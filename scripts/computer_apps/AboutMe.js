import ContainerElement from "../elements/ContainerElement.js";
import { BodyTextElement, HeaderTextElement } from "../elements/TextElements.js";
import ComputerApp from "./ComputerApp.js";
import { AppStyles } from "../site_styles/ComputerAppStyles.js";

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
        let skillsSection = new ContainerElement("skillsSection", AppStyles.aboutMe.skills.container, this.contentContainer.GetBody());
        let header = new HeaderTextElement("h2", { title: "Skills" }, AppStyles.aboutMe.skills.headerText, skillsSection.GetBody());
        for (let section in element.content) {
            // console.log(element.content[section]);
            this.createSkillsSubSection(element.content[section], skillsSection);
        }
        return skillsSection;
    }

    // creates sub sections for the skills section
    createSkillsSubSection(section, parent) {
      
        let subsectionContainer = new ContainerElement(null, AppStyles.aboutMe.skills.section, parent.GetBody());
        let header = new HeaderTextElement("h3", section, AppStyles.aboutMe.skills.subHeaderText, subsectionContainer.GetBody());
        section.skills.forEach(skill => {
            new BodyTextElement({bodyText: skill}, AppStyles.aboutMe.skills.bodyText, subsectionContainer.GetBody());
        });
    }
}
export default AboutMe;