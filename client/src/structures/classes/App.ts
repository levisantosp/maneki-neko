import { Client, ClientOptions } from 'eris'
import { readdirSync } from 'fs'
import { connect } from 'mongoose'
import { Logger } from '..'

export default class App extends Client {
	commands: Map<string, any>
	aliases: Map<string, any>

	constructor(token: string, options: ClientOptions) {
		super(token, options)
		this.commands = new Map()
		this.aliases = new Map()
	}
	async login() {
		var commandModule = readdirSync('client/src/commands')

		commandModule.forEach(module => {
			var commands = readdirSync(`client/src/commands/${module}`)

			commands.forEach(async cmd => {
				const Command = await import(`../../commands/${module}/${cmd}`)
				const command = new Command.default(this)

				this.commands.set(command.name, command)
			})
		})
		var listenerType = readdirSync('client/src/listeners')

		listenerType.forEach(type => {
			var listeners = readdirSync(`client/src/listeners/${type}`)

			listeners.forEach(async listen => {
				const Listener = await import(`../../listeners/${type}/${listen}`)
				const listener = new Listener.default(this)

				Logger.warn(`[${listener.name}] listener loaded sucessfully`)
				this.on(listener.name, (...args) => listener.on(...args).catch((err: string) => new Logger(this).error(err)))
			})
		})

		await connect(process.env.MONGO_URI as string)
		await Logger.send('Database connected sucessfully')

		this.connect()
	}
}

export const app = new App(process.env.TOKEN as string, {
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