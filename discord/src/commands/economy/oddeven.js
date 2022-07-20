const {Command, Button} = require('../../structures');
const {ComponentInteraction} = require('eris');
const {User} = require('../../../../database');

module.exports = class OddEvenCommand extends Command {
    constructor() {
        super({
            name: 'oddeven',
            aliases: ['ímparpar', 'imparpar'],
            description: 'Bet granex by playing odd or even.',
            syntax: 'oddeven odd/even/bet',
            examples: [
                'oddeven odd',
                'oddeven even',
                'oddeven bet @Levi_ 200 odd',
                'oddeven bet 441932495693414410 250 even'
            ],
            category: 'economy'
        });
    }
    async run(message) {
        switch(message.args[0]) {
            case 'bet':
                const member = this.getMember(message.args[1]);
                if(!member) return message.reply('invalidUser');
                const user = await User.findById(message.author.id);
                const toUser = await User.findById(member.id);
                if(!toUser) return message.reply('userIsNotInDatabase');
                var granex = message.args[2];
                var oddOrEven = message.args[3];
                if(!['odd', 'even'].includes(oddOrEven) || !granex) return message.reply('invalidArg', {try: `${message.guild.db.prefix}oddeven bet @${member.username} <granex> odd/even`});
                if(isNaN(granex)) return message.reply('argIsNaN', {arg: granex});
                if(granex > user.granex) return message.reply('youDontHavegranex');
                if(granex > toUser.granex) return message.reply('dontHavegranex', {user: member.mention});

                const confirm = new Button();
                confirm.setStyle('GREEN');
                confirm.setLabel(this._locale.get('oddEvenButtonLabel'));
                confirm.setCustomID('confirm');
                var msg = await message.replyC('oddEvenBet', {
                    granex,
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
                        granex = Number(granex);
                        if(result === 'even' && oddOrEven === 'even') {
                            message.reply('oddEvenWinner', {
                                number,
                                granex,
                                chosen: oddOrEven,
                            });
                            user.granex += granex;
                            toUser.granex -= granex;
                            user.save();
                            toUser.save();
                        }
                        else if(result === 'even' && oddOrEven != 'even') {
                            message.reply('oddEvenLoser', {
                                number,
                                granex,
                                chosen: oddOrEven,
                                user: member.mention
                            });
                            user.granex -= granex;
                            toUser.granex += granex;
                            user.save();
                            toUser.save();
                        }
                        else if(result === 'odd' && oddOrEven === 'odd') {
                            message.reply('oddEvenWinner', {
                                number,
                                granex,
                                chosen: oddOrEven
                            });
                            user.granex += granex;
                            toUser.granex -= granex;
                            user.save();
                            toUser.save();
                        }
                        else {
                            message.reply('oddEvenLoser', {
                                number,
                                granex,
                                chosen: oddOrEven,
                                user: member.mention
                            });
                            user.granex -= granex;
                            toUser.granex += granex;
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