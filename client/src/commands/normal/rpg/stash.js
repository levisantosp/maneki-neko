const {Command} = require('../../../structures')
const {User} = require('../../../../../database')

module.exports = class StashCommand extends Command {
    constructor() {
        super({
            name: 'stash',
            aliases: ['guardar'],
            description: 'Stash an item in your inventory',
            syntax: 'stash [item]',
            examples: [
                'stash glock',
                'stash m4a1'
            ],
            category: 'RPG'
        })
    }
    async run (message) {
        const user = await User.findById(message.author.id)
        const item = message.args.join(' ')

        if(!item) return message.reply('helper.invalid_arg', {try: `${message.guild.db.prefix}stash [item]`})
        if(user?.usingWeapon?.weapon !== item) return message.reply('commands.stash.missing_item')
        
        const functions = {
            '9mm': async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            pt100: async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            glock: async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            'mt-40': async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            uzi: async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            mp5: async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            ump: async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            'carabina ct-40': async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            'carabina 556': async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            parafal: async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            m4a1: async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            'ak-9': async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            'ak-47': async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            akm: async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            },
            scar: async function() {
                user.inventory.weapons.push(user.usingWeapon)
                user.save()
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                })
                message.reply('commands.stash.stashed')
            }
        }
        if(!functions[item]) return message.reply('commands.stash.missing_item')

        const execute = functions[item]
        execute()
    }
}