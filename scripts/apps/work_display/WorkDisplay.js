import ContainerElement from "../../elements/ContainerElement.js";
import ImgElement from "../../elements/imgElement.js";
import HeaderTextElement from "../../elements/HeaderTextElement.js";
import BodyTextElement from "../../elements/BodyTextElements.js";
import App from "../App.js";
import PortfolioPiece from './PortfolioPiece.js';

import { SITE_COLORS } from "../../constants/SiteColors.js";
import { WORK_DISPLAY_STYLE } from "../AppStyles.js";
import { SECTIONS } from './WorkDisplayContent.js';

/*
class the overrides app to cerate the work display section of the
portfolio
*/
class WorkDisplay extends App {
    constructor(parent) {
        super("Work Display", parent);
        this.sections = new Map();
        this.createAppElements();
    }

    addContent() {
        this.navContainer = new ContainerElement("Work_Display_Nav", WORK_DISPLAY_STYLE.get("nav"), this.appContainer.GetBody());
        SECTIONS.forEach((pieces, sectionId) => {
            this.createSections(sectionId, pieces)
        });

    }

    createSections(sectionId, pieces) {

        let section = new ContainerElement(sectionId + "_Section", WORK_DISPLAY_STYLE.get("sectionsContainer"), this.contentContainer.GetBody());

        let navWidth = this.navContainer.GetBody().offsetWidth;
        section.GetStyleSheet().width = `calc(100% - ${navWidth}px)`;
        section.GetStyleSheet().left = this.navContainer.GetStyleSheet().width;

        console.log(this.navContainer.GetStyleSheet().width);

        this.sections.set(sectionId, section);

        let sectionColumns = [
            new ContainerElement(null, WORK_DISPLAY_STYLE.get("sectionsColumn"), section.GetBody()),
            new ContainerElement(null, WORK_DISPLAY_STYLE.get("sectionsColumn"), section.GetBody()),
            new ContainerElement(null, WORK_DISPLAY_STYLE.get("sectionsColumn"), section.GetBody()),
        ]

        let columnSize;
        if (pieces.length == 1) {
            columnSize = '100%';
        }
        else if (pieces.length == 2) {
            columnSize = '50%';
        }
        else {
            columnSize = '25%';
        }
        sectionColumns.forEach((column) => {
            column.GetStyleSheet().flex = columnSize;
        });

        let currentColumn = 0;

        pieces.forEach((piece) => {
            let pieceApp = new PortfolioPiece(piece, this.parent);
            sectionColumns[currentColumn].GetBody().appendChild(pieceApp.getOverviewContainer().GetBody());
            currentColumn = (currentColumn + 1) % sectionColumns.length;
        });

        let navButton = new ContainerElement(sectionId + "_Button", WORK_DISPLAY_STYLE.get("navButton"), this.navContainer.GetBody());
        let buttonTitle = new HeaderTextElement("h3", { text: sectionId }, WORK_DISPLAY_STYLE.get("navButtontext"), navButton.GetBody());
        $(navButton.GetBody()).on('mouseover', function () {
            navButton.GetStyleSheet().backgroundColor = SITE_COLORS.headerButtonHoverBackground;
        });
        $(navButton.GetBody()).on('mouseout', function () {
            navButton.GetStyleSheet().backgroundColor = SITE_COLORS.headerButtonBackground;
        });
        $(navButton.GetBody()).on('click', () => {
            console.log("clicked");
            this.appTitle.GetBody().textContent = this.appName + " - " + sectionId;

            this.sections.forEach((sectionElement) => {
                $(sectionElement.GetBody()).hide();
            });
            $(section.GetBody()).show();
        });
        $(section.GetBody()).hide();


    }

    // createPiece(pieceInfo, section) { }


}

export default WorkDisplay;