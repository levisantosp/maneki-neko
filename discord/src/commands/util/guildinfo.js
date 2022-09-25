const { Command, Embed } = require('../../structures')
const { Constants } = require('eris')

module.exports = class GuildInfoCommand extends Command {
    constructor() {
        super({
            name: 'guildinfo',
            aliases: ['serverinfo'],
            description: 'View a guild\'s information',
            category: 'util',
            syntax: 'guildinfo <guild>',
            examples: [
                'guildinfo',
                'guildinfo 721384921679265833'
            ],
            botPermissions: ['embedLinks']
        })
    }
    async run (message) {
        var guild = this.client.guilds.get(message.args[0] ?? message.guild.id)
        if (!guild) guild = message.guild

        const embed = new Embed()
        embed.setTitle(guild.name)
        embed.setDescription(guild.description ?? '')
        embed.addField(this.locale.get('commands.guildinfo.embed.field1'), `\`${guild.id}\``, true)
        embed.addField(this.locale.get('commands.guildinfo.embed.field2'), `\`${this.client.users.get(guild.ownerID).username}\``, true)
        embed.addField(this.locale.get('commands.guildinfo.embed.field3'), `<t:${parseInt(guild.createdAt / 1000)}:F>`)
        embed.addField('Emojis', guild.emojis.length, true)
        embed.addField(this.locale.get('commands.guildinfo.embed.field5', { size: guild.channels.size }), this.locale.get('commands.guildinfo.embed.field5_value', {
            text: guild.channels.filter(ch => ch.type === Constants.ChannelTypes.GUILD_TEXT).length,
            voice: guild.channels.filter(ch => ch.type === Constants.ChannelTypes.GUILD_VOICE).length,
            stage: guild.channels.filter(ch => ch.type === Constants.ChannelTypes.GUILD_STAGE_VOICE).length
        }), true)
        embed.addField(this.locale.get('commands.guildinfo.embed.field6'), guild.members.size, true)
        embed.setThumbnail(guild.iconURL)
        embed.setImage(guild.splashURL)
        message.reply(embed.build())
    }
}