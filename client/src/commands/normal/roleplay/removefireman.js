const { Command } = require('../../../structures')
const { User, Guild } = require('../../../../../database')

module.exports = class RemoveFiremanCommand extends Command {
    constructor() {
        super({
            name: 'removefireman',
            aliases: ['removerbombeiro', 'removebombeiro'],
            description: 'Remove a member as a server fireman',
            category: 'Roleplay',
            syntax: 'removefireman [member]',
            examples: [
                'removefireman @Levi_',
                'removefireman 441932495693414410'
            ],
            botPermissions: ['addReactions']
        })
    }
    async run (message) {
        const arrayRoles = []
        message.guild.roles.forEach(role => {
            if (role.name === 'ManekiColonel') arrayRoles.push({ name: role.name, id: role.id })
        })

        if (!message.member.permissions.has('banMembers') && !arrayRoles[0]) return
        if (arrayRoles[0] && !message.member.roles.includes(arrayRoles[0].id)) return

        const member = this.getMember(message.args[0])
        if (!member || member.id === message.member.id) return message.reply('helper.invalid_user')

        const guild = await Guild.findById(message.guild.id)
        const user = await User.findById(member.id)

        if (!guild?.firemans?.includes(user?.id)) return message.reply('commands.removefireman.not_a_fireman')

        var index = guild.firemans.indexOf(member.id)
        guild.firemans.splice(index, 1)
        guild.firemans = guild.firemans
        user.job = ''
        user.save()
        guild.save()
        message.reply('commands.removefireman.removed', { user: member.mention })
    }
}