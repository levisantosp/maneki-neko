const { Command } = require('../../../structures')
const { Guild } = require('../../../../../database')

module.exports = class PrefixCommand extends Command {
    constructor() {
        super({
            name: 'prefix',
            description: 'Change my default prefix',
            category: 'config',
            syntax: 'prefix [prefix]',
            examples: [
                'prefix !',
                'prefix -'
            ],
            permissions: ['manageGuild']
        })
    }
    async run (message) {
        var prefix = message.args[0]
        if (!prefix) return message.reply('helper.invalid_arg', { try: `${message.guild.db.prefix}prefix <prefix>` })
        const guild = await Guild.findById(message.guild.id)
        guild.prefix = prefix
        guild.save()
        message.reply('commands.prefix.prefix_changed_to', { prefix })
    }
}