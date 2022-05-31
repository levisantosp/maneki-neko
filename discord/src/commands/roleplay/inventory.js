const {Command, Embed} = require('../../structures');
const {User} = require('../../../../database');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'inventory',
            aliases: ['inventário', 'inventario', 'inv'],
            description: 'View your inventory',
            category: 'Roleplay',
            botPermissions: ['embedLinks']
        });
    }
    async run(message) {
        const user = await User.findById(message.author.id);
        const embed = new Embed();
        embed.setTitle(this._locale.get('yourInventory'));
        if(user?.inventory?.foods[0]) embed.addField(this._locale.get('foods'), user?.inventory?.foods.map(food => food.food).join('\n'));
        if(user?.inventory.weapons[0]) embed.addField(this._locale.get('weapons'), user?.inventory?.weapons.map(weapon => weapon.weapon).join('\n'));
        if(user?.usingWeapon?.weapon) embed.addField(this._locale.get('inUse'), user?.usingWeapon?.weapon);
        message.reply(embed.build());
    }
}