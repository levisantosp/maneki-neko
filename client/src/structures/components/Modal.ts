// Incomplete

export default class Modal {
	type: number
	style?: number
	custom_id: any
	placeholder: any
	label: any
	required: any

	constructor() {
		this.type = 4
	}
	setPlaceholder(text: string) {
		return this.placeholder = text
	}
	isRequired() {
		return this.required = true
	}
	setCustomID(id: string) {
		return this.custom_id = id
	}

	setStyle(style: 'SHORT' | 'PARAGRAPH') {
		return this.style = style === 'SHORT' ? 1 : 2
	}
	setLabel(text: string) {
		return this.label = text
	}
}