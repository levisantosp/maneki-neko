import { App, Command, CommandOptions } from '../../structures'

export default class PingCommand extends Command {
    constructor(client: App) {
        super({
            name: 'ping',
            description: 'Bot latency',
            description_localizations: {
                'pt-BR': 'Latência do Bot'
            },
            category: 'misc',
            client
        })
    }

    async run ({ interaction }: CommandOptions) {
        
    }
}