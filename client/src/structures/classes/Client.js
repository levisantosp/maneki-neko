const { Client, Collection } = require('eris')
const { readdirSync } = require('fs')
const { connect } = require('mongoose')
const Logger = require('../util/Logger')

class App extends Client {
    constructor(token, options) {
        super(token, options)
        this.slashCommands = new Collection()
        this.commands = new Collection()
        this.aliases = new Collection()
    }
    async login() {
        var commandModule = readdirSync('client/src/commands/normal')
        var slashModule = readdirSync('client/src/commands/slash')

        commandModule.forEach(module => {
            var commands = readdirSync(`client/src/commands/normal/${module}`)

            commands.forEach(cmd => {
                const Command = require(`../../commands/normal/${module}/${cmd}`)
                const command = new Command()

                this.commands.set(command.name, command)

                if (command.aliases) {
                    command.aliases.forEach(alias => {
                        this.aliases.set(alias, command.name)
                    })
                }
            })
        })

        slashModule.forEach(module => {
            var commands = readdirSync(`client/src/commands/slash/${module}`)

            commands.forEach(cmd => {
                const Command = require(`../../commands/slash/${module}/${cmd}`)
                const command = new Command()

                this.slashCommands.set(command.name, command)
            })
        })

        var listenerType = readdirSync('client/src/listeners')

        listenerType.forEach(type => {
            var listeners = readdirSync(`client/src/listeners/${type}`)

            listeners.forEach(listen => {
                const Listener = require(`../../listeners/${type}/${listen}`)
                const listener = new Listener(this)

                Logger.warn(`[${listener.name}] listener loaded sucessfully`)
                this.on(listener.name, (...args) => listener.on(...args).catch(err => new Logger(this).error(err)))
            })
        })
        await connect(process.env.MONGO_URI)
        await Logger.send('Database connected sucessfully')
        
        this.connect()
    }
}
module.exports = new App(process.env.TOKEN, {
    restMode: true,
    compress: true,
    defaultImageFormat: 'png',
    defaultImageSize: 4096,
    allowedMentions: {
        repliedUser: true,
        users: true,
        roles: true,
        everyone: false
    },
    intents: ['all']
})