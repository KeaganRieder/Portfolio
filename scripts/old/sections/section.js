import SiteComponents from "../../html_componets/site_components/site_components.js";

/**
 * Base class for site sections/pages.
 * Provides structure for rendering containers and optional navigation items.
 * Should be subclassed to define actual content in `createBody()`.
 */
class Section {
    /**
     * @param {string} id - Unique ID for the section (used for DOM and nav).
     * @param {any} content - the sections content
     */
    constructor(id, content) {
        this.id = id;
        this.content = content;

        this.section = this.create();     // Main visual container

        this.createBody();                // Called immediately after creation
    }

    /**
     * Creates the main section container element.
     * @returns {SiteElement} - The top-level section container.
     */
    create() {
        const section = SiteComponents.createElement("div", "", "sectionContainer");
        section.setId(this.id);
        return section;
    }

    /**
     * Hook for subclasses to populate the section body.
     * Should be overridden in extending classes.
     */
    createBody() {
        // Intentionally left blank — override in subclass
    }

    /**
     * Renders this section into the page.
     * @param {HTMLElement|jQuery|string} parent - Where to render (default is document.body).
     */
    render(parent = document.body) {
        $(parent).append(this.section.getBody());
    }

    /**
     * Gets the main section container.
     * @returns {SiteElement}
     */
    getSection() {
        return this.section;
    }

   
}

export default Section;
