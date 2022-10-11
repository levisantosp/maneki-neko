const { Listener, Logger, Battle } = require('../../structures')
const { User, Bank, Guild } = require('../../../../database')
const locale = require('../../../../locales')
const Eris = require('eris')

module.exports = class ReadyListener extends Listener {
    constructor() {
        super({ name: 'ready' })
    }
    async on () {
        Logger.send(`Logged as ${this.client.user.username}#${this.client.user.discriminator}`)

        this.client.slashCommands.forEach(command => {
            if (command.name == 'help') {
                this.client.slashCommands.forEach(cmd => {
                    if (cmd.name_localizations) {
                        command.options[0].choices.push(
                            {
                                name: cmd.name,
                                name_localizations: {
                                    'pt-BR': cmd.name_localizations
                                },
                                value: cmd.name
                            }
                        )
                    }
                    else {
                        command.options[0].choices.push(
                            {
                                name: cmd.name,
                                value: cmd.name
                            }
                        )
                    }
                })
            }

            this.client.createCommand(command)
        })

        const editClientStatus = async () => {
            const activities = [
                {
                    name: `with another ${(await User.find({ energy: { $gte: 1 } })).length} users`,
                    type: 5
                },
                {
                    name: `Global Bank: 💸 ${(await Bank.findById('bank')).granex.toLocaleString()}`,
                    type: 0
                }
            ]
            const activity = activities[Math.floor(Math.random() * activities.length)]
            this.client.editStatus('online', activity)
        }

        const reviveUser = async () => {
            const users = await User.find({ deadAt: { $lte: Date.now() } })

            for (const user of users) {
                user.energy = 500
                user.deadAt = null
                user.save()
                Logger.warn(`(${user.id}) has been revived.`)
            }
        }

        const addGranexPerFarm = async () => {
            const users = await User.find({ farmTime: { $lte: Date.now() } })
            const bank = await Bank.findById('bank')

            for (const user of users) {
                if (user.farms.length >= 1) {
                    var granexGain = 100
                    var n = 0
                    var n2 = 0
                    var n3 = 0

                    user.farms.forEach(farm => {
                        if (farm.plants.length > 0) n += farm.plants.length * 5
                        if (farm.cows > 0) n2 += farm.cows * 15
                        if (farm.chickens > 0) n3 += farm.chickens * 5
                    })

                    granexGain += user.farms.length * 10 + n + n2 + n3

                    if (bank.granex < granexGain) throw new Error('The bank doesn\'t have granex.')

                    user.granex += granexGain
                    user.farmTime = Date.now() + 3.6e+6
                    bank.granex -= granexGain
                    user.save()
                    bank.save()
                    Logger.warn(`(${user.id}) received ${granexGain.toLocaleString()} granex per farm.`)
                }
            }
        }

        const removeUserFromBlacklist = async () => {
            const users = await User.find({ bannedUntil: { $lte: Date.now() } })

            for (const user of users) {
                Logger.warn(`(${user.id}) has been removed from blacklist`)
                user.delete()
            }
        }

        const removeGuildFromBlackist = async () => {
            const guilds = await Guild.find({ bannedUntil: { $lte: Date.now() } })
            
            for (const guild of guilds) {
                Logger.warn(`(${guild.id}) has been removed from blacklist`)
                guild.delete()
            }
        }

        const fillGranexBank = async () => {
            const bank = (await Bank.find(
                {
                    fillTime: {
                        $lte: Date.now()
                    }
                }
            ))[0]

            if (!bank) return

            bank.granex += 20000000
            bank.fillTime = Date.now() + 6.048e+8
            bank.save()

            Logger.warn('The bank was refill with 20,000,000 granex.')
        }

        const tax = async () => {
            const users = await User.find(
                {
                    granex: {
                        $gte: 100
                    }
                }
            )

            const guilds = await Guild.find(
                {
                    announcements: {
                        $exists: true
                    }
                }
            )

            const bank = await Bank.findById('bank')

            var granex = 0
            for (const user of users) {
                if (bank.taxTime > Date.now()) continue

                var tax = user.granex * 0.01
            
                granex += parseInt(tax)

                user.granex -= parseInt(tax)
                bank.granex += parseInt(tax)

                user.save()
            }

            if (bank.taxTime > Date.now()) return

            for (const guild of guilds) {
                if (!this.client.guilds.get(guild.id)) return guild.delete()
                
                this.client.getChannel(guild.announcements)
                .createMessage(locale.get(guild.lang, 'helper.tax'))
            }

            bank.taxTime = Date.now() + 6.048e+8
            bank.save()

            Logger.warn(`The bank received ${granex.toLocaleString()} granex from tax.`)
        }

        const startHG = async () => {
            const guilds = await Guild.find(
                {
                    'hg.startsIn': { $lte: Date.now() }
                }
            )
            
            for (const guild of guilds) {
                new Battle(guild)
                .startBattle()
            }
        }

        /*const drop = async () => {
            const guilds = await Guild.find(
                {
                    allowedChannels: {
                        $ne: []
                    }
                }
            )

            for (const guild of guilds) {
                var ch = guild.allowedChannels[Math.floor(Math.random() * guild.allowedChannels.length)]
                var channel = this.client.getChannel(ch)

                const embed = new Embed()
                embed.setTitle()
            }
        }*/

        setInterval(editClientStatus, 15000)
        setInterval(() => {
            reviveUser()
            addGranexPerFarm().catch(err => new Logger(this.client).error(err))
            removeUserFromBlacklist()
            removeGuildFromBlackist()
            fillGranexBank()
            tax()
            startHG().catch(err => new Logger(this.client).error(err))
            //drop()
        }, 10000)
    }
}