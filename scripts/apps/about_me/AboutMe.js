import ContainerElement from "../../elements/ContainerElement.js";
import ImgElement from "../../elements/imgElement.js";
import HeaderTextElement from "../../elements/HeaderTextElement.js";
import BodyTextElement from "../../elements/BodyTextElements.js";
import App from "../App.js";
import { ABOUT_ME_STYLE } from "../AppStyles.js";
import { BIO_TEXT, ARTIST_STATEMENT_TEXT, skillSections } from "./AboutMeContent.js";

/*
overrides the app class to create the about me section of the site
*/
class AboutMe extends App {
    constructor(parent) {
        super("About Me", parent);
        this.createAppElements();

    }

    addContent() {
        let profilePic = new ImgElement({ name: "profilePic", imgSrc: "apps/elements/logo.gif" }, ABOUT_ME_STYLE.get("profilePic"), this.contentContainer.GetBody());
        let bio = new BodyTextElement({ text: BIO_TEXT }, ABOUT_ME_STYLE.get("bodyText"), this.contentContainer.GetBody());

        this.skillsSection = new ContainerElement("skillsSection", ABOUT_ME_STYLE.get("skillsBody"), this.contentContainer.GetBody());
        let skillsHeader = new HeaderTextElement("h2", { text: "Skills" }, ABOUT_ME_STYLE.get("skillsHeader"), this.skillsSection.GetBody());

        skillSections.forEach((skills, sectionName) => {
            this.createSkillSection(sectionName, skills);
        });

        let artistStatement = new BodyTextElement({ text: ARTIST_STATEMENT_TEXT }, ABOUT_ME_STYLE.get("bodyText"), this.contentContainer.GetBody());
    }

    createSkillSection(sectionName, skills){
        let section = new ContainerElement(null, ABOUT_ME_STYLE.get("skillsSection"), this.skillsSection.GetBody());
        let header = new HeaderTextElement("h3", { text: sectionName }, ABOUT_ME_STYLE.get("skillsSubHeader"), section.GetBody());

        skills.forEach(skill => {
            let skillElement = new BodyTextElement({ text: skill }, ABOUT_ME_STYLE.get("skillsBodyText"), section.GetBody());
        });

    }
}

export default AboutMe;