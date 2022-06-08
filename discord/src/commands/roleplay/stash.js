const {Command} = require("../../structures");
const {User} = require("../../../../database");

module.exports = class StashCommand extends Command {
    constructor() {
        super({
            name: "stash",
            aliases: ["guardar"],
            description: "Stash an item in your inventory",
            category: "Roleplay"
        });
    }
    async run(message) {
        const user = await User.findById(message.author.id);
        const item = message.args.join(" ");
        if(!item) return message.reply("invalidArg", {try: `${message.guild.db.prefix}use [item]`});
        if(user?.usingWeapon?.weapon !== item) return message.reply("missingItem2");
        const functions = {
            "9mm": async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            pt100: async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            glock: async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            "mt-40": async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            uzi: async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            mp5: async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            ump: async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            "carabina ct-40": async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            "carabina 556": async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            parafal: async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            m4a1: async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            "ak-9": async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            "ak-47": async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            akm: async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            },
            scar: async function() {
                user.inventory.weapons.push(user.usingWeapon);
                user.save();
                await User.findByIdAndUpdate(user.id, {
                    $set: {usingWeapon: {}}
                });
                message.reply("itemStashed");
            }
        }
        if(!functions[item]) return message.reply("missingItem2");
        const execute = functions[item];
        execute();
    }
}