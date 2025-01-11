
import EmbeddedElement from "../elements/EmbeddedElement.js";
import App from "./App.js";

/*
overrides the app class to create a section of the site for displaying pdfs
*/
class PdfApp extends App {
    constructor(name, pdfPath, parent) {
        super(name, parent);

        this.pdfPath = pdfPath;
        this.createAppElements();
    }

    addContent() {
        this.contentContainer.GetBody().remove();
        this.appBody.GetBody().remove();

        this.contentContainer = null;
        this.appBody = new EmbeddedElement({ src: this.pdfPath, type: 'application/pdf' }, { width: '100%', height: '90%' }, this.appContainer.GetBody());
    }

}

export default PdfApp;