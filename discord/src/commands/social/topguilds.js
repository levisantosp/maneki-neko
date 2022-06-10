const {Command, Embed} = require("../../structures");
const {Guild} = require("../../../../database");

module.exports = class TopGuildsCommand extends Command {
    constructor() {
        super({
            name: "topguilds",
            aliases: ["guildstop"],
            description: "View the top guilds with the most level",
            category: "social"
        });
    }
    async run(message) {
        const guilds = await Guild.find({level: {$gt: 0}});
        var a;
        if(message.args[0] == "1" || !message.args[0]) {
            a = 1;
            guilds.sort((a, b) => {
                if(a.level === b.level) return b.exp - a.exp;
                else return b.level - a.level;
            }).slice(0, 10);
        }
        else {
            if(guilds.length*10 < message.args[0]*10) return;
            guilds.sort((a, b) => {
                a = message.args[0]*10-9;
                if(a.level === b.level) return b.exp - a.exp;
                else return b.level - a.level;
            }).slice(message.args[0]*10-10, message.args[0]*10);
        }
        const embed = new Embed();
        embed.setTitle(`Top ${message.args[0] ? message.args[0]*10 : 10} Guilds`);
        for(const guild of guilds) {
            const g = this.client.guilds.get(guild.id);
            embed.addField(`${a++}° \`${g.name} (${g.id})\``, `Level ${guild.level} | ${guild.exp} EXP`);
            embed.setThumbnail(this.client.guilds.get(guilds[0].id).iconURL);
        }
        message.reply(embed.build());
    }
}