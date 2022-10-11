const { Command } = require('../../../structures')
const { Guild } = require('../../../../../database')

module.exports = class LanguageCommand extends Command {
    constructor() {
        super({
            name: 'language',
            aliases: ['lang', 'idioma'],
            category: 'config',
            description: 'Changes the language that I responding in a server',
            syntax: 'language pt/en',
            examples: [
                'language pt',
                'language en'
            ],
            permissions: ['manageGuild']
        })
    }
    async run (message) {
        var lang = message.args[0]
        if (!lang) return message.reply('helper.invalid_arg', { try: `${message.guild.db.prefix}lang pt/en` })
        const guild = await Guild.findById(message.guildID) || new Guild({ _id: message.guild.id })
        switch (lang) {
            case 'pt':
                message.reply('Agora eu irei falar em português neste servidor. Aqui é o Brasil!')
                guild.lang = lang
                guild.save()
                break
            case 'en':
                message.reply('Now I\'ll speak in english on this server. This is America!')
                guild.lang = lang
                guild.save()
                break
            default:
                message.reply('helper.invalid_arg', { try: `${message.guild.db.prefix}lang pt/en` })
        }
    }
}