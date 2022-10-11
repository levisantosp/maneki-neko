const { Command } = require('../../../structures')
const { User } = require('../../../../../database')

module.exports = class TemplateCommand extends Command {
    constructor() {
        super({
            name: 'template',
            description: 'Change your profile template',
            category: 'social',
            syntax: 'template [color]',
            examples: [
                'template default',
                'template green',
                'template red',
                'template yellow',
                'template orange'
            ]
        })
    }
    async run (message) {
        const user = await User.findById(message.author.id)

        var template = message.args[0]

        const colors = {
            default: () => {
                if (user.profileTemplate === template) return message.reply('commands.template.you_already_use_this')
                if (!user.templates.includes(template)) return message.reply('commands.template.you_dont_have_this')

                var index = user.templates.indexOf(template)
                user.templates.splice(index, 1)
                user.templates.push(user.profileTemplate)
                user.profileTemplate = template
                user.save()

                message.reply('commands.template.confirm', { template })
            },
            green: () => {
                if (user.profileTemplate === template) return message.reply('commands.template.you_already_use_this')
                if (!user.templates.includes(template)) return message.reply('commands.template.you_dont_have_this')

                var index = user.templates.indexOf(template)
                user.templates.splice(index, 1)
                user.templates.push(user.profileTemplate)
                user.profileTemplate = template
                user.save()

                message.reply('commands.template.confirm', { template })
            },
            red: () => {
                if (user.profileTemplate === template) return message.reply('commands.template.you_already_use_this')
                if (!user.templates.includes(template)) return message.reply('commands.template.you_dont_have_this')

                var index = user.templates.indexOf(template)
                user.templates.splice(index, 1)
                user.templates.push(user.profileTemplate)
                user.profileTemplate = template
                user.save()

                message.reply('commands.template.confirm', { template })
            },
            yellow: () => {
                if (user.profileTemplate === template) return message.reply('commands.template.you_already_use_this')
                if (!user.templates.includes(template)) return message.reply('commands.template.you_dont_have_this')

                var index = user.templates.indexOf(template)
                user.templates.splice(index, 1)
                user.templates.push(user.profileTemplate)
                user.profileTemplate = template
                user.save()

                message.reply('commands.template.confirm', { template })
            },
            orange: () => {
                if (user.profileTemplate === template) return message.reply('commands.template.you_already_use_this')
                if (!user.templates.includes(template)) return message.reply('commands.template.you_dont_have_this')

                var index = user.templates.indexOf(template)
                user.templates.splice(index, 1)
                user.templates.push(user.profileTemplate)
                user.profileTemplate = template
                user.save()

                message.reply('commands.template.confirm', { template })
            }
        }

        const color = colors[template]
        if (!color) return message.reply('helper.invalid_arg', { try: `${message.guild.db.prefix}template default/green/red/yellow/orange` })
        
        color()
    }
}