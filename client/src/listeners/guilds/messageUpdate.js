const { Listener } = require('../../structures')

module.exports = class MessageUpdateListener extends Listener {
    constructor() {
        super({name: 'messageUpdate'})
    }
    async on (newMessage, oldMessage) {
        if(newMessage?.content === oldMessage?.content) return
        this.client.emit('messageCreate', newMessage)
    }
}