import ContainerElement from "../../elements/ContainerElement.js";
import ComputerApp from "../ComputerApp.js";
import WorkSection from "./WorkSection.js";
import { AppStyles } from "../../site_styles/ComputerAppStyles.js";

/*
    Extends computer app to create an app that showcases my work
*/
class WorkDisplay extends ComputerApp {
    constructor(appInfo, content, parents) {
        super(appInfo, content, parents);
    }

    addContent() {
        this.navContainer = new ContainerElement("Work_Display_Nav", AppStyles.workStyles.navButtons.container, this.appContainer.GetBody());
        this.navScroll = new ContainerElement("Work_Display_Nav_Scroll", AppStyles.workStyles.navButtons.navScroll, this.navContainer.GetBody());
        this.sections = new Map();

        let createdElement;
        this.contentContainer.GetStyleSheet().width = "calc(100% - 250px)";
        this.contentContainer.GetStyleSheet().left = "250px";

        for (let element in this.appContent) {
            createdElement = null;

            createdElement = this.createCommonElement(this.appContent[element]);
            // not common element so see if specialized element can be created
            if (createdElement == null) {
                createdElement = this.createSpecializedElement(this.appContent[element]);
            }
            // if element is still null then it was not created
            if (createdElement == null) {
                console.error(this.appContent[element].type + " not found");
            }
        }

        this.sections.forEach((section) => {
            section.addOtherSections(this.sections);
        });
    }

    // creates an element that is unique to the app
    createSpecializedElement(element) {
        switch (element.type) {
            case "section":
                let parents = {screen: this.parent, navParent: this.navScroll.GetBody(), parent: this.contentContainer.GetBody()};
                let section = new WorkSection(element.title,this.appName, parents, this.appTitle,element.works);
                this.sections.set(element.title, section);
                return section;
            default:
                return null;
        }
    }
}
export default WorkDisplay;