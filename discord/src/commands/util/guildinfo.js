const {Command, Embed} = require('../../structures');
const {Constants} = require('eris');

module.exports = class GuildInfoCommand extends Command {
    constructor() {
        super({
            name: 'guildinfo',
            aliases: ['serverinfo'],
            description: 'View a guild\'s information',
            category: 'util',
            botPermissions: ['embedLinks']
        });
    }
    async run(message) {
        var guild = await this.client.getRESTGuild(message.args[0] ?? message.guild.id);
        if(!guild) guild = message.guild;
        const embed = new Embed();
        embed.setTitle(guild.name);
        embed.setDescription(guild.description ?? '');
        embed.setColor('0x7289DA');
        embed.addField(this._locale.get('guildId'), `\`${guild.id}\``, true);
        embed.addField(this._locale.get('guildOwner'), `\`${this.client.users.get(guild.ownerID).username}\``, true);
        embed.addField(this._locale.get('guildCreatedAt'), `<t:${parseInt(guild.createdAt/1000)}:F>`);
        embed.addField('Emojis', guild.emojis.length, true);
        embed.addField(this._locale.get('channels', {size: guild.channels.size}), this._locale.get('typeChannelsSize', {
            text: guild.channels.filter(ch => ch.type === Constants.ChannelTypes.GUILD_TEXT).length,
            voice: guild.channels.filter(ch => ch.type === Constants.ChannelTypes.GUILD_VOICE).length,
            stage: guild.channels.filter(ch => ch.type === Constants.ChannelTypes.GUILD_STAGE_VOICE).length
        }), true);
        embed.addField(this._locale.get('guildMembers'), guild.members.size, true);
        embed.setThumbnail(guild.iconURL);
        embed.setImage(guild.splashURL);
        message.reply(embed.build());
    }
}