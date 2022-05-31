const {Command, Button} = require("../../structures");
const {User, Bank} = require("../../../../database");
const {ComponentInteraction} = require("eris");

module.exports = class extends Command {
    constructor() {
        super({
            name: "pay",
            aliases: ["pagar"],
            description: "Give asuras to somebody",
            category: "economy"
        });
    }
    async run(message) {
        const member = this.getMember(message.args[0]);
        if(!member) return message.reply("invalidUser");
        if(!message.args[1] || isNaN(message.args[1]) || member.id == message.member.id) return message.reply("invalidArg", {try: `${message.guild.db.prefix}pay <user> <amount>`});
        const user = await User.findById(message.member.id);
        const toUser = await User.findById(member.id);
        const bank = await Bank.findById("bank") || new Bank({_id: "bank"});
        if(user?.asuras < message.args[1]) return message.reply("youDontHaveAsuras");
        if(!toUser) return message.reply("userIsNotInDatabase");
        if(message.args[1] < 100) return message.reply("tooLittle");

        const button = new Button();
        button.setStyle("GREEN");
        button.setLabel("Confirm");
        button.setCustomID("confirm");
        const msg = await message.replyC("payConfirm", {
            asuras: message.args[1].toLocaleString(),
            user: member.mention,
            components: [{
                type: 1,
                components: [button]
            }]
        });
        this.client.on("interactionCreate", async interaction => {
            if(interaction instanceof ComponentInteraction) {
                if(interaction.data.custom_id !== "confirm") return;
                if(interaction.channel.id !== message.channel.id) return;
                if(interaction.message.id !== msg.id) return;
                if(interaction.member.id !== message.member.id) return interaction.deferUpdate();
                await interaction.deferUpdate();
                await msg.delete();
                var rate = Number.parseInt(message.args[1]*0.1);
                var asuras = Number(message.args[1]-rate);
                bank.asuras += rate;
                user.asuras -= message.args[1];
                toUser.asuras += asuras;
                bank.save();
                user.save();
                toUser.save();
                message.reply("payConfirmed");
            }
        });
    }
}