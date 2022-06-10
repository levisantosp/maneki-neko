const {Command} = require("../../structures");
const {User} = require("../../../../database");
const {Rank} = require("canvacord");

module.exports = class LevelCommand extends Command {
    constructor() {
        super({
            name: "level",
            description: "Show your level",
            category: "social",
            botPermissions: ["attachFiles"]
        });
    }
    async run(message) {
        const member = await this.getUser(message.args[0] ?? message.author.mention);
        const users = await User.find({level: {$gt: -1}});
        const user = await User.findById(member?.id);
        if(!user) return message.reply("userIsNotInDatabase");
        users.sort((a, b) => {
            if(a.level === b.level) return b.exp - a.exp;
            else return b.level - a.level;
        });
        let pos = users.findIndex(x => x.id === user.id) + 1;
        const rank = new Rank();
        rank.setAvatar(member.avatarURL);
        rank.setCurrentXP(user.exp);
        rank.setRequiredXP(user.xpRequired);
        rank.setProgressBar("#aeb4f1");
        rank.setUsername(member.username);
        rank.setDiscriminator(member.discriminator);
        rank.setLevel(user.level);
        rank.setRank(pos);
        rank.setBackground("COLOR", "#aeb4f1");
        
        const data = await rank.build();
        message.replyF("", {
            file: data,
            name: "level.png"
        });
    }
}