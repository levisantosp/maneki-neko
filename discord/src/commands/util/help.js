const { Command, Embed, Button } = require('../../structures')
const translate = require('@iamtraction/google-translate')

module.exports = class HelpCommand extends Command {
    constructor() {
        super({
            name: 'help',
            aliases: ['ajuda', 'comandos', 'commands', 'cmds'],
            description: 'List of commands',
            category: 'util',
            botPermissions: ['embedLinks']
        })
    }
    async run (message) {
        if (message.args[0]) {
            const permissions = require(`../../../../locales/${message.guild.db.lang}/permissions.json`)
            var command = this.client.commands.get(message.args[0]) || this.client.commands.get(this.client.aliases.get(message.args[0]))

            if (!command) return message.reply('commands.help.no_command')

            const embed = new Embed()
            embed.setTitle(message.args[0])
            embed.setDescription((await translate(command.description, { to: message.guild.db.lang })).text)
            embed.addField(this.locale.get('commands.help.command_name'), `\`${command.name}\``)

            if (command.syntax) embed.addField(this.locale.get('commands.help.command_syntax'), `\`${message.guild.db.prefix}${command.syntax}\``)
            if (command.examples) embed.addField(this.locale.get('commands.help.command_example'), command.examples.map(example => `\`${message.guild.db.prefix}${example}\``).join('\n'))
            if (command.aliases) embed.addField(this.locale.get('commands.help.command_aliases'), `${command.aliases.map(alias => `\`${alias}\``).join(', ')}` ?? '***')
            if (permissions[command.permissions.map(perm => perm).join(', ')]) embed.addField(this.locale.get('commands.help.command_permissions'), permissions[command.permissions.map(perm => perm).join(', ')])
            if (permissions[command.botPermissions.map(perm => perm).join(', ')]) embed.addField(this.locale.get('commands.help.command_bot_permissions'), permissions[command.botPermissions.map(perm => perm).join(', ')], true)

            embed.setFooter(this.locale.get('commands.help.embed.footer'))

            message.reply(embed.build())
        }
        else {
            const embed = new Embed()
            embed.setTitle(this.locale.get('commands.help.embed.title'))
            embed.setDescription(this.locale.get('commands.help.embed.description', { usage: `${message.guild.db.prefix}help [cmd]`, support: process.env.SUPPORT_SERVER }))
            embed.setThumbnail(this.client.user.avatarURL)
            embed.setColor('0x7289DA')

            const categories = this.client.commands.map(cmd => cmd.category).filter((x, y, z) => z.indexOf(x) === y)

            categories.forEach(category => {
                var commands = this.client.commands.filter(cmd => cmd.category === category).sort((x, y) => x.name.localeCompare(y.name)).map(cmd => `\`${message.guild.db.prefix}${cmd.name}\``).join(', ')

                switch (message.guild.db.lang) {
                    case 'pt':
                        if (category === 'util') category = 'Utilitários'
                        if (category === 'economy') category = 'Economia'
                        if (category === 'misc') category = 'Miscelânea'
                        if (category === 'config') category = 'Configuração'
                        if (category === 'social') category = 'Social'
                        break
                    default:
                        if (category === 'util') category = 'Utilities'
                        if (category === 'economy') category = 'Economy'
                        if (category === 'misc') category = 'Miscellaneous'
                        if (category === 'config') category = 'Setup'
                        if (category === 'social') category = 'Social'
                }
                if (category) embed.addField(category, commands)
            })
            const button = new Button()
            button.setStyle('LINK')
            button.setLabel(this.locale.get('helper.community'))
            button.setURL('https://discord.gg/7UeV8jFz6m')

            message.reply({
                embeds: [embed], components: [{
                    type: 1,
                    components: [button]
                }]
            })
        }
    }
}