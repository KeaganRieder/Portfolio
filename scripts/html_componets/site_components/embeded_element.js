import SiteElement from "./site_element.js";

class EmbeddedElement extends SiteElement {
    /**
     * Creates an <embed> element.
     * @param {{ src: string, type?: string }} content - Source and MIME type.
     * @param {string} [styleName=""] - Optional class name.
     */
    constructor(content, styleName = "") {
        super("embed", content, styleName);
    }

    _createElement() {
        const { src, type = "" } = this.content || {};
        const $elem = $("<embed>")
            .attr("src", src)
            .attr("type", type);

        if (this.styleName) {
            $elem.addClass(this.styleName);
        }

        return $elem;
    }
}

class IframeElement extends SiteElement {
    /**
     * Creates an <iframe> element.
     * @param {{ src: string, title?: string }} content - Source and optional title.
     * @param {string} [styleName=""] - Optional class name.
     */
    constructor(content, styleName = "") {
        super("iframe", content, styleName);
    }

    _createElement() {
        const { src, title = "Embedded Frame" } = this.content || {};
        const $elem = $("<iframe>")
            .attr("src", src)
            .attr("title", title)
            .attr("frameborder", 0)
            .attr("allowfullscreen", true);

        if (this.styleName) {
            $elem.addClass(this.styleName);
        }

        return $elem;
    }
}

export { EmbeddedElement, IframeElement };
