const { Command, Embed } = require('../../structures')
const { User } = require('../../../../database')

module.exports = class RankCommand extends Command {
    constructor() {
        super({
            name: 'rank',
            aliases: ['ranking', 'top'],
            description: 'View the top granex',
            category: 'social',
            syntax: 'rank <page>',
            examples: [
                'rank',
                'rank 2',
                'rank 5',
                'rank 10'
            ],
            botPermissions: ['embedLinks']
        })
    }
    async run (message) {
        const users = await User.find({ granex: { $gt: 0 } })
        
        if (message.args[0] === '1' || !message.args[0]) users.sort((a, b) => b.granex - a.granex).slice(0, 10)
        else users.sort((a, b) => b.granex - a.granex).slice(message.args[0] * 10 - 10, message.args[0] * 10)

        const embed = new Embed()
        embed.setTitle(this.locale.get('commands.rank.embed.title', { top: message.args[0] ? message.args[0] * 10 : 10 }))
        embed.setThumbnail((await this.client.getRESTUser(users[0].id)).avatarURL)

        var pos = users.findIndex(user => user.id === message.author.id) + 1
        embed.setFooter(this.locale.get('commands.rank.your_position', { pos }))

        var a = 1
        for (const user of users) {
            const u = this.client.users.get(user.id);
            if (u) embed.addField(`${a++}° ${u.username}#${u.discriminator}`, `${user.granex.toLocaleString(message.guild.db.lang === 'en' ? 'en-US' : 'pt-BR')} granex`)
        }
        message.reply(embed.build())
    }
}