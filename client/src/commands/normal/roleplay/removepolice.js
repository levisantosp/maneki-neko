const {Command} = require('../../../structures')
const {User, Guild} = require('../../../../../database')

module.exports = class RemovePoliceCommand extends Command {
    constructor() {
        super({
            name: 'removepolice',
            aliases: ['removerpolicial', 'removepolicial'],
            description: 'Remove a member as a server police',
            category: 'Roleplay',
            syntax: 'removepolice [member]',
            examples: [
                'removepolice @Levi_',
                'removepolice 441932495693414410'
            ],
            botPermissions: ['addReactions']
        })
    }
    async run (message) {
        const arrayRoles = []
        message.guild.roles.forEach(role => {
            if(role.name === 'ManekiSheriff') arrayRoles.push({name: role.name, id: role.id})
        })

        if(!message.member.permissions.has('banMembers') && !arrayRoles[0]['name'].includes('ManekiSheriff')) return
        if(arrayRoles[0] && !message.member.roles.includes(arrayRoles[0]['id'])) return

        const member = this.getMember(message.args[0])
        if(!member || member.id === message.member.id) return message.reply('helper.invalid_user')

        const guild = await Guild.findById(message.guild.id)
        const user = await User.findById(member.id)

        if(!guild?.polices.includes(user?.id)) return message.reply('commands.removepolice.not_a_police')

        var index = guild.polices.indexOf(user.id)
        guild.polices.splice(index, 1)
        guild.polices = guild.polices
        user.job = ''
        user.save()
        guild.save()
        message.reply('commands.removepolice.removed', {user: member.mention})
    }
}