const {User} = require("../../../../database");
const {Command} = require("../../structures");

module.exports = class extends Command {
    constructor() {
        super({
            name: "use",
            aliases: ["usar", "utilizar"],
            description: "Use an item that is in your inventory",
            category: "Roleplay",
        });
    }
    async run(message) {
        const user = await User.findById(message.author.id);
        const item = message.args.join(" ");
        if(!item) return message.reply("invalidArg", {try: `${message.guild.db.prefix}use [item]`});
        const weaponInInventory = user?.inventory?.weapons?.filter(weapon => weapon.weapon === item)[0];
        const foodInInventory = user?.inventory?.foods?.filter(food => food.food === item)[0];
        if(!["pizza", "hamburger", "water"].includes(item) && !weaponInInventory) {
            message.reply("missingItem");
        }
        else if(["pizza", "hamburger", "water"].includes(item) && !foodInInventory) {
            message.reply("missingItem");
        }
        else if(!["pizza", "hamburger", "water"].includes(item) && weaponInInventory) {
            const functions = {
                "9mm": function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                pt100: function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                glock: function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                "mt-40": function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                uzi: function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                mp5: function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                ump: function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                "carabina ct-40": function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                "carabina 556": function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                parafal: function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                m4a1: function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                "ak-9": function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                "ak-47": function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                akm: function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                },
                scar: function() {
                    var weapons = user.inventory.weapons;
                    var weapon = user.inventory.weapons.filter(weapon => weapon.weapon === item)[0];
                    var index = weapons.indexOf(weapon);
                    weapons.splice(index, 1);
                    user.inventory.weapons = weapons;
                    user.usingWeapon = {...weapon};
                    user.save();
                    message.reply("usingItem");
                }
            }
            if(!functions[item]) return message.reply("missingItem");
            const execute = functions[item];
            execute();
        }
        else if(["pizza", "hamburger", "water"].includes(item) && foodInInventory) {
            const functions = {
                pizza: function() {
                    user.energy += 800;
                    if(user.energy > 2000) user.energy = 2000;
                    var foods = user.inventory.foods;
                    var food = user.inventory.foods.filter(food => food.food === item)[0];
                    var index = foods.indexOf(food);
                    foods.splice(index, 1);
                    user.inventory.foods = foods;
                    user.save();
                    message.reply("restoreEnergy", {percentual: 40});
                },
                hamburger: function() {
                    user.energy += 700;
                    if(user.energy > 2000) user.energy = 2000;
                    var foods = user.inventory.foods;
                    var food = user.inventory.foods.filter(food => food.food === item)[0];
                    var index = foods.indexOf(food);
                    foods.splice(index, 1);
                    user.inventory.foods = foods;
                    user.save();
                    message.reply("restoreEnergy", {percentual: 35});
                },
                water: function() {
                    user.energy += 200;
                    if(user.energy > 2000) user.energy = 2000;
                    var foods = user.inventory.foods;
                    var food = user.inventory.foods.filter(food => food.food === item)[0];
                    var index = foods.indexOf(food);
                    foods.splice(index, 1);
                    user.inventory.foods = foods;
                    user.save();
                    message.reply("restoreEnergy", {percentual: 10});
                }
            }
            if(!functions[item]) return message.reply("missingItem");
            const execute = functions[item];
            execute();
        }
    }
}