const { Command, Embed, Button } = require('../../structures')

module.exports = class InviteCommand extends Command {
    constructor() {
        super({
            name: 'invite',
            aliases: ['add', 'convite'],
            description: 'Invite me to your server',
            category: 'misc',
            botPermissions: ['embedLinks']
        })
    }
    async run (message) {
        const embed = new Embed()
        const button = new Button()
        const _button = new Button()

        embed.setTitle(this.locale.get('commands.invite.embed.title'))
        embed.setThumbnail(this.client.user.avatarURL)
        embed.setColor('0x7289DA')
        embed.setDescription(this.locale.get('commands.invite.embed.description'))

        button.setStyle('LINK')
        button.setLabel(this.locale.get('commands.invite.button.label'))
        button.setURL(process.env.BOT_INVITE)

        _button.setStyle('LINK')
        _button.setLabel(this.locale.get('helper.community'))
        _button.setURL(process.env.SUPPORT_SERVER)

        message.reply({
            embed,
            components: [{
                type: 1,
                components: [button, _button]
            }]
        })
    }
}