import ContainerElement from "../../elements/ContainerElement.js";
import ImgElement from "../../elements/ImgElement.js";
import EmbeddedElement from "../../elements/EmbeddedElement.js";
import { BodyTextElement, HeaderTextElement } from "../../elements/TextElements.js";
import Work from "./Work.js";
import { appColors } from "../../site_styles/SiteColors.js";
import { WorkDisplayStyle } from "../../site_styles/ComputerAppStyles.js";

// the used to organize the overview of works in the portfolio
class WorkSection {
    constructor(name, parentName, parents, titleElement, works) {
        this.name = name;
        this.parentName = parentName;
        this.screen = parents.screen;
        this.sectionContainer = new ContainerElement(this.name + "_Section", WorkDisplayStyle.sections.container, parents.parent);

        this.otherSections = new Map();
        this.titleElement = titleElement;
        this.navButton = null;
        this.works = works;

        this.sectionColumns = [];
        this.maxColumns = 3;

        this.createSectionNav(parents.navParent)
        this.createSection();
    }

    addOtherSections(sections) {
        sections.forEach((section) => {
            if (section.name !== this.name) {
                this.otherSections.set(section.name, section);
            }
        });
    }

    createSectionNav(parent) {
        this.navButton = new ContainerElement(this.name + "_Button", WorkDisplayStyle.nav.button, parent);
        let buttonTitle = new HeaderTextElement("h3", { title: this.name }, WorkDisplayStyle.nav.text, this.navButton.GetBody());

        $(this.navButton.GetBody()).on('mouseover', () => {
            this.navButton.GetStyleSheet().backgroundColor = appColors.workShowcase.nav.tabHover;
        });
        $(this.navButton.GetBody()).on('mouseout', () => {
            this.navButton.GetStyleSheet().backgroundColor = appColors.workShowcase.nav.tab;
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
        this.createColumns();
        let currentColumn = 0;

        for (let work in this.works) {
            let workApp = new Work(
                { name: this.works[work].title },
                this.works[work].content,
                { parent: this.sectionColumns[currentColumn].GetBody() }
            );

            currentColumn = (currentColumn + 1) % this.sectionColumns.length;
        }

        this.hideSection();
    }

    createColumns() {
        let numOfWorks = Object.keys(this.works).length; //need fix counting
        if (numOfWorks <= 3) {
          WorkDisplayStyle.sections.column.flex   = `33.33%`;
        }
        else {
            WorkDisplayStyle.sections.column.flex = '25%';
        }
        for (let i = 0; i < this.maxColumns; i++) {
            let column = new ContainerElement(null,  WorkDisplayStyle.sections.column, this.sectionContainer.GetBody());
            this.sectionColumns.push(column);
        }
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
/*

    createSection() {
        this.sectionContainer = new ContainerElement(this.sectionId + "_Section", WORK_DISPLAY_STYLE.get("sectionsContainer"), this.parent);
    
        let displayNav = document.getElementById("work_display_nav");
    
        let navWidth = displayNav.offsetWidth;
        this.sectionContainer.GetStyleSheet().width = `calc(100% - ${navWidth}px)`;
        this.sectionContainer.GetStyleSheet().left = `${navWidth}px`;

        this.createColumns();
        
        let currentColumn = 0;
        this.works.forEach((work) => {
            let workApp = new PortfolioPiece(work);

            $(this.sectionColumns[currentColumn].GetBody()).append(workApp.GetPreview());

            currentColumn = (currentColumn + 1) % this.sectionColumns.length;
        });

        $(this.sectionContainer.GetBody()).hide();
    }

   createColumns() {
    for (let i = 0; i < this.maxColumns && i < this.numOfWorks; i++) {
        let column = new ContainerElement(null, WORK_DISPLAY_STYLE.get("sectionsColumn"), this.sectionContainer.GetBody());
        this.sectionColumns.push(column);
    }

    let columnSize;
    if (this.numOfWorks <= 3) {
        columnSize = `${100 / this.numOfWorks}%`;
    } else {
        columnSize = '33.33%';
    }

    this.sectionColumns.forEach((column) => {
        column.style.flex = `0 0 ${columnSize}`;
    });
}


}
*/

export default WorkSection;