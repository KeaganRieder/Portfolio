import SiteComponents from "../../../html_componets/site_components/site_components.js";
import AboutMe from "../about_me/about_me.js";
import Section from "../section.js";
import SiteApp from "../site_app.js";

/**
 * contains navigation to external sites
 * @type {{ name: string, img: { src: string, alt: string }, event: Function }[]}
 */
const navItems = [
    {
        name: "Linkedin",
        img: {
            src: "../../../assets/nav_icons/linkedin.png",
            alt: "Linkedin"
        },
        event: () => window.open("https://www.linkedin.com/in/keagan-rieder/", "_blank")
    },
    {
        name: "GitHub",
        img: {
            src: "../../../assets/nav_icons/github.png",
            alt: "GitHub"
        },
        event: () => window.open("https://github.com/KeaganRieder", "_blank")
    },
    {
        name: "Email",
        img: {
            src: "../../../assets/nav_icons/email.png",
            alt: "Email"
        },
        event: () => window.open("mailto:kagan@rieder.ca", "_blank")
    }
];

const sections = {
    "AboutMe": new AboutMe("AboutMe", {
        navIcon: {
            src: "../../../assets/nav_icons/text_doc.png",
            alt: "textDocument"
        }
    }),
}

/**
 * Represents the Home page layout.
 * Inherits from Section and builds custom nav + task bar content.
 */
class HomePage extends Section {

    /**
    * Constructor for HomePage.
    * Overrides the parent constructor to ignore the `content` parameter.
    * @param {string} id - Unique ID for the section.
    */
    constructor(id) {
        super(id, null); // Pass `null` or any placeholder value for `content`
    }

    /**
       * Creates the top-level section container for the home page.
       * @returns {SiteElement}
       */
    create() {
        const section = SiteComponents.createElement("div", "", "mainContainer"); //main container for the section
        section.getBody().id = this.id;

        return section;
    }
    
    /**
       * Builds out the main content and layout for the home page.
       */
    createBody() {
        this.createTaskBar();

        const navContainer = SiteComponents.createElement("div", "", "navContainer");
        navContainer.render(this.section);

        const navColumnOne = SiteComponents.createElement("div", "", "navColumn");
        navColumnOne.render(navContainer);

        const navColumnTwo = SiteComponents.createElement("div", "", "navColumn");
        navColumnTwo.render(navContainer);

        navItems.forEach(item => this.createExternalNav(item, navColumnOne));
        Object.values(sections).forEach(section => this.createSections(section, navColumnTwo));
    }

    /**
     * Renders a shortcut block with icon and text that links to an external destination.
     * @param {{ name: string, img: object, event: Function }} content
     * @param {SiteElement} navParent
     */
    createExternalNav(content, navParent) {
        const { name, img, event } = content;

        const navBody = SiteComponents.createElement("div", "", "shortcut");
        navBody.getBody().id = `${name}_Nav`;

        const navImg = SiteComponents.createElement("img", img);
        const navText = SiteComponents.createElement("p", name);

        navImg.render(navBody);
        navText.render(navBody);
        navBody.render(navParent);
        navBody.addEvent("click", event);
    }

    createSections(section, navParent) {
        // Ensure the retrieved section is an instance of SiteApp
        if (section instanceof SiteApp) {
            section.render(); // Render the section into the main container
            // Render the shortcut for the section into the provided navParent
            section.createShortcut(navParent);
        } else {
            console.error(`Section with key "${sectionKey}" is not a valid SiteApp instance.`);
        }
    }

    /**
      * Creates the top-level task bar placeholder.
      * Currently non-functional.
      */
    createTaskBar() {
        SiteComponents.createElement("div", "", "taskBar").render();
        // TODO: Add task bar functionality
    }

    createNav() {
        // made todo nothing, sense main pages don't navigation to them
    }
    getNav() {
        // made todo nothing, sense main pages don't navigation to them
    }
}

export default HomePage;