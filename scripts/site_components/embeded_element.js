import SiteElement from "./site_element.js";

class EmbeddedElement extends SiteElement {
    
    createElement() {
        const elem = document.createElement("embed");
        
        this.elem.src = this.content.src;
        this.elem.type = this.content.type;

        if (this.styleName) {
            elem.classList.add(this.styleName);
        }

        return elem;
    }
}

class IframeElement extends SiteElement {
    
    createElement() {
        const elem = document.createElement("embed");
        
        this.elem.src = this.content.src;
        this.elem.type = this.content.type;

        if (this.styleName) {
            elem.classList.add(this.styleName);
        }

        return elem;
    }
}

export { EmbeddedElement, IframeElement };
