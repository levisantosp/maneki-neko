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
        const dbl = new Button();
        topgg.setStyle('LINK');
        topgg.setLabel('Top.gg');
        topgg.setEmoji('995012387218407494');
        topgg.setURL('https://top.gg/bot/789196560415064085/vote');
        dbl.setStyle('LINK');
        dbl.setLabel('discordbotlist.com');
        dbl.setEmoji('995013888854741053');
        dbl.setURL('https://discordbotlist.com/bots/maneki-neko/upvote');
        embed.setTitle(this._locale.get('dblTitle'));
        embed.setDescription(this._locale.get('dblDescription'));
        embed.setThumbnail(this.client.user.avatarURL);
        message.reply({
            embed,
            components: [{
                type: 1,
                components: [topgg, dbl]
            }]
        });
    }
}