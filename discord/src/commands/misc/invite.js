const {Command, Embed} = require('../../structures');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'invite',
            aliases: ['add', 'convite'],
            description: 'Invite me to your server',
            category: 'misc',
            botPermissions: ['embedLinks']
        });
    }
    async run(message) {
        const embed = new Embed();
        embed.setTitle(this._locale.get('inviteMe'));
        embed.setThumbnail(this.client.user.avatarURL);
        embed.setColor('0x7289DA');
        embed.setDescription(this._locale.get('inviteDescription'));
        message.reply(embed.build());
    }
}