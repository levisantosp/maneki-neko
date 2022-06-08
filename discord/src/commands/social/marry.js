const {Command, Button} = require("../../structures");
const {User, Bank} = require("../../../../database");
const {ComponentInteraction} = require("eris");

module.exports = class MarryCommand extends Command {
    constructor() {
        super({
            name: "marry",
            aliases: ["casar"],
            description: "Marry the person you love (?)",
            category: "social"
        });
    }
    async run(message) {
        const member = this.getMember(message.args[0]);
        if(!member || member.id === message.member.id) return message.reply("invalidUser");
        const user = await User.findById(message.author.id);
        const toUser = await User.findById(member.id);
        const bank = await Bank.findById("bank");
        if(user?.marriedWith) return message.reply("alreadyMarried");
        if(toUser?.marriedWith) return message.reply("alreadyMarried2", {user: member.mention});
        if(user?.granex < 5000) return message.reply("noGranex");
        if(toUser?.granex < 5000) return message.reply("noGranex");

        const confirm = new Button();
        confirm.setStyle("GREEN");
        confirm.setLabel(this._locale.get("accept"));
        confirm.setCustomID("confirm");
        var msg = await message.replyC("marrieageRequest", {
            components: [{
                type: 1,
                components: [confirm]
            }],
            author: message.author.mention,
            user: member.mention
        });
        this.client.on("interactionCreate", async interaction => {
            if(interaction instanceof ComponentInteraction) {
                if(interaction.data.custom_id !== "confirm") return;
                if(interaction.channel.id !== message.channel.id) return;
                if(interaction.message.id !== msg.id) return;
                if(interaction.member.id !== member.id) return interaction.deferUpdate();
                await msg.delete();
                bank.granex += 10000;
                user.granex -= 5000;
                user.marriedWith = toUser.id;
                user.marryTime = Date.now();
                toUser.granex -= 5000;
                toUser.marriedWith = user.id;
                toUser.marryTime = Date.now();
                bank.save();
                user.save();
                toUser.save();
                message.reply("gotMarried");
            }
        });
    }
}