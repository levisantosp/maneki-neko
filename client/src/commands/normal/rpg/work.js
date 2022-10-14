const { Command } = require('../../../structures')
const { User, Bank } = require('../../../../../database')

module.exports = class WorkCommand extends Command {
    constructor() {
        super({
            name: 'work',
            aliases: ['trabalhar'],
            description: 'Work to earn granex and level up',
            category: 'RPG',
            botPermissions: ['embedLinks']
        })
    }
    async run (message) {
        const user = await User.findById(message.author.id)
        const bank = await Bank.findById('bank') || new Bank({ _id: 'bank' })

        if (!user?.job) return message.reply('commands.work.you_dont_have_job', { usage: `${message.guild.db.prefix}job` })
        if (user.workTime > Date.now()) {
            message.reply('commands.work.has_been_collected', { remaining: parseInt(user.workTime / 1000) })
        }
        else {
            var granexGain
            var xpGain
            switch (user.job) {
                case 'trashman':
                    granexGain = 575
                    xpGain = 120
                    break
                case 'newsagent':
                    granexGain = 600
                    xpGain = 170
                    break
                case 'ubereats':
                    granexGain = 650
                    xpGain = 310
                    break
                case 'uber':
                    granexGain = 800
                    xpGain = 420
                    break
                case 'tanker':
                    granexGain = 1200
                    xpGain = 530
                    break
                case 'trucker':
                    granexGain = 1400
                    xpGain = 640
                    break
                case 'postoffice':
                    granexGain = 1500
                    xpGain = 750
                    break
                case 'fireman':
                    granexGain = 2100
                    xpGain = 860
                    break
                case 'police':
                    granexGain = 2200
                    xpGain = 970
                    break
                case 'mafiaboss':
                    granexGain = 4600
                    xpGain = 1080
                    break
                case 'lawyer':
                    granexGain = 4900
                    xpGain = 1120
                    break
                case 'farmer':
                    granexGain = 5000
                    xpGain = 1230
            }
            if (granexGain > bank.granex) return message.reply('bank_doesnt_have_granex')
            bank.granex -= granexGain
            user.granex += granexGain
            user.exp += xpGain
            user.energy -= 657
            if (user.energy < 1) user.deadAt = Date.now() + 3.6e+6

            user.workTime = Date.now() + 3.6e+6
            message.reply('commands.work.congrats', { granexGain, xpGain, job: this.locale.get(`helper.jobs.${user.job}`) })

            if (user.exp > user.xpRequired) {
                user.level += 1
                user.xpRequired += 136
                user.exp = 0
                message.channel.createMessage(this.locale.get('helper.level_up', { level: user.level }))
            }

            user.save()
            bank.save()
        }
    }
}