const { Command, Embed } = require('../../../structures')
const { Guild, User } = require('../../../../../database')
//const emoji = require('../../../util/emojis')

module.exports = class ConfigCommand extends Command {
    constructor() {
        super({
            name: 'config',
            description: 'Configure me so I that work correctly',
            description_localizations: {
                'pt-BR': 'Me configure para que eu possa funcionar corretamente'
            },
            syntax: 'config allowed_channels/announcements',
            options: [
                {
                    type: 1,
                    name: 'allowed_channels',
                    name_localizations: {
                        'pt-BR': 'canais_permitidos'
                    },
                    description: 'Configure the channel that my commands can be executable',
                    description_localizations: {
                        'pt-BR': 'Configure o canal em que meus comandos possam ser executáveis'
                    },
                    options: [
                        {
                            type: 7,
                            name: 'channel',
                            name_localizations: {
                                'pt-BR': 'canal'
                            },
                            description: 'Enter the channel',
                            description_localizations: {
                                'pt-BR': 'Insira o canal'
                            },
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: 'announcements',
                    name_localizations: {
                        'pt-BR': 'anúncios'
                    },
                    description: 'Configure the channel I will do announcements',
                    description_localizations: {
                        'pt-BR': 'Configure o canal que eu farei anúncios'
                    },
                    options: [
                        {
                            type: 7,
                            name: 'channel',
                            name_localizations: {
                                'pt-BR': 'canal'
                            },
                            description: 'Enter the channel',
                            description_localizations: {
                                'pt-BR': 'Insira o canal'
                            },
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: 'list',
                    name_localizations: {
                        'pt-BR': 'lista'
                    },
                    description: 'View the configured channels list',
                    description_localizations: {
                        'pt-BR': 'Veja a lista de canais configurados'
                    }
                },
                {
                    type: 1,
                    name: 'language',
                    name_localizations: {
                        'pt-BR': 'idioma'
                    },
                    description: 'Change the language that a interact on this server',
                    description_localizations: {
                        'pt-BR': 'Altere o idioma que eu interajo no servidor'
                    },
                    options: [
                        {
                            type: 3,
                            name: 'choose',
                            description: 'Select the language',
                            description_localizations: {
                                'pt-BR': 'Selecione o idioma'
                            },
                            name_localizations: {
                                'pt-BR': 'escolha'
                            },
                            choices: [
                                {
                                    name: 'Português Brasileiro',
                                    value: 'pt'
                                },
                                {
                                    name: 'American English',
                                    value: 'en'
                                }
                            ],
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: 'remove_channel',
                    name_localizations: {
                        'pt-BR': 'remover_canal'
                    },
                    description: 'Remove a channel from list of allowed channels commands',
                    description_localizations: {
                        'pt-BR': 'Remove um canal da lista de canais permitidos comandos'
                    },
                    options: [
                        {
                            type: 7,
                            name: 'channel',
                            name_localizations: {
                                'pt-BR': 'canal'
                            },
                            description: 'Enter the channel',
                            description_localizations: {
                                'pt-BR': 'Insira o canal'
                            },
                            required: true
                        }
                    ]
                },
                {
                    type: 2,
                    name: 'add',
                    name_localizations: {
                        'pt-BR': 'adicionar'
                    },
                    description: 'Adds a player as policeman or fireman',
                    description_localizations: {
                        'pt-BR': 'Adiciona um jogador como um policial ou bombeiro'
                    },
                    options: [
                        {
                            type: 1,
                            name: 'policeman',
                            name_localizations: {
                                'pt-BR': 'policial'
                            },
                            description: 'Adds a player as a policeman',
                            description_localizations: {
                                'pt-BR': 'Adiciona um jogador como policial'
                            },
                            options: [
                                {
                                    type: 6,
                                    name: 'player',
                                    name_localizations: {
                                        'pt-BR': 'jogador'
                                    },
                                    description: 'Enter the player',
                                    description_localizations: {
                                        'pt-BR': 'Insira o jogador'
                                    },
                                    required: true
                                }
                            ]
                        },
                        {
                            type: 1,
                            name: 'fireman',
                            name_localizations: {
                                'pt-BR': 'bombeiro'
                            },
                            description: 'Adds a player as a fireman',
                            description_localizations: {
                                'pt-BR': 'Adiciona um jogador como bombeiro'
                            },
                            options: [
                                {
                                    type: 6,
                                    name: 'player',
                                    name_localizations: {
                                        'pt-BR': 'jogador'
                                    },
                                    description: 'Enter the player',
                                    description_localizations: {
                                        'pt-BR': 'Insira o jogador'
                                    },
                                    required: true
                                }
                            ]
                        }
                    ]
                }
            ],
            examples: [
                'config allowed_channels [channel]',
                'config allowed_channels list',
                'config announcements [channel]'
            ],
            category: 'config',
            permissions: ['manageGuild']
        })
    }
    async run (ctx) {
        const guild = await Guild.findById(ctx.guild.id)
        const option = ctx.interaction.data.options[0].name
        const { options } = ctx.interaction.data.options[0]

        switch (option) {
            case 'announcements': {
                guild.announcements = options[0].value
                guild.save()

                ctx.reply('commands.config.announcement_channel', { channel: `<#${options[0].value}>` })
            }
            break
            case 'allowed_channels': {
                switch (ctx.db.guild.plan) {
                    case 'bronze': {
                        if (guild.allowedChannels.length >= 6) return ctx.reply('commands.config.limit_channels', { limit: 6 })
                        if (guild.allowedChannels.includes(options[0].value)) return ctx.reply('commands.config.channel_already_exists')

                        guild.allowedChannels.push(options[0].value)
                        guild.save()

                        ctx.reply('commands.config.allowed_channels_set', { channel: `<#${options[0].value}>` })
                    }
                    break
                    case 'silver': {
                        if (guild.allowedChannels.length >= 9) return ctx.reply('commands.config.limit_channels', { limit: 9 })
                        if (guild.allowedChannels.includes(options[0].value)) return ctx.reply('commands.config.channel_already_exists')

                        guild.allowedChannels.push(options[0].value)
                        guild.save()

                        ctx.reply('commands.config.allowed_channels_set', { channel: `<#${options[0].value}>` })
                    }
                    break
                    case 'gold': {
                        if (guild.allowedChannels.length >= 12) return ctx.reply('commands.config.limit_channels', { limit: 12 })
                        if (guild.allowedChannels.includes(options[0].value)) return ctx.reply('commands.config.channel_already_exists')

                        guild.allowedChannels.push(options[0].value)
                        guild.save()

                        ctx.reply('commands.config.allowed_channels_set', { channel: `<#${options[0].value}>` })
                    }
                    break
                    default: {
                        if (guild.allowedChannels.length >= 3) return ctx.reply('commands.config.limit_channels', { limit: 3 })
                        if (guild.allowedChannels.includes(options[0].value)) return ctx.reply('commands.config.channel_already_exists')

                        guild.allowedChannels.push(options[0].value)
                        guild.save()

                        ctx.reply('commands.config.allowed_channels_set', { channel: `<#${options[0].value}>` })
                    }
                }
            }
            break
            case 'list': {
                const embed = new Embed()
                .setTitle(this.locale.get('commands.config.embed.title'))
                .setDescription(guild.allowedChannels.map(channelId => `> <#${channelId}>`).join('\n'))

                ctx.reply(embed.build())
            }
            break
            case 'language': {
                guild.lang = options[0].value
                
                switch (options[0].value) {
                    case 'pt': {
                        ctx.reply('Agora eu irei falar em Português Brasileiro neste servidor. Aqui é o Brasil!')
                    }
                    break
                    default: {
                        ctx.reply('Now I will speak in english on this server. This is america!')
                    }
                }

                guild.save()
            }
            break
            case 'remove_channel': {
                if (!guild.allowedChannels.includes(options[0].value)) return ctx.reply('commands.config.channel_not_exists')

                var index = guild.allowedChannels.indexOf(options[0].value)
                guild.allowedChannels.splice(index, 1)
                guild.save()

                ctx.reply('commands.config.channel_removed')
            }
            break
            case 'add': {
                switch (options[0].name) {
                    case 'fireman': {
                        const arrayRoles = []
                        ctx.guild.roles.forEach(role => {
                            if (role.name === 'ManekiColonel') arrayRoles.push({ name: role.name, id: role.id })
                        })
                
                        if (!ctx.interaction.member.permissions.has('banMembers') && !arrayRoles[0]) return
                        if (arrayRoles[0] && !ctx.interaction.member.roles.includes(arrayRoles[0].id)) return
                
                        const member = this.getMember(options[0].options[0].value)
                        if (!member || member.id === ctx.interaction.member.id) return ctx.reply('helper.invalid_user')

                        const guild = await Guild.findById(ctx.guild.id)
                        const user = await User.findById(member.id)
                        
                        if (!user?.certificates?.includes('fireman')) return ctx.reply('commands.addfireman.not_a_fireman')
                        if (guild.firemans.includes(member.id)) {
                            var emoji = await this.client.getRESTGuildEmoji('786013941364424704', '869391072051216425')
                            return ctx.reply(emoji.name)
                        }
                
                        var firemanSize
                        if (guild.level < 10) firemanSize = 10
                        else if (guild.level < 20 && guild.level > 10) firemanSize = 20
                        else if (guild.level < 30 && guild.level > 20) firemanSize = 30
                        else if (guild.level < 40 && guild.level > 30) firemanSize = 40
                        else if (guild.level < 50 && guild.level > 40) firemanSize = 50
                        else if (guild.firemans.length >= firemanSize) return ctx.reply('commands.addfireman.too_much_fireman')

                        guild.firemans.push(member.id)
                        user.job = 'fireman'
                        user.save()
                        guild.save()

                        ctx.reply('commands.addfireman.added', { user: member.mention })
                    }
                    break
                    case 'policeman': {
                        const arrayRoles = []
                        ctx.guild.roles.forEach(role => {
                            if (role.name === 'ManekiSheriff') arrayRoles.push({ name: role.name, id: role.id })
                        })
                
                        if (!ctx.interaction.member.permissions.has('banMembers') && !arrayRoles[0]) return
                        if (arrayRoles[0] && !ctx.interaction.member.roles.includes(arrayRoles[0].id)) return
                
                        const member = this.getMember(options[0].options[0].value)
                        if (!member || member.id === ctx.interaction.member.id) return ctx.reply('helper.invalid_user')

                        const guild = await Guild.findById(ctx.guild.id)
                        const user = await User.findById(member.id)
                        
                        if (!user?.certificates?.includes('police')) return ctx.reply('commands.addpolice.not_a_police')
                        if (guild.polices.includes(member.id)) {
                            var emoji = await this.client.getRESTGuildEmoji('786013941364424704', '869391072051216425')
                            return ctx.reply(emoji.name)
                        }
                
                        var firemanSize
                        if (guild.level < 10) firemanSize = 10
                        else if (guild.level < 20 && guild.level > 10) firemanSize = 20
                        else if (guild.level < 30 && guild.level > 20) firemanSize = 30
                        else if (guild.level < 40 && guild.level > 30) firemanSize = 40
                        else if (guild.level < 50 && guild.level > 40) firemanSize = 50
                        else if (guild.firemans.length >= firemanSize) return ctx.reply('commands.addpolice.too_much_fireman')

                        guild.polices.push(member.id)
                        user.job = 'police'
                        user.save()
                        guild.save()

                        ctx.reply('commands.addpolice.added', { user: member.mention })
                    }
                }
            }
        }
    }
}