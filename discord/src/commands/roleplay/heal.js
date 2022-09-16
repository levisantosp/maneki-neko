const { Command } = require('../../structures')
const { User, Bank } = require('../../../../database')

module.exports = class HealCommand extends Command {
    constructor() {
        super({
            name: 'heal',
            aliases: ['curar'],
            description: 'Heal or restore a user\'s life',
            syntax: 'heal [member]',
            category: 'Roleplay'
        })
    }
    async run (message) {
        const user = await User.findById(message.author.id)
        const bank = await Bank.findById('bank')

        if (user?.job !== 'fireman') return
        const member = this.getMember(message.args[0])
        if (!member || member.id === message.member.id) return message.reply('helper.invalid_user')
        const toUser = await User.findById(member.id)

        if (!toUser) return message.reply('helper.user_is_not_in_database')
        if (toUser.energy < 1) toUser.energy = 4000
        else toUser.energy = 20000

        toUser.save()
        user.granex += 5000 - (5000 * 0.1)
        bank.granex += 5000 * 0.1
        bank.save()
        
        message.reply('commands.heal.healed')

        user.exp += 250
        if (user.exp > user.xpRequired) {
            user.level += 1
            user.xpRequired += 136
            user.exp = 0
            message.channel.createMessage(this.locale.get('helper.level_up', { level: user.level }))
        }
        user.save()
    }
}