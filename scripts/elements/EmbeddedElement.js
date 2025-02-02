import BaseElement from './BaseElement.js';

/*
   overrides the base element class to create an embed element, which 
   is meant to hold things like pdf and other embedded things 
   for display
*/
class EmbeddedElement extends BaseElement {
    constructor(attributes, style, parent) {
        super("embed", attributes, style, parent);
    }

    SetAttributes() {
        this.element.src = this.attributes.src;
        this.element.type = this.attributes.type;
    }

}
class IframeElement extends BaseElement {
    constructor(attributes, style, parent) {
        super("iframe", attributes, style, parent);
    }

    SetAttributes() {
        this.element.src = this.attributes.src;
        this.element.type = this.attributes.type;
    }

}

export default EmbeddedElement;
export { EmbeddedElement, IframeElement };
