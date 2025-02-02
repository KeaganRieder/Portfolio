/*
    BaseElement class is the parent class for all elements of the site
    It contains the basic properties and methods that all elements have
*/
class BaseElement {
    constructor(type, attributes, style, parent) {
        this.type = type;
        this.attributes = attributes;
        this.style = style;

        this.parent = parent;

        this.element = null;
        this.CreateElement();
    }

    //returns the main container of the element
    GetBody() {
        return this.element;
    }
    //returns the elements style sheet
    GetStyleSheet() {
        return this.element.style;
    }

    //sets the parent of the element
    SetParent(parent) {
        if (this.parent != null) {
            return;
        }
        else if (parent != null) {
            this.parent = parent;
            $(this.parent).append(this.element);
        }
    }

    // Create the element and set its attributes
    CreateElement() {
        this.element = document.createElement(this.type);
        if (this.style != null) {
            Object.assign(this.element.style, this.style);
        }

        this.SetAttributes();

        if (this.parent != null) {
            $(this.parent).append(this.element);
        }
    }

    // Set the attributes of the element
    SetAttributes() {
        console.log("setAttributes is not implemented");
    }

    //makes the element becomes an event listener, that executes
    // and event on assigned action
    MakeEventListener(action, event) {
        $(this.element).on(action, event);
    }
}

export default BaseElement;