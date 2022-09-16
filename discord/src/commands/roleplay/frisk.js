const { Command } = require('../../structures')
const { User } = require('../../../../database')

module.exports = class FriskCommand extends Command {
    constructor() {
        super({
            name: 'frisk',
            aliases: ['revistar'],
            description: 'Frisk a user',
            syntax: 'frisk [member]',
            examples: [
                'frisk @Levi_',
                'frisk 441932495693414410'
            ],
            category: 'Roleplay'
        })
    }
    async run (message) {
        const users = await User.find({ job: 'police' })

        for (const user of users) {
            if (user.id != message.author.id) continue

            const member = this.getMember(message.args[0])

            if (!member || member.id == message.member.id) return message.reply('helper.invalid_user')

            const frisked = await User.findById(member.id)

            if (!frisked) return message.reply('helper.user_is_not_in_database')
            if (frisked.usingWeapon.weapon && !frisked.hasGunLicense) {
                message.reply('commands.frisk.reply', { prefix: message.guild.db.prefix })
                return
            }

            message.reply('commands.frisk.reply2')
            
            user.exp += 210
            user.energy -= 150
            if (user.energy < 1) user.deadAt = Date.now() + 3.6e+6
            if (user.exp > user.xpRequired) {
                user.level += 1
                user.xpRequired += 136
                user.exp = 0
                message.channel.createMessage(this.locale.get('helper.level_up', { level: user.level }))
            }
            user.save()
        }
    }
}