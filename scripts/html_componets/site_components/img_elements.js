import SiteElement from "./site_element.js";

class ImgElement extends SiteElement {
    /**
     * Creates an <img> element.
     * @param {{ src: string, alt?: string }} content - Image source and optional alt text.
     * @param {string} [styleName=""] - Optional CSS class name.
     */
    constructor(content, styleName = "") {
        super("img", content, styleName);
    }

    _createElement() {
        const { src, alt = "" } = this.content || {};
        const $elem = $("<img>")
            .attr("src", src)
            .attr("alt", alt);

        if (this.styleName) {
            $elem.addClass(this.styleName);
        }

        return $elem;
    }
}

export default ImgElement;
