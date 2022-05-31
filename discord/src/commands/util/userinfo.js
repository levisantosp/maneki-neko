const {Command, Embed} = require('../../structures');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'userinfo',
            descrption: 'View a user\'s information',
            category: 'util',
            botPermissions: ['embedLinks']
        });
    }
    async run(message) {
        var m = message.guild.members.get(message.args[0]);
        if(!message.mentions[0] && !m && !message.args[0]) message.mentions.push(message.member);
        else message.mentions.push(m);
        var member = message.guild.members.get(!message.mentions[0] ? '' : message.mentions[0].id);
        if(member) {
            const embed = new Embed();
            embed.setTitle(member.nick ? member.nick : member.username);
            embed.setColor('0x7289DA');
            embed.addField(this._locale.get('usertag'), `\`${member.username}#${member.discriminator}\``, true);
            embed.addField(this._locale.get('userid'), `\`${member.id}\``, true);
            embed.addField(this._locale.get('userCreatedAt'), `<t:${parseInt(member.createdAt/1000)}:F>`, true);
            embed.addField(this._locale.get('roles'), member.roles.map(roleId => `<@&${roleId}>`).join(', '));
            embed.setThumbnail(member.avatarURL);
            message.reply(embed.build());
        }
        else {
            const user = await this.client.getRESTUser(message.args[0]);
            const embed = new Embed();
            embed.setTitle(user.username);
            embed.setColor('0x7289DA');
            embed.addField(this._locale.get('usertag'), `\`${user.username}#${user.discriminator}\``, true);
            embed.addField(this._locale.get('userid'), `\`${user.id}\``, true);
            embed.addField(this._locale.get('userCreatedAt'), `<t:${parseInt(user.createdAt/1000)}:F>`, true);
            embed.setThumbnail(user.avatarURL);
            message.reply(embed.build());
        }
    }
}