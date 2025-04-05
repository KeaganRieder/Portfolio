import SiteElement from "./site_element.js";

class ImgElement extends SiteElement {
    create() {
        const elem = document.createElement("img");
        elem.src =  this.content.src;
        elem.alt = this.content.alt;
        if (this.styleName) {
            elem.classList.add(this.styleName);
        }

        return elem;
    }
}

export default ImgElement;