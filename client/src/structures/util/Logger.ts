import { Embed, App } from '..'
import c from 'colors'
import moment from 'moment'
import { MessageWebhookContent, TextChannel } from 'eris'

export default class Logger {
  private client: App

  constructor(client: App) {
    this.client = client
  }
  static send(message: string) {
    return console.log(c.green(`[${moment(Date.now()).format('hh:mm')}] ${message}`))
  }
  static warn(message: string) {
    return console.log(c.yellow(`[${moment(Date.now()).format('hh:mm')}] ${message}`))
  }
  async error(error: any) {
    const embed = new Embed()
    .setTitle('Ocorreu um erro inesperado...')
    .setDescription(`\`\`\`${error.stack}\`\`\``)

    const channels = await this.client.getRESTGuildChannels('721384921679265833') as TextChannel[]

    for (const channel of channels) {
      if (channel.id !== '980251329345761330') continue

      const webhooks = await channel.getWebhooks()
      var webhook = webhooks.filter(w => w.name === `${this.client.user.username} Tracker`)[0]

      if (!webhook) webhook = await channel.createWebhook({
        name: `${this.client.user.username} Tracker`,
        avatar: this.client.user.avatarURL
      })

      this.client.executeWebhook(webhook.id, webhook.token!, {
        embed,
        avatarURL: this.client.user.avatarURL,
        username: `${this.client.user.username} Tracker`
      } as MessageWebhookContent)
      console.log(c.red(`[${moment(Date.now()).format('hh:mm')}] ${error.stack}`))
    }
  }
}