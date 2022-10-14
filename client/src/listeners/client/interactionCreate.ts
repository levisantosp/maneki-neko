import { App, Listener } from '../../structures'
import { User } from '../../../../database'
import { ComponentInteraction, TextChannel } from 'eris'
import { IListenerOptions } from '../../structures/classes/Listener'

export default class InteractionCreateListener extends Listener {
    constructor(client: App) {
        super({ name: 'interactionCreate', client })
    }
    async on({ interaction }: IListenerOptions) {
        if (interaction instanceof ComponentInteraction) {
            if (interaction.guildID !== '721384921679265833') return
            if (interaction.channel.id !== '979035224556056586') return

            await interaction.defer(64)

            switch (interaction.data.custom_id) {
                case 'aprovar': {
                    interaction.message.embeds.forEach(async embed => {
                        const user: any = await User.findById(embed?.footer?.text as string)

                        user.background = user.waitingBackground
                        user.waitingBackground = ''
                        user.save()

                        interaction.createMessage(`Background de ${(await this.client.getRESTUser(user.id)).username} foi aprovado com sucesso!`)

                        const channel = this.client.getChannel('853775231663210546') as TextChannel

                        channel.createMessage(`Background de ${(await this.client.getRESTUser(user.id)).mention} foi aprovado por ${interaction.member?.mention}!`)

                        interaction.message.delete()
                    })
                }
                    break
                case 'reprovar': {
                    interaction.message.embeds.forEach(async embed => {
                        const user: any = await User.findById(embed?.footer?.text)

                        user.waitingBackground = ''
                        user.save()
                        
                        interaction.createMessage(`Background de ${(await this.client.getRESTUser(user.id)).username} foi reprovado com sucesso!`)

                        const channel = this.client.getChannel('853775231663210546') as TextChannel
                        channel.createMessage(`Background de ${(await this.client.getRESTUser(user.id)).mention} foi reprovado por ${interaction.member?.mention}!`)

                        interaction.message.delete()
                    })
                }
            }
        }
    }
}