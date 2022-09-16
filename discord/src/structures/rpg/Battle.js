const { User, Bank, HG, Guild } = require('../../../../database')
const Embed = require('../embed/Embed')
const locale = require('../../../../locales')

module.exports = class Battle {
    constructor() {
        this.client = require('../classes/Client')
    }
    async startBattle() {
        this.hg = await HG.findById('hg')
        if (this.closed) return
        if (this.hg.players.length < 3 && !this.hg.closed) return

        const embed = new Embed()
        embed.setTitle('Hunger Games')
        embed.setThumbnail('https://imgur.com/QrRYEgk.png')

        const players = this.hg.players
        const player1 = players[Math.floor(Math.random() * players.length)]
        const player2 = players[Math.floor(Math.random() * players.length)]

        var channelsId = this.hg.channelsInteract

        var array = ['fail', 'success']
        var random = array[Math.floor(Math.random() * array.length)]

        for (var channelId of channelsId) {
            const channel = this.client.getChannel(channelId)
            if (!channel) continue

            this.channel = channel

            const guild = await Guild.findById(channel.guild.id)
            if (this.hg.players.length === 1) return this.checkWinner(guild)

            if (this.hg.startsIn < Date.now() && !this.hg.closed) {
                this.hg.closed = true

                embed.setDescription(locale.get(guild.lang, 'helper.hg.started'))

                const client = channel.guild.members.get(this.client.user.id)

                if (client.permissions.has('manageWebhooks')) {
                    const webhooks = await channel.getWebhooks()
                    var webhook = webhooks.filter(w => w.name === 'Hunger Games')[0]

                    if (!webhook) webhook = await channel.createWebhook(
                        {
                            name: 'Hunger Games',
                            avatar: 'https://imgur.com/QrRYEgk.png'
                        }
                    )

                    this.client.executeWebhook(webhook.id, webhook.token,
                        {
                            embed,
                            avatarURL: 'https://imgur.com/QrRYEgk.png',
                            username: 'Hunger Games'
                        }
                    )
                }
            }
            else {
                if (!player1) return
                var damage = player1.usingWeapon.damage
                if (player1.usingWeapon.artifact.damage) damage += Number(player1.usingWeapon.artifact.damage)
                if (player1.usingWeapon.artifact.percentDamage) damage += Number(damage * player1.usingWeapon.artifact.percentDamage)

                var def = player2.usingBulletProof.protection ?? 0
                if (player2.usingBulletProof.artifact.def) def += Number(player2.usingBulletProof.artifact.def)
                if (player2.usingBulletProof.artifact.percentDef) def += Number(def * player2.usingBulletProof.artifact.percentDef)

                if (player1.id == player2.id) {
                    damage -= def

                    var energy = player2.energy - damage

                    var index = this.hg.players.findIndex(p => p.id === player1.id)
                    var player = this.hg.players.filter(p => p.id === player1.id)[0]

                    this.hg.players.splice(index, 1)
                    if (player) {
                        this.hg.players.push(
                            {
                                id: player.id,
                                usingWeapon: player.usingWeapon,
                                usingBulletProof: player.usingBulletProof,
                                energy
                            }
                        )
                    }

                    this.checkPlayers(guild, channel)

                    const user = this.client.users.get(player1.id)

                    if (energy > 0) {
                        embed.setDescription(locale.get(guild.lang, 'helper.hg.attack_yourself',
                            {
                                player: `${user.username}#${user.discriminator}`,
                                energy: damage
                            }
                        ))

                        const client = channel.guild.members.get(this.client.user.id)

                        if (client.permissions.has('manageWebhooks')) {
                            const webhooks = await channel.getWebhooks()
                            var webhook = webhooks.filter(w => w.name === 'Hunger Games')[0]

                            if (!webhook) webhook = await channel.createWebhook(
                                {
                                    name: 'Hunger Games',
                                    avatar: 'https://imgur.com/QrRYEgk.png'
                                }
                            )

                            this.client.executeWebhook(webhook.id, webhook.token,
                                {
                                    embed,
                                    avatarURL: 'https://imgur.com/QrRYEgk.png',
                                    username: 'Hunger Games'
                                }
                            )
                        }
                    }
                    else {
                        embed.setDescription(locale.get(guild.lang, 'helper.hg.suicide',
                            {
                                player: `${user.username}#${user.discriminator}`
                            }
                        ))

                        const client = channel.guild.members.get(this.client.user.id)

                        if (client.permissions.has('manageWebhooks')) {
                            const webhooks = await channel.getWebhooks()
                            var webhook = webhooks.filter(w => w.name === 'Hunger Games')[0]

                            if (!webhook) webhook = await channel.createWebhook(
                                {
                                    name: 'Hunger Games',
                                    avatar: 'https://imgur.com/QrRYEgk.png'
                                }
                            )

                            this.client.executeWebhook(webhook.id, webhook.token,
                                {
                                    embed,
                                    avatarURL: 'https://imgur.com/QrRYEgk.png',
                                    username: 'Hunger Games'
                                }
                            )
                        }
                    }
                }
                else {
                    damage -= def
                    var energy = player2.energy - damage

                    const user1 = this.client.users.get(player1.id)
                    const user2 = this.client.users.get(player2.id)

                    const args = {
                        fail: async () => {
                            embed.setDescription(locale.get(guild.lang, 'helper.hg.tried_attack',
                                {
                                    player1: `${user1.username}#${user1.discriminator}`,
                                    player2: `${user2.username}#${user2.discriminator}`,
                                    weapon: player1.usingWeapon.weapon
                                }
                            ))

                            const client = channel.guild.members.get(this.client.user.id)

                            if (client.permissions.has('manageWebhooks')) {
                                const webhooks = await channel.getWebhooks()
                                var webhook = webhooks.filter(w => w.name === 'Hunger Games')[0]

                                if (!webhook) webhook = await channel.createWebhook(
                                    {
                                        name: 'Hunger Games',
                                        avatar: 'https://imgur.com/QrRYEgk.png'
                                    }
                                )

                                this.client.executeWebhook(webhook.id, webhook.token,
                                    {
                                        embed,
                                        avatarURL: 'https://imgur.com/QrRYEgk.png',
                                        username: 'Hunger Games'
                                    }
                                )
                            }
                        },
                        success: async () => {
                            var energy = player2.energy - damage
                            var index = this.hg.players.findIndex(p => p.id === player2.id)
                            var player = this.hg.players.filter(p => p.id === player2.id)[0]

                            this.hg.players.splice(index, 1)

                            if (player) {
                                this.hg.players.push(
                                    {
                                        id: player.id,
                                        usingWeapon: player.usingWeapon,
                                        usingBulletProof: player.usingBulletProof,
                                        energy
                                    }
                                )

                                embed.setDescription(locale.get(guild.lang, 'helper.hg.attack',
                                    {
                                        player1: `${user1.username}#${user1.discriminator}`,
                                        player2: `${user2.username}#${user2.discriminator}`,
                                        damage,
                                        weapon: player1.usingWeapon.weapon
                                    }
                                ))

                                const client = channel.guild.members.get(this.client.user.id)

                                if (client.permissions.has('manageWebhooks')) {
                                    const webhooks = await channel.getWebhooks()
                                    var webhook = webhooks.filter(w => w.name === 'Hunger Games')[0]

                                    if (!webhook) webhook = await channel.createWebhook(
                                        {
                                            name: 'Hunger Games',
                                            avatar: 'https://imgur.com/QrRYEgk.png'
                                        }
                                    )

                                    this.client.executeWebhook(webhook.id, webhook.token,
                                        {
                                            embed,
                                            avatarURL: 'https://imgur.com/QrRYEgk.png',
                                            username: 'Hunger Games'
                                        }
                                    )
                                }

                                this.checkPlayers(guild)
                            }
                        }
                    }

                    const execute = args[random]
                    execute()
                }
            }
        }
        this.hg.save()
    }

    async checkPlayers(guild) {
        const player = this.hg.players.filter(player => player.energy <= 0)[0]

        if (player) {
            var index = this.hg.players.findIndex(p => p.id === player.id)

            this.hg.players.splice(index)
            this.hg.save()

            const channelsId = this.hg.channelsInteract
            channelsId.forEach(async channelId => {
                const channel = this.client.getChannel(channelId)

                if (channel) {
                    const user = this.client.users.get(player.id)
                    const embed = new Embed()
                    embed.setTitle('Hunger Games')
                    embed.setThumbnail('https://imgur.com/QrRYEgk.png')
                    embed.setDescription(locale.get(guild.lang, 'helper.hg.player_death',
                        {
                            player: `${user.username}#${user.discriminator}`
                        }
                    ))

                    const client = channel.guild.members.get(this.client.user.id)

                    if (client.permissions.has('manageWebhooks')) {
                        const webhooks = await channel.getWebhooks()
                        var webhook = webhooks.filter(w => w.name === 'Hunger Games')[0]

                        if (!webhook) webhook = await channel.createWebhook(
                            {
                                name: 'Hunger Games',
                                avatar: 'https://imgur.com/QrRYEgk.png'
                            }
                        )

                        this.client.executeWebhook(webhook.id, webhook.token,
                            {
                                embed,
                                avatarURL: 'https://imgur.com/QrRYEgk.png',
                                username: 'Hunger Games'
                            }
                        )
                    }
                }
            })

            this.checkWinner(guild)
        }
    }

    async checkWinner(guild) {
        if (this.hg.players.length === 1) {
            const channelsId = this.hg.channelsInteract
            const user = this.client.users.get(this.hg.players[0].id)
            const _user = await User.findById(user.id)
            const bank = await Bank.findById('bank')
            if (bank.granex < 5000) return

            channelsId.forEach(async channelId => {
                const channel = this.client.getChannel(channelId)

                if (channel) {

                    const embed = new Embed()
                    embed.setTitle('Hunger Games')
                    embed.setThumbnail('https://imgur.com/QrRYEgk.png')
                    embed.setDescription(locale.get(guild.lang, 'helper.hg.winner',
                        {
                            player: `${user.username}#${user.discriminator}`,
                            exp: 1500,
                            granex: (5000).toLocaleString()
                        }
                    ))

                    const client = channel.guild.members.get(this.client.user.id)

                    if (client.permissions.has('manageWebhooks')) {
                        const webhooks = await channel.getWebhooks()
                        var webhook = webhooks.filter(w => w.name === 'Hunger Games')[0]

                        if (!webhook) webhook = await channel.createWebhook(
                            {
                                name: 'Hunger Games',
                                avatar: 'https://imgur.com/QrRYEgk.png'
                            }
                        )

                        this.client.executeWebhook(webhook.id, webhook.token,
                            {
                                embed,
                                avatarURL: 'https://imgur.com/QrRYEgk.png',
                                username: 'Hunger Games'
                            }
                        )
                    }
                }
            })

            _user.granex += 5000
            _user.exp += 1500

            if (_user.exp > _user.xpRequired) {
                _user.exp = 0
                _user.level += 1
                _user.xpRequired += 136
            }
            _user.save()
            bank.save()

            this.checkHG()
        }
    }

    async checkHG() {
        const hg = await HG.findById('hg')
        if (hg.players.length === 1) {
            hg.players = []
            hg.closed = false
            hg.startsIn = Date.now() + 3.6e+6
            hg.channelsInteract = []
            hg.save()
        }
    }
}