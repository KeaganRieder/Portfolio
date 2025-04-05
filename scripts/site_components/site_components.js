import SiteElement from "./site_element.js";
import ImgElement from "./img_elements.js";
import { BodyElement, HeaderElement } from "./text_elements.js";
import { EmbeddedElement, IframeElement } from "./embeded_element.js";

class SiteComponents {
    static createElement(type, content, styleName = "") {
        switch (type) {
            case "img":
                return new ImgElement("img",content, styleName);
            case "embed":
                return new EmbeddedElement("embed",content, styleName);
            case "iframe":
                return new IframeElement("iframe",content, styleName);
            case "h1":
                return new HeaderElement("h1", content, styleName);
            case "h2":
                return new HeaderElement("h2", content, styleName);
            case "h3":
                return new HeaderElement("h3", content, styleName);
            case "h4":
                return new HeaderElement("h4", content, styleName);
            case "h5":
                return new HeaderElement("h5", content, styleName);
            case "h6":
                return new HeaderElement("h6", content, styleName);
            case "p":
                return new BodyElement("p",content, styleName);
            default:
                return new SiteElement(type, content, styleName);
        }
    }

}

export default SiteComponents;