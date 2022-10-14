import { App, CommandRunner, Listener, Logger } from '../../structures'
import { Guild } from '../../../../database'
import { get } from '../../../../locales'
import { CommandInteraction } from 'eris'

export default class InteractionCreateListener extends Listener {
  constructor(client: App) {
    super({
      name: 'interactionCreate',
      client
    })
  }

  async on (interaction: CommandInteraction) {
    const guild = await Guild.findById(interaction.guildID!) || new Guild({ _id: interaction.guildID })
    
    new CommandRunner(interaction, this.client, guild.lang).init()
  }
}