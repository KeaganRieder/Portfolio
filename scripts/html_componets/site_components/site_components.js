import SiteElement from "./site_element.js";
import ImgElement from "./img_elements.js";
import { BodyElement, HeaderElement } from "./text_elements.js";
import { EmbeddedElement, IframeElement } from "./embeded_element.js";

/**
 * Factory class for dynamically creating styled HTML components.
 * Returns a specific subclass of SiteElement depending on the tag type.
 */
class SiteComponents {
    /**
     * Creates a component instance based on the provided tag type.
     *
     * Supported types:
     * - Images: "img"
     * - Embeds: "embed", "iframe"
     * - Text: "h1"–"h6", "p"
     * - Fallback: any other HTML tag will return a basic SiteElement
     *
     * @param {string} type - The HTML tag name (e.g., "h1", "img", "p", etc.)
     * @param {any} content - The content for the element (can be string, HTMLElement, or config object depending on the type)
     * @param {string} [styleName=""] - Optional CSS class name for styling
     * @returns {SiteElement} An instance of a subclass of SiteElement
     */
    static createElement(type, content, styleName = "") {
        const tag = type.toLowerCase();

        // Handle all header tags with one condition
        if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) {
            return new HeaderElement(content, tag, styleName);
        }

        // Delegate based on known media/text types
        switch (tag) {
            case "img":
                return new ImgElement(content, styleName);
            case "embed":
                return new EmbeddedElement(content, styleName);
            case "iframe":
                return new IframeElement(content, styleName);
            case "p":
                return new BodyElement(content, styleName);
            default:
                return new SiteElement(tag, content, styleName);
        }
    }
}

export default SiteComponents;
