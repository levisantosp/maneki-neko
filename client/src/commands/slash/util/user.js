const { ComponentInteraction } = require('eris')
const { Command, Embed, Button } = require('../../../structures')

module.exports = class UserCommand extends Command {
    constructor() {
        super({
            name: 'user',
            description: 'View the user\'s avatar, banner and info',
            description_localizations: {
                'pt-BR': 'Veja o avatar, banner e informações de um usuário'
            },
            options: [
                {
                    type: 1,
                    name: 'avatar',
                    description: 'View the user avatar',
                    description_localizations: {
                        'pt-BR': 'Veja o avatar do usuário'
                    },
                    options: [
                        {
                            type: 6,
                            name: 'user',
                            description: 'Enter the user',
                            description_localizations: {
                                'pt-BR': 'Insira o usuário'
                            }
                        }
                    ]
                },
                {
                    type: 1,
                    name: 'info',
                    description: 'View the user info',
                    description_localizations: {
                        'pt-BR': 'Veja as informações de um usuário'
                    },
                    options: [
                        {
                            type: 6,
                            name: 'user',
                            description: 'Enter the user',
                            description_localizations: {
                                'pt-BR': 'Insira o usuário'
                            }
                        }
                    ]
                }
            ],
            category: 'util',
            botPermissions: ['embedLinks']
        })
    }
    async run (ctx) {
        const i = ctx.interaction.data.options[0]

        if (!i.options[0]) i.options.push({
            value: ctx.interaction.member.id
        })

        const user = await this.client.getRESTUser(i.options[0].value)

        switch (i.name) {
            case 'avatar': {
                const embed = new Embed()
                    .setTitle(user.username)
                    .setImage(user.avatarURL)

                const button = new Button()
                    .setStyle('LINK')
                    .setLabel('Download')
                    .setURL(user.avatarURL)

                ctx.reply({
                    embed,
                    components: [
                        {
                            type: 1,
                            components: [button]
                        }
                    ]
                })
            }
                break
            case 'info': {
                const member = ctx.guild.members.get(user.id)
                const embed = new Embed()

                if (member) {
                    embed.setTitle(member.nick ? member.nick : member.username)
                    embed.addField(this.locale.get('commands.userinfo.tag'), `\`${member.username}#${member.discriminator}\``, true)
                    embed.addField(this.locale.get('commands.userinfo.id'), `\`${member.id}\``, true)
                    embed.addField(this.locale.get('commands.userinfo.created_at'), `<t:${parseInt(member.createdAt / 1000)}:F> <t:${parseInt(member.createdAt / 1000)}:R>`, true)
                    embed.addField(this.locale.get('commands.userinfo.joinedAt'), `<t:${parseInt(member.joinedAt / 1000)}:F> <t:${parseInt(member.joinedAt / 1000)}:R>`, true)
                    embed.setThumbnail(member.avatarURL)

                    const avatar = new Button()
                        .setStyle('GRAY')
                        .setLabel(this.locale.get('Avatar'))
                        .setCustomID('avatar')

                    const globalAvatar = new Button()
                        .setStyle('GRAY')
                        .setLabel(this.locale.get('Avatar Global'))
                        .setCustomID('global-avatar')

                    var msg = await ctx.reply({
                        embed,
                        components: [
                            {
                                type: 1,
                                components: [avatar, globalAvatar]
                            }
                        ]
                    })

                    const collect = async interaction => {
                        if (interaction instanceof ComponentInteraction) {
                            if (interaction.channel.id !== ctx.interaction.channel.id) return
                            if (interaction.message.id !== msg.id) return

                            await interaction.defer(64)

                            switch (interaction.data.custom_id) {
                                case 'avatar': {
                                    interaction.createMessage(
                                        {
                                            embed: new Embed()
                                                .setTitle(member.nick ? member.nick : member.username)
                                                .setImage(member.avatarURL),
                                            components: [
                                                {
                                                    type: 1,
                                                    components: [
                                                        new Button()
                                                        .setStyle('LINK')
                                                        .setLabel('Download')
                                                        .setURL(member.avatarURL)
                                                    ]
                                                }
                                            ]
                                        }
                                    )
                                }
                                break
                                case 'global-avatar': {
                                    interaction.createMessage(
                                        {
                                            embed: new Embed()
                                                .setTitle(user.username)
                                                .setImage(user.avatarURL),
                                            components: [
                                                {
                                                    type: 1,
                                                    components: [
                                                        new Button()
                                                        .setStyle('LINK')
                                                        .setLabel('Download')
                                                        .setURL(member.avatarURL)
                                                    ]
                                                }
                                            ]
                                        }
                                    )
                                }
                            }
                        }
                    }

                    this.client.on('interactionCreate', collect)
                    setTimeout(() => { this.client.removeListener('interactionCreate', collect) }, 1.8e+6)
                }
                else {
                    embed.setTitle(user.username)
                    embed.addField(this.locale.get('commands.userinfo.tag'), `\`${user.username}#${user.discriminator}\``, true)
                    embed.addField(this.locale.get('commands.userinfo.id'), `\`${user.id}\``, true)
                    embed.addField(this.locale.get('commands.userinfo.created_at'), `<t:${parseInt(user.createdAt / 1000)}:F> <t:${parseInt(user.createdAt / 1000)}:R>`, true)
                    embed.setThumbnail(user.avatarURL)

                    ctx.reply(embed.build())
                }
            }
        }
    }
}