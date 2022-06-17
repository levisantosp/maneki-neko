const {Command} = require('../../structures');
const {User, Guild} = require('../../../../database');

module.exports = class RemovePoliceCommand extends Command {
    constructor() {
        super({
            name: 'removepolice',
            aliases: ['removerpolicial', 'removepolicial'],
            description: 'Remove a member as a server police',
            category: 'Roleplay',
            botPermissions: ['addReactions']
        });
    }
    async run(message) {
        const arrayRoles = [];
        message.guild.roles.forEach(role => {
            if(role.name === 'MeowSheriff') arrayRoles.push({name: role.name, id: role.id});
        });
        if(!message.member.permissions.has('banMembers') && !arrayRoles[0]['name'].includes('MeowSheriff')) return;
        if(arrayRoles[0] && !message.member.roles.includes(arrayRoles[0]['id'])) return;
        const member = this.getMember(message.args[0]);
        if(!member || member.id === message.member.id) return message.reply('invalidUser');
        const guild = await Guild.findById(message.guild.id);
        const user = await User.findById(member.id);
        if(!user?.certificates?.includes('police')) return message.reply('notAPolice');
        if(!guild.polices.includes(member.id)) {
            var emoji = await this.client.getRESTGuildEmoji('786013941364424704', '869391072051216425');
            return message.addReaction(`${emoji.name}:${emoji.id}`);
        }

        var index = guild.polices.indexOf(user.id);
        guild.polices.splice(index, 1);
        guild.polices = guild.polices;
        user.job = '';
        user.save();
        guild.save();
        message.reply('policeRemoved', {user: member.mention});
    }
}