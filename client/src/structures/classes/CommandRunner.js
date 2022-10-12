const CommandContext = require('./CommandContext')
const { User, Guild } = require('../../../../database')
const locale = require('../../../../locales')
const Logger = require('../util/Logger')
const { CommandInteraction, Client } = require('eris')

module.exports = class CommandRunner {
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {'pt' | 'en'} locale 
     */
    constructor(interaction, client, locale) {
        this.interaction = interaction
        this.client = client
        this.locale = locale
    }

    /**
     * 
     * @returns {Promise<void>}
     */
    async run () {
        if (!this.interaction.member) return

        const permissions = require(`../../../../locales/${this.locale}/permissions.json`)

        const user = await User.findById(this.interaction.member?.id)
        const guild = await Guild.findById(this.interaction.guildID)
        const db = {
            user,
            guild
        }
        const ctx = new CommandContext({
            interaction: this.interaction,
            client: this.client,
            locale: this.locale,
            db,
            guild: this.interaction.member?.guild
        })

        await this.interaction.defer()

        const command = this.client.slashCommands.get(this.interaction.data.name)
        
        if (!command) return

        if (command.permissions[0]) {
            var arrayPerm = []

            command.permissions.forEach(perm => {
                if (!ctx.interaction.member.permissions.has(perm)) arrayPerm.push(perm)
            })

            if (arrayPerm[0]) return ctx.reply('helper.permissions.user', { permission: arrayPerm.map(perm => permissions[perm]).join(', ') })
        }
        if (command.botPermissions[0]) {
            var arrayPerm = []

            var member = ctx.guild.members.get(this.client.user.id)

            command.permissions.forEach(perm => {
                if (!member.permissions.has(perm)) arrayPerm.push(perm)
            })

            if (arrayPerm[0]) return ctx.reply('helper.permissions.bot', { permission: arrayPerm.map(perm => perm).join(', ') })
        }

        command.locale = {
            get: (content, args) => {
                return locale.get(this.locale, content, args)
            }
        }

        command.getMember = (member) => {
            try {
                if (isNaN(member)) return this.client.guilds.get(this.interaction.guildID).members.get(member.replace(/[<@!>]/g, ''))
                else return ctx.guild.members.get(member)
            }
            catch (err) {
                new Logger(this.client).error(err)
            }
        }
        command.run(ctx).catch(error => {
            new Logger(this.client).error(error)
            ctx.reply('helper.error', { error })
        })
    }
}