const {Command} = require('../../structures');
const {User, Guild} = require('../../../../database');

module.exports = class AddPoliceCommand extends Command {
    constructor() {
        super({
            name: 'addpolice',
            aliases: ['adicionarpolicial', 'addpolicial'],
            description: 'Add a member as a server police',
            category: 'Roleplay',
            botPermissions: ['addReactions']
        });
    }
    async run(message) {
        const arrayRoles = [];
        message.guild.roles.forEach(role => {
            if(role.name === 'MeowSheriff') arrayRoles.push({name: role.name, id: role.id});
        });
        if(!message.member.permissions.has('banMembers') && !arrayRoles[0]) return;
        if(arrayRoles[0] && !message.member.roles.includes(arrayRoles[0].id)) return;
        const member = this.getMember(message.args[0]);
        if(!member || member.id === message.member.id) return message.reply('invalidUser');
        const guild = await Guild.findById(message.guild.id);
        const user = await User.findById(member.id);
        if(!user?.certificates?.includes('police')) return message.reply('notAPolice');
        if(guild.polices.includes(member.id)) {
            var emoji = await this.client.getRESTGuildEmoji('786013941364424704', '869391072051216425');
            return message.addReaction(`${emoji.name}:${emoji.id}`);
        }

        var policesSize;
        if(guild.level < 10) policesSize = 10;
        if(guild.level < 20 && guild.level > 10) policesSize = 20;
        if(guild.level < 30 && guild.level > 20) policesSize = 30;
        if(guild.level < 40 && guild.level > 30) policesSize = 40;
        if(guild.level < 50 && guild.level > 40) policesSize = 50;
        if(guild.polices.length >= policesSize) return message.reply('tooMuchPolice');
        guild.polices.push(member.id);
        guild.polices = guild.polices;
        user.job = 'police';
        user.save();
        guild.save();
        message.reply('policeAdded', {user: member.mention});
    }
}