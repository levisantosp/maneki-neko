const emojis = require("./emojis");

module.exports = {
    getEmoji: function(emoji) {
        if(!emojis[emoji]) {
            return emoji = null;
        }
        else return emojis[emoji];
    }
}