import { CommandInteraction, Message } from 'eris'
import App from './App'

export interface CommandOptions {
    message: Message
    interaction: CommandInteraction
}

export default class Command {
    name: string
    aliases: string[]
    description: string
    category: string
    syntax: string
    examples: string[]
    onlyOwner: boolean
    permissions: string[]
    botPermissions: string[]
    client?: App

    constructor(options) {
        this.name = options.name
        this.aliases = options.aliases
        this.description = options.description
        this.category = options.category
        this.syntax = options.syntax
        this.examples = options.examples
        this.onlyOwner = options.onlyOwner || false
        this.permissions = options.permissions || []
        this.botPermissions = options.botPermissions || []
    }
    async run ({}: CommandOptions) {}
}