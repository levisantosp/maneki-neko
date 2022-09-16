const { Command, Embed } = require('../../structures')

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
        })
    }
    async run (message) {
        const user = await this.getUser(message.args[0] ?? message.author.mention)
        const member = this.getMember(user.mention)
        if (member) {
            const embed = new Embed()
            embed.setTitle(member.nick ? member.nick : member.username)
            embed.setColor('0x7289DA')
            embed.addField(this.locale.get('commands.userinfo.tag'), `\`${member.username}#${member.discriminator}\``, true)
            embed.addField(this.locale.get('commands.userinfo.id'), `\`${member.id}\``, true)
            embed.addField(this.locale.get('commands.userinfo.created_at'), `<t:${parseInt(member.createdAt / 1000)}:F> <t:${parseInt(member.createdAt / 1000)}:R>`, true)
            embed.addField(this.locale.get('commands.userinfo.joinedAt'), `<t:${parseInt(member.joinedAt / 1000)}:F> <t:${parseInt(member.joinedAt / 1000)}:R>`, true)
            embed.setThumbnail(member.avatarURL)
            message.reply(embed.build())
        }
        else {
            const embed = new Embed()
            embed.setTitle(user.username)
            embed.setColor('0x7289DA')
            embed.addField(this.locale.get('commands.userinfo.tag'), `\`${user.username}#${user.discriminator}\``, true)
            embed.addField(this.locale.get('commands.userinfo.id'), `\`${user.id}\``, true)
            embed.addField(this.locale.get('commands.userinfo.created_at'), `<t:${parseInt(user.createdAt / 1000)}:F> <t:${parseInt(user.createdAt / 1000)}:R>`, true)
            embed.setThumbnail(user.avatarURL)
            message.reply(embed.build())
        }
    }
}