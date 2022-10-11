const { Command } = require('../../../structures')
const { User, Guild } = require('../../../../../database')

module.exports = class AddFiremanCommand extends Command {
    constructor() {
        super({
            name: 'addfireman',
            aliases: ['adicionarbombeiro', 'addbombeiro'],
            description: 'Add a member as a server fireman',
            category: 'Roleplay',
            syntax: 'addfireman [member]',
            examples: [
                'addfireman @Levi_',
                'addfireman 441932495693414410'
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
        if (!user?.certificates?.includes('fireman')) return message.reply('commands.addfireman.not_a_fireman')
        if (guild.polices.includes(member.id)) {
            var emoji = await this.client.getRESTGuildEmoji('786013941364424704', '869391072051216425')
            return message.addReaction(`${emoji.name}:${emoji.id}`)
        }

        var firemanSize
        if (guild.level < 10) firemanSize = 10
        if (guild.level < 20 && guild.level > 10) firemanSize = 20
        if (guild.level < 30 && guild.level > 20) firemanSize = 30
        if (guild.level < 40 && guild.level > 30) firemanSize = 40
        if (guild.level < 50 && guild.level > 40) firemanSize = 50
        if (guild.firemans.length >= firemanSize) return message.reply('commands.addfireman.too_much_fireman')
        guild.firemans.push(member.id)
        guild.firemans = guild.firemans
        user.job = 'fireman'
        user.save()
        guild.save()
        message.reply('commands.addfireman.added', { user: member.mention })
    }
}