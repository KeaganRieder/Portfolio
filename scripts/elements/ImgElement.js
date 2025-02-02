import BaseElement from './BaseElement.js';

/*
   overrides the base element class to create an image element
*/
class ImgElement extends BaseElement {
    constructor(attributes, style, parent) {
        super("img", attributes, style, parent);
    }

    // Set the attributes of the element
    SetAttributes() {
        let src = "./assets/"+ this.attributes.imgSrc;
        this.element.src = src;
        this.element.alt = this.attributes.title;
    }
}

export default ImgElement;