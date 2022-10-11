const { Command, Embed } = require('../../../structures')
const { Guild } = require('../../../../../database')

module.exports = class ConfigCommand extends Command {
    constructor() {
        super({
            name: 'config',
            aliases: ['configuration', 'configurar'],
            description: 'Configure me so I that work correctly',
            syntax: 'config allowed_channels/announcements',
            examples: [
                'config allowed_channels [channel]',
                'config allowed_channels list',
                'config announcements [channel]'
            ],
            category: 'config',
            permissions: ['manageGuild']
        })
    }
    async run (message) {
        const guild = await Guild.findById(message.guild.id)
        switch (message.args[0]) {
            case 'allowed_channels':
                if (message.args[1]?.toLowerCase() === 'list') {
                    const embed = new Embed()
                    embed.setTitle(this.locale.get('commands.config.embed.title'))
                    embed.setDescription(guild.allowedChannels.map(channelId => `> <#${channelId}>`).join('\n'))
                    return message.reply(embed.build())
                }
                switch (message.guild.db.plan) {
                    case 'bronze':
                        if (message.guild.db.allowedChannels.length >= 6) return message.reply('commands.config.limit_channels', { limit: 6 })
                        var channel = message.guild.channels.get(message.channelMentions[0] || message.args[1])
                        if (!channel) return message.reply('commands.config.invalid_channel')
                        guild.allowedChannels.push(channel.id)
                        guild.allowedChannels = guild.allowedChannels
                        guild.save()
                        message.reply('commands.config.allowed_channels_set', { channel: channel.mention })
                        break
                    case 'silver':
                        if (message.guild.db.allowedChannels.length >= 9) return message.reply('commands.config.limit_channels', { limit: 9 })
                        var channel = message.guild.channels.get(message.channelMentions[0] || message.args[1])
                        if (!channel) return message.reply('commands.config.invalid_channel')
                        guild.allowedChannels.push(channel.id)
                        guild.allowedChannels = guild.allowedChannels
                        guild.save()
                        message.reply('commands.config.allowed_channels_set', { channel: channel.mention })
                        break
                    case 'gold':
                        if (message.guild.db.allowedChannels.length >= 12) return message.reply('commands.config.limit_channels', { limit: 12 })
                        var channel = message.guild.channels.get(message.channelMentions[0] || message.args[1])
                        if (!channel) return message.reply('commands.config.invalid_channel')
                        guild.allowedChannels.push(channel.id)
                        guild.allowedChannels = guild.allowedChannels
                        guild.save()
                        message.reply('commands.config.allowed_channels_set', { channel: channel.mention })
                        break
                    default:
                        if (message.guild.db.allowedChannels.length >= 3) return message.reply('commands.config.limit_channels', { limit: 3 })
                        var channel = message.guild.channels.get(message.channelMentions[0] || message.args[1])
                        if (!channel) return message.reply('commands.config.invalid_channel')
                        guild.allowedChannels.push(channel.id)
                        guild.allowedChannels = guild.allowedChannels
                        guild.save()
                        message.reply('commands.config.allowed_channels_set', { channel: channel.mention })
                }
                break
            case 'announcements':
                var channel = message.guild.channels.get(message.channelMentions[0] || message.args[1])
                if (!channel) return message.reply('commands.config.invalid_channel')
                guild.announcements = channel.id
                guild.save()
                message.reply('commands.config.announcement_channel', { channel: channel.mention })
                break
            default: message.reply('helper.invalid_arg', { try: `${guild.prefix}config ${['allowed_channels', 'announcements'].map(args => args).join('/')} list/<channel>` })
        }
    }
}