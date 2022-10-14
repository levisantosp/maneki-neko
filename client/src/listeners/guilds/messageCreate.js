const { Listener, Button, Logger, Embed } = require('../../structures')
const { Constants, Message, ComponentInteraction } = require('eris')
const { Guild, User, Bank } = require('../../../../database')
const locale = require('../../../../locales')

module.exports = class MessageCreateListener extends Listener {
    constructor() {
        super({ name: 'messageCreate' })
    }
    async on (message) {
        if (message instanceof Message) {
            if (message.author.bot) return
            if (message.channel.type == Constants.ChannelTypes.DM) return

            const bank = await Bank.findById('bank') || new Bank({ _id: 'bank' })
            bank.save()

            const guild = await Guild.findById(message.guildID) || new Guild({ _id: message.guildID })
            const user = await User.findById(message.member.id)

            var prefix = process.env.PREFIX
            if (guild.prefix) prefix = guild.prefix

            switch (message.channel.parentID) {
                case '988470650781962260': guild.lang = 'pt'
                    break
                case '988470779773587526': guild.lang = 'en'
            }

            message.reply = function (content, options) {
                if (typeof content === 'string') {
                    return message.channel.createMessage({
                        content: locale.get(guild.lang, content, options),
                        messageReferenceID: message.id
                    })
                }
                else if (typeof content === 'object' && !options?.embeds || !options?.components) return message.channel.createMessage(Object.assign(content, { messageReferenceID: message.id }))
                else return message.channel.createMessage({
                    content: locale.get(guild.lang, content, options),
                    messageRefenceID: message.id,
                    components: options.components || [],
                    embeds: options.embeds || []
                })
            }
            message.replyF = function (content, options) {
                return message.channel.createMessage({
                    content: locale.get(guild.lang, content),
                    messageReferenceID: message.id
                }, {
                    file: options.file,
                    name: options.name
                })
            }
            message.replyC = function (content, options) {
                return message.channel.createMessage({
                    content: locale.get(guild.lang, content, options),
                    messageReferenceID: message.id,
                    components: options.components,
                    embeds: options.embeds || []
                })
            }
            if (message.content === `<@${this.client.user.id}>` || message.content === `<@!${this.client.user.id}>`) return message.reply('helper.mention_bot', { prefix: prefix })
            if (!message.content.toLowerCase().startsWith(prefix)) return

            var messageArray = message.content.split(' ')
            var command = messageArray.shift().toLowerCase()
            var args = messageArray.slice(0)
            var cmd = this.client.commands.get(command.slice(prefix.length)) || this.client.commands.get(this.client.aliases.get(command.slice(prefix.length)))

            if (!cmd) return
            if (user?.banned) return

            var g = this.client.guilds.get(message.guildID)
            message.args = args
            message.guild = {
                ...g,
                db: guild
            }
            message.guild.db.prefix = prefix

            if (guild.banned) return this.client.guilds.get(message.guild.id).leave()

            cmd.locale = {
                get: (content, options) => {
                    return locale.get(guild.lang, content, options)
                }
            }

            if (!user && ['RPG', 'Roleplay', 'economy'].includes(cmd.category) && cmd.name !== 'daily') return message.reply('helper.your_first_time', { prefix: guild.prefix })

            var client = message.guild.members.get(this.client.user.id)
            if (cmd.onlyOwner && message.author.id != process.env.OWNER_ID) return
            if (guild.allowedChannels[0] && !guild.allowedChannels.includes(message.channel.id) && !message.member.permissions.has('manageMessages')) return message.reply('helper.wrong_channel', { tryIn: guild.allowedChannels.map(channel => `<#${channel}>`).join(', ') })
            if (cmd.permissions[0] && !message.member.permissions.has(cmd.permissions)) return message.reply('helper.permissions.user', { permission: cmd.permissions })
            if (cmd.botPermissions[0] && !client.permissions.has(cmd.botPermissions[0]) || cmd.permissions[1] && !client.permissions.has(cmd.botPermissions[1])) return message.reply('helper.permissions.bot', { permission: cmd.botPermissions.map(perm => perm).join(', ') })
            if (['Roleplay', 'economy', 'RPG'].includes(cmd.category) && user?.energy < 1) {
                const button = new Button()
                button.setStyle('GREEN')
                button.setLabel(cmd.locale.get('helper.call'))
                button.setCustomID('call')

                var msg = await message.replyC('helper.you_are_dead', {
                    components: [{
                        type: 1,
                        components: [button]
                    }],
                    remaining: parseInt(user.deadAt / 1000)
                })

                this.client.on('interactionCreate', async interaction => {
                    var arrayMembers = []

                    if (interaction instanceof ComponentInteraction) {
                        if (interaction.data.custom_id != 'call') return
                        if (interaction.channel.id != message.channel.id) return
                        if (interaction.member.id != message.author.id) return
                        if (interaction.message.id != msg.id) return

                        await interaction.defer(64)

                        if (!guild.announcements) return interaction.createMessage(cmd.locale.get('helper.no_channel_announcements'))
                        if (user.granex < 5000) return interaction.createMessage(cmd.locale.get('helper.you_dont_have_granex'))

                        message.guild.members.forEach(member => {
                            if (guild.firemans.includes(member.id)) arrayMembers.push(member)
                        })

                        if (arrayMembers.length == 0) return interaction.createMessage(cmd.locale.get('helper.no_firemans'))

                        interaction.createMessage(cmd.locale.get('helper.fireman_on_the_way'))

                        const bank = await Bank.findById('bank')
                        bank.granex += 5000
                        user.granex -= 5000
                        bank.save()
                        user.save()

                        const channel = message.guild.channels.get(guild.announcements)
                        channel.createMessage(cmd.locale.get('helper.fireman_announcement', {
                            users: arrayMembers.map(x => x.mention).join(' '),
                            user: message.author.mention,
                            channel: message.channel.mention,
                            jumpLink: message.jumpLink
                        }))

                        button.setDisabled()
                        
                        msg.edit(
                            {
                                content: cmd.locale.get('helper.you_are_dead', { remaining: parseInt(user.deadAt / 1000) }),
                                components: [{
                                    type: 1,
                                    components: [button]
                                }]
                            }
                        )
                    }
                })
                return
            }
            else guild.save()

            cmd.getUser = async function (args) {
                try {
                    if (isNaN(args)) {
                        return await this.client.getRESTUser(args.replace(/[<@!>]/g, ''))
                    }
                    else return await this.client.getRESTUser(args)
                }
                catch (err) {
                    new Logger(this.client).error(err)
                }
            }
            cmd.getMember = function (args) {
                try {
                    if (isNaN(args)) {
                        return message.guild.members.get(args.replace(/[<@!>]/g, ''))
                    }
                    else return message.guild.members.get(args)
                }
                catch (err) {
                    new Logger(this.client).error(err)
                }
            }

            cmd.run (message).catch(err => {
                message.reply('helper.error', { error: err })
                new Logger(this.client).error(err)
            })

            if (['Roleplay', 'economy', 'social'].includes(cmd.category)) {
                const x = await Guild.findById(message.guild.id)
                x.exp += Math.floor(Math.random() * 100)
                if (x.exp > x.xpRequired) {
                    x.exp = 0
                    x.level += 1
                    x.xpRequired += 336
                    if (x.announcements) {
                        const channel = message.guild.channels.get(guild.announcements)
                        if (x.level.toString().endsWith('0')) channel.createMessage(cmd.locale.get('helper.guild_level_up', { level: x.level }))
                        else channel.createMessage(cmd.locale.get('helper.guild_level_up_2', { level: x.level }))
                    }
                }
                x.save()
            }

            const embed = new Embed()
            embed.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
            embed.setTitle('Novo Comando Executado')
            embed.setDescription(`O comando \`${cmd.name}\` foi executado em \`${message.guild.name}\``)
            embed.addField('ID do Servidor', `\`${message.guildID}\``)
            embed.addField('Dono do Servidor', `\`${message.guild.ownerID}\``)
            embed.addField('Autor da Mensagem', `\`${message.author.username}#${message.author.discriminator} (${message.author.id})\``)
            embed.addField('Conteúdo da Mensagem', message.content)
            embed.addField('Link da Mensagem', message.jumpLink)
            embed.setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png?size=4096`)
            const channels = await this.client.getRESTGuildChannels('721384921679265833')
            for (const channel of channels) {
                if (channel.id !== '989317710779416626') continue
                const webhooks = await channel.getWebhooks()
                var webhook = webhooks.filter(w => w.name === `${this.client.user.username} Tracker`)[0]
                if (!webhook) webhook = await channel.createWebhook({
                    name: `${this.client.user.username} Tracker`,
                    avatar: this.client.user.avatarURL
                })
                this.client.executeWebhook(webhook.id, webhook.token, {
                    embed,
                    avatarURL: this.client.user.avatarURL,
                    username: `${this.client.user.username} Tracker`
                })
            }
        }
    }
}