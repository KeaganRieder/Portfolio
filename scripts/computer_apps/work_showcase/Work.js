import ContainerElement from "../../elements/ContainerElement.js";
import ImgElement from "../../elements/ImgElement.js";
import { EmbeddedElement, IframeElement } from "../../elements/EmbeddedElement.js";
import { BodyTextElement, HeaderTextElement } from "../../elements/TextElements.js";
import ComputerApp from "../ComputerApp.js";
import { AppStyle } from "../../site_styles/ComputerAppStyles.js";
import { appColors } from "../../site_styles/SiteColors.js";
import { WorkDisplayStyle } from "../../site_styles/ComputerAppStyles.js";

class Work extends ComputerApp {
    constructor(appInfo, content, parents) {
        super(appInfo, content, parents);
        this.shortcut = null;
    }

    createApp() {
        this.appContainer = new ContainerElement("works-" + this.appName + " App", AppStyle.mainContainer, document.getElementById('screen'));

        this.headerContainer = new ContainerElement(null, AppStyle.header.container, this.appContainer.GetBody());
        this.appTitle = new HeaderTextElement("h2", { title: "works-" + this.appName }, AppStyle.header.text, this.headerContainer.GetBody());
        this.createCloseButton();

        this.appBody = new ContainerElement(null, AppStyle.content.container, this.appContainer.GetBody());
        this.contentContainer = new ContainerElement(this.appName + " App Content", AppStyle.content.scrollContainer, this.appBody.GetBody());

        this.addContent();

        this.resizeApp();
        this.closeApp();

        this.title = null;
    }

    addContent() {
        this.previewContainer = new ContainerElement(this.appName + " Overview", WorkDisplayStyle.pieceDisplay.container.main, this.parent);
        let title = new HeaderTextElement("h3", { title: this.appName }, WorkDisplayStyle.pieceDisplay.text.header, this.previewContainer.GetBody());
        //todo images
        let description = new BodyTextElement({ bodyText: this.appContent.highLight.description }, WorkDisplayStyle.pieceDisplay.text.body, this.previewContainer.GetBody());

        $(this.previewContainer.GetBody()).on('click', () => { this.openApp() });
        $(this.previewContainer.GetBody()).on('mouseover', () => {
            this.previewContainer.GetStyleSheet().backgroundColor = appColors.workShowcase.pieceOverView.hover;
        });
        $(this.previewContainer.GetBody()).on('mouseout', () => {
            this.previewContainer.GetStyleSheet().backgroundColor = appColors.workShowcase.pieceOverView.display;
        });

        let createdElement;
        for (let element in this.appContent.overview) {
            createdElement = null;

            createdElement = this.createCommonElement(this.appContent.overview[element]);

            // not common element so see if specialized element can be created
            if (createdElement == null) {
                createdElement = this.createSpecializedElement(this.appContent.overview[element]);
            }
            // if element is still null then it was not created
            if (createdElement == null) {
                console.error(this.appContent.overview[element] + " not found");
            }
        }
    }

    // creates an element that is unique to the app
    createSpecializedElement(element) {
        switch (element.type) {

            default:
                return null;
        }
    }
}

export default Work;
