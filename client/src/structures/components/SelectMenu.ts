import { AdvancedMessageContent, Constants } from 'eris'

export default class SelectMenu {
	type: number
	custom_id: any
	placeholder: any
	options: object[]
	min_values: any
	max_values: any
	disabled: boolean

	constructor() {
		this.type = Constants.ComponentTypes.SELECT_MENU
		this.custom_id = null
		this.placeholder = null
		this.options = []
		this.min_values = null
		this.max_values = null
		this.disabled = false
	}

	/**
	 * Puts a placeholder in menu
	 * @param placeholder Select menu placeholder
	 * @returns {SelectMenu}
	 */
	setPlaceholder(placeholder: string) {
		this.placeholder = placeholder
		return this
	}

	/**
	 * Adds a option in menu
	 * @param label Select menu text
	 * @param description Select menu description
	 * @param value Select menu value
	 * @param emoji Select menu emoji (ifthe emoji is customized, put the emoji id)
	 * @returns {SelectMenu}
	 */
	addOption(label: string, description: string, value: string, emoji?: string | any) {
		if (isNaN(emoji)) this.options.push({ label, description, value, emoji: { name: emoji } })
		else this.options.push({ label, description, value, emoji: { id: emoji } })
		return this
	}

	/**
	 * Sets the minimum values that will be selected
	 * @param {number} number Minimum amount of selections the user can make
	 * @returns {SelectMenu}
	 */
	setMinValues(number = 1) {
		this.min_values = number
		return this
	}

	/**
	 * Sets the maximum values that will be selected
	 * @param {number} number Maximum amount of selections the user can make
	 * @returns {SelectMenu}
	 */
	setMaxValues(number = 1) {
		this.max_values = number
		return this
	}
	/**
	 * Disables the menu
	 * @returns {SelectMenu}
	 */
	setDisabled() {
		this.disabled = true
		return this
	}

	/**
	 * Sets a menu ID
	 * @param customID Select menu ID
	 * @returns {SelectMenu}
	 */
	setCustomID(customID: string) {
		this.custom_id = customID
		return this
	}

	/**
	 * Build the menu
	 * @param content Message or embed that will be send with menu
	 * @param {object} file File that will be send with menu
	 */
	build(content?: string, file?: object | any) {
		if (!content) content = ''
		return {
			content,
			components: [
				{
					type: 1,
					components: [this]
				}
			]
		}
	}
}