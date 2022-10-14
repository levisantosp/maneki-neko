import { CommandInteraction, ComponentInteraction, Guild, Message } from 'eris'
import App from './App'

interface ListenerOptions {
    name: string
    client: App
}

export interface IListenerOptions {
    message: Message
    interaction: ComponentInteraction | CommandInteraction
    guild: Guild
}

export default class Listener {
    name: string
    client: App

    constructor(options: ListenerOptions) {
        this.name = options.name
        this.client = options.client
    }
    async on ({ }: IListenerOptions) {}
}