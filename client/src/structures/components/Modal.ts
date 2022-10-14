// Incomplete

export default class Modal {
    type: number
    style: number
    custom_id: any
    placeholder: any
    label: any
    required: any

    constructor() {
        this.type = 4
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