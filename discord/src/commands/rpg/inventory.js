const { Command, Embed } = require('../../structures')
const { User } = require('../../../../database')

module.exports = class InventoryCommand extends Command {
    constructor() {
        super({
            name: 'inventory',
            aliases: ['inventário', 'inventario', 'inv'],
            description: 'View your inventory',
            category: 'Roleplay',
            botPermissions: ['embedLinks']
        })
    }
    async run(message) {
        const user = await User.findById(message.author.id)
        const embed = new Embed()
        embed.setTitle(this.locale.get('commands.inventory.embed.title'))

        if (user?.inventory?.foods[0]) embed.addField(this.locale.get('commands.inventory.embed.field1'), user?.inventory?.foods.map(food => food.food).join('\n'), true)
        if (user?.inventory.weapons[0]) embed.addField(this.locale.get('commands.inventory.embed.field2'), user?.inventory?.weapons.map(weapon => weapon.weapon).join('\n'), true)
        if (user?.usingWeapon?.weapon) embed.addField(this.locale.get('commands.inventory.embed.field3'), user?.usingWeapon?.weapon, true)
        if (
            user?.ores?.copper + user?.ores?.iron + user?.ores?.ruby + user?.ores?.gold + user?.ores.platinum + user?.ores?.diamond > 0
            ) embed.addField(this.locale.get('commands.inventory.embed.field4'), `Diamond: ${user.ores.diamond}g\n Platinum: ${user.ores.platinum}g\n Gold: ${user.ores.gold}g\n Ruby: ${user.ores.ruby}g\n Iron: ${user.ores.iron}g\n Copper: ${user.ores.copper}g`, true)
        if (!embed.fields[0]) embed.setDescription(this.locale.get('commands.inventory.embed.description'))

        message.reply(embed.build())
    }
}