const {Command, Embed} = require("../../structures");
const mongoose = require("mongoose");

module.exports = class RankCommand extends Command {
    constructor() {
        super({
            name: "rank",
            aliases: ["ranking", "top"],
            description: "View the top granex",
            category: "social",
            botPermissions: ["embedLinks"]
        });
    }
    async run(message) {
        mongoose.connection.collection("users").find({granex: {$gt: 0}})
        .toArray((err, response) => {
            if(err) throw err;
            var users = response.map(x => x).sort((a, b) => b.granex - a.granex);
            if(message.args[0] && message.args[0] === "1" || !message.args[0]) users = [
                ...users.values()
            ]
            .map(x => {
                return {
                    id: x._id,
                    granex: x.granex
                }
            }).slice(0, 10);
            else users = [
                ...users.values()
            ]
            .map(x => {
                return {
                    id: x._id,
                    granex: x.granex
                }
            }).slice(message.args[0]*10-10, message.args[0]*10);
            if(!users[0]) return;
            const embed = new Embed();
            embed.setTitle(`Top ${message.args[0] ? message.args[0]*10 : 10}`);
            embed.setThumbnail(this.client.users.get(users[0].id).avatarURL);

            var a;
            if(message.args[0]) {
                switch(message.args[0]) {
                    case "1": a = 1;
                        break;
                    default: a = message.args[0]*10-9;
                }
            }
            else a = 1;
            users.forEach(async x => {
                const user = this.client.users.get(x.id);
                embed.addField(`${a++}° ${user.username}#${user.discriminator}`, `${x.granex.toLocaleString()} granex`);
            });
            message.reply(embed.build());
        });
    }
}