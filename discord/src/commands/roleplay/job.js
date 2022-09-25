const { Command, Embed, SelectMenu } = require('../../structures')
const { User } = require('../../../../database')
const { ComponentInteraction } = require('eris')

module.exports = class JobCommand extends Command {
    constructor() {
        super({
            name: 'job',
            aliases: ['emprego'],
            description: 'Get a job, yay',
            category: 'Roleplay',
            botPermissions: ['embedLinks']
        })
    }
    async run (message) {
        const embed = new Embed()
        embed.setTitle(this.locale.get('commands.job.embed.title'))
        embed.addField(this.locale.get('commands.job.embed.field.trashman'), this.locale.get('commands.job.embed.description.trashman'), true)
        embed.addField(this.locale.get('commands.job.embed.field.newsagent'), this.locale.get('commands.job.embed.description.newsagent'), true)
        embed.addField('Uber Eats', this.locale.get('commands.job.embed.description.ubereats'), true)
        embed.addField('Uber', this.locale.get('commands.job.embed.description.uber'), true)
        embed.addField(this.locale.get('commands.job.embed.field.tanker'), this.locale.get('commands.job.embed.description.tanker'), true)
        embed.addField(this.locale.get('commands.job.embed.field.trucker'), this.locale.get('commands.job.embed.description.trucker'), true)
        embed.addField(this.locale.get('commands.job.embed.field.postoffice'), this.locale.get('commands.job.embed.description.postoffice'), true)
        embed.addField(this.locale.get('commands.job.embed.field.fireman'), this.locale.get('commands.job.embed.description.fireman'), true)
        embed.addField(this.locale.get('commands.job.embed.field.police'), this.locale.get('commands.job.embed.description.police'), true)
        embed.addField(this.locale.get('commands.job.embed.field.mafiaboss'), this.locale.get('commands.job.embed.description.mafiaboss'), true)
        embed.addField(this.locale.get('commands.job.embed.field.lawyer'), this.locale.get('commands.job.embed.description.lawyer'), true)
        embed.addField(this.locale.get('commands.job.embed.field.farmer'), this.locale.get('commands.job.embed.description.farmer'), true)

        const menu = new SelectMenu()
        menu.setPlaceholder(this.locale.get('commands.job.menu.placeholder'))
        menu.addOption(this.locale.get('commands.job.embed.field.trashman'), this.locale.get('commands.job.embed.description.trashman'), 'trashman')
        menu.addOption(this.locale.get('commands.job.embed.field.newsagent'), this.locale.get('commands.job.embed.description.newsagent'), 'newsagent')
        menu.addOption('Uber Eats', this.locale.get('commands.job.embed.description.ubereats'), 'ubereats')
        menu.addOption('Uber', this.locale.get('commands.job.embed.description.uber'), 'uber')
        menu.addOption(this.locale.get('commands.job.embed.field.tanker'), this.locale.get('commands.job.embed.description.tanker'), 'tanker')
        menu.addOption(this.locale.get('commands.job.embed.field.trucker'), this.locale.get('commands.job.embed.description.trucker'), 'trucker')
        menu.addOption(this.locale.get('commands.job.embed.field.postoffice'), this.locale.get('commands.job.embed.description.postoffice'), 'postoffice')
        menu.addOption(this.locale.get('commands.job.embed.field.fireman'), this.locale.get('commands.job.embed.description.fireman'), 'fireman')
        menu.addOption(this.locale.get('commands.job.embed.field.police'), this.locale.get('commands.job.embed.description.police'), 'police')
        menu.addOption(this.locale.get('commands.job.embed.field.mafiaboss'), this.locale.get('commands.job.embed.description.mafiaboss'), 'mafiaboss')
        menu.addOption(this.locale.get('commands.job.embed.field.lawyer'), this.locale.get('commands.job.embed.description.lawyer'), 'lawyer')
        menu.addOption(this.locale.get('commands.job.embed.field.farmer'), this.locale.get('commands.job.embed.description.farmer'), 'farmer')
        menu.setCustomID('menu-job')

        const msg = await message.reply({
            embed,
            components: [{
                type: 1,
                components: [menu]
            }]
        })

        this.client.on('interactionCreate', async interaction => {
            if (interaction instanceof ComponentInteraction) {
                if (interaction.data.custom_id !== 'menu-job') return
                if (interaction.channel.id !== message.channel.id) return
                if (interaction.message.id !== msg.id) return

                await interaction.defer(64)

                const user = await User.findById(interaction.member.id) || new User({ _id: interaction.member.id })
                switch (interaction.data.values[0]) {
                    case 'trashman':
                        user.job = 'trashman'
                        user.save()
                        
                        interaction.createMessage(this.locale.get('commands.job.reply', { job: this.locale.get('helper.jobs.trashman') }))
                        break
                    case 'newsagent':
                        if (user.level < 5) return interaction.createMessage(this.locale.get('commands.job.no_level', { level: 5 }))

                        user.job = 'newsagent'
                        user.save()

                        interaction.createMessage(this.locale.get('commands.job.reply', { job: this.locale.get('helper.jobs.newsagent') }))
                        break
                    case 'ubereats':
                        if (user.level < 10) return interaction.createMessage(this.locale.get('commands.job.no_level', { level: 10 }))
                        if (!user.hasMotorcycle) return interaction.createMessage(this.locale.get('commands.job.no_motorcycle'))

                        user.job = 'ubereats'
                        user.save()

                        interaction.createMessage(this.locale.get('commands.job.reply', { job: 'Uber Eats' }))
                        break
                    case 'uber':
                        if (user.level < 15) return interaction.createMessage(this.locale.get('commands.job.no_level', { level: 15 }))
                        if (!user.hasCar) return interaction.createMessage(this.locale.get('commands.job.no_car'))

                        user.job = 'uber'
                        user.save()

                        interaction.createMessage(this.locale.get('commands.job.reply', { job: 'Uber' }))
                        break
                    case 'tanker':
                        if (user.level < 20) return interaction.createMessage(this.locale.get('commands.job.no_level', { level: 20 }))

                        user.job = 'tanker'
                        user.save()

                        interaction.createMessage(this.locale.get('commands.job.reply', { job: this.locale.get('helper.jobs.tanker') }))
                        break
                    case 'trucker':
                        if (user.level < 25) return interaction.createMessage(this.locale.get('commands.job.no_level', { level: 25 }))
                        if (!user.hasTruck) return interaction.createMessage(this.locale.get('commands.job.no_truck'))

                        user.job = 'trucker'
                        user.save()

                        interaction.createMessage(this.locale.get('commands.job.reply', { job: this.locale.get('helper.jobs.trucker') }))
                        break
                    case 'postoffice':
                        if (user.level < 30) return interaction.createMessage(this.locale.get('commands.job.no_level', { level: 30 }))

                        user.job = 'postoffice'
                        user.save()

                        interaction.createMessage(this.locale.get('commands.job.reply', { job: this.locale.get('helper.jobs.postoffice') }))
                        break
                    case 'fireman':
                        if (user.certificates.includes('fireman')) return
                        if (user.level < 35) return interaction.createMessage(this.locale.get('commands.job.no_level', { level: 35 }))

                        user.certificates.push('fireman')
                        user.save()

                        interaction.createMessage(this.locale.get('commands.job.reply2', { job: this.locale.get('helper.jobs.fireman') }))
                        break
                    case 'police':
                        if (user.certificates.includes('police')) return
                        if (user.level < 40) return interaction.createMessage(this.locale.get('commands.job.no_level', { level: 40 }))

                        user.certificates.push('police')
                        user.save()

                        interaction.createMessage(this.locale.get('commands.job.reply2', { job: this.locale.get('helper.jobs.police') }))
                        break
                    case 'mafiaboss':
                        if (user.level < 45) return interaction.createMessage(this.locale.get('commands.job.no_level', { level: 45 }))

                        user.job = 'mafiaboss'
                        user.save()

                        interaction.createMessage(this.locale.get('commands.job.reply', { job: this.locale.get('helper.jobs.mafiaboss') }))
                        break
                    case 'lawyer':
                        if (user.level < 50) return interaction.createMessage(this.locale.get('commands.job.no_level', { level: 50 }))

                        user.job = 'lawyer'
                        user.save()

                        interaction.createMessage(this.locale.get('commands.job.reply', { job: this.locale.get('helper.jobs.lawyer') }))
                        break
                    case 'farmer':
                        if (user.level < 55) return interaction.createMessage(this.locale.get('commands.job.no_level', { level: 55 }))
                        if (!user.hasFarm) return interaction.createMessage(this.locale.get('commands.job.no_farm'))

                        user.job = 'farmer'
                        user.save()

                        interaction.createMessage(this.locale.get('commands.job.reply', { job: this.locale.get('helper.jobs.farmer') }))
                }
            }
        })
    }
}