const { Listener, Embed } = require('../../structures')
const { Guild } = require('../../../../database')

module.exports = class GuildCreateListener extends Listener {
    constructor() {
        super({ name: 'guildCreate' })
    }
    async on(guild) {
        const g = await Guild.findById(guild.id)
        if (g?.banned) guild.leave()

        const owner = this.client.users.get(guild.ownerID)
        const embed = new Embed()
        embed.setTitle(`Fui adicionada em um servidor!`)
        embed.setThumbnail(guild.iconURL)
        embed.addField('Guild', `\`${guild.name} (${guild.id})\``)
        embed.addField('Dono', `\`${owner.username}#${owner.discriminator} (${owner.id})\``)
        embed.addField('Membros', `Humanos: ${guild.members.filter(member => !member.bot).length}\nRobôs: ${guild.members.filter(member => member.bot).length}`)
        embed.setFooter(`Atualmente estou em ${this.client.guilds.size} servidores`)

        const channels = await this.client.getRESTGuildChannels('721384921679265833')

        for (const channel of channels) {
            if (channel.id !== '996780045433589792') continue

            const webhooks = await channel.getWebhooks()
            var webhook = webhooks.filter(w => w.name === `${this.client.user.username} Tracker`)[0]
            
            if (!webhook) webhook = await channel.createWebhook({
                name: `${this.client.user.username} Tracker`,
                avatar: this.client.user.avatarURL
            })

            this.client.executeWebhook(webhook.id, webhook.token, {
                embed,
                avatarURL: this.client.user.avatarURL,
                username: `${this.client.user.username} Tracker`
            })
        }
    }
}