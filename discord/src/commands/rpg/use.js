const { User } = require('../../../../database')
const { Command } = require('../../structures')

module.exports = class UseCommand extends Command {
    constructor() {
        super({
            name: 'use',
            aliases: ['usar', 'utilizar'],
            description: 'Use an item that is in your inventory',
            syntax: 'use [item]',
            examples: [
                'use glock',
                'use m4a1',
            ],
            category: 'RPG',
        })
    }
    async run (message) {
        const user = await User.findById(message.author.id)
        const item = message.args.join(' ')

        if (!item) return message.reply('helper.invalid_arg', { try: `${message.guild.db.prefix}use [item]` })

        const weaponInInventory = user?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0]
        const foodInInventory = user?.inventory?.foods?.filter(food => food.food === item)[0]

        if (!['pizza', 'hamburger', 'water'].includes(item) && !weaponInInventory) {
            message.reply('commands.sell.missing_item')
        }
        else if (['pizza', 'hamburger', 'water'].includes(item) && !foodInInventory) {
            message.reply('commands.sell.missing_item')
        }
        else if (!['pizza', 'hamburger', 'water'].includes(item) && weaponInInventory) {
            const functions = {
                '9mm': function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                pt100: function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                glock: function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                'mt-40': function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                uzi: function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                mp5: function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                ump: function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                'carabina ct-40': function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                'carabina 556': function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                parafal: function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                m4a1: function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                'ak-9': function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                'ak-47': function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                akm: function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                },
                scar: function () {
                    var weapons = user.inventory.weapons
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0]
                    var index = weapons.indexOf(weapon)
                    weapons.splice(index, 1)
                    user.inventory.weapons = weapons
                    user.usingWeapon = { ...weapon }
                    user.save()
                    message.reply('commands.use.using')
                }
            }
            if (!functions[item]) return message.reply('commands.sell.missing_item')
            const execute = functions[item]
            execute()
        }
        else if (['pizza', 'hamburger', 'water'].includes(item) && foodInInventory) {
            const functions = {
                pizza: function () {
                    user.energy += 8000
                    if (user.energy > 2000) user.energy = 2000
                    var foods = user.inventory.foods
                    var food = user.inventory.foods.filter(food => food.food === item)[0]
                    var index = foods.indexOf(food)
                    foods.splice(index, 1)
                    user.inventory.foods = foods
                    user.save()
                    message.reply('commands.use.restore_energy', { percentual: 40 })
                },
                hamburger: function () {
                    user.energy += 7000
                    if (user.energy > 2000) user.energy = 2000
                    var foods = user.inventory.foods
                    var food = user.inventory.foods.filter(food => food.food === item)[0]
                    var index = foods.indexOf(food)
                    foods.splice(index, 1)
                    user.inventory.foods = foods
                    user.save()
                    message.reply('commands.use.restore_energy', { percentual: 35 })
                },
                water: function () {
                    user.energy += 2000
                    if (user.energy > 2000) user.energy = 2000
                    var foods = user.inventory.foods
                    var food = user.inventory.foods.filter(food => food.food === item)[0]
                    var index = foods.indexOf(food)
                    foods.splice(index, 1)
                    user.inventory.foods = foods
                    user.save()
                    message.reply('commands.use.restore_energy', { percentual: 10 })
                }
            }
            if (!functions[item]) return message.reply('commands.sell.missing_item')
            const execute = functions[item]
            execute()
        }
    }
}