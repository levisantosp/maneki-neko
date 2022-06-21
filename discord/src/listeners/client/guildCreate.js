const {Listener} = require('../../structures');
const {Guild} = require('../../../../database');

module.exports = class GuildCreateListener extends Listener {
    constructor() {
        super({name: 'guildCreate'});
    }
    async on(guild) {
        const g = await Guild.findById(guild.id);
        if(g?.banned) guild.leave();
    }
}