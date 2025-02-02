import ContainerElement from "../../elements/ContainerElement.js";
import ImgElement from "../../elements/ImgElement.js";
import EmbeddedElement from "../../elements/EmbeddedElement.js";
import { BodyTextElement, HeaderTextElement } from "../../elements/TextElements.js";
import ComputerApp from "../ComputerApp.js";
import { SITE_COLORS } from "../../site_styles/SiteColors.js";
import { AppStyles } from "../../site_styles/ComputerAppStyles.js";

class Work extends ComputerApp {
    constructor(appInfo, content, parents) {
        super(appInfo, content, parents);
        this.shortcut = null;
    }

    createApp() {
        this.appContainer = new ContainerElement("works-" + this.appName + " App", AppStyles.main.container, document.getElementById('screen'));

        this.headerContainer = new ContainerElement(null, AppStyles.main.header.Container, this.appContainer.GetBody());
        this.appTitle = new HeaderTextElement("h2", { title: "works-" + this.appName }, AppStyles.main.header.title, this.headerContainer.GetBody());

        let closeButton = new ImgElement({ name: "close button", imgSrc: "apps/elements/close_button.png" }, AppStyles.main.header.closeButton,
            this.headerContainer.GetBody());
        $(closeButton.GetBody()).on('click', () => { this.closeApp() });
        $(closeButton.GetBody()).on('mouseover', function () {
            closeButton.GetStyleSheet().backgroundColor = SITE_COLORS.appCloseButtonHoverBackground;
        });
        $(closeButton.GetBody()).on('mouseout', function () {
            closeButton.GetStyleSheet().backgroundColor = 'transparent';
        });

        this.appBody = new ContainerElement(null, AppStyles.main.content.container, this.appContainer.GetBody());
        this.contentContainer = new ContainerElement(this.appName + " App Content", AppStyles.main.content.scrollContainer, this.appBody.GetBody());

        this.addContent();

        this.resizeApp();
        this.closeApp();

        this.title = null;
    }

    addContent() {
        this.previewContainer = new ContainerElement(this.appName + " Overview", AppStyles.workStyles.sections.piece, this.parent);
        let title = new HeaderTextElement("h3", { title: this.appName }, AppStyles.workStyles.sections.pieceHeader, this.previewContainer.GetBody());
        //todo images
        let description = new BodyTextElement({ bodyText: this.appContent.highLight.description }, AppStyles.workStyles.sections.pieceBody, this.previewContainer.GetBody());

        $(this.previewContainer.GetBody()).on('click', () => { this.openApp() });
        $(this.previewContainer.GetBody()).on('mouseover', () => {
            this.previewContainer.GetStyleSheet().backgroundColor = SITE_COLORS.appCloseButtonHoverBackground;
        });
        $(this.previewContainer.GetBody()).on('mouseout', () => {
            this.previewContainer.GetStyleSheet().backgroundColor = 'transparent';
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
