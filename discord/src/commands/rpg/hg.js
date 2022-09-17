const { Command, Embed, Button } = require('../../structures')
const { User, Guild } = require('../../../../database')
const { ComponentInteraction } = require('eris')

module.exports = class HGCommand extends Command {
    constructor() {
        super({
            name: 'hg',
            aliases: ['hungergames'],
            description: 'Enter in a battle with another players',
            botPermissions: ['embedLinks', 'manageWebhooks']
        })
    }
    async run(message) {
        const guild = await Guild.findById(message.guild.id)

        if (guild.hg.closed) return message.reply('commands.hg.hg_is_closed')

        const embed = new Embed()
        embed.setTitle('Hunger Games')
        embed.setThumbnail('https://imgur.com/QrRYEgk.png')
        embed.setDescription(this.locale.get('commands.hg.embed.description',
            {
                players: guild.hg.players.length,
                maxPlayers: guild.hg.maxPlayers,
                startsIn: parseInt(guild.hg.startsIn / 1000)
            }
        ))

        const button = new Button()
        button.setStyle('GRAY')
        button.setLabel(this.locale.get('commands.hg.button.label'))
        button.setCustomID('enter-hg')

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
                if (interaction.message.id !== msg.id) return
                if (interaction.data.custom_id !== 'enter-hg') return
                if (interaction.channel.id !== msg.channel.id) return

                await interaction.defer(64)

                const user = await User.findById(interaction.member.id)
                const { hg } = await Guild.findById(message.guild.id)
                const player = hg.players.filter(player => player.id === interaction.member.id)[0]

                if (hg.closed) return interaction.createMessage(this.locale.get('commands.hg.hg_is_closed'))
                if (player) return interaction.createMessage(this.locale.get('commands.hg.you_already_entered'))
                if (!user?.usingWeapon.weapon) return interaction.createMessage(this.locale.get('commands.hg.dont_have_weapon'))

                if (!guild.hg.channelInteract) guild.hg.channelInteract = message.channel.id

                guild.hg.players.push(
                    {
                        id: user.id,
                        usingWeapon: user.usingWeapon,
                        usingBulletProof: user.usingBulletProof,
                        energy: 20000
                    }
                )
                guild.save()

                interaction.createMessage(this.locale.get('commands.hg.entered'))
                if (guild.hg.channelInteract !== message.channel.id) interaction.createFollowup(this.locale.get('commands.hg.entered2', { channel: `<#${guild.hg.channelInteract}>` }))

                embed.setDescription(this.locale.get('commands.hg.embed.description',
                    {
                        players: guild.hg.players.length,
                        maxPlayers: guild.hg.maxPlayers,
                        startsIn: parseInt(guild.hg.startsIn / 1000)
                    }))

                msg.edit({ embed })
            }
        })
    }
}