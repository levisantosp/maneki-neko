// Incomplete

interface ModalBuilderData {
    custom_id: any
    title: any
    components: string[]
}

export default class ModalBuilder {
    private type: number
    private data: ModalBuilderData

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