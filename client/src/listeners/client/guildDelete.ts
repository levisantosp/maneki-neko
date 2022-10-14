import { MessageWebhookContent, TextChannel, Guild } from 'eris'
import { Listener, Embed, App } from '../../structures'

export default class GuildDeleteListener extends Listener {
  constructor(client: App) {
    super({ name: 'guildDelete', client })
  }
  async on(guild: Guild) {
    const owner = await this.client.getRESTUser(guild.ownerID)
    const embed = new Embed()
      .setTitle(`Fui removida de um servidor!`)
      .setThumbnail(guild.iconURL as string)
      .addField('Guild', `\`${guild.name} (${guild.id})\``)
      .addField('Dono', `\`${owner.username}#${owner.discriminator} (${owner.id})\``)
      .addField('Membros', `Humanos: ${guild.members.filter(member => !member.bot).length}\nRobôs: ${guild.members.filter(member => member.bot).length}`)
      .setFooter(`Atualmente estou em ${this.client.guilds.size} servidores`)

    const channels = await this.client.getRESTGuildChannels('721384921679265833') as TextChannel[]

    for (const channel of channels) {
      if (channel.id !== '996780137448210552') continue

      const webhooks = await channel.getWebhooks()

      var webhook = webhooks.filter(w => w.name === `${this.client.user.username} Tracker`)[0]
      if (!webhook) webhook = await channel.createWebhook({
        name: `${this.client.user.username} Tracker`,
        avatar: this.client.user.avatarURL
      })

      this.client.executeWebhook(webhook.id, webhook.token as string, {
        embed,
        avatarURL: this.client.user.avatarURL,
        username: `${this.client.user.username} Tracker`
      } as MessageWebhookContent)
    }
  }
}