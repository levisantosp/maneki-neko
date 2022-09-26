import { Constants } from 'eris'

export default class Button {
    private type: number
    private style: number
    private label: any
    private custom_id: any
    private emoji: any
    private url: any
    private disabled: any

    constructor() {
        this.type = Constants.ComponentTypes.BUTTON
    }

    /**
     * @param {'BLUE'|'GRAY'|'GREEN'|'RED'|'LINK'} style Component style
     * @returns {Button}
     */
    setStyle(style: string) {
        switch (style.toUpperCase()) {
            case 'BLUE': this.style = Constants.ButtonStyles.PRIMARY
            break
            case 'GRAY': this.style = Constants.ButtonStyles.SECONDARY
            break
            case 'GREEN':  this.style = Constants.ButtonStyles.SUCCESS
            break
            case 'RED': this.style = Constants.ButtonStyles.DANGER
            break
            case 'LINK': this.style = Constants.ButtonStyles.LINK
            break
            default: throw new Error('Invalid style! Please, choose: \'BLUE\', \'GRAY\', \'GREEN\', \'RED\', \'LINK\'')
        }
        return this
    }

    /**
     * @param {string} label Button text
     * @returns {Button}
     */
    setLabel(label: string) {
        this.label = label
        return this
    }

    /**
     * @param {string} customID Button ID
     * @returns {Button}
     */
    setCustomID(customID: string) {
        this.custom_id = customID
        return this
    }

    /**
     * @param {string} emoji Button emoji
     * @returns {Button}
     */
    setEmoji(emoji) {
        if (isNaN(emoji)) this.emoji = { name: emoji }
        else this.emoji = { id: emoji }
        return this
    }

    /**
     * @param {string} url Button URL
     * @returns {Button}
     */
    setURL(url: string) {
        if (this.style !== 5) throw new Error(`The button style must be 'LINK'`)
        this.url = url
        return this
    }

    /**
     * @param {boolean} disabled
     * @returns {Button}
     */
    setDisabled() {
        this.disabled = true
        return this
    }
}