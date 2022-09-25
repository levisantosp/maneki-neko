const { Command, Button } = require('../../structures')
const { User, Bank } = require('../../../../database')
const { ComponentInteraction } = require('eris')

module.exports = class PayCommand extends Command {
    constructor() {
        super({
            name: 'pay',
            aliases: ['pagar'],
            description: 'Give granex to somebody',
            syntax: 'pay [user] [quantity]',
            examples: [
                'pay @Levi_ 500',
                'pay 441932495693414410 500'
            ],
            category: 'economy'
        })
    }
    async run (message) {
        const member = this.getMember(message.args[0])
        if (!member) return message.reply('helper.invalid_user')
        if (!message.args[1] || isNaN(message.args[1]) || member.id == message.member.id) return message.reply('helper.invalid_arg', { try: `${message.guild.db.prefix}pay <user> <amount>` })
        const user = await User.findById(message.member.id)
        const toUser = await User.findById(member.id)
        const bank = await Bank.findById('bank') || new Bank({ _id: 'bank' })
        if (user?.granex < message.args[1]) return message.reply('helper.you_dont_have_granex')
        if (!toUser) return message.reply('helper.user_is_not_in_database')
        if (message.args[1] < 100) return message.reply('commands.pay.value_is_to_little')

        const button = new Button()
        button.setStyle('GREEN')
        button.setLabel(this.locale.get('commands.pay.button.label'))
        button.setCustomID('confirm')

        const msg = await message.replyC('commands.pay.confirm', {
            granex: message.args[1].toLocaleString(message.guild.db.lang === 'en' ? 'en-US' : 'pt-BR'),
            user: member.mention,
            components: [{
                type: 1,
                components: [button]
            }]
        })
        
        this.client.on('interactionCreate', async interaction => {
            if (interaction instanceof ComponentInteraction) {
                if (interaction.data.custom_id !== 'confirm') return
                if (interaction.channel.id !== message.channel.id) return
                if (interaction.message.id !== msg.id) return
                if (interaction.member.id !== message.member.id) return interaction.deferUpdate()
                await interaction.deferUpdate()
                await msg.delete()
                var rate = Number.parseInt(message.args[1] * 0.1)
                var granex = Number(message.args[1] - rate)
                bank.granex += rate
                user.granex -= message.args[1]
                toUser.granex += granex
                bank.save()
                user.save()
                toUser.save()
                message.reply('commands.pay.confirmed')
            }
        })
    }
}