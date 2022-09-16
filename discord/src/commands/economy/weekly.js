const { Command } = require('../../structures')
const { User, Bank } = require('../../../../database')

module.exports = class WeeklyCommand extends Command {
    constructor() {
        super({
            name: 'weekly',
            aliases: ['semanal'],
            description: 'Get your weekly granex',
            category: 'economy'
        })
    }
    async run (message) {
        const user = await User.findById(message.author.id) || new User({ _id: message.author.id })
        const bank = await Bank.findById('bank')
        if (user.weeklyTime > Date.now()) {
            message.reply('commands.weekly.has_been_collected', { remaining: parseInt(user.weeklyTime / 1000) })
        }
        else {
            var granexGain = Math.floor(Math.random() * (3000 - 1500) + 1500)
            if (granexGain > bank.granex) return message.reply('helper.bank_doesnt_have_granex')
            bank.granex -= granexGain
            user.granex += granexGain
            user.weeklyTime = new Date().setHours(168, 0, 0, 0)
            bank.save()
            user.save()
            message.reply('commands.weekly.congrats', { granexGain })
        }
    }
}