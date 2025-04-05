import SiteComponents from "../../site_components/site_components.js";
import Section from "../section.js";

class HomePage extends Section {

    create() {

        const section = SiteComponents.createElement("div", "", "mainContainer"); //main container for the section
        section.getBody().id = this.id;

        return section;
    }

    createBody() {
        const taskBar = SiteComponents.createElement("div", "", "taskBar");
        taskBar.render();

        const navContainer = SiteComponents.createElement("div", "", "navContainer");
        navContainer.render(this.section.getBody());

        const navColumnOne = SiteComponents.createElement("div", "", "navColumn");
        navColumnOne.render(navContainer.getBody());
        
        const navColumnTwo = SiteComponents.createElement("div", "", "navColumn");
        navColumnOne.render(navContainer.getBody());

        this.createExternalNav({
            name: "Linkedin", img: {
                src: "../../../assets/nav_icons/linkedin.png",
                alt: "Linkedin"
            }, event: () => { window.open("https://www.linkedin.com/in/keagan-rieder/", "_blank") }
        }, navColumnOne);
        this.createExternalNav({
            name: "GitHub", img: {
                src: "../../../assets/nav_icons/github.png",
                alt: "GitHub"
            }, event: () => { window.open("https://github.com/KeaganRieder", "_blank") }
        }, navColumnOne);
        this.createExternalNav({
            name: "Email", img: {
                src: "../../../assets/nav_icons/email.png",
                alt: "Email"
            }, event: () => { window.open("mailto:'kagan@rieder.ca'", "_blank") }
        }, navColumnOne);
    }

    createExternalNav(content, parent) {
        const navBody = SiteComponents.createElement("div", "", "shortcut");
        const navText = SiteComponents.createElement("p", content.name, "");
        const navImg = SiteComponents.createElement("img", content.img, "");

        navImg.render(navBody.getBody());
        navText.render(navBody.getBody());

        navBody.getBody().id = content.name + "_Nav";

        navBody.render(parent.getBody());
        navBody.addEvent("click", content.event);
    }


    createNav() {
        // made todo nothing, sense main pages don't navigation to them
    }
    getNav() {
        // made todo nothing, sense main pages don't navigation to them
    }
}

export default HomePage;