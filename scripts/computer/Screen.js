import ContainerElement from "../elements/ContainerElement.js";
import { AppShortcut, ComputerApp } from "../computer_apps/ComputerApp.js";
import AboutMe from "../computer_apps/AboutMe.js";
import WorkDisplay from "../computer_apps/work_showcase/WorkDisplay.js";

import { AboutMeContent, ResumeContent, ArtistCvContent } from "../content/AppContent.js";
import { WorkDisplayContent } from "../content/WorkDisplayContent.js";
import { DeskTopStyles } from "../site_styles/DesktopStyles.js";

/*
  the screen is the holds the brunt of the site, and does things 
  like order apps and other things along the lines of management
*/
class Screen {
  constructor() {
    this.container = new ContainerElement("screen_Container", null, document.body);
    this.container.GetStyleSheet().width = "100%";
    this.container.GetStyleSheet().height = "100%";

    this.screen = new ContainerElement("screen", DeskTopStyles.screen, this.container.GetBody());
    this.apps = new Map();
  }

  //returns the desktops screen 
  GetScreen() {
    return this.screen;
  }

  //creates all elements that are to be displayed on the desktop
  CreateScreenElements() {
    this.taskBar = new ContainerElement("taskBar", DeskTopStyles.taskBar, this.container.GetBody());

    this.shortCutContainer = new ContainerElement("shortCut_Container", DeskTopStyles.shortcuts.container, this.screen.GetBody());

    let internalApps = new ContainerElement("myApps", DeskTopStyles.shortcuts.column, this.shortCutContainer.GetBody());
    let externalApps = new ContainerElement("externalApps", DeskTopStyles.shortcuts.column, this.shortCutContainer.GetBody());

    let appParents = { parent: this.screen.GetBody(), shortCutParent: internalApps.GetBody() };

    this.apps.set("About_Me", new AboutMe({ name: "AboutMe", text: "About_Me", imgSrc: "apps/icons/text_doc.png" }, AboutMeContent, appParents));
    this.apps.set("Resume", new ComputerApp({ name: "Resume", text: "Resume", imgSrc: "apps/icons/text_doc.png" }, ResumeContent, appParents));
    this.apps.set("Artist Cv", new ComputerApp({ name: "Artist_Cv", text: "Artist_Cv", imgSrc: "apps/icons/text_doc.png" }, ArtistCvContent, appParents));
    this.apps.set("WorkShowcase", new WorkDisplay({ name: "Works", text: "Works", imgSrc: "apps/icons/folder.png" }, WorkDisplayContent, appParents));

    new AppShortcut(
      { name: "Linkedin", text: "Linkedin", imgSrc: "apps/icons/linkedin.png" },
      externalApps.GetBody(),
      () => { window.open("https://www.linkedin.com/in/keagan-rieder/", "_blank") }
    );

    new AppShortcut(
      { name: "GitHub", text: "GitHub", imgSrc: "apps/icons/github.png" },
      externalApps.GetBody(),
      () => { window.open("https://github.com/KeaganRieder", "_blank") }
    );

    new AppShortcut(
      { name: "Email", text: "Email", imgSrc: "apps/icons/email.png" },
      externalApps.GetBody(),
      () => { window.open("mailto:'kagan@rieder.ca'", "_blank") }
    );

    this.resize();
  }

  //resizes elements on desktop
  resize() {
    this.screen.GetStyleSheet().width = "100%";
    this.screen.GetStyleSheet().height = `100%`;
  }
}

export default Screen;