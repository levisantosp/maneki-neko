const {Command, Button} = require("../../structures");
const {Bank, User} = require("../../../../database");
const {ComponentInteraction} = require("eris");

module.exports = class SellCommand extends Command {
    constructor() {
        super({
            name: "sell",
            aliases: ["vender"],
            description: "Sell an item of yours to someone else",
            category: "Roleplay"
        });
    }
    async run(message) {
        const user = await User.findById(message.author.id);
        const bank = await Bank.findById("bank");
        const args = {
            weapon: function(member, toUser, value, item, client, locale) {
                const hasWeapon = user?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                if(!hasWeapon) return message.reply("missingItem");
                const items = {
                    "9mm": async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    pt100: async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    glock: async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    "mt-40": async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    uzi: async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    mp5: async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    ump: async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    "carabina ct-40": async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    "carabina 556": async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    parafal: async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    m4a1: async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    "ak-9": async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    "ak-47": async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    akm: async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    },
                    scar: async function() {
                        if(toUser.granex < value) return message.reply("dontHavegranex", {user: `<@${toUser.id}>`});

                        const button = new Button();
                        button.setStyle("GREEN");
                        button.setLabel("Accept");
                        button.setCustomID("confirm");
                        var msg = await message.replyC("sellConfirm", {
                            components: [{
                                type: 1,
                                components: [button]
                            }],
                            price: Number(value),
                            author: message.author.mention,
                            user: member.mention
                        });
                        client.on("interactionCreate", async interaction => {
                            if(interaction instanceof ComponentInteraction) {
                                if(interaction.data.custom_id != "confirm") return;
                                if(interaction.channel.id != message.channel.id) return;
                                if(interaction.message.id != msg.id) return;
                                if(interaction.member.id != toUser.id) return;
                                const _hasWeapon = toUser?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
                                if(_hasWeapon) return interaction.createMessage({
                                    content: locale.get("alreadyBought"),
                                    flags: 64
                                });
                                await msg.delete();
                                var index = user?.inventory?.weapons?.indexOf(item);
                                user?.inventory?.weapons?.splice(index, 1);
                                toUser?.inventory?.weapons?.push({...hasWeapon});
                                user.granex += Number.parseInt(value - (value * 0.1));
                                toUser.granex -= Number.parseInt(value - (value * 0.1));
                                bank.granex += Number.parseInt(value * 0.1);
                                user.save();
                                toUser.save();
                                bank.save();
                                message.reply("sellSucess");
                            }
                        });
                    }
                }
                if(!items[item]) return message.reply("invalidArg", {try: `${message.guild.db.prefix}sell [user] weapon [weapon]`});
                const execute = items[item];
                execute();
            },
            farm: function(member, toUser, value, item, client, locale) {

            },
            plant: function(member, toUser, value, item, client, locale) {

            }
        }
        const member = this.getMember(message.args[0]);
        const arg = message.args[1];
        const value = message.args[2];
        const item = message.args.slice(3, 4).join(" ");
        if(!member || member.id === message.author.id) return message.reply("invalidUser");
        if(isNaN(value)) return message.reply("invalidArg", {try: `${message.guild.db.prefix}sell [user] weapon/farm/plant [price] [item]`});
        const toUser = await User.findById(member.id);
        if(!toUser) return message.reply("userIsNotInDatabase");
        if(!args[arg]) return message.reply("invalidArg", {try: `${message.guild.db.prefix}sell [user] weapon/farm/plant [price] [item]`});
        const execute = args[arg];
        execute(member, toUser, value, item, this.client, this.locale);
    }
}