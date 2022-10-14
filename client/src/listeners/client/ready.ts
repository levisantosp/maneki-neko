import { Listener, Logger, Battle, App } from '../../structures'
import { User, Bank, Guild } from '../../../../database'
import { get } from '../../../../locales'
import { TextChannel } from 'eris'

export default class ReadyListener extends Listener {
  constructor(client: App) {
    super({ name: 'ready', client })
  }
  async on() {
    Logger.send(`Logged as ${this.client.user.username}#${this.client.user.discriminator}`)

    const commands: any[] = []

    this.client.commands.forEach(cmd => {
      commands.push(
        {
          name: cmd.name,
          name_localizations: cmd.name_localizations,
          description: cmd.description,
          description_localizations: cmd.description_localizations,
          options: cmd.options
        }
      )
    })

    this.client.bulkEditGuildCommands('721384921679265833', commands)

    const reviveUser = async () => {
      const users: any[] = await User.find({ deadAt: { $lte: Date.now() } })

      for (const user of users) {
        user.energy = 500
        user.deadAt = null
        user.save()
        Logger.warn(`(${user.id}) has been revived.`)
      }
    }

    const addGranexPerFarm = async () => {
      const users = await User.find({ farmTime: { $lte: Date.now() } })
      const bank: any = await Bank.findById('bank')

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

      const bank: any = await Bank.findById('bank')

      var granex = 0
      for (const user of users) {
        if (bank.taxTime > Date.now()) continue

        var tax = user.granex * 0.01

        granex += parseInt(tax.toString())

        user.granex -= parseInt(tax.toString())
        bank.granex += parseInt(tax.toString())

        user.save()
      }

      if (bank.taxTime > Date.now()) return

      for (const guild of guilds) {
        if (!this.client.guilds.get(guild.id)) return guild.delete()

        const channel = this.client.getChannel(guild.announcements as string) as TextChannel

        channel.createMessage(get(guild.lang, 'helper.tax'))
      }

      bank.taxTime = Date.now() + 6.048e+8
      bank.save()

      Logger.warn(`The bank received ${granex.toLocaleString()} granex from tax.`)
    }

    const startHG = async () => {
      const guilds: any[] = await Guild.find(
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