const { Command, Embed, Button } = require('../../structures')
const { ComponentInteraction } = require('eris')
const { User, Bank } = require('../../../../database')

module.exports = class ShopCommand extends Command {
    constructor() {
        super({
            name: 'shop',
            aliases: ['loja', 'store'],
            description: 'View the itens available in the shop',
            category: 'economy',
            botPermissions: ['embedLinks']
        })
    }
    async run(message) {
        const hours = new Date().getHours()

        if (hours < 6 || hours >= 20) return message.reply('commands.shop.closed')

        const weapon = new Button()
            .setStyle('GRAY')
            .setEmoji('🔫')
            .setCustomID('weapons')

        const food = new Button()
            .setStyle('GRAY')
            .setEmoji('🍔')
            .setCustomID('foods')

        const vehicle = new Button()
            .setStyle('GRAY')
            .setEmoji('🚗')
            .setCustomID('vehicles')

        const button = new Button()
            .setStyle('GRAY')
            .setEmoji('🌾')
            .setCustomID('farm')

        const template = new Button()
            .setStyle('GRAY')
            .setEmoji('🖼️')
            .setCustomID('templates')

        var msg = await message.replyC('commands.shop.choose', {
            components: [{
                type: 1,
                components: [weapon, food, vehicle, button, template]
            }]
        })

        this.client.on('interactionCreate', async interaction => {
            if (interaction instanceof ComponentInteraction) {
                if (interaction.channel.id !== message.channel.id) return

                const bank = await Bank.findById('bank')
                const user = await User.findById(interaction.member.id)
                if (!user) return interaction.deferUpdate()

                await interaction.defer(64)

                const embed = new Embed()

                switch (interaction.data.custom_id) {
                    case 'weapons': {
                        embed.setTitle(this.locale.get('commands.shop.embed.weapons.title'))
                        embed.setDescription(this.locale.get('commands.shop.embed.weapons.description', { usage: `${message.guild.db.prefix}buy [weapon]` }))
                        interaction.createMessage(embed.build())
                    }
                        break
                    case 'foods': {
                        embed.setTitle(this.locale.get('commands.shop.embed.foods.title'))
                        embed.setDescription(this.locale.get('commands.shop.embed.foods.description', { usage: `${message.guild.db.prefix}buy [food]` }))
                        interaction.createMessage(embed.build())
                    }
                        break
                    case 'vehicles': {
                        embed.setTitle(this.locale.get('commands.shop.embed.vehicles.title'))
                        embed.setDescription(this.locale.get('commands.shop.embed.vehicles.description', { usage: `${message.guild.db.prefix}buy [vehicle]` }))
                        interaction.createMessage(embed.build())
                    }
                        break
                    case 'farm': {
                        embed.setTitle(this.locale.get('commands.shop.embed.farm.title'))
                        embed.setDescription(this.locale.get('commands.shop.embed.farm.description', { usage: `${message.guild.db.prefix}buy [farm/item]` }))
                        interaction.createMessage(embed.build())
                    }
                        break
                    case 'templates': {
                        embed.setTitle('Templates')
                        embed.setDescription(this.locale.get('commands.shop.embed.templates.description', { usage: `${message.guild.db.prefix}buy [template]` }))

                        const green = new Button()
                            .setStyle('GRAY')
                            .setEmoji('1020041161332752476')
                            .setCustomID('green-template')

                        const red = new Button()
                            .setStyle('GRAY')
                            .setEmoji('1020041283688992838')
                            .setCustomID('red-template')

                        const yellow = new Button()
                            .setStyle('GRAY')
                            .setEmoji('1020041345563373659')
                            .setCustomID('yellow-template')

                        const orange = new Button()
                            .setStyle('GRAY')
                            .setEmoji('1020041215783223418')
                            .setCustomID('orange-template')

                        interaction.createMessage(
                            {
                                embed,
                                components: [
                                    {
                                        type: 1,
                                        components: [green, red, yellow, orange]
                                    }
                                ]
                            }
                        )
                    }
                        break
                    case 'green-template': {
                        if (user.granex < 1000) return interaction.createMessage(this.locale.get('helper.you_dont_have_granex'))
                        if (user.templates.includes('green') || user.profileTemplate === 'green') return interaction.createMessage(this.locale.get('commands.shop.you_already_have_this'))

                        user.granex -= 1000
                        user.templates.push('green')

                        bank.granex += 1000

                        bank.save()
                        user.save()

                        interaction.createMessage(this.locale.get('commands.buy.item_bought'))
                    }   
                        break
                    case 'red-template': {
                        if (user.granex < 2500) return interaction.createMessage(this.locale.get('helper.you_dont_have_granex'))
                        if (user.templates.includes('red') || user.profileTemplate === 'red') return interaction.createMessage(this.locale.get('commands.shop.you_already_have_this'))

                        user.granex -= 2500
                        user.templates.push('red')

                        bank.granex += 2500

                        bank.save()
                        user.save()

                        interaction.createMessage(this.locale.get('commands.buy.item_bought'))
                    }
                        break
                    case 'yellow-template': {
                        if (user.granex < 5000) return interaction.createMessage(this.locale.get('helper.you_dont_have_granex'))
                        if (user.templates.includes('yellow') || user.profileTemplate === 'yellow') return interaction.createMessage(this.locale.get('commands.shop.you_already_have_this'))

                        user.granex -= 5000
                        user.templates.push('yellow')

                        bank.granex += 5000

                        bank.save()
                        user.save()

                        interaction.createMessage(this.locale.get('commands.buy.item_bought'))
                    }
                        break
                    case 'orange-template': {
                        if (user.granex < 10000) return interaction.createMessage(this.locale.get('helper.you_dont_have_granex'))
                        if (user.templates.includes('orange') || user.profileTemplate === 'orange') return interaction.createMessage(this.locale.get('commands.shop.you_already_have_this'))

                        user.granex -= 10000
                        user.templates.push('orange')

                        bank.granex += 10000

                        bank.save()
                        user.save()

                        interaction.createMessage(this.locale.get('commands.buy.item_bought'))
                    }
                }
            }
        })
    }
}