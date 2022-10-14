const { Command } = require('../../../structures')
const { User } = require('../../../../../database')

module.exports = class CallCommand extends Command {
    constructor() {
        super({
            name: 'call',
            aliases: ['chamar', 'ligar'],
            description: 'Call the firefighters or police',
            syntax: 'call fireman/police [reason]',
            examples: [
                'call fireman',
                'call police I was robbed'
            ],
            category: 'Roleplay'
        })
    }
    async run (message) {
        const arrayMembers = []
        if (!message.guild.db.announcements) return message.reply('commands.call.no_channel')
        const channel = message.guild.channels.get(message.guild.db.announcements)
        switch (message.args[0]?.toLowerCase()) {
            case 'police': {
                const reason = message.args.slice(1).join(' ')
                if (!reason) return message.reply('helper.invalid_arg', { try: `${message.guild.db.prefix}call police [reason]` })
                message.guild.members.forEach(member => {
                    if (message.guild.db.polices.includes(member.id)) arrayMembers.push(member)
                })
                if (arrayMembers.length === 0) return message.reply('commands.call.no_policemans')
                channel.createMessage(this.locale.get('commands.call.policeman_announcement', {
                    users: arrayMembers.map(x => x.mention).join(' '),
                    user: message.author.mention,
                    channel: message.channel.mention,
                    jumpLink: message.jumpLink,
                    reason
                }))
                var emoji = await this.client.getRESTGuildEmoji('786013941364424704', '869391072323846184')
                message.addReaction(`${emoji.name}:${emoji.id}`)
            }
                break
            case 'fireman': {
                message.guild.members.forEach(member => {
                    if (message.guild.db.firemans.includes(member.id)) arrayMembers.push(member)
                })
                if (arrayMembers.length === 0) return message.reply('helper.no_firemans')
                channel.createMessage(this.locale.get('helper.fireman_announcement', {
                    users: arrayMembers.map(x => x.mention).join(' '),
                    user: message.author.mention,
                    channel: message.channel.mention,
                    jumpLink: message.jumpLink
                }))
                var emoji = await this.client.getRESTGuildEmoji('786013941364424704', '869391072323846184')
                message.addReaction(`${emoji.name}:${emoji.id}`)
            }
                break
            default: message.reply('helper.invalid_arg', { try: `${message.guild.db.prefix}call police/fireman` })
        }
    }
}