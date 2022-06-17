const {Command} = require('../../structures');
const {User, Bank} = require('../../../../database');

module.exports = class WeeklyCommand extends Command {
    constructor() {
        super({
            name: 'weekly',
            aliases: ['semanal'],
            description: 'Get your weekly granex',
            category: 'economy'
        });
    }
    async run(message) {
        const user = await User.findById(message.author.id) || new User({_id: message.author.id});
        const bank = await Bank.findById('bank');
        if(user.weeklyTime > Date.now()) {
            message.reply('weeklyWasCollected', {remaining: user.weeklyTime});
        }
        else {
            var granexGain = Math.floor(Math.random() * (3000 - 1500) + 1500);
            if(granexGain > bank.granex) return message.reply('bankNoGranex');
            bank.granex -= granexGain;
            user.granex += granexGain;
            user.weeklyTime = 6.048e+8 + Date.now();
            bank.save();
            user.save();
            message.reply('weeklyCollected', {granexGain});
        }
    }
}