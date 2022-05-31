const {Listener, Logger} = require('../../structures');
const {User} = require('../../../../database');

module.exports = class extends Listener {
    constructor() {
        super({name: 'ready'});
    }
    async on() {
        Logger.send(`Logged as ${this.client.user.username}#${this.client.user.discriminator}`);
        this.client.editStatus('online', {
            name: 'I\'ll come back',
            type: 0
        });
        const reviveUser = async() => {
            const users = await User.find({deadAt: {$lte: Date.now()}});
            for(const user of users) {
                user.energy = 500;
                user.deadAt = null;
                user.save();
                Logger.warn(`(${user.id}) foi revivido.`);
            }
        }
        setInterval(() => {
            reviveUser();
        }, 10000);
    }
}