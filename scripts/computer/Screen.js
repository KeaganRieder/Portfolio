import ContainerElement from "../elements/ContainerElement.js";
import ImgElement from "../elements/ImgElement.js";
import HeaderTextElement from "../elements/HeaderTextElement.js";

import AboutMe from "../apps/about_me/AboutMe.js";
import PdfApp from "../apps/PdfApp.js";
import WorkDisplay from "../apps/work_display/WorkDisplay.js";

import { DESKTOP_STYLES, SHORTCUT_STYLES } from "./DesktopStyles.js";
import { SITE_COLORS } from "../constants/SiteColors.js";

/*
  the screen is the holds the brunt of the site, and does things 
  like order apps and other things along the lines of management
*/
class Screen {
  constructor() {
    this.container = new ContainerElement("screen_Container", null, document.body);
    this.container.GetStyleSheet().width = "100%";
    this.container.GetStyleSheet().height = "100%";

    this.screen = new ContainerElement("screen", DESKTOP_STYLES.get("screen"), this.container.GetBody());
    this.apps = new Map();
  }

  //returns the desktops screen 
  GetScreen() {
    return this.screen;
  }

  //creates all elements that are to be displayed on the desktop
  CreateScreenElements() {
    this.taskBar = new ContainerElement("taskBar", DESKTOP_STYLES.get("taskBar"), this.container.GetBody());

    this.shortCutContainer = new ContainerElement("shortCut_Container", SHORTCUT_STYLES.get("container"), this.screen.GetBody());

    let aboutMeApp = new AboutMe(this.screen.GetBody());
    this.apps.set("About_Me", aboutMeApp);

    let resumeApp = new PdfApp("Resume", "./assets/pdfs/resume.pdf", this.screen.GetBody());
    this.apps.set("Resume", resumeApp);

    let artistCvApp = new PdfApp("Artist Cv", "./assets/pdfs/artist_cv.pdf", this.screen.GetBody());
    this.apps.set("Artist_Cv", artistCvApp);

    let workDisplayApp = new WorkDisplay(this.screen.GetBody());
    this.apps.set("WorkDisplay", workDisplayApp);

    this.CreateShortCut({ name: "AboutMe", text: "AboutMe.txt", imgSrc: "apps/icons/text_doc.png" },
      "click", () => { aboutMeApp.openApp() });

    this.CreateShortCut({ name: "Resume", text: "resume.pdf", imgSrc: "apps/icons/text_doc.png" },
      "click", () => { resumeApp.openApp() });

    this.CreateShortCut({ name: "ArtistCv", text: "artist_Cv.pdf", imgSrc: "apps/icons/text_doc.png" },
      "click", () => { artistCvApp.openApp() });

    this.CreateShortCut({ name: "Linkedin", text: "Linkedin", imgSrc: "apps/icons/linkedin.png" },
      "click", () => { window.open("https://www.linkedin.com/in/keagan-rieder/", "_blank") });

    this.CreateShortCut({ name: "GitHub", text: "GitHub", imgSrc: "apps/icons/github.png" },
      "click", () => { window.open("https://github.com/KeaganRieder", "_blank") });

    this.CreateShortCut({ name: "Email", text: "Email", imgSrc: "apps/icons/email.png" },
      "click", () => { window.open("mailto:'kagan@rieder.ca'", "_blank") });

    this.CreateShortCut({ name: "WorkShowcase", text: "WorkShowcase", imgSrc: "apps/icons/folder.png" },
      "click", () => { workDisplayApp.openApp() });

    this.resize();
  }

  CreateShortCut(attributes, action, event) {
    let shortCut = new ContainerElement(attributes.name + " ShortCut", SHORTCUT_STYLES.get("shortcut"), this.shortCutContainer.GetBody());
    let icon = new ImgElement(attributes, SHORTCUT_STYLES.get("icon"), shortCut.GetBody());
    let header = new HeaderTextElement("h2", attributes, SHORTCUT_STYLES.get("label"), shortCut.GetBody());
    shortCut.MakeEventListener(action, event);

    $(shortCut.GetBody()).on('mouseover', function () {
      shortCut.GetStyleSheet().backgroundColor = SITE_COLORS.shortCutHoverBackground;
    });
    $(shortCut.GetBody()).on('mouseout', function () {
      shortCut.GetStyleSheet().backgroundColor = SITE_COLORS.shortCutBackground;
    });

  }

  //resizes elements on desktop
  resize() {
    this.screen.GetStyleSheet().width = "100%";
    this.screen.GetStyleSheet().height = `100%`;
  }
}

export default Screen;