const {Command} = require('../../structures');
const {User, Bank} = require('../../../../database');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'weekly',
            aliases: ['semanal'],
            description: 'Get your weekly asuras',
            category: 'economy'
        });
    }
    async run(message) {
        const user = await User.findById(message.author.id) || new User({_id: message.author.id});
        const bank = await Bank.findById('bank') || new Bank({_id: 'bank'});
        if(user.weeklyTime > Date.now()) {
            message.reply('weeklyWasCollected', {remaining: user.weeklyTime});
        }
        else {
            var asurasGain = Math.floor(Math.random() * (3000 - 1500) + 1500);
            if(asurasGain > bank.asuras) return message.reply('bankNoAsuras');
            bank.asuras -= asurasGain;
            user.asuras += asurasGain;
            user.weeklyTime = 6.048e+8 + Date.now();
            bank.save();
            user.save();
            message.reply('weeklyCollected', {asurasGain});
        }
    }
}