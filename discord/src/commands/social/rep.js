const {Command} = require('../../structures');
const {User} = require('../../../../database');

module.exports = class RepCommand extends Command {
    constructor() {
        super({
            name: 'rep',
            aliases: ['reputation'],
            description: 'Give a reputation for somebody',
            syntax: 'rep [user]',
            examples: [
                'rep @Levi_',
                'rep 441932495693414410'
            ],
            category: 'social'
        });
    }
    async run(message) {
        const member = await this.getUser(message.args[0]);
        if(!member || member.id == message.author.id) return message.reply('invalidUser');
        const user = await User.findById(message.member.id);
        const toUser = await User.findById(member.id);
        if(!toUser) return message.reply('userIsNotInDatabase');
        if(user.repTime > Date.now()) {
            return message.reply('repAlreadyGiven', {remaining: user.repTime});
        }
        toUser.reps += 1;
        user.repTime = Date.now() + 3.6e+6;
        toUser.save();
        user.save();
        message.reply('repGiven', {user: member.mention});
    }
}