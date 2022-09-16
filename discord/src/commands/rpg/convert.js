const { Command } = require('../../structures')
const { User, Bank } = require('../../../../database')

module.exports = class ConvertCommand extends Command {
    constructor() {
        super({
            name: 'convert',
            aliases: ['converter'],
            description: 'Convert ores in granex',
            category: 'RPG',
            syntax: 'convert [ore] <amount>',
            examples: [
                'convert copper 20',
                'convert iron 500',
                'convert ruby 1000',
                'convert gold 30',
                'convert platinum 1',
                'convert diamond'
            ]
        })
    }
    async run (message) {
        const user = await User.findById(message.author.id)
        const bank = await Bank.findById('bank')

        const args = {
            copper: () => {
                if (!user?.ores.copper) return message.reply('commands.convert.dont_have')

                var amount = message.args[1] ?? user.ores.copper
                if (amount > user.ores.copper) return message.reply('commands.convert.dont_have_this_amount')

                var granexGain = 30
                granexGain *= amount

                let g = amount

                if (bank.granex < granexGain) return message.reply('helper.bank_doesnt_have_granex')

                bank.granex -= granexGain
                
                user.granex += granexGain
                user.ores.copper -= amount

                bank.save()
                user.save()

                message.reply('commands.convert.congrats',
                    {
                        ore: 'copper',
                        granexGain: granexGain.toLocaleString(message.guild.db.lang === 'en' ? 'en-US' : 'pt-BR'),
                        g
                    }
                )
            },
            iron: () => {
                if (!user?.ores.iron) return message.reply('commands.convert.dont_have')

                var amount = message.args[1] ?? user.ores.iron
                if (amount > user.ores.iron) return message.reply('commands.convert.dont_have_this_amount')

                var granexGain = 50
                granexGain *= amount

                let g = amount

                if (bank.granex < granexGain) return message.reply('helper.bank_doesnt_have_granex')

                bank.granex -= granexGain
                
                user.granex += granexGain
                user.ores.iron -= amount

                bank.save()
                user.save()

                message.reply('commands.convert.congrats',
                    {
                        ore: 'iron',
                        granexGain: granexGain.toLocaleString(message.guild.db.lang === 'en' ? 'en-US' : 'pt-BR'),
                        g
                    }
                )
            },
            ruby: () => {
                if (!user?.ores.ruby) return message.reply('commands.convert.dont_have')

                var amount = message.args[1] ?? user.ores.ruby
                if (amount > user.ores.ruby) return message.reply('commands.convert.dont_have_this_amount')

                var granexGain = 100
                granexGain *= amount

                let g = amount

                if (bank.granex < granexGain) return message.reply('helper.bank_doesnt_have_granex')

                bank.granex -= granexGain
                
                user.granex += granexGain
                user.ores.ruby -= amount

                bank.save()
                user.save()

                message.reply('commands.convert.congrats',
                    {
                        ore: 'ruby',
                        granexGain: granexGain.toLocaleString(message.guild.db.lang === 'en' ? 'en-US' : 'pt-BR'),
                        g
                    }
                )
            },
            gold: () => {
                if (!user?.ores.gold) return message.reply('commands.convert.dont_have')

                var amount = message.args[1] ?? user.ores.gold
                if (amount > user.ores.gold) return message.reply('commands.convert.dont_have_this_amount')

                var granexGain = 250
                granexGain *= amount

                let g = amount

                if (bank.granex < granexGain) return message.reply('helper.bank_doesnt_have_granex')

                bank.granex -= granexGain
                
                user.granex += granexGain
                user.ores.gold -= amount

                bank.save()
                user.save()

                message.reply('commands.convert.congrats',
                    {
                        ore: 'gold',
                        granexGain: granexGain.toLocaleString(message.guild.db.lang === 'en' ? 'en-US' : 'pt-BR'),
                        g
                    }
                )
            },
            platinum: () => {
                if (!user?.ores.platinum) return message.reply('commands.convert.dont_have')

                var amount = message.args[1] ?? user.ores.platinum
                if (amount > user.ores.platinum) return message.reply('commands.convert.dont_have_this_amount')

                var granexGain = 400
                granexGain *= amount

                let g = amount

                if (bank.granex < granexGain) return message.reply('helper.bank_doesnt_have_granex')

                bank.granex -= granexGain
                
                user.granex += granexGain
                user.ores.platinum -= amount

                bank.save()
                user.save()

                message.reply('commands.convert.congrats',
                    {
                        ore: 'platinum',
                        granexGain: granexGain.toLocaleString(message.guild.db.lang === 'en' ? 'en-US' : 'pt-BR'),
                        g
                    }
                )
            },
            diamond: () => {
                if (!user?.ores.diamond) return message.reply('commands.convert.dont_have')

                var amount = message.args[1] ?? user.ores.diamond
                if (amount > user.ores.diamond) return message.reply('commands.convert.dont_have_this_amount')

                var granexGain = 600
                granexGain *= amount

                let g = amount

                if (bank.granex < granexGain) return message.reply('helper.bank_doesnt_have_granex')

                bank.granex -= granexGain
                
                user.granex += granexGain
                user.ores.diamond -= amount

                bank.save()
                user.save()

                message.reply('commands.convert.congrats',
                    {
                        ore: 'diamond',
                        granexGain: granexGain.toLocaleString(message.guild.db.lang === 'en' ? 'en-US' : 'pt-BR'),
                        g
                    }
                )
            }
        }
        
        if (!message.args[0] || !args[message.args[0]]) return message.reply('helper.invalid_arg', 
            {
                try: `${message.guild.db.prefix}convert [ore]`
            }
        )
        const execute = args[message.args[0]]
        execute()
    }
}