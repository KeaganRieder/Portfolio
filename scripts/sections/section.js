import SiteComponents from "../site_components/site_components.js";

class Section {
    constructor(id, content) {
        this.id = id;
        this.content = content;
        this.section = this.create();
        this.nav = this.createNav();
        
        this.createBody();
    }

    create() {
        const section = SiteComponents.createElement("div", "", "sectionContainer"); //main container for the section
        section.getBody().id = this.id;

        return section;
    }

    createBody() {
        // does nothing, to be overridden by child classes
    }

    createNav() {
        const navBody = SiteComponents.createElement("div", "", "navBody");
        const navText = SiteComponents.createElement("p", this.id, "navText");

        navText.render(navBody.getBody());

        navBody.getBody().id = this.id + "_Nav";

        return navBody;
    }

    render(parent = document.body) {
        $(parent).append(this.section.getBody());
    }

    getSection() {
        return this.section;
    }

    getNav() {
        return this.nav;
    }
}

export default Section;