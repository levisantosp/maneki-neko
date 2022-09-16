// Incomplete

module.exports = class ModalBuilder {
    constructor() {
        this.type = 8
        this.data = {
            custom_id: null,
            title: null,
            components: []
        }
    }
    addComponent(component) {
        this.data.components.push(component)
    }
}