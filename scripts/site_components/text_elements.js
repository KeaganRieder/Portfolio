
import SiteElement from "./site_element.js";

class HeaderElement extends SiteElement {
    
    create() {
        const elem = document.createElement(this.type);
        elem.textContent = this.content;
        if (this.styleName) {
            elem.classList.add(this.styleName);
        }
        return elem;
    }
}

class BodyElement extends SiteElement {
    create() {
        const elem = document.createElement("p");
        elem.textContent = this.content;
        if (this.styleName) {
            elem.classList.add(this.styleName);
        }
        return elem;
    }
}

export { BodyElement, HeaderElement };
