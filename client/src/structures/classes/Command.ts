import { CommandInteraction } from 'eris'
import App from './App'

export interface CommandOptions {
    interaction: CommandInteraction
}

export interface ICommandOptions {
    name: string
    name_localizations?: {
        'pt-BR': string
    }
    description: string
    description_localizations?: {
        'pt-BR': string
    }
    options?: object[]
    category?: string
    onlyOwner?: boolean
    permissions?: string[]
    botPermissions?: string[]
    client: App
}

export default class Command {
    name: string
    name_localizations?: {
        'pt-BR': string
    }
    description: string
    description_localizations?: {
        'pt-BR': string
    }
    options?: object[]
    category?: string
    onlyOwner?: boolean
    permissions?: string[]
    botPermissions?: string[]
    client: App

    constructor(options: ICommandOptions) {
        this.name = options.name
        this.name_localizations = options.name_localizations
        this.description = options.description
        this.description_localizations = options.description_localizations
        this.options = options.options
        this.category = options.category
        this.onlyOwner = options.onlyOwner
        this.permissions = options.permissions || []
        this.botPermissions = options.botPermissions || []
        this.client = options.client
    }

    async run ({ }: CommandOptions) {}
}