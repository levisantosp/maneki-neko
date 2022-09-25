const { Command } = require('../../structures')
const { User } = require('../../../../database')

module.exports = class AboutMeCommand extends Command {
    constructor() {
        super({
            name: 'aboutme',
            aliases: ['biography', 'bio', 'sobremim', 'biografia'],
            description: 'Set your profile biography',
            syntax: 'aboutme [aboutme]',
            examples: [
                'aboutme Hello, world!'
            ],
            category: 'social'
        })
    }
    async run (message) {
        var aboutme = message.args.join(' ')
        if (!aboutme) return message.reply('helper.invalid_arg', { try: `${message.guild.db.prefix}aboutme [aboutme]` })

        const user = await User.findById(message.author.id)
        user.aboutme = aboutme
        user.save()

        message.reply('commands.aboutme.reply', { aboutme })
    }
}