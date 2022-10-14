import { Listener, Embed, Button, App } from '../../structures'
import { User, Bank } from '../../../../database'
import { MessageWebhookContent, TextChannel, Message } from 'eris'

export default class MessageCreateListener extends Listener {
  constructor(client: App) {
    super({ name: 'messageCreate', client })
  }
  async on(message: Message) {
    if (!message.author.bot) return
    if (message.guildID != '994997023000506418') return

    const bank: any = await Bank.findById('bank')
    const userId = message.content || message.embeds[0]?.footer?.text.replace(' • Vote você também!', '') as string
    const user = await User.findById(userId)
    const _user = await this.client.getRESTUser(userId)

    if (!user) return
    if (bank.granex < 800) throw new Error('The bank doesn\'t have granex')

    user.granex += 800
    bank.granex -= 800
    user.save()
    bank.save()

    const embed = new Embed()
    embed.setTitle('Mais um voto pra conta!')
    embed.setDescription(`${_user.username}#${_user.discriminator} votou em mim e recebeu 800 granex!\n\nTá esperando o quê? Faça como ele(a), vote em mim na **Top.gg** e na **discordbotlist.com** clicando nos botões abaixo!`)
    embed.setFooter('Você ganha 800 granex a cada voto que faz, não importando se é na Top.gg ou discordbotlist.com')
    embed.setThumbnail(_user.avatarURL)

    const topgg = new Button()
    topgg.setStyle('LINK')
    topgg.setLabel('Top.gg')
    topgg.setEmoji('995012387218407494')
    topgg.setURL('https://top.gg/bot/789196560415064085/vote')

    const dbl = new Button()
    dbl.setStyle('LINK')
    dbl.setLabel('discordbotlist.com')
    dbl.setEmoji('995013888854741053')
    dbl.setURL('https://discordbotlist.com/bots/maneki-neko/upvote')

    const channels = await this.client.getRESTGuildChannels('721384921679265833') as TextChannel[]

    for (const channel of channels) {
      if (channel.id !== '994993504256274482') continue

      const webhooks = await channel.getWebhooks()
      var webhook = webhooks.filter(w => w.name === `${this.client.user.username} Tracker`)[0]

      if (!webhook) webhook = await channel.createWebhook({
        name: `${this.client.user.username} Tracker`,
        avatar: this.client.user.avatarURL
      })

      this.client.executeWebhook(webhook.id, webhook.token!, {
        content: _user.mention,
        embed,
        avatarURL: this.client.user.avatarURL,
        username: `${this.client.user.username} Tracker`,
        components: [{
          type: 1,
          components: [topgg, dbl]
        }]
      } as MessageWebhookContent)
    }
  }
}