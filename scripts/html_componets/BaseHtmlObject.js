class BaseHtmlObject {
    constructor(htmlObjInfo) {
        this.type = htmlObjInfo.type;
        this.content = htmlObjInfo.content;
        this.styleName = htmlObjInfo.styleName;
    }

    createElement() {
        console.error("createElement() method not implemented in BaseHtmlObject");
        return null;
    }

    getBody() {
        if (this.body === undefined) {
            console.error("body is undefined");
            return null;
        }
        return this.body;
    }

    renderObject(parent = document.body) {
        parent.append(this.createElement());
    }

    addEvent(action, handler) {
        if (body === undefined) {
            console.error("body is undefined");
            return;
        }
        this.body.on(action, handler);
    }

    addStyle(styleName) {
        if (body === undefined) {
            console.error("body is undefined");
            return;
        }
        this.body.addClass(styleName);
    }

    removeStyle(styleName) {
        if (body === undefined) {
            console.error("body is undefined");
            return;
        }
        this.body.removeClass(styleName);
    }

    setId(id) {
        this.body.attr("id", id);
    }


    show() {
        this.body.show(); // Use jQuery to show the element
    }

    hide() {
        this.body.hide(); // Use jQuery to hide the element
    }
}