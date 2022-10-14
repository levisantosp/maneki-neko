// Incomplete

module.exports = class Modal {
    constructor() {
        this.type = 4
        this.style = null
        this.custom_id = null
        this.placeholder = null
        this.label = null
        this.required = null
    }
    setPlaceholder(text) {
        return this.placeholder = text
    }
    isRequired() {
        return this.required = true
    }
    setCustomID(id) {
        return this.custom_id = id
    }

    /**
     * 
     * @param {'SHORT' | 'PARAGRAPH'} style 
     */
    setStyle(style) {
        return this.style = style === 'SHORT' ? 1 : 2
    }
    setLabel(text) {
        return this.label = text
    }
}