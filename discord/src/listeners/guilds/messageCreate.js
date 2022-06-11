const {Listener, Button, Logger} = require("../../structures");
const {Constants, Message, ComponentInteraction} = require("eris");
const {Guild, User, Bank} = require("../../../../database");

module.exports = class MessageCreateListener extends Listener {
    constructor() {
        super({name: "messageCreate"});
    }
    async on(message) {
        if(message instanceof Message) {
            if(message.author.bot) return;
            if(message.channel.type === Constants.ChannelTypes.DM) return;
            await Bank.findById("bank") || new Bank({_id: "bank"});
            const guild = await Guild.findById(message.guildID) || new Guild({_id: message.guildID});
            const user = await User.findById(message.member.id);
            message.reply = function(content, options) {
                const locale = require(`../../../../locales/${guild.lang}`);
                if(typeof content === "string") {
                    return message.channel.createMessage({
                        content: locale.get(content, options),
                        messageReferenceID: message.id
                    });
                }
                else if(typeof content === "object" && !options?.embeds || !options?.components) return message.channel.createMessage(Object.assign(content, {messageReferenceID: message.id}));
                else return message.channel.createMessage({
                    content: locale.get(content, options),
                    messageRefenceID: message.id,
                    components: options.components || [],
                    embeds: options.embeds || []
                });
            }
            message.replyF = function(content, options) {
                const locale = require(`../../../../locales/${guild.lang}`);
                return message.channel.createMessage({
                    content: locale.get(content),
                    messageReferenceID: message.id
                }, {
                    file: options.file,
                    name: options.name
                });
            }
            message.replyC = function(content, options) {
                const locale = require(`../../../../locales/${guild.lang}`);
                return message.channel.createMessage({
                    content: locale.get(content, options),
                    messageReferenceID: message.id,
                    components: options.components,
                    embeds: options.embeds || []
                });
            }
            if(message.content === `<@${this.client.user.id}>` || message.content === `<@!${this.client.user.id}>`) return message.reply("mentionBot", {prefix: guild.prefix});
            if(!message.content.toLowerCase().startsWith(guild.prefix)) return;
            var messageArray = message.content.split(" ");
            var command = messageArray.shift().toLowerCase();
            var args = messageArray.slice(0);
            var cmd = this.client.commands.get(command.slice(guild.prefix.length)) || this.client.commands.get(this.client.aliases.get(command.slice(guild.prefix.length)));
            if(!cmd) return;
            var g = this.client.guilds.get(message.guildID);
            message.args = args;
            message.guild = {
                ...g,
                db: guild
            }
            cmd._locale = require(`../../../../locales/util/${guild.lang}`);
            cmd.locale = require(`../../../../locales/${guild.lang}`);
            var client = message.guild.members.get(this.client.user.id);
            if(cmd.onlyOwner && message.author.id != process.env.OWNER_ID) return;
            if(guild.allowedChannels[0] && !guild.allowedChannels.includes(message.channel.id) && !message.member.permissions.has("manageMessages")) return message.reply("wrongChannel", {tryIn: guild.allowedChannels.map(channel => `<#${channel}>`).join(", ")});
            if(cmd.permissions[0] && !message.member.permissions.has(cmd.permissions)) return message.reply("dontHavePermission", {permission: cmd.permissions});
            if(cmd.botPermissions[0] && !client.permissions.has(cmd.botPermissions)) return message.reply("botDontHavePermission", {permission: cmd.botPermissions});
            if(["Roleplay", "economy"].includes(cmd.category) && user?.energy < 1) {
                const button = new Button();
                button.setStyle("GREEN");
                button.setLabel("Call");
                button.setCustomID("call");
                var msg = await message.replyC("youAreDead", {
                    components: [{
                        type: 1,
                        components: [button]
                    }],
                    remaining: user.deadAt
                });
                this.client.on("interactionCreate", async interaction => {
                    var arrayMembers = [];
                    if(interaction instanceof ComponentInteraction) {
                        if(interaction.data.custom_id != "call") return;
                        if(interaction.channel.id != message.channel.id) return;
                        if(interaction.member.id != message.author.id) return;
                        if(interaction.message.id != msg.id) return;
                        await interaction.defer(64);
                        if(!guild.announcements) return message.reply("noChannelAnnouncements");
                        if(user.granex < 5000) return message.reply("youDontHavegranex");
                        message.guild.members.forEach(member => {
                            if(guild.firemans.includes(member.id)) arrayMembers.push(member);
                        });
                        if(arrayMembers.length == 0) return interaction.createMessage(cmd.locale.get("noFiremans"));
                        interaction.createMessage(cmd.locale.get("firemanOnTheWay"));
                        const bank = await Bank.findById("bank");
                        bank.granex += 5000;
                        user.granex -= 5000;
                        bank.save();
                        user.save();
                        
                        const channel = message.guild.channels.get(guild.announcements);
                        channel.createMessage(cmd._locale.get("firemanAnnouncement", {
                            users: arrayMembers.map(x => x.mention).join(" "), 
                            user: message.author.mention, 
                            channel: message.channel.mention,
                            jumpLink: message.jumpLink
                        }));
                    }
                });
                    return;
            }
            cmd.getUser = async function(args) {
                try {
                    if(isNaN(args)) {
                        return await this.client.getRESTUser(args.replace(/[<@!>]/g, ""));
                    }
                    else return await this.client.getRESTUser(args);
                }
                catch(err) {
                    new Logger(this.client).error(err);
                }
            }
            cmd.getMember = function(args) {
                try {
                    if(isNaN(args)) {
                        return message.guild.members.get(args.replace(/[<@!>]/g, ""));
                    }
                    else return message.guild.members.get(args);
                }
                catch(err) {
                    new Logger(this.client).error(err);
                }
            }
            cmd.run(message).catch(err => {
                message.reply("error", {error: err});
                new Logger(this.client).error(err);
            });
            if(["Roleplay", "economy"].includes(cmd.category)) {
                guild.exp += Math.floor(Math.random() * 100);
                if(guild.exp > guild.xpRequired) {
                    guild.exp = 0;
                    guild.level += 1;
                    guild.xpRequired += 336;
                    if(guild.announcements) {
                        const channel = message.guild.channels.get(guild.announcements);
                        if(guild.level.toString().endsWith("0")) channel.createMessage(cmd._locale.get("guildLevelUp", {level: guild.level}));
                        else channel.createMessage(cmd._locale.get("guildLevelUp2", {level: guild.level}));
                    }
                }
                guild.save();
            }
        }
    }
}