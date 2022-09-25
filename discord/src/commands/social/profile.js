const { Command } = require('../../structures')
const { User } = require('../../../../database')
const emojis = require('../../util/emojis')
const RenderEmote = require('../../util/plugins/RenderEmote')
const { createCanvas, loadImage } = require('canvas')
const moment = require('moment')
const { templates } = require('../../../../assets/img/profile.json')

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
        })
    }
    async run (message) {
        moment.locale(message.guild.db.lang)

        const canvas = createCanvas(1920, 1080)
        const ctx = canvas.getContext('2d')
        const _canvas = createCanvas(1920, 1080)
        const _ctx = _canvas.getContext('2d')
        const u = await this.getUser(message.args[0] ?? message.author.mention)
        const user = await User.findById(u.id)
        const template = await loadImage(templates[user.profileTemplate])

        if (!user) return message.reply('helper.user_is_not_in_database')
        const background = await loadImage(user.background)
        const avatar = await loadImage(u.avatarURL)

        _ctx.beginPath()
        _ctx.arc(960, 540, 205, 0, Math.PI * 2, true)
        _ctx.closePath()
        _ctx.clip()
        _ctx.stroke()
        _ctx.drawImage(avatar, 755, 335, 410, 410)

        var avatarImg = _canvas
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        ctx.drawImage(avatarImg, 0, 0, canvas.width, canvas.height)
        ctx.drawImage(template, 0, 0, canvas.width, canvas.height)

        ctx.font = '98px Lato-Bold'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(u.username, 551, 890)

        ctx.font = '39px Lato-Regular'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(user.aboutme.match(/.{0,39}/g).join('\n'), 551, 938)

        ctx.font = '39px Lato-Bold'
        ctx.fillStyle = '#000001'
        ctx.fillText(this.locale.get(`helper.jobs.${user.job}`) ?? this.locale.get('helper.jobs.jobless'), 551, 800)

        ctx.font = '30px Lato-Regular'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(user.granex.toLocaleString(message.guild.db.lang === 'en' ? 'en-US' : 'pt-BR'), 111, 83)
        await RenderEmote.render(ctx, emojis['granex'], 71, 84)

        var totalEnergy = 20000
        ctx.font = '30px Lato-Regular'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(((user.energy / totalEnergy) * 100).toFixed(2) + '%', 111, 128)
        await RenderEmote.render(ctx, emojis['energy'], 71, 129)

        ctx.font = '30px Lato-Regular'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(user.reps.toLocaleString(message.guild.db.lang === 'en' ? 'en-US' : 'pt-BR'), 111, 173)
        await RenderEmote.render(ctx, emojis['arrow_up'], 71, 174)

        ctx.font = '30px Lato-Bold'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(user.marriedWith ? this.locale.get('helper.married_with',
        { 
            username: (await this.client.getRESTUser(user.marriedWith)).username,
            discrim: (await this.client.getRESTUser(user.marriedWith)).discriminator
        
        }) : this.locale.get('helper.alone'), 1312, 77)

        if (user.marryTime) {
            ctx.font = '30px Lato-Regular'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`${moment(user.marryTime).format('LL')}, ${moment(user.marryTime).fromNow()}`, 1312, 117)
        }

        const arrayBadges = []

        if (user.marriedWith) arrayBadges.push(emojis['married_badge'])
        if (user.id === process.env.OWNER_ID) arrayBadges.push(emojis['owner_badge'])
        if (user.premium) arrayBadges.push(emojis['donator_badge'])
        
        const member = await this.client.getRESTGuildMember('721384921679265833', user.id)
        if (member?.roles?.includes('1014245447231078453')) arrayBadges.push(emojis['beta_tester'])

        const badges = arrayBadges.map(badge => badge).join('')

        ctx.font = '40px Lato-Regular'
        await RenderEmote.render(ctx, badges, 1180, 700)

        message.replyF('', {
            file: canvas.toBuffer(),
            name: 'profile.png'
        })
    }
}