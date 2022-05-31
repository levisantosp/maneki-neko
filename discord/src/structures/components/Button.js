const {Constants} = require("eris");

module.exports = class Button {
    constructor() {
        this.type = Constants.ComponentTypes.BUTTON;
        this.style = null;
        this.label = null;
        this.custom_id = null;
        this.emoji = null;
        this.url = null;
        this.disabled = null;
    }

    /**
     * @param {"BLUE"|"GRAY"|"GREEN"|"RED"|"LINK"} style Component style
     * @returns {Button}
     */
    setStyle(style) {
        switch(style.toUpperCase()) {
            case "BLUE": return this.style = Constants.ButtonStyles.PRIMARY;
            case "GRAY": return this.style = Constants.ButtonStyles.SECONDARY;
            case "GREEN": return this.style = Constants.ButtonStyles.SUCCESS;
            case "RED": return this.style = Constants.ButtonStyles.DANGER;
            case "LINK": return this.style = Constants.ButtonStyles.LINK;
            default: throw new Error("Invalid style! Please, choose: \"BLUE\", \"GRAY\", \"GREEN\", \"RED\", \"LINK\"");
        }
    }

    /**
     * @param {string} label Button text
     * @returns {Button}
     */
    setLabel(label) {
        return this.label = label;
    }

    /**
     * @param {string} customID Button ID
     * @returns {Button}
     */
    setCustomID(customID) {
        return this.custom_id = customID;
    }
    
    /**
     * @param {string} emoji Button emoji
     * @returns {Button}
     */
    setEmoji(emoji) {
        if(isNaN(emoji)) return this.emoji = {name: emoji}
        else return this.emoji = {id: emoji}
    }

    /**
     * @param {string} url Button URL
     * @returns {Button}
     */

    setURL(url) {
        if(this.style !== 5) throw new Error(`The button style must be "LINK"`);
        else return this.url = url;
    }

    /**
     * @param {boolean} disabled
     * @returns {Button}
     */
    setDisabled(disabled = true) {
        if(typeof disabled !== "boolean") throw new Error("This field must be a boolean");
        else return this.disabled = disabled;
    }
}