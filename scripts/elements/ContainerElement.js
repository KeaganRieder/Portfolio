import BaseElement from './BaseElement.js';

/*
   overrides the base element class to create an container element which is meant to 
   hold other elements
*/
class ContainerElement extends BaseElement {
    constructor(id, style, parent) {
        super("div", null, style, parent);
        
        if (id != null) {
            id = id.toLowerCase().replace(/\s+/g, '_');
            this.element.id = id

        }
    }

    SetAttributes() {
        
    }

}

export default ContainerElement;
