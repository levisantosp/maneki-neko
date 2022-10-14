// Incomplete

import Modal from './Modal'

interface ModalBuilderData {
	custom_id: any
	title: any
	components: object[]
}

export default class ModalBuilder {
	type: number
	data: ModalBuilderData

	constructor() {
		this.type = 8
		this.data = {
			custom_id: null,
			title: null,
			components: []
		}
	}
	addComponent(component: Modal) {
		this.data.components.push(component)
	}
}