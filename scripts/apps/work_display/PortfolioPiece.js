import ContainerElement from "../../elements/ContainerElement.js";
import ImgElement from "../../elements/imgElement.js";
import HeaderTextElement from "../../elements/HeaderTextElement.js";
import BodyTextElement from "../../elements/BodyTextElements.js";
import App from "../App.js";
import { PORTFOLIO_PIECES } from './WorkDisplayContent.js';
import { WORK_DISPLAY_STYLE } from "../AppStyles.js";

/*
class the overrides app to cerate a portfolio piece section
*/
class PortfolioPiece extends App {

    constructor(name, parent) {
        super(name, parent);

        this.content = PORTFOLIO_PIECES.get(name);
        this.overviewContainer = null;

        this.createAppElements();
    }

    getOverviewContainer() {
        return this.overviewContainer;
    }

    addContent() {
        this.makeOverView();
    }

    makeOverView() {
        this.overviewContainer = new ContainerElement(this.appName + " Overview", WORK_DISPLAY_STYLE.get("Piece"), null);
        let title = new HeaderTextElement("h3", { text: this.appName }, WORK_DISPLAY_STYLE.get("PieceHeader"), this.overviewContainer.GetBody());
        let description = new BodyTextElement({ text: "temp tell i figure out Something" }, WORK_DISPLAY_STYLE.get("PieceBody"), this.overviewContainer.GetBody());

        // imgs = [];//this.content[1];
        // let imgContainer = new ContainerElement(null, WORK_DISPLAY_STYLE.get("PieceImgContainer"), this.overviewContainer.GetBody());

        // let imgColumns = [
        //     new ContainerElement(null, WORK_DISPLAY_STYLE.get("sectionsColumn"), imgContainer.GetBody()),
        //     new ContainerElement(null, WORK_DISPLAY_STYLE.get("sectionsColumn"), imgContainer.GetBody()),
        //     new ContainerElement(null, WORK_DISPLAY_STYLE.get("sectionsColumn"), imgContainer.GetBody()),
        // ]
        // let columnSize;
        // if (imgs.length == 1) {
        //     columnSize = '100%';
        // }
        // else if (imgs.length == 2) {
        //     columnSize = '50%';
        // }
        // else {
        //     columnSize = '25%';
        // }
        // imgColumns.forEach((column) => {
        //     column.style.flex = columnSize;
        // });

        // let currentColumn = 0;

        // imgs.forEach((img) => {
        //     let imgElement = new ImgElement(img, WORK_DISPLAY_STYLE.get("PieceImg"), imgColumns[currentColumn].GetBody());
        //     currentColumn = (currentColumn + 1) % imgColumn.length;
        // });


        $(this.overviewContainer.GetBody()).on('mouseover', function () {
            this.GetStyleSheet().backgroundColor = SITE_COLORS.appCloseButtonHoverBackground;
        });

        $(this.overviewContainer.GetBody()).on('mouseout', function () {
            this.GetStyleSheet().backgroundColor = SITE_COLORS.appBodyBackground3;
        });

        $(this.overviewContainer.GetBody()).on('click', () => {
            console.log("opening app " + "computerApp_" + title);
            this.openApp();
        });
    }
}

export default PortfolioPiece;