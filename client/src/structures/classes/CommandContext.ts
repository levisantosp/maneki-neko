import { get } from '../../../../locales'
import { CommandInteraction, AdvancedMessageContent, Guild } from 'eris'
import { App } from '..'

interface Options {
  interaction: CommandInteraction,
  client: App
  locale: any
  db: any
  guild?: Guild
}

export default class CommandContext {
  interaction: CommandInteraction
  client: App
  db: any
  locale: any
  guild?: Guild

  constructor({ interaction, client, locale, db, guild }: Options) {
    this.interaction = interaction
    this.client = client
    this.db = db
    this.locale = locale
    this.guild = guild
  }

  reply (content: string | AdvancedMessageContent, options?: object | any) {
    switch (typeof content) {
      case 'string': {
        if (options?.name && options?.file) {
          return this.interaction.createMessage(
            {
              content: get(this.locale, content, options)
            },
            {
              file: options?.file,
              name: options?.name
            }
          )
        }
        else return this.interaction.createMessage(
          {
            content: get(this.locale, content, options)
          }
        )
      }
      case 'object': {
        if (options?.options && options?.name) {
          return this.interaction.createMessage(Object.assign(content),
            {
              file: options?.file,
              name: options?.name
            }
          )
        }
        else return this.interaction.createMessage(Object.assign(content))
      }
    }
  }

  edit (content: string | AdvancedMessageContent, options?: object | any) {
    switch (typeof content) {
      case 'string': {
        if (options?.name && options?.file) {
          return this.interaction.editOriginalMessage(
            {
              content: get(this.locale, content, options)
            },
            {
              file: options?.file,
              name: options?.name
            }
          )
        }
        else return this.interaction.editOriginalMessage(
          {
            content: get(this.locale, content, options)
          }
        )
      }
      case 'object': {
        if (options?.options && options?.name) {
          return this.interaction.editOriginalMessage(Object.assign(content),
            {
              file: options?.file,
              name: options?.name
            }
          )
        }
        else return this.interaction.editOriginalMessage(Object.assign(content))
      }
    }
  }
}