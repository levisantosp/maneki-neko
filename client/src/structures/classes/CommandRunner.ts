import CommandContext from './CommandContext'
import { Guild, User } from '../../../../database'
import { get } from '../../../../locales'
import { App, Logger } from '..'
import { CommandInteraction } from 'eris'

export default class CommandRunner {
  interaction: CommandInteraction
  client: App
  locale: string

  constructor(interaction: CommandInteraction, client: App, locale: string) {
    this.interaction = interaction
    this.client = client
    this.locale = locale
  }

  async init() {
    if (!this.interaction.member) return

    const permissions = await import(`../../../../locales/${this.locale}/permissions.json`)
    const guild = await Guild.findById(this.interaction.guildID)
    const user = await Guild.findById(this.interaction.member.id)
    const db = {
      user,
      guild
    }
    const ctx = new CommandContext({
      interaction: this.interaction,
      client: this.client,
      locale: this.locale,
      db,
      guild: this.client.guilds.get(this.interaction.guildID!)
    })

    await this.interaction.defer()

    const command = this.client.commands.get(this.interaction.data.name)

    if (!command) return

    if (command.permissions[0]) {
      var arrayPerm: any[] = []

      for (var perm of command.permissions) {
        if (!ctx.interaction.member?.permissions.has(perm)) arrayPerm.push(perm)
      }

      if (arrayPerm[0]) return ctx.reply('helper.permissions.user', { permission: arrayPerm.map(perm => permissions[perm]).join(', ') })
    }
    if (command.botPermissions[0]) {
      var arrayPerm: any[] = []

      var member = ctx.guild?.members.get(this.client.user.id)

      for (var perm of command.permissions) {
        if (!member?.permissions.has(perm)) arrayPerm.push(perm)
      }

      if (arrayPerm[0]) return ctx.reply('helper.permissions.bot', { permission: arrayPerm.map(perm => perm).join(', ') })
    }

    command.locale = {
      get: (content: string, args?: object): string => {
        return get(this.locale, content, args)
      }
    }
    command.getMember = (member: string) => {
      try {
        return ctx.guild?.members.get(member.replace(/[<@!>]/g, ''))
      }
      catch (err) {
        new Logger(this.client).error(err)
      }
    }
    command.getUser = async (user: string) => {
      try {
        return this.client.getRESTUser(user.replace(/[<@!>]/g, ''))
      }
      catch (err) {
        new Logger(this.client).error(err)
      }
    }

    command.run({ ctx })
    .catch((error: any) => {
      new Logger(this.client).error(error)
      ctx.reply('helper.error', { error })
    })
  }
}