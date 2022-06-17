const {Command, Embed, Button} = require('../../structures');

module.exports = class AvatarCommand extends Command {
    constructor() {
        super({
            name: 'avatar',
            description: 'View a user\'s avatar',
            category: 'util',
            botPermissions: ['embedLinks']
        });
    }
    async run(message) {
        const user = await this.getUser(message.args[0] ?? message.author.mention);
        const embed = new Embed();
        const button = new Button();
        embed.setTitle(user.username);
        embed.setColor('0x7289DA');
        embed.setImage(user.avatarURL);
        button.setStyle('LINK');
        button.setLabel('Download');
        button.setURL(user.avatarURL);
        message.reply({
            components: [{
                type: 1,
                components: [button]
            }],
            embeds: [embed]
        });
    }
}