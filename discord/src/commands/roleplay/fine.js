const {Command} = require("../../structures");
const {User, Bank} = require("../../../../database");

module.exports = class FineCommand extends Command {
    constructor() {
        super({
            name: "fine",
            aliases: ["multar"],
            description: "Fine a user",
            category: "Roleplay"
        });
    }
    async run(message) {
        const users = await User.find({job: "police"});
        const bank = await Bank.findById("bank");
        for(const user of users) {
            if(user.id != message.author.id) continue;
            const member = this.getMember(message.args[0]);
            if(!member || member.id == message.member.id) return message.reply("invalidUser");
            const vagabundo = await User.findById(member.id);
            if(vagabundo.usingWeapon.weapon && !vagabundo.hasGunLicense) {
                vagabundo.usingWeapon = null;
                vagabundo.granex -= 35000;
                bank.granex += 35000;
                vagabundo.save();
                bank.save();
                message.reply("userFined");
                return;
            }
            var emoji = await this.client.getRESTGuildEmoji("786013941364424704", "869391072051216425")
            return message.addReaction(`${emoji.name}:${emoji.id}`);
        }
    }
}