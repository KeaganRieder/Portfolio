import ContainerElement from "../elements/ContainerElement.js";
import ImgElement from "../elements/ImgElement.js";
import { EmbeddedElement, IframeElement } from "../elements/EmbeddedElement.js";
import { BodyTextElement, HeaderTextElement } from "../elements/TextElements.js";
import { AppStyle } from "../site_styles/ComputerAppStyles.js";
import { DeskTopStyles } from "../site_styles/DesktopStyles.js";
import { appColors, deskTopColors, } from "../site_styles/SiteColors.js";
import { AppContent } from "../content/AppContent.js";

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
            this.shortCutContainer.GetStyleSheet().backgroundColor = deskTopColors.shortCuts.hover;
        });
        $(this.shortCutContainer.GetBody()).on('mouseout', () => {
            this.shortCutContainer.GetStyleSheet().backgroundColor = deskTopColors.shortCuts.base;
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
        this.appContainer = new ContainerElement(this.appName + " App", AppStyle.mainContainer, this.parent);

        this.headerContainer = new ContainerElement(null, AppStyle.header.container, this.appContainer.GetBody());
        this.appTitle = new HeaderTextElement("h2", { title: this.title }, AppStyle.header.text, this.headerContainer.GetBody());
        this.createCloseButton();

        this.appBody = new ContainerElement(null, AppStyle.content.container, this.appContainer.GetBody());
        this.contentContainer = new ContainerElement(this.appName + " App Content", AppStyle.content.scrollContainer, this.appBody.GetBody());

        this.addContent();

        this.resizeApp();
        this.closeApp();

        this.title = null;
    }

    createCloseButton() {
        let closeButton = new ImgElement({ name: "close button", imgSrc: AppContent.closeButton }, AppStyle.header.closeButton,
            this.headerContainer.GetBody());

        $(closeButton.GetBody()).on('click', () => { this.closeApp() });
        $(closeButton.GetBody()).on('mouseover', function () {
            closeButton.GetStyleSheet().backgroundColor = appColors.closeButton.hover;
        });
        $(closeButton.GetBody()).on('mouseout', function () {
            closeButton.GetStyleSheet().backgroundColor = appColors.closeButton.background;
        });
    }

    // runs through the container of app content, and adds content to the 
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
            case "iframe":
                this.contentContainer.GetBody().remove();
                this.contentContainer = null;
                this.appBody.GetStyleSheet().overflowY = 'hidden'; // copy to embed or add if statment and combine with embed functionality
                if(element.type == "iframe"){
                    return new IframeElement(element.content, element.style, this.appBody.GetBody());
                }
                else{
                    return new EmbeddedElement(element.content, element.style, this.appBody.GetBody());
                }
            default:
                return null;
        }
    }

    resizeApp() {
        this.appContainer.GetStyleSheet().width = `95%`;
        this.appContainer.GetStyleSheet().height = `calc(90% - 26px)`;
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