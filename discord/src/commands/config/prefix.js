const {Command} = require('../../structures');
const {Guild} = require('../../../../database');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'prefix',
            description: 'Change my default prefix',
            category: 'config',
            permissions: ['manageGuild']
        });
    }
    async run(message) {
        var prefix = message.args[0];
        if(!prefix) return message.reply('invalidArg', {try: `${message.guild.db.prefix}prefix <prefix>`});
        const guild = await Guild.findById(message.guild.id);
        guild.prefix = prefix;
        guild.save();
        message.reply('prefixChangedTo', {prefix});
    }
}