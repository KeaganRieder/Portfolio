import SiteElement from "./site_element.js";

class HeaderElement extends SiteElement {
    /**
     * Creates a header (h1-h6) element.
     * @param {string} content - Text or HTML to place inside the header.
     * @param {string} [tag="h1"] - The header tag to use (e.g., "h1", "h2", etc.).
     * @param {string} [styleName=""] - Optional class name.
     */
    constructor(content, tag = "h1", styleName = "") {
        super(tag, content, styleName);
    }

    _createElement() {
        const $elem = $(`<${this.type}>`);

        if (this.styleName) {
            $elem.addClass(this.styleName);
        }

        $elem.text(this.content);
        return $elem;
    }
}

class BodyElement extends SiteElement {
    /**
     * Creates a paragraph <p> element.
     * @param {string} content - The text content.
     * @param {string} [styleName=""] - Optional class name.
     */
    constructor(content, styleName = "") {
        super("p", content, styleName);
    }

    _createElement() {
        const $elem = $("<p>");

        if (this.styleName) {
            $elem.addClass(this.styleName);
        }

        $elem.text(this.content);
        return $elem;
    }
}

export { BodyElement, HeaderElement };
