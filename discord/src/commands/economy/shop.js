const {Command, Embed, Button} = require('../../structures');
const {ComponentInteraction} = require('eris');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'shop',
            aliases: ['loja', 'store'],
            description: 'View the itens available in the shop',
            category: 'economy',
            botPermissions: ['embedLinks']
        });
    }
    async run(message) {
        const weapon = new Button();
        weapon.setStyle('GRAY');
        weapon.setEmoji('🔫');
        weapon.setCustomID('weapons');

        const food = new Button();
        food.setStyle('GRAY');
        food.setEmoji('🍔');
        food.setCustomID('foods');

        const vehicle = new Button();
        vehicle.setStyle('GRAY');
        vehicle.setEmoji('🚗');
        vehicle.setCustomID('vehicles');
        
        var msg = await message.replyC('chooseItem', {
            components: [{
                type: 1,
                components: [weapon, food, vehicle]
            }]
        });
        this.client.on('interactionCreate', async interaction => {
            if(interaction instanceof ComponentInteraction) {
                if(interaction.channel.id !== message.channel.id) return;
                if(interaction.message.id !== msg.id) return;
                if(interaction.member.id !== message.member.id) return interaction.deferUpdate();
                await interaction.deferUpdate();
                await msg.delete();
                const embed = new Embed();
                switch(interaction.data.custom_id) {
                    case 'weapons': {
                        embed.setTitle(this._locale.get('weaponsEmbedTitle'));
                        embed.setDescription(this._locale.get('weaponsEmbedDescription', {usage: `${message.guild.db.prefix}buy [weapon]`}));
                        message.reply(embed.build());
                    }
                        break;
                    case 'foods': {
                        embed.setTitle(this._locale.get('foodsEmbedTitle'));
                        embed.setDescription(this._locale.get('foodsEmbedDescription', {usage: `${message.guild.db.prefix}buy [food]`}));
                        message.reply(embed.build());
                    }
                        break;
                    case 'vehicles': {
                        embed.setTitle(this._locale.get('vehiclesEmbedTitle'));
                        embed.setDescription(this._locale.get('vehiclesEmbedDescription', {usage: `${message.guild.db.prefix}buy [vehicle]`}));
                        message.reply(embed.build());
                    }
                }
            }
        });
    }
}