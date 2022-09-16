const { Command, Embed, Button, BossBattle } = require('../../structures')
const { ComponentInteraction } = require('eris')
const { User } = require('../../../../database')

module.exports = class BossCommand extends Command {
    constructor() {
        super({
            name: 'boss',
            description: 'Fight with bosses and get granex',
            category: 'RPG',
            syntax: 'boss [boss name]',
            examples: [
                'boss cleiton trovoada',
                'boss vladimir'
            ],
            botPermissions: ['embedLinks', 'manageWebhooks']
        })
    }
    async run (message) {
        const embed = new Embed()
        const button = new Button()
        const user = await User.findById(message.author.id)

        const bosses = {
            'cleiton trovoada': async () => {
                embed.setTitle('Cleiton Trovoada')
                embed.setThumbnail('https://imgur.com/7pZAh67.png')
                embed.setDescription(this.locale.get('commands.boss.cleiton.description'))

                button.setStyle('RED')
                button.setLabel(this.locale.get('commands.boss.button.label'))
                button.setCustomID('cleiton-trovoada')

                if (new Date().getDay() !== 1) button.setDisabled()

                var msg = await message.reply(
                    {
                        embed,
                        components: [
                            {
                                type: 1,
                                components: [button]
                            }
                        ]
                    }
                )

                this.client.on('interactionCreate', async interaction => {
                    if (interaction instanceof ComponentInteraction) {
                        if (interaction.data.custom_id !== 'cleiton-trovoada') return
                        if (interaction.message.id !== msg.id) return
                        if (interaction.member.id !== message.author.id) return interaction.deferUpdate()

                        if (!user.usingWeapon.weapon) return interaction.createMessage(
                            {
                                content: this.locale.get('commands.boss.dont_have_weapon'),
                                flags: 64
                            }
                        )

                        await interaction.deferUpdate()
                        await msg.delete()
                        
                        message.reply('commands.boss.summoning')

                        new BossBattle(interaction, user.id, this.locale, interaction.channel, 'cleiton', interaction.member)
                        .start()
                    }
                })
            },
            vladimir: async () => {
                embed.setTitle('Vladimir')
                embed.setThumbnail('https://imgur.com/YCQAlba.png')
                embed.setDescription(this.locale.get('commands.boss.vladimir.description'))

                button.setStyle('RED')
                button.setLabel(this.locale.get('commands.boss.button.label'))
                button.setCustomID('vladimir')

                if (new Date().getDay() !== 5) button.setDisabled()

                var msg = await message.reply(
                    {
                        embed,
                        components: [
                            {
                                type: 1,
                                components: [button]
                            }
                        ]
                    }
                )

                this.client.on('interactionCreate', async interaction => {
                    if (interaction instanceof ComponentInteraction) {
                        if (interaction.data.custom_id !== 'vladimir') return
                        if (interaction.message.id !== msg.id) return
                        if (interaction.member.id !== message.author.id) return interaction.deferUpdate()

                        if (!user.usingWeapon.weapon) return interaction.createMessage(
                            {
                                content: this.locale.get('commands.boss.dont_have_weapon'),
                                flags: 64
                            }
                        )

                        await interaction.deferUpdate()
                        await msg.delete()
                        
                        message.reply('commands.boss.summoning')

                        new BossBattle(interaction, user.id, this.locale, interaction.channel, 'vladimir', interaction.member)
                        .start()
                    }
                })
            }
        }

        if (!bosses[message.args.join(' ')]) return message.reply('helper.invalid_arg', { try: `${message.guild.db.prefix}boss cleiton trovoada/vladimir` })

        const execute = bosses[message.args.join(' ')]
        execute()
    }
}