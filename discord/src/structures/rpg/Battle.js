const { User, Bank, Guild } = require('../../../../database')
const Embed = require('../embed/Embed')
const locale = require('../../../../locales')

module.exports = class Battle {
    constructor(guild) {
        this.client = require('../classes/Client')
        this._guild = guild
    }
    async startBattle() {
        this.guild = await Guild.findById(this._guild)

        if (this.guild.hg.players.length < 2 && !this.guild.hg.closed) return

        const embed = new Embed()
        embed.setTitle('Hunger Games')
        embed.setThumbnail('https://imgur.com/QrRYEgk.png')

        const players = this.guild.hg.players
        const player1 = players[Math.floor(Math.random() * players.length)]
        const player2 = players[Math.floor(Math.random() * players.length)]

        var array = ['fail', 'success']
        var random = array[Math.floor(Math.random() * array.length)]

        const channel = this.client.getChannel(this.guild.hg.channelInteract)
        if (!channel) return

        this.channel = channel

        const guild = await Guild.findById(channel.guild.id)
        if (this.guild.hg.players.length === 1) return this.checkWinner(this.guild)

        if (this.guild.hg.startsIn < Date.now() && !this.guild.hg.closed) {
            this.guild.hg.closed = true

            embed.setDescription(locale.get(this.guild.lang, 'helper.hg.started'))

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
            damage += Number(player1.usingWeapon.artifact.damage)
            damage += Number(player1.usingWeapon.damage * player1.usingWeapon.artifact.percentDamage)

            var def = player2.usingBulletProof.protection ?? 0
            def += Number(player2.usingBulletProof.artifact.def)
            def += Number(def * player2.usingBulletProof.artifact.percentDef)

            if (player1.id == player2.id) {
                damage -= def

                if (damage < 0) damage = 0

                var energy = player2.energy - damage

                if (energy < 0) energy = 0

                var index = this.guild.hg.players.findIndex(p => p.id === player1.id)
                var player = this.guild.hg.players.filter(p => p.id === player1.id)[0]

                this.guild.hg.players.splice(index, 1)
                if (player) {
                    this.guild.hg.players.push(
                        {
                            id: player.id,
                            usingWeapon: player.usingWeapon,
                            usingBulletProof: player.usingBulletProof,
                            energy: parseInt(energy)
                        }
                    )
                }

                this.checkPlayers(this.guild)

                const user = this.client.users.get(player1.id)

                if (energy > 0) {
                    embed.setDescription(locale.get(this.guild.lang, 'helper.hg.attack_yourself',
                        {
                            player: `${user.username}#${user.discriminator}`,
                            energy: parseInt(damage)
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
                    embed.setDescription(locale.get(this.guild.lang, 'helper.hg.suicide',
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

                if (damage < 0) damage = 0
                if (energy < 0) energy = 0

                const user1 = this.client.users.get(player1.id)
                const user2 = this.client.users.get(player2.id)

                const args = {
                    fail: async () => {
                        embed.setDescription(locale.get(this.guild.lang, 'helper.hg.tried_attack',
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
                        var energy = parseInt(player2.energy - damage)

                        var index = this.guild.hg.players.findIndex(p => p.id === player2.id)
                        var player = this.guild.hg.players.filter(p => p.id === player2.id)[0]

                        this.guild.hg.players.splice(index, 1)

                        if (player) {
                            this.guild.hg.players.push(
                                {
                                    id: player.id,
                                    usingWeapon: player.usingWeapon,
                                    usingBulletProof: player.usingBulletProof,
                                    energy
                                }
                            )

                            embed.setDescription(locale.get(this.guild.lang, 'helper.hg.attack',
                                {
                                    player1: `${user1.username}#${user1.discriminator}`,
                                    player2: `${user2.username}#${user2.discriminator}`,
                                    damage: parseInt(damage),
                                    weapon: player1.usingWeapon.weapon,
                                    energy
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

                            this.checkPlayers(this.guild)
                        }
                    }
                }

                const execute = args[random]
                execute()
            }
        }
        this.guild.save()
    }

    async checkPlayers(guild) {
        const player = guild.hg.players.filter(player => player.energy <= 0)[0]

        if (player) {
            var index = guild.hg.players.findIndex(p => p.id === player.id)

            guild.hg.players.splice(index)
            guild.save()

            const channel = this.client.getChannel(guild.hg.channelInteract)

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

            this.checkWinner(guild)
        }
    }

    async checkWinner(guild) {
        if (this.guild.hg.players.length === 1) {
            const user = this.client.users.get(this.guild.hg.players[0].id)
            const _user = await User.findById(user.id)
            const bank = await Bank.findById('bank')
            if (bank.granex < 5000) return

            const channel = this.client.getChannel(this.guild.hg.channelInteract)

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
        const guild = await Guild.findById(this._guild)
        if (guild.hg.players.length === 1) {
            guild.hg.players = []
            guild.hg.closed = false
            guild.hg.startsIn = Date.now() + 3.6e+6
            guild.hg.channelsInteract = []
            guild.save()
        }
    }
}