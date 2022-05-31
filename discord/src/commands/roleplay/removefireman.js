const {Command} = require('../../structures');
const {User, Guild} = require('../../../../database');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'removefireman',
            aliases: ['removerbombeiro', 'removebombeiro'],
            description: 'Remove a member as a server fireman',
            category: 'Roleplay',
            botPermissions: ['addReactions']
        });
    }
    async run(message) {
        const arrayRoles = [];
        message.guild.roles.forEach(role => {
            if(role.name === 'MeowColonel') arrayRoles.push({name: role.name, id: role.id});
        });
        if(!message.member.permissions.has('banMembers') && !arrayRoles[0]) return;
        if(arrayRoles[0] && !message.member.roles.includes(arrayRoles[0].id)) return;
        const member = this.getMember(message.args[0]);
        if(!member || member.id === message.member.id) return message.reply('invalidUser');
        const guild = await Guild.findById(message.guild.id);
        const user = await User.findById(member.id);
        if(!user?.certificates?.includes('fireman')) return message.reply('notAFireman');
        if(!guild.polices.includes(member.id)) {
            var emoji = await this.client.getRESTGuildEmoji('786013941364424704', '869391072051216425');
            return message.addReaction(`${emoji.name}:${emoji.id}`);
        }

        var index = guild.firemans.indexOf(member.id);
        guild.firemans.splice(index, 1);
        guild.firemans = guild.firemans;
        user.job = '';
        user.save();
        guild.save();
        message.reply('firemanRemoved', {user: member.mention});
    }
}