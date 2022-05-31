const {Command, Embed, Button} = require("../../structures");

module.exports = class extends Command {
    constructor() {
        super({
            name: "avatar",
            description: "View a user\"s avatar",
            category: "util",
            botPermissions: ["embedLinks"]
        });
    }
    async run(message) {
        var m = this.client.users.get(message.args[0]);
        if(!message.mentions[0] && !message.args[0]) message.mentions.push(message.author);
        else message.mentions.push(m);
        const user = await this.client.getRESTUser(message.mentions[0]?.id ?? message.args[0]);
        const embed = new Embed();
        const button = new Button();
        embed.setTitle(user.username);
        embed.setColor("0x7289DA");
        embed.setImage(user.avatarURL);
        button.setStyle("LINK");
        button.setLabel("Download");
        button.setURL(user.avatarURL);
        message.reply({
            components: [{
                type: 1,
                components: [button]
            }],
            embeds: [embed]
        });
    }
}