const {Command} = require("../../structures");
const {User, Bank} = require("../../../../database");

module.exports = class extends Command {
    constructor() {
        super({
            name: "work",
            aliases: ["trabalhar"],
            description: "Work to earn granex and level up",
            category: "Roleplay",
            botPermissions: ["embedLinks"]
        });
    }
    async run(message) {
        const user = await User.findById(message.author.id);
        const bank = await Bank.findById("bank") || new Bank({_id: "bank"});
        if(!user?.job) return message.reply("youDontHaveJob", {usage: `${message.guild.db.prefix}job`});
        if(user.workTime > Date.now()) {
            message.reply("workHasCollected", {remaining: user.workTime});
        }
        else {
            var granexGain;
            var xpGain;
            switch(user.job) {
                case "trashman":
                    granexGain = 100;
                    xpGain = 25;
                        break;
                case "newsagent":
                    granexGain = 150;
                    xpGain = 50;
                        break;
                case "ubereats":
                    granexGain = 200;
                    xpGain = 100;
                        break;
                case "uber":
                    granexGain = 250;
                    xpGain = 150;
                        break;
                case "tanker":
                    granexGain = 300;
                    xpGain = 200;
                        break;
                case "trucker":
                    granexGain = 350;
                    xpGain = 250;
                        break;
                case "postoffice":
                    granexGain = 400;
                    xpGain = 300;
                        break;
                case "fireman":
                    granexGain = 450;
                    xpGain = 350;
                        break;
                case "police":
                    granexGain = 500;
                    xpGain = 400;
                        break;
                case "mafiaboss":
                    granexGain = 550;
                    xpGain = 450;
                        break;
                case "lawyer":
                    granexGain = 600;
                    xpGain = 500;
                        break;
                case "farmer":
                    granexGain = 650;
                    xpGain = 550;
            }
            if(granexGain > bank.granex) return message.reply("bankNoGranex");
            bank.granex -= granexGain;
            user.granex += granexGain;
            user.exp += xpGain;
            user.workTime = Date.now() + 3.6e+6;
            message.reply("youWorked", {granexGain, xpGain, job: this._locale.get(user.job)});
            if(user.exp > user.xpRequired) {
                user.level += 1;
                user.xpRequired += 136;
                user.exp = 0;
                message.channel.createMessage(this._locale.get("levelUp", {level: user.level}));
            }
            user.save();
            bank.save();
        }
    }
}