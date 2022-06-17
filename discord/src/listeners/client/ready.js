const {Listener, Logger} = require('../../structures');
const {User, Bank} = require('../../../../database');

module.exports = class ReadyListener extends Listener {
    constructor() {
        super({name: 'ready'});
    }
    async on() {
        Logger.send(`Logged as ${this.client.user.username}#${this.client.user.discriminator}`);
        const editClientStatus = () => {
            const activities = [
                {
                    name: 'to you',
                    type: 3
                },
                {
                    name: `${this.client.users.filter(user => !user.bot).length} users`,
                    type: 3
                },
                {
                    name: `with another ${this.client.users.filter(user => !user.bot).length} users`,
                    type: 0
                },
                {
                    name: 'Genshin Impact',
                    type: 1,
                    url: 'https://www.twitch.tv/voidappend'
                }
            ];
            const activity = activities[Math.floor(Math.random() * activities.length)];
            this.client.editStatus('online', activity);;
        }
        const reviveUser = async() => {
            const users = await User.find({deadAt: {$lte: Date.now()}});
            for(const user of users) {
                user.energy = 500;
                user.deadAt = null;
                user.save();
                Logger.warn(`(${user.id}) has been revived.`);
            }
        }
        const addGranexPerFarm = async() => {
            const users = await User.find({farmTime: {$lte: Date.now()}});
            const bank = await Bank.findById('bank');
            for(const user of users) {
                if(user.farms.length >= 1) {
                    var granexGain = 100;
                    var n = 0;
                    var n2 = 0;
                    var n3 = 0;
                    user.farms.forEach(farm => {
                        if(farm.plants.length > 0) n += farm.plants.length * 5;
                        if(farm.cows > 0) n2 += farm.cows * 15;
                        if(farm.chickens > 0) n3 += farm.chickens * 5;
                    });
                    granexGain += user.farms.length * 10 + n + n2 + n3;
                    if(bank.granex < granexGain) throw new Error('The bank doesn\'t have granex.');
                    user.granex += granexGain;
                    user.farmTime = Date.now() + 3.6e+6;
                    bank.granex -= granexGain;
                    user.save();
                    bank.save();
                    Logger.warn(`(${user.id}) received ${granexGain.toLocaleString()} granex per farm.`);
                }
            }
        }
        const regainEnergy = async() => {
            const users = await User.find({energyTime: {$lte: Date.now()}});
            for(const user of users) {
                if(user.deadAt) continue;
                user.energy += 100;
                user.energyTime = Date.now() + 3.6e+6;
                if(user.energy > 2000) user.energy = 2000;
                user.save();
                Logger.warn(`(${user.id}) received 5% of energy`);
            }
        }
        setInterval(editClientStatus, 30000);
        setInterval(() => {
            reviveUser();
            addGranexPerFarm().catch(err => new Logger(this.client).error(err));
            regainEnergy();
        }, 10000);
    }
}