const { Command, Button } = require('../../structures')
const { inspect } = require('util')

module.exports = class EvalCommand extends Command {
    constructor() {
        super({
            name: 'eval',
            aliases: ['e', 'ev'],
            onlyOwner: true
        })
    }
    async run (message) {
        try {
            const ev = inspect(eval(message.args.join(' ')))
            message.reply(`\`\`\`js\n${ev.slice(0, 1800)}\`\`\``)
        } catch (e) {
            message.reply(`\`\`\`${e}\`\`\``)
        }
    }
}