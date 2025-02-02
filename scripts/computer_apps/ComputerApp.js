import ContainerElement from "../elements/ContainerElement.js";
import ImgElement from "../elements/ImgElement.js";
import EmbeddedElement from "../elements/EmbeddedElement.js";
import { BodyTextElement, HeaderTextElement } from "../elements/TextElements.js";
import { AppStyles } from "../site_styles/ComputerAppStyles.js";
import { DeskTopStyles } from "../site_styles/DesktopStyles.js";
import { SITE_COLORS } from "../site_styles/SiteColors.js";

/*
    a shortcut is used to open an app
*/
class AppShortcut {
    constructor(attributes, parent, event) {
        this.shortCutContainer = new ContainerElement(attributes.name + " ShortCut", DeskTopStyles.shortcuts.body, parent);
        this.icon = new ImgElement(attributes, DeskTopStyles.shortcuts.img, this.shortCutContainer.GetBody());
        this.header = new HeaderTextElement("h2", { title: attributes.text }, DeskTopStyles.shortcuts.label, this.shortCutContainer.GetBody());
        this.shortCutContainer.MakeEventListener("click", event);

        $(this.shortCutContainer.GetBody()).on('mouseover', () => {
            this.shortCutContainer.GetStyleSheet().backgroundColor = SITE_COLORS.shortCutHoverBackground;
        });
        $(this.shortCutContainer.GetBody()).on('mouseout', () => {
            this.shortCutContainer.GetStyleSheet().backgroundColor = SITE_COLORS.shortCutBackground;
        });
    }

    
    GetBody() {
        return this.shortCutContainer;
    }
}

/*
    an app is used as a content section for the site.
    this is the base class meant to be extended by other apps
    to create Unique sections for  site
*/
class ComputerApp {
    constructor(appInfo, content, parents) {
        this.appName = appInfo.name;
        this.title = appInfo.text;
        this.parent = parents.parent;

        this.appContent = content;

        this.appContainer = null;
        this.shortcut = new AppShortcut(appInfo, parents.shortCutParent, () => { this.openApp() });
        this.top = 24;
        this.left = 40;
        this.createApp();
    }

    //returns the apps container
    getContainer() {
        return this.appContainer;
    }

    createApp() {
        this.appContainer = new ContainerElement(this.appName + " App", AppStyles.main.container, this.parent);

        this.headerContainer = new ContainerElement(null, AppStyles.main.header.Container, this.appContainer.GetBody());
        this.appTitle = new HeaderTextElement("h2", { title: this.title }, AppStyles.main.header.title, this.headerContainer.GetBody());

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


    // runs trough the container of app content, and adds content to the 
    // app
    addContent() {
        let createdElement;
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
    }

    // creates an element that is unique to the app
    createSpecializedElement(element) {
        switch (element.type) {
            default:
                return null;
        }
    }

    // creates  elements that are common to all apps
    createCommonElement(element) {
        switch (element.type) {
            case "Img":
                return new ImgElement(element.content, element.style, this.contentContainer.GetBody());
            case "bodyText":
                return new BodyTextElement(element.content, element.style, this.contentContainer.GetBody());
            case "embedded":
                this.appBody.GetBody().remove();
                this.contentContainer.GetBody().remove();
                this.appBody = null;
                this.contentContainer = null;
                return new EmbeddedElement(element.content, element.size, this.appContainer.GetBody());
            default:
                return null;
        }
    }
    resizeApp() {
        this.appContainer.GetStyleSheet().width = `95%`;
        this.appContainer.GetStyleSheet().height = `90%`;
        this.appContainer.GetStyleSheet().top = `${this.top}px`;
        this.appContainer.GetStyleSheet().left = `${this.left}px`;
    }

    //hides the section
    closeApp() {
        $(this.appContainer.GetBody()).hide();
    }

    //shows the section
    openApp() {
        $(this.appContainer.GetBody()).show();
    }
}

export { AppShortcut, ComputerApp };
export default ComputerApp;