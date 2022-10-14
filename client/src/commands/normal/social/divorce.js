const { Command, Button } = require('../../../structures')
const { User } = require('../../../../../database')
const { ComponentInteraction } = require('eris')

module.exports = class DivorceCommand extends Command {
    constructor() {
        super({
            name: 'divorce',
            aliases: ['divorciar'],
            description: 'Divorce yourself from another person',
            category: 'social',
            syntax: 'divorce [user]',
            examples: [
                'divorce @Levi_',
                'divorce 441932495693414410'
            ]
        });
    }
    async run (message) {
        const user = await User.findById(message.author.id)
        const _user = await this.getUser(message.args[0])

        if (!_user) return message.reply('helper.invalid_user')

        const toUser = await User.findById(_user.id)
        if (user?.marriedWith !== _user.id) return message.reply('commands.divorce.not_married')
        
        const button = new Button()
        button.setStyle('RED')
        button.setLabel(this.locale.get('helper.confirm'))
        button.setCustomID('confirm')

        var msg = await message.replyC('commands.divorce.confirm', {
            components: [
                {
                    type: 1,
                    components: [button]
                }
            ],
            user: _user.mention
        })

        this.client.on('interactionCreate', async interaction => {
            if (interaction instanceof ComponentInteraction) {
                if (interaction.data.custom_id !== 'confirm') return
                if (interaction.message.id !== msg.id) return
                if (interaction.member.id !== message.author.id) return interaction.deferUpdate()

                await msg.delete()

                user.marriedWith = null
                user.marryTime = null

                toUser.marriedWith = null
                toUser.marryTime = null

                user.save()
                toUser.save()

                message.reply('commands.divorce.success')
            }
        })
    }
}