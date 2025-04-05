import SiteComponents from "../../site_components/site_components.js";
import Section from "../section.js";

class AboutMe extends Section {
   
    createBody() {
        const aboutMeText = SiteComponents.createElement("p", this.content.aboutMe, "");
        aboutMeText.render(this.section);

        const profilePic = SiteComponents.createElement("img", this.content.ProfilePic, "profilePic");
        profilePic.render(this.section);

        this.skillsSection();

        const artistStatementText= SiteComponents.createElement("p", this.content.artistStatement, "");
        artistStatementText.render(this.section);
    }

    skillsSection(){
        const skillsContainer = SiteComponents.createElement("div", "", "skillsContainer");
        const header = SiteComponents.createElement("h3", "Skills", "skillsHeader");

        skillsContainer.render(this.section);
        header.render(skillsContainer);

        this.content.skills.forEach(section => {
            this.skillsSubSection(section);
        });
    }

    skillsSubSection(sectionContent){
        const skillSection = SiteComponents.createElement("div", "", "skillsSection");
        const header = SiteComponents.createElement("h3", sectionContent.title, "skillsSubHeader");
        header.render(skillSection);

        sectionContent.skills.forEach(skill => {
            const skillText = SiteComponents.createElement("p", skill, "skillsBody");
            skillText.render(skillSection);
        });
    }
}

export default AboutMe;