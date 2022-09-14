const { User } = require('../../../../database')
const { Command } = require('../../structures')

module.exports = class FarmCommand extends Command {
    constructor() {
        super({
            name: 'farm',
            aliases: ['fazenda', 'ranch', 'rancho'],
            description: '_ _',
            syntax: 'farm plant lettuce/carrot/tomato',
            examples: [
                'farm plant lettuce',
                'farm plant carrot',
                'farm plant tomato'
            ],
            category: 'RPG'
        })
    }
    async run (message) {
        const user = await User.findById(message.author.id)
        const farm = user?.farms?.filter(farm => farm?.id === message.guild.id)[0]
        if (!farm) return message.reply('commands.farm.no_farm')
        if (!message.args[0]) return message.reply('helper.invalid_arg', { try: `${message.guild.db.prefix}farm ${['plant'].map(i => i).join('/')}` })
        const item = message.args[1]
        const functions = {
            plant: function () {
                const hasPlant = user.inventory.plants.filter(plant => plant === item)[0]
                if (!hasPlant) return message.reply('commands.farm.no_plant')
                var index = user.farms.indexOf(farm)
                farm.plants.push(item)
                user.farms.splice(index, 1)
                user.farms.push(farm)
                user.inventory.plants.splice(user.inventory.plants.indexOf(item), 1)
                user.energy -= 980
                if (user.energy < 1) user.deadAt = Date.now() + 3.6e+6
                user.save()
                message.reply('commands.farm.successfully_planted')
            }
        }
        if (!functions[message.args[0]]) return message.reply('helper.invalid_arg', { try: `${message.guild.db.prefix}farm ${['plant'].map(i => i).join('/')} [item] [quantity]` })
        const execute = functions[message.args[0]]
        execute()
    }
}