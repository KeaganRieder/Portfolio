import ContainerElement from "../../elements/ContainerElement.js";
import ImgElement from "../../elements/ImgElement.js";
import EmbeddedElement from "../../elements/EmbeddedElement.js";
import { BodyTextElement, HeaderTextElement } from "../../elements/TextElements.js";
import ComputerApp from "../ComputerApp.js";
import { SITE_COLORS } from "../../site_styles/SiteColors.js";
import { AppStyles } from "../../site_styles/ComputerAppStyles.js";

// the used to organize the overview of works in the portfolio
class WorkSection {
    constructor(name, parentName, parents, titleElement, works) {
        this.name = name;
        this.parentName = parentName;

        this.sectionContainer = new ContainerElement(this.name + "_Section", AppStyles.workStyles.sections.container, parents.parent);

        this.otherSections = new Map();
        this.titleElement = titleElement;
        this.navButton = null;
        this.works = works;

        this.createSectionNav(parents.navParent)
        this.createSection();
    }

    addOtherSections(sections) {
        sections.forEach((section) => {
            if (section.name !== this.name) {
                // console.log("adding section" + section.name+ " to " + this.name);
                this.otherSections.set(section.name, section);
            }
        });
    }

    createSectionNav(parent) {
        this.navButton = new ContainerElement(this.name + "_Button", AppStyles.workStyles.navButtons.button, parent);
        let buttonTitle = new HeaderTextElement("h3", { title: this.name }, AppStyles.workStyles.navButtons.text, this.navButton.GetBody());

        $(this.navButton.GetBody()).on('mouseover', () => {
            this.navButton.GetStyleSheet().backgroundColor = SITE_COLORS.headerButtonHoverBackground;
        });
        $(this.navButton.GetBody()).on('mouseout', () => {
            this.navButton.GetStyleSheet().backgroundColor = SITE_COLORS.headerButtonBackground;
        });
        $(this.navButton.GetBody()).on('click', () => {
            this.titleElement.GetBody().textContent = `${this.parentName} - ${this.name}`;

            this.otherSections.forEach((sectionElement) => {
                sectionElement.hideSection();
            });

            this.showSection();
        });
    }

    createSection() {
        // this.sectionContainer = new ContainerElement(this.sectionId + "_Section", WORK_DISPLAY_STYLE.get("sectionsContainer"), this.parent);
        // this.sectionContainer.GetBody().style.display = "none";
        // this.works = works;
        // this.createSection();
        this.hideSection();

    }

    //hides the section
    hideSection() {
        $(this.sectionContainer.GetBody()).hide();
    }

    //shows the section
    showSection() {
        $(this.sectionContainer.GetBody()).show();
    }
}

export default WorkSection;