import ContainerElement from "../elements/ContainerElement.js";
import ImgElement from "../elements/ImgElement.js";
import HeaderTextElement from "../elements/HeaderTextElement.js";
import { MAIN_STYLES } from "./AppStyles.js";
import { SITE_COLORS } from "../constants/SiteColors.js";

/*
base class of all apps which act as the sections fo the site 
*/
class App {
    constructor(name, parent) {
        this.appName = name;
        this.parent = parent;

        this.appContainer = null;
        this.shortcut = null;

        this.top = 24;
        this.left = 40;
        $(this.appContainer).hide();

    }

    getApp() {
        return this.appContainer;
    }
    getShortcut() {
        return this.shortcut;
    }

    //creates all elements of the app
    createAppElements() {
        this.appContainer = new ContainerElement(this.appName + " App", MAIN_STYLES.get("main"), this.parent);

        this.headerContainer = new ContainerElement(null, MAIN_STYLES.get("header"), this.appContainer.GetBody());
        this.appTitle = new HeaderTextElement("h2", { text: this.appName }, MAIN_STYLES.get("title"), this.headerContainer.GetBody());

        let closeButton = new ImgElement({ name: "close button", imgSrc: "apps/elements/close_button.png" }, MAIN_STYLES.get("closeButton"),
            this.headerContainer.GetBody());
        $(closeButton.GetBody()).on('click', () => { this.closeApp() });
        $(closeButton.GetBody()).on('mouseover', function () {
            closeButton.GetStyleSheet().backgroundColor = SITE_COLORS.appCloseButtonHoverBackground;
        });
        $(closeButton.GetBody()).on('mouseout', function () {
            closeButton.GetStyleSheet().backgroundColor = 'transparent';
        });

        this.appBody = new ContainerElement(null, MAIN_STYLES.get("body"), this.appContainer.GetBody());
        this.contentContainer = new ContainerElement(this.appName + " App Content", MAIN_STYLES.get("contentContainerStyle"), this.appBody.GetBody());

        this.addContent();
        this.resizeApp();
        this.closeApp();
    }

    // used to add content to the section
    addContent() {
        throw new Error('addContent must be implemented');
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
        console.log("opening app " + this.appName);
        $(this.appContainer.GetBody()).show();
    }

}

export default App;