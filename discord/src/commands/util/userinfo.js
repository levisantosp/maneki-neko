const {Command, Embed} = require('../../structures');

module.exports = class UserInfoCommand extends Command {
    constructor() {
        super({
            name: 'userinfo',
            descrption: 'View a user\'s information',
            category: 'util',
            syntax: 'userinfo <user>',
            examples: [
                'userinfo',
                'userinfo 721384921679265833'
            ],
            botPermissions: ['embedLinks']
        });
    }
    async run(message) {
        const user = await this.getUser(message.args[0] ?? message.author.mention);
        const member = this.getMember(user.mention);
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