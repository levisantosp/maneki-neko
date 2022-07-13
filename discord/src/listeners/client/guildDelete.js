const {Listener, Embed} = require('../../structures');

module.exports = class GuildDeleteListener extends Listener {
    constructor() {
        super({name: 'guildDelete'});
    }
    async on(guild) {
        const owner = await this.client.getRESTUser(guild.ownerID);
        const embed = new Embed();
        embed.setTitle(`Fui removida de um servidor!`);
        embed.setThumbnail(guild.iconURL);
        embed.addField('Guild', `\`${guild.name} (${guild.id})\``);
        embed.addField('Dono', `\`${owner.username}#${owner.discriminator} (${owner.id})\``);
        embed.addField('Membros', `Humanos: ${guild.members.filter(member => !member.bot).length}\nRobôs: ${guild.members.filter(member => member.bot).length}`);
        embed.setFooter(`Atualmente estou em ${this.client.guilds.size} servidores`);
        const channels = await this.client.getRESTGuildChannels('721384921679265833');
        for(const channel of channels) {
            if(channel.id !== '996780137448210552') continue;
            const webhooks = await channel.getWebhooks();
            var webhook = webhooks.filter(w => w.name === 'Maneki Neko Tracker')[0];
            if(!webhook) webhook = await channel.createWebhook({
                name: 'Maneki Neko Tracker',
                avatar: this.client.user.avatarURL
            });
            this.client.executeWebhook(webhook.id, webhook.token, {
                embed,
                avatarURL: this.client.user.avatarURL,
                username: 'Maneki Neko Tracker'
            });
        }
    }
}