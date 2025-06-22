import SiteComponents from "../../../html_componets/site_components/site_components.js";
import SiteApp from "../site_app.js";

class AboutMe extends SiteApp {
    
    /**
     * Populates the main body of the "About Me" section.
     * Uses the `content` object to dynamically create and render elements.
     */
    createBody() {
        
        // Create and render a paragraph for the "About Me" text
        const aboutMeText = SiteComponents.createElement("p", this.content.aboutMe, "");
        aboutMeText.render(this.section);

        // Create and render an image for the profile picture
        const profilePic = SiteComponents.createElement("img", this.content.ProfilePic, "profilePic");
        profilePic.render(this.section);

        // Create and render the skills section
        this.skillsSection();

        // Create and render a paragraph for the artist statement
        const artistStatementText = SiteComponents.createElement("p", this.content.artistStatement, "");
        artistStatementText.render(this.section);

    }

    /**
     * Creates and renders the "Skills" section.
     * Iterates through the `skills` array in the `content` object to build subsections.
     */
    skillsSection() {
        // Create a container for the skills section
        // const skillsContainer = SiteComponents.createElement("div", "", "skillsContainer");
        // const header = SiteComponents.createElement("h3", "Skills", "skillsHeader");

        // // Render the container and header
        // skillsContainer.render(this.section);
        // header.render(skillsContainer);

        // // Iterate through each skill section and create subsections
        // this.content.skills.forEach(section => {
        //     this.skillsSubSection(section);
        // });
    }

    /**
     * Creates and renders a subsection for a specific skill category.
     * @param {Object} sectionContent - The content for the skill subsection, including a title and a list of skills.
     */
    skillsSubSection(sectionContent) {
        // // Create a container for the skill subsection
        // const skillSection = SiteComponents.createElement("div", "", "skillsSection");

        // // Create and render a header for the skill subsection
        // const header = SiteComponents.createElement("h3", sectionContent.title, "skillsSubHeader");
        // header.render(skillSection);

        // // Iterate through each skill and render it as a paragraph
        // sectionContent.skills.forEach(skill => {
        //     const skillText = SiteComponents.createElement("p", skill, "skillsBody");
        //     skillText.render(skillSection);
        // });
    }
}

export default AboutMe;