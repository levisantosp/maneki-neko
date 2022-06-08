const {Command} = require("../../structures");
const {User, Bank} = require("../../../../database");

module.exports = class DailyCommand extends Command {
    constructor() {
        super({
            name: "daily",
            aliases: ["diário", "diario", "bolsafamilia"],
            description: "Get your daily granex",
            category: "economy"
        });
    }
    async run(message) {
        const user = await User.findById(message.author.id) || new User({_id: message.author.id});
        const bank = await Bank.findById("bank");
        if(user.dailyTime > Date.now()) {
            message.reply("dailyWasCollected", {remaining: user.dailyTime});
        }
        else {
            var granexGain = Math.floor(Math.random() * (300 - 150) + 150);
            if(granexGain > bank.granex) return message.reply("bankNoGranex");
            bank.granex -= granexGain;
            user.granex += granexGain;
            user.dailyTime = 8.64e+7 + Date.now();
            bank.save();
            user.save();
            message.reply("dailyCollected", {granexGain});
        }
    }
}