const { ComponentInteraction } = require('eris')
const { Command, Embed, Button } = require('../../../structures')

module.exports = class HelpCommand extends Command {
    constructor() {
        super({
            name: 'help',
            name_localizations: {
                'pt-BR': 'ajuda'
            },
            description: 'Shows my commands',
            description_localizations: {
                'pt-BR': 'Mostra meus comandos'
            },
            category: 'util',
            botPermissions: ['embedLinks']
        })
    }
    async run (ctx) {
        const embed = new Embed()
        .setTitle(this.locale.get('commands.help.embed.title'))
        .setDescription(this.locale.get('commands.help.embed.description', { usage: `${ctx.db.guild.prefix}help [cmd]`, support: process.env.SUPPORT_SERVER }))
        .setThumbnail(this.client.user.avatarURL)

        const categories = this.client.slashCommands.map(cmd => cmd.category).filter((x, y, z) => z.indexOf(x) === y)

        categories.forEach(category => {
            var commands = this.client.slashCommands.filter(cmd => cmd.category === category).sort((x, y) => x.name.localeCompare(y.name)).map(cmd => `\`/${cmd.name}\``).join(', ')

            switch (ctx.db.guild.lang) {
                case 'pt':
                    if (category === 'util') category = 'Utilitários'
                    if (category === 'economy') category = 'Economia'
                    if (category === 'misc') category = 'Miscelânea'
                    if (category === 'config') category = 'Configuração'
                    if (category === 'social') category = 'Social'
                    break
                default:
                    if (category === 'util') category = 'Utilities'
                    if (category === 'economy') category = 'Economy'
                    if (category === 'misc') category = 'Miscellaneous'
                    if (category === 'config') category = 'Setup'
                    if (category === 'social') category = 'Social'
            }

            const { length } = commands.split(' ')
            if (category) embed.addField(`${category} (${length})`, commands)
        })
        const button = new Button()
        .setStyle('LINK')
        .setLabel(this.locale.get('helper.community'))
        .setURL('https://discord.gg/7UeV8jFz6m')

        const normalCommands = new Button()
        .setStyle('BLUE')
        .setLabel('Normal')
        .setCustomID('normal')

        const slashCommands = new Button()
        .setStyle('GREEN')
        .setLabel('Slash')
        .setCustomID('slash')

        var msg = await ctx.reply(
            {
                components: [
                    {
                        type: 1,
                        components: [normalCommands, slashCommands.setDisabled(), button]
                    }
                ],
                embed
            }
        )

        const collect = async i => {
            if (i instanceof ComponentInteraction) {
                if (i.channel.id !== ctx.interaction.channel.id) return
                if (i.member.id !== ctx.interaction.member.id) return
                if (i.message.id !== msg.id) return

                await i.deferUpdate()

                switch (i.data.custom_id) {
                    case 'normal': {
                        const embed = new Embed()
                        .setTitle(this.locale.get('commands.help.embed.title'))
                        .setDescription(this.locale.get('commands.help.embed.description', { usage: `${ctx.db.guild.prefix}help [cmd]`, support: process.env.SUPPORT_SERVER }))
                        .setThumbnail(this.client.user.avatarURL)
                
                        const categories = this.client.commands.map(cmd => cmd.category).filter((x, y, z) => z.indexOf(x) === y)
                
                        categories.forEach(category => {
                            var commands = this.client.commands.filter(cmd => cmd.category === category).sort((x, y) => x.name.localeCompare(y.name)).map(cmd => `\`${ctx.db.guild.prefix}${cmd.name}\``).join(', ')
                
                            switch (ctx.db.guild.lang) {
                                case 'pt':
                                    if (category === 'util') category = 'Utilitários'
                                    if (category === 'economy') category = 'Economia'
                                    if (category === 'misc') category = 'Miscelânea'
                                    if (category === 'config') category = 'Configuração'
                                    if (category === 'social') category = 'Social'
                                    break
                                default:
                                    if (category === 'util') category = 'Utilities'
                                    if (category === 'economy') category = 'Economy'
                                    if (category === 'misc') category = 'Miscellaneous'
                                    if (category === 'config') category = 'Setup'
                                    if (category === 'social') category = 'Social'
                            }
                            
                            const { length } = commands.split(' ')
                            if (category) embed.addField(`${category} (${length})`, commands)
                        })

                        const button = new Button()
                        .setStyle('LINK')
                        .setLabel(this.locale.get('helper.community'))
                        .setURL('https://discord.gg/7UeV8jFz6m')
                
                        const normalCommands = new Button()
                        .setStyle('BLUE')
                        .setLabel('Normal')
                        .setCustomID('normal')
                
                        const slashCommands = new Button()
                        .setStyle('GREEN')
                        .setLabel('Slash')
                        .setCustomID('slash')

                        ctx.interaction.editOriginalMessage(
                            {
                                embed,
                                components: [
                                    {
                                        type: 1,
                                        components: [normalCommands.setDisabled(), slashCommands, button]
                                    }
                                ]
                            }
                        )
                    }
                    break
                    case 'slash': {
                        ctx.interaction.editOriginalMessage(
                            {
                                embed,
                                components: [
                                    {
                                        type: 1,
                                        components: [normalCommands, slashCommands.setDisabled(), button]
                                    }
                                ]
                            }
                        )
                    }
                }
            }
        }

        this.client.on('interactionCreate', collect)
        setInterval(() => { this.client.removeListener('interactionCreate', collect) }, 1.8e+6)
    }
}