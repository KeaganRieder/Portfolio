import BaseElement from './BaseElement.js';

/*
   overrides the base element class to create an Header Text element
*/
class HeaderTextElement extends BaseElement {
    constructor(headerType, attributes, style, parent) {
        super(headerType, attributes, style, parent);
    }

    // Set the attributes of the element
    SetAttributes() {
        this.element.textContent = this.attributes.text;
    }
}

export default  HeaderTextElement;