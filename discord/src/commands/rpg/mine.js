const { Command } = require('../../structures')
const { User } = require('../../../../database')

module.exports = class MineCommand extends Command {
    constructor() {
        super({
            name: 'mine',
            aliases: ['minerar'],
            description: 'Mine ores and get granex',
            category: 'RPG',
        })
    }
    async run (message) {
        const user = await User.findById(message.author.id)

        if (user.mineTime > Date.now()) {
            message.reply('commands.mine.has_been_mined', { remaining: parseInt(user.mineTime / 1000) })
        }
        else {
            var ores = [
                'diamond',
                'platinum',
                'gold',
                'ruby',
                'iron',
                'copper'
            ]
            var percentual = Math.floor(Math.random() * (500 - 1) + 1)
            var index
            
            if (percentual >= 95) index = 5
            else if (percentual >= 85) index = 4
            else if (percentual >= 70) index = 3
            else if (percentual >= 50) index = 2
            else if (percentual >= 30) index = 1
            else if (percentual >= 10) index = 0

            let ore = ores[index ?? 5]
            let g = Math.floor(Math.random() * 500) + 1

            user.ores[ore] += g
            user.mineTime = Date.now() + 1.728e+8
            user.energy -= 500
            user.exp += Math.floor(Math.random() * 450) + 1

            if (user.energy < 1) user.deadAt = Date.now() + 3.6e+6
            if (user.exp > user.xpRequired) {
                user.level += 1
                user.xpRequired += 136
                user.exp = 0
                message.channel.createMessage(this.locale.get('helper.level_up', { level: user.level }))
            }

            user.save()

            message.reply('commands.mine.congrats', 
                {
                    g,
                    ore
                }
            )
        }
    }
}