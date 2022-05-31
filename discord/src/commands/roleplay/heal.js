const {Command} = require('../../structures');
const {User, Bank} = require('../../../../database');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'heal',
            aliases: ['curar'],
            description: 'Heal or restore a user\'s life',
            category: 'Roleplay'
        });
    }
    async run(message) {
        const user = await User.findById(message.author.id);
        const bank = await Bank.findById('bank');
        if(user?.job !== 'fireman') return;
        const member = this.getMember(message.args[0]);
        if(!member || member.id === message.member.id) return message.reply('invalidUser');
        const toUser = await User.findById(member.id);
        if(toUser) return message.reply('userIsNotInDatabase');
        if(toUser.energy < 1) toUser.energy = 400;
        else toUser.energy = 2000;
        toUser.save();
        user.asuras += 5000 - (5000 * 0.1);
        bank.asuras += 5000 * 0.1;
        bank.save();
        message.reply('userHealed');
        user.exp += 250;
        if(user.exp > user.xpRequired) {
            user.level += 1;
            user.xpRequired += 136;
            user.exp = 0;
            message.channel.createMessage(this._locale.get('levelUp', {level: user.level}));
        }
        user.save();
    }
}