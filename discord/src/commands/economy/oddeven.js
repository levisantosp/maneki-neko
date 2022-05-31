const {Command, Button} = require('../../structures');
const {ComponentInteraction} = require('eris');
const {User} = require('../../../../database');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'oddeven',
            aliases: ['ímparpar', 'imparpar'],
            description: 'Bet asuras by playing odd or even.',
            category: 'economy'
        });
    }
    async run(message) {
        switch(message.args[0]) {
            case 'bet':
                const member = this.getMember(message.args[0]);
                if(!member) return message.reply('invalidUser');
                const user = await User.findById(message.author.id) || new User({_id: message.author.id});
                const toUser = await User.findById(member.id);
                if(!toUser) return message.reply('userIsNotInDatabase');
                var asuras = message.args[2];
                var oddOrEven = message.args[3];
                if(!['odd', 'even'].includes(oddOrEven) || !asuras) return message.reply('invalidArg', {try: `${message.guild.db.prefix}oddeven bet @${member.username} <asuras> odd/even`});
                if(isNaN(asuras)) return message.reply('argIsNaN', {arg: asuras});
                if(asuras > user.asuras) return message.reply('youDontHaveAsuras');
                if(asuras > toUser.asuras) return message.reply('dontHaveAsuras', {user: member.mention});

                const confirm = new Button();
                confirm.setStyle('GREEN');
                confirm.setLabel(this._locale.get('oddEvenButtonLabel'));
                confirm.setCustomID('confirm');
                var msg = await message.replyC('oddEvenBet', {
                    asuras,
                    user: member.mention,
                    author: message.author.mention,
                    components: [{
                        type: 1,
                        components: [confirm]
                    }]
                });
                this.client.on('interactionCreate', async interaction => {
                    if(interaction instanceof ComponentInteraction) {
                        if(interaction.data.custom_id !== 'confirm') return;
                        if(interaction.channel.id !== message.channel.id) return;
                        if(interaction.message.id !== msg.id) return;
                        if(interaction.member.id !== member.id) return interaction.deferUpdate();
                        await msg.delete();
                        function isOddOrEven(number) {
                            var result = number % 2;
                            if(result === 0) return 'even';
                            else return 'odd';
                        }
                        var number = Math.floor(Math.random() * 50);
                        var result = isOddOrEven(number);
                        asuras = Number(asuras);
                        if(result === 'even' && oddOrEven === 'even') {
                            message.reply('oddEvenWinner', {
                                number,
                                asuras,
                                chosen: oddOrEven,
                            });
                            user.asuras += asuras;
                            toUser.asuras -= asuras;
                            user.save();
                            toUser.save();
                        }
                        else if(result === 'even' && oddOrEven != 'even') {
                            message.reply('oddEvenLoser', {
                                number,
                                asuras,
                                chosen: oddOrEven,
                                user: member.mention
                            });
                            user.asuras -= asuras;
                            toUser.asuras += asuras;
                            user.save();
                            toUser.save();
                        }
                        else if(result === 'odd' && oddOrEven === 'odd') {
                            message.reply('oddEvenWinner', {
                                number,
                                asuras,
                                chosen: oddOrEven
                            });
                            user.asuras += asuras;
                            toUser.asuras -= asuras;
                            user.save();
                            toUser.save();
                        }
                        else {
                            message.reply('oddEvenLoser', {
                                number,
                                asuras,
                                chosen: oddOrEven,
                                user: member.mention
                            });
                            user.asuras -= asuras;
                            toUser.asuras += asuras;
                            user.save();
                            toUser.save();
                        }
                    }
                });
                    break;
            default: 
                var oddOrEven = message.args[0];
                if(!['odd', 'even'].includes(oddOrEven)) return message.reply('invalidArg', {try: `${message.guild.db.prefix}oddeven odd/even`});
                function isOddOrEven(number) {
                    var result = number % 2;
                    if(result === 0) return 'even';
                    else return 'odd';
                }
                var number = Math.floor(Math.random() * 50);
                var result = isOddOrEven(number);
                if(result === 'even' && oddOrEven === 'even') {
                    message.reply('oddEvenWinner2', {
                        number,
                        chosen: oddOrEven
                    });
                }
                else if(result === 'even' && oddOrEven != 'even') {
                    message.reply('oddEvenLoser2', {
                        number,
                        chosen: oddOrEven
                    });
                }
                else if(result === 'odd' && oddOrEven === 'odd') {
                    message.reply('oddEvenWinner2', {
                        number,
                        chosen: oddOrEven
                    });
                }
                else {
                    return message.reply('oddEvenLoser2', {
                        number,
                        chosen: oddOrEven
                    });
                }
        }
    }
}