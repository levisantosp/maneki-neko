const {Command} = require("../../structures");
const {User} = require("../../../../database");

module.exports = class extends Command {
    constructor() {
        super({
            name: "granex",
            aliases: ["money", "bal", "balance", "atm"],
            description: "View your granex",
            category: "economy"
        });
    }
    async run(message) {
        const u = await this.getUser(message.args[0] ?? message.author.mention);
        const user = await User.findById(u.id);
        if(!user) return message.reply("userIsNotInDatabase");
        message.reply(user.id === message.author.id ? "yourgranex" : "hisgranex", {
            granex: user.granex.toLocaleString(),
            user: u.mention
        });
    }
}