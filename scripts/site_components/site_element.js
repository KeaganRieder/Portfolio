
class SiteElement {

    constructor(type, content, styleName = "") {
        this.type = type;
        this.content = content;
        this.styleName = styleName;
        this.element = this.create(styleName);
    }

    create() {
        const elem = document.createElement("div");
        if (this.styleName) {
            elem.classList.add(this.styleName);
        }
        return elem;
    }

    render(parent = document.body) {
        $(parent).append(this.element);
    }

    addEvent(action, event) {
        $(this.element).on(action, event);
    }

    addStyle(styleName) {
        this.element.classList.add(styleName);
    }

    removeStyle(styleName) {
        this.element.classList.remove(styleName);
    }

    getBody() {
        return this.element;
    }
}

export default SiteElement;