const {Command} = require("../../structures");
const {User, Bank} = require("../../../../database");

module.exports = class extends Command {
    constructor() {
        super({
            name: "daily",
            aliases: ["diário", "diario", "bolsafamilia"],
            description: "Get your daily asuras",
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
            var asurasGain = Math.floor(Math.random() * (300 - 150) + 150);
            if(asurasGain > bank.asuras) return message.reply("bankNoAsuras");
            bank.asuras -= asurasGain;
            user.asuras += asurasGain;
            user.dailyTime = 8.64e+7 + Date.now();
            bank.save();
            user.save();
            message.reply("dailyCollected", {asurasGain});
        }
    }
}