const {Command} = require('../../structures');
const {User, Bank} = require('../../../../database');

module.exports = class RobCommand extends Command {
    constructor() {
        super({
            name: 'rob',
            aliases: ['roubar'],
            description: 'Rob a server member',
            category: 'economy'
        });
    }
    async run(message) {
        const member = this.getMember(message.args[0]);
        if(!member) return message.reply('invalidUser');
        const user = await User.findById(message.member.id);
        const victim = await User.findById(member.id);
        if(!user.usingWeapon.weapon) return message.reply('needWeapon');
        if(victim.usingBulletProof.protection) user.usingWeapon.damage -= victim.usingBulletProof.protection;
        var array = [message.author.id, member.id];
        var percentual = Math.floor(Math.random() * 100) + 1;
        var index;
        switch(user.usingWeapon.weapon) {
            case '9mm': index            = ((percentual >= 90) ? 0 : 1);
                break;
            case 'pt100': index          = ((percentual >= 85) ? 0 : 1);
                break;
            case 'glock': index          = ((percentual >= 80) ? 0 : 1);
                break;
            case 'mt-40': index          = ((percentual >= 75) ? 0 : 1);
                break;
            case 'uzi': index            = ((percentual >= 70) ? 0 : 1);
                break;
            case 'mp5': index            = ((percentual >= 65 ? 0 : 1));
                break;
            case 'ump': index            = ((percentual >= 60) ? 0 : 1);
                break;
            case 'carabina ct-40': index = ((percentual >= 55) ? 0 : 1);
                break;
            case 'carabina 556': index   = ((percentual >= 50) ? 0 : 1);
                break;
            case 'parafal': index        = ((percentual >= 45) ? 0 : 1);
                break;
            case 'm4a1': index           = ((percentual >= 40) ? 0 : 1);
                break;
            case 'ak-9': index           = ((percentual >= 35) ? 0 : 1);
                break;
            case 'ak-47': index          = ((percentual >= 30) ? 0 : 1);
                break;
            case 'akm': index            = ((percentual >= 25) ? 0 : 1);
                break;
            case 'scar': index           = ((percentual >= 20) ? 0 : 1);
        }
        var result = array[index];
        if(victim.granex < 100) result = member.id;
        if(result == message.author.id) {
            var value = Number.parseInt(victim.granex * 0.1);
            user.energy -= 300;
            user.granex += value;
            victim.energy -= user.usingWeapon.damage;
            victim.granex -= value;
            if(user.energy < 1) user.deadAt = Date.now() + 3.6e+6;
            if(victim.energy < 1) victim.deadAt = Date.now() + 3.6e+6;
            user.save();
            victim.save();
            message.reply('successfulRobbery', {value: value.toLocaleString()});
        }
        else {
            const bank = await Bank.findById('bank');
            user.energy -= 500;
            user.granex -= 5000;
            bank.granex += 5000;
            if(user.energy < 1) user.deadAt = Date.now() + 3.6e+6;
            user.save();
            bank.save();
            message.reply('unsuccessfulRobbery', {value: (5000).toLocaleString()});
        }
    }
}