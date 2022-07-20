const {Command} = require('../../structures');
const {User} = require('../../../../database');
const emojis = require('../../util/emojis');
const RenderEmote = require('../../util/plugins/RenderEmote');
const {createCanvas, loadImage} = require('canvas');
const moment = require('moment');
const arrayBadges = [];

module.exports = class ProfileCommand extends Command {
    constructor() {
        super({
            name: 'profile',
            aliases: ['perfil'],
            description: 'View your user profile',
            category: 'social',
            syntax: 'profile <user>',
            examples: [
                'profile',
                'profile @Levi_',
                'profile 441932495693414410'
            ],
            botPermissions: ['attachFiles']
        });
    }
    async run(message) {
        moment.locale(message.guild.db.lang);
        const canvas = createCanvas(1920, 1080);
        const ctx = canvas.getContext('2d');
        const _canvas = createCanvas(1920, 1080);
        const _ctx = _canvas.getContext('2d');
        const template = await loadImage('https://i.imgur.com/1wp1OvT.png');
        const u = await this.getUser(message.args[0] ?? message.author.mention);
        const user = await User.findById(u.id);
        if(!user) return message.reply('userIsNotInDatabase');
        const background = await loadImage(user.background);
        const avatar = await loadImage(u.avatarURL);
        
        _ctx.beginPath();
        _ctx.arc(960, 540, 205, 0, Math.PI*2, true);
        _ctx.closePath();
        _ctx.clip();
        _ctx.stroke();
        _ctx.drawImage(avatar, 755, 335, 410, 410);
        
        var avatarImg = _canvas;
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(avatarImg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

        ctx.font = '98px Lato-Bold';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(u.username, 551, 890);

        ctx.font = '39px Lato-Regular';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(user.aboutme.match(/.{0,39}/g).join('\n'), 551, 938);

        ctx.font = '39px Lato-Bold';
        ctx.fillStyle = '#000001';
        ctx.fillText(this._locale.get(user.job) ?? this._locale.get('jobless'), 551, 800);

        ctx.font = '30px Lato-Regular';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(user.granex.toLocaleString(), 111, 83);
        await RenderEmote.render(ctx, emojis['granex'], 71, 84);

        var totalEnergy = 2000;
        ctx.font = '30px Lato-Regular';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(((user.energy/totalEnergy) * 100).toFixed(2) + '%', 111, 128);
        await RenderEmote.render(ctx, emojis['energy'], 71, 129);

        ctx.font = '30px Lato-Regular';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(user.reps.toLocaleString(), 111, 173);
        await RenderEmote.render(ctx, emojis['arrow_up'], 71, 174);

        ctx.font = '30px Lato-Bold';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(user.marriedWith ? this._locale.get('marriedWith', {user: await this.client.getRESTUser(user.marriedWith)}) : this._locale.get('alone'), 1312, 77);

        if(user.marryTime) {
            ctx.font = '30px Lato-Regular';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${moment(user.marryTime).format('LL')}, ${moment(user.marryTime).fromNow()}`, 1312, 117);
        }
        if(user.marriedWith) arrayBadges.push('married');
        if(user.id === process.env.OWNER_ID) arrayBadges.push('owner');
        if(user.premium) arrayBadges.push('premium');
        const badges = arrayBadges.map(badge => badge)
        .join('')
        .replace('married', emojis['married_badge'])
        .replace('owner', emojis['owner_badge'])
        .replace('premium', emojis['donator_badge']);

        ctx.translate(canvas.width, canvas.height/canvas.width);
        ctx.rotate(Math.PI/2);
        await RenderEmote.render(ctx, badges, 660, 570);

        message.replyF('', {
            file: canvas.toBuffer(),
            name: 'profile.png'
        });
    }
}