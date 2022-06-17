const {Listener} = require('../../structures');
const {User} = require('../../../../database');
const {ComponentInteraction} = require('eris');

module.exports = class InteractionCreateListener extends Listener {
    constructor() {
        super({name: 'interactionCreate'});
    }
    async on(interaction) {
        if(interaction instanceof ComponentInteraction) {
            if(interaction.guildID !== '721384921679265833') return;
            if(interaction.channel.id !== '979035224556056586') return;
            await interaction.defer(64);
            switch(interaction.data.custom_id) {
                case 'aprovar': {
                    interaction.message.embeds.forEach(async embed => {
                        const user = await User.findById(embed.footer.text);
                        user.background = user.waitingBackground;
                        user.waitingBackground = '';
                        user.save();
                        interaction.createMessage(`Background de ${(await this.client.getRESTUser(user.id)).username} foi aprovado com sucesso!`);
                        this.client.getChannel('853775231663210546').createMessage(`Background de ${(await this.client.getRESTUser(user.id)).mention} foi aprovado por ${interaction.member.mention}!`)
                        interaction.message.delete();
                    });
                }
                    break;
                case 'reprovar': {
                    interaction.message.embeds.forEach(async embed => {
                        const user = await User.findById(embed.footer.text);
                        user.waitingBackground = '';
                        user.save();
                        interaction.createMessage(`Background de ${(await this.client.getRESTUser(user.id)).username} foi reprovado com sucesso!`);
                        this.client.getChannel('853775231663210546').createMessage(`Background de ${(await this.client.getRESTUser(user.id)).mention} foi reprovado por ${interaction.member.mention}!`)
                        interaction.message.delete();
                    });
                }
            }
        }
    }
}