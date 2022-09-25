const { Command, Embed } = require('../../structures')
const { User, Guild } = require('../../../../database')
const ms = require('ms')

module.exports = class BlacklistCommand extends Command {
    constructor() {
        super({
            name: 'blacklist',
            onlyOwner: true
        })
    }
    async run (message) {
        switch (message.args[0]) {
            case 'user': {
                const u = await this.getUser(message.args[1])
                const user = await User.findById(u.id)
                if (!user) return message.reply('helper.user_is_not_in_database')
                const time = message.args[2]
                var reason = message.args.slice(3).join(' ') || 'No reason'
                const embed = new Embed()
                embed.setAuthor('Blacklist', u.avatarURL)
                embed.addField('Usuário', `\`${u.username}#${u.discriminator}\``, true)
                embed.addField('Acaba em', time != 'perm' ? `<t:${parseInt((Date.now() + ms(time)) / 1000)}:R>` : 'Nunca', true)
                embed.addField('Motivo', reason)
                this.client.getChannel('988609194141827082').createMessage(embed.build())

                await user.delete()
                User.create({
                    _id: u.id,
                    banned: true,
                    bannedReason: reason,
                    bannedUntil: time != 'perm' ? Date.now() + ms(time) : null
                })
                message.reply('Usuário colocado na blacklist com sucesso!')
            }
                break
            case 'guild': {
                const g = await this.client.getRESTGuild(message.args[1])
                const guild = await Guild.findById(g.id)
                if (!guild) return message.reply('Este servidor não está salvo no banco de dados.')
                const time = message.args[2]
                var reason = message.args.slice(3).join(' ') || 'No reason'
                const embed = new Embed()
                embed.setAuthor('Blacklist', g.iconURL)
                embed.addField('Servidor', `\`${g.name} (${g.id})\``, true)
                embed.addField('Acaba em', time != 'perm' ? `<t:${parseInt((Date.now() + ms(time)) / 1000)}:R>` : 'Nunca', true)
                embed.addField('Motivo', reason)
                this.client.getChannel('988609194141827082').createMessage(embed.build())

                await guild.delete()
                Guild.create({
                    _id: g.id,
                    banned: true,
                    bannedReason: reason,
                    bannedUntil: time != 'perm' ? Date.now() + ms(time) : null
                })
                message.reply('Guild colocada na blacklist com sucesso!')
                g.leave()
            }
                break
            default: message.reply('Argumento inválido! Verificar a ortografia.')
        }
    }
}