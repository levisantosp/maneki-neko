const {Command, Embed, Button} = require("../../structures");

module.exports = class extends Command {
    constructor() {
        super({
            name: "help",
            aliases: ["ajuda", "comandos", "commands", "cmds"],
            description: "List of commands",
            category: "util",
            botPermissions: ["embedLinks"]
        });
    }
    async run(message) {
        const embed = new Embed();
        embed.setTitle(this._locale.get("helpTitle"));
        embed.setDescription(this._locale.get("helpDescription"));
        embed.setThumbnail(this.client.user.avatarURL);
        embed.setColor("0x7289DA");
        const categories = this.client.commands.map(cmd => cmd.category).filter((x, y, z) => z.indexOf(x) === y);
        categories.forEach(category => {
            var commands = this.client.commands.filter(cmd => cmd.category === category).sort((x, y) => x.name.localeCompare(y.name)).map(cmd => `\`${message.guild.db.prefix}${cmd.name}\``).join(", ");
            switch(message.guild.db.lang) {
                case "pt":
                    if(category === "util") category = "Utilitários"
                    if(category === "economy") category = "Economia"
                    if(category === "misc") category = "Miscelânea"
                    if(category === "config") category = "Configuração"
                        break
                default:
                    if(category === "util") category = "Utilities"
                    if(category === "economy") category = "Economy"
                    if(category === "misc") category = "Miscellaneous"
                    if(category === "config") category = "Setup"
            }
            if(category) embed.addField(category, commands);
        });
        const button = new Button();
        button.setStyle("LINK");
        button.setLabel(this._locale.get("helpButtonLabel"));
        button.setURL("https://discord.gg/7UeV8jFz6m");
        message.reply({embeds: [embed], components: [{
            type: 1,
            components: [button]
        }]});
    }
}