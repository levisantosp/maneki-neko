const { CommandInteraction, ComponentInteraction } = require('eris')
const { Guild } = require('../../../../database')
const locale = require('../../../../locales')
const { Listener, CommandRunner, Logger } = require('../../structures')

module.exports = class InteractionCreateListener extends Listener {
    constructor() {
        super({ name: 'interactionCreate' })
    }
    async on (interaction) {
        if (interaction instanceof CommandInteraction && interaction.member) {
            const guild = await Guild.findById(interaction.member.guild.id)
            
            new CommandRunner(interaction, this.client, guild.lang).run()
        }
    }
}