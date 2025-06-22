import SiteComponents from "../../html_componets/site_components/site_components.js";
import Section from "./section.js";

/**
     * base class for content sections of the site.
     * @extends Section
     */
class SiteApp extends Section {
    /**
     * Constructor for SiteApp.
     * @param {string} id - Unique ID for the section.
     * @param {object} content - Content object containing data for the section.
     */
    constructor(id, content) {
        super(id, content);
    }

    createShortcut(navParent) {
        console.log(this.content.navIcon.src);
        const navBody = SiteComponents.createElement("div", "", "shortcut");

        navBody.getBody().id = `${this.id}_Nav`;

        const navText = SiteComponents.createElement("p", this.id, "navText");
        const navImg = SiteComponents.createElement("img", this.content.navIcon, "navIcon");

        navImg.render(navBody);
        navText.render(navBody);
        navBody.render(navParent);

        navBody.addEvent("click", () => this.section.displayElement());
        return navBody;
    }

    /**
      * gets the shortcut used to navigate to this section of the site.
      */
    getShortcut() {
        return this.shortcut;
    }

}
export default SiteApp;