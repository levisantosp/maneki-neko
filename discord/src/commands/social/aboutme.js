const {Command} = require("../../structures");
const {User} = require("../../../../database");

module.exports = class AboutMeCommand extends Command {
    constructor() {
        super({
            name: "aboutme",
            aliases: ["biography", "bio", "sobremim", "biografia"],
            description: "Set your profile biography",
            category: "social"
        });
    }
    async run(message) {
        var aboutme = message.args.join(" ");
        if(!aboutme) return message.reply("invalidArg", {try: `${message.guild.db.prefix}aboutme <aboutme>`});
        const user = await User.findById(message.author.id);
        user.aboutme = aboutme;
        user.save();
        message.reply("aboutmeChangedTo", {aboutme});
    }
}