class SiteElement {
    /**
     * Represents a styled HTML div component using jQuery.
     * @param {string} type - Descriptive type of the element (used for logical grouping, not tag).
     * @param {string|jQuery|HTMLElement} content - HTML string or DOM element/jQuery object.
     * @param {string} [styleName=""] - Optional class name for styling.
     */
    constructor(type, content, styleName = "") {
        this.type = type;
        this.content = content;
        this.styleName = styleName;
        this.$element = this._createElement();
    }

    _createElement() {
        const $elem = $('<div>');

        if (this.styleName) {
            $elem.addClass(this.styleName);
        }

        if (typeof this.content === "string") {
            $elem.html(this.content);
        } else if (this.content instanceof jQuery) {
            $elem.append(this.content);
        } else if (this.content instanceof HTMLElement) {
            $elem.append($(this.content));
        }
        // $elem.attr("id", this.type); // Set the ID to the type of the element
        return $elem;
    }

    /**
     * Appends this element to a parent.
     * @param {jQuery|HTMLElement|SiteElement|string} [parent=document.body]
     *   A CSS selector, jQuery object, DOM element, or another SiteElement instance.
     */
    render(parent = document.body) {
        let $parent;

        if (parent instanceof SiteElement) {
            $parent = parent.getBody();
        } else {
            $parent = $(parent);
        }

        $parent.append(this.$element);
    }

    /**
     * Binds an event to the element.
     * @param {string} action - Event name (e.g., 'click').
     * @param {Function} handler - Callback function.
     */
    addEvent(action, handler) {
        this.$element.on(action, handler);
    }

    /**
     * Adds a class to the element.
     * @param {string} styleName - Class to add.
     */
    addStyle(styleName) {
        this.$element.addClass(styleName);
    }

    /**
     * Removes a class from the element.
     * @param {string} styleName - Class to remove.
     */
    removeStyle(styleName) {
        this.$element.removeClass(styleName);
    }

    /**
     * Returns the jQuery-wrapped DOM element.
     * @returns {jQuery}
     */
    getBody() {
        return this.$element;
    }

   setId(id){
    this.$element.attr("id", id);
   }

    /**
    * Makes the element visible by setting its display property.
    */
    displayElement() {
        this.$element.show(); // Use jQuery to show the element
    }

    /**
     * Hides the element by setting its display property to none.
     */
    hideElement() {
        this.$element.hide(); // Use jQuery to hide the element
    }

}

export default SiteElement;
