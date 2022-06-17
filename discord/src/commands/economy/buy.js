const {Command} = require('../../structures');
const {User, Bank} = require('../../../../database');

module.exports = class BuyCommand extends Command {
    constructor() {
        super({
            name: 'buy',
            aliases: ['comprar'],
            description: 'Buy an item from shop',
            category: 'economy'
        });
    }
    async run(message) {
        const items = [
            '9mm',
            'pt100',
            'glock',
            'mt-40',
            'uzi',
            'mp5',
            'ump',
            'carabina ct-40',
            'carabina 556',
            'parafal',
            'm4a1',
            'ak-9',
            'ak-47',
            'akm',
            'scar',
            'water',
            'hamburguer',
            'pizza',
            'car',
            'motorcycle',
            'truck',
            'gun_license',
            'farm',
            'lettuce',
            'tomato',
            'carrot'
        ]
        if(!items.includes(message.args[0])) return message.reply('invalidArg', {try: `\`${message.guild.db.prefix}buy ${items.map(item => item).join(' / ')}\``});
        const user = await User.findById(message.author.id);
        const bank = await Bank.findById('bank');
        var price;
        var result = user?.inventory?.weapons?.map(weapon => weapon?.weapon);
        var result2 = user?.inventory?.foods?.map(food => food?.food);
        if(result.includes(message.args[0]) || result2.includes(message.args[0])) return message.reply('alreadyBought');
        switch(message.args[0]) {
            case '9mm': {
                price = 5000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 20});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'pt100': {
                price = 10000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 40});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'glock': {
                price = 12000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 60});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'mt-40': {
                price = 24000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 120});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'uzi': {
                price = 28000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 130});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'mp5': {
                price = 32000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 150});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'ump': {
                price = 33000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 150});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'carabina ct-40': {
                price = 45000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 200});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'carabina 556': {
                price = 48000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 220});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'parafal': {
                price = 56000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 250});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'm4a1': {
                price = 62000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 300});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'ak-9': {
                price = 78000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 400});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'ak-47': {
                price = 81000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 420});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'akm': {
                price = 84000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 430});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'scar': {
                price = 97000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory?.weapons?.push({weapon: message.args[0], damage: 500});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'water': {
                price = 100;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory.foods.push({food: message.args[0], restore: 200});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'hamburguer': {
                price = 225;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory.foods.push({food: message.args[0], restore: 225});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'pizza': {
                price = 275;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory.foods.push({food: message.args[0], restore: 275});
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'car': {
                price = 25000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.hasCar = true;
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'motorcycle': {
                price = 15000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.hasMotorcycle = true;
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'truck': {
                price = 105000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.hasTruck = true;
                bank.granex += price;
                user.save();
                bank.save();
                message.reply('itemBought');
            }
                break;
            case 'gun_license': {
                price = 500;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.hasGunLicense = true;
                bank.granex += price;
                bank.save();
                user.save();
                message.reply('itemBought');
            }
                break;
            case 'farm': {
                if(user?.farms?.filter(farm => farm.id === message.guild.id)[0]) return message.reply('alreadyHasFarm');
                price = 400000;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.farms.push({
                    id: message.guild.id,
                    chickens: 0,
                    cows: 0,
                    plants: []
                });
                bank.granex += price;
                bank.save();
                user.save();
                message.reply('itemBought');
            }
                break;
            case 'lettuce': {
                price = 25;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory.plants.push('lettuce');
                bank.granex += price;
                bank.save();
                user.save();
                message.reply('itemBought');
            }
                break;
            case 'tomato': {
                price = 30;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory.plants.push('tomato');
                bank.granex += price;
                bank.save();
                user.save();
                message.reply('itemBought');
            }
                break;
            case 'carrot': {
                price = 30;
                if(user?.granex < price) return message.reply('youDontHavegranex');
                user.granex -= price;
                user.inventory.plants.push('carrot');
                bank.granex += price;
                bank.save();
                user.save();
                message.reply('itemBought');
            }
        }
    }
}