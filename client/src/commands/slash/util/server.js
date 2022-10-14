const { Command, Embed } = require('../../../structures')

module.exports = class ServerCommand extends Command {
    constructor() {
        super({
            name: 'server',
            name_localizations: {
                'pt-BR': 'servidor'
            },
            description: 'View informations about this server',
            description_localizations: {
                'pt-BR': 'Veja informações sobre este servidor'
            },
            options: [
                {
                    type: 1,
                    name: 'info',
                    description: 'View information about this server',
                    description_localizations: {
                        'pt-BR': 'Veja informações sobre este servidor'
                    }
                }
            ],
            category: 'util',
            botPermissions: ['embedLinks']
        })
    }
    async run (ctx) {
        const i = ctx.interaction.data.options[0]

        switch (i.name) {
            case 'info': {
                const embed = new Embed()
                .setTitle(ctx.guild.name)
                .setDescription(ctx.guild.description ?? '')
                .addField(this.locale.get('commands.guildinfo.embed.field1'), `\`${ctx.guild.id}\``, true)
                .addField(this.locale.get('commands.guildinfo.embed.field2'), `\`${this.client.users.get(ctx.guild.ownerID).username}\``, true)
                .addField(this.locale.get('commands.guildinfo.embed.field3'), `<t:${parseInt(ctx.guild.createdAt / 1000)}:F>`)
                .addField('Emojis', ctx.guild.emojis.length, true)
                .addField(this.locale.get('commands.guildinfo.embed.field5', { size: ctx.guild.channels.size }), this.locale.get('commands.guildinfo.embed.field5_value', {
                    text: ctx.guild.channels.filter(ch => ch.type === 0).length,
                    voice: ctx.guild.channels.filter(ch => ch.type === 2).length,
                    stage: ctx.guild.channels.filter(ch => ch.type === 13).length
                }), true)
                .addField(this.locale.get('commands.guildinfo.embed.field6'), ctx.guild.members.size, true)
                .setThumbnail(ctx.guild.iconURL)
                .setImage(ctx.guild.splashURL)

                ctx.reply(embed.build())
            }
        }
    }
}