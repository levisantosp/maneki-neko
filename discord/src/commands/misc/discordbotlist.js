const {Command, Embed, Button} = require('../../structures');

module.exports = class DiscordBotListCommand extends Command {
    constructor() {
        super({
            name: 'discordbotlist',
            aliases: ['dbl', 'votar', 'vote'],
            description: 'Vote me!',
            category: 'misc',
            botPermissions: ['embedLinks']
        });
    }
    async run(message) {
        const embed = new Embed();
        const topgg = new Button();
        const bestlist = new Button();
        embed.setTitle(this._locale.get('dblTitle'));
        embed.setDescription(this._locale.get('dblDescription'));
        embed.setThumbnail(this.client.user.avatarURL);
        topgg.setStyle('LINK');
        topgg.setLabel('Top.gg');
        topgg.setURL('https://top.gg/bot/789196560415064085');
        message.reply({
            embed,
            components: [{
                type: 1,
                components: [topgg]
            }]
        });
    }
}