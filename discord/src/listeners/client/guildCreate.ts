import { Listener, Embed, App } from '../../structures'
import { Guild } from '../../../../database'
import { MessageWebhookContent, TextChannel } from 'eris'
import { IListenerOptions } from '../../structures/classes/Listener'

export default class GuildCreateListener extends Listener {
    constructor(client: App) {
        super({ name: 'guildCreate', client })
    }
    async on({ guild }: IListenerOptions) {
        const g = await Guild.findById(guild.id)
        if (g?.banned) guild.leave()

        const owner = this.client.users.get(guild.ownerID)
        const embed = new Embed()
        .setTitle(`Fui adicionada em um servidor!`)
        .setThumbnail(guild.iconURL as string)
        .addField('Guild', `\`${guild.name} (${guild.id})\``)
        .addField('Dono', `\`${owner?.username}#${owner?.discriminator} (${owner?.id})\``)
        .addField('Membros', `Humanos: ${guild.members.filter(member => !member.bot).length}\nRobôs: ${guild.members.filter(member => member.bot).length}`)
        .setFooter(`Atualmente estou em ${this.client.guilds.size} servidores`)

        const channels = await this.client.getRESTGuildChannels('721384921679265833') as TextChannel[]

        for (const channel of channels) {
            if (channel.id !== '996780045433589792') continue

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