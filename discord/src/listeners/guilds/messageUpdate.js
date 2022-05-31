const {Listener} = require('../../structures');

module.exports = class extends Listener {
    constructor() {
        super({name: 'messageUpdate'});
    }
    async on(newMessage, oldMessage) {
        if(newMessage?.content === oldMessage?.content) return;
        this.client.emit('messageCreate', newMessage);
    }
}