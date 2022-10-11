const { Command, Embed, Button } = require('../../../structures')

module.exports = class BotInfoCommand extends Command {
    constructor() {
        super({
            name: 'botinfo',
            description: 'View my informations',
            description_localizations: {
                'pt-BR': 'Veja minhas informações'
            },
            category: 'util',
            botPermissions: ['embedLinks']
        })
    }
    async run (ctx) {
        const dev = await this.client.getRESTUser(process.env.OWNER_ID)

        const embed = new Embed()
        .setTitle(this.locale.get('commands.botinfo.embed.title'))
        .setDescription(this.locale.get('commands.botinfo.embed.description', {
            guilds: this.client.guilds.size,
            users: this.client.users.filter(user => !user.bot).length,
            commands: this.client.commands.size,
            dev: `${dev.username}#${dev.discriminator}`
        }))
        .setThumbnail(this.client.user.avatarURL)
        .setFooter(`By: ${dev.username}#${dev.discriminator}`, dev.avatarURL)

        const button = new Button()
        .setStyle('LINK')
        .setLabel(this.locale.get('helper.community'))
        .setURL(process.env.SUPPORT_SERVER)

        ctx.reply({
            embeds: [embed],
            components: [{
                type: 1,
                components: [button]
            }]
        })
    }
}