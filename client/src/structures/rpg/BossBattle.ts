import { User, Bank } from '../../../../database'
import { ComponentInteraction, Member, MessageWebhookContent, TextChannel } from 'eris'
import { App, Embed } from '..'

interface BossOptions {
  name: string
  energy: number
  minDamage: number
  maxDamage: number
  def: number
}

interface BattleOptions {
  interaction: ComponentInteraction
  user: string
  locale: any
  channel: TextChannel
  boss: string
  author: Member
  client: App
}

export default class BossBattle {
  private interaction: ComponentInteraction
  private _user: string
  private user: any
  private locale: any
  private channel: TextChannel
  private client: App
  private author: Member
  private started: boolean
  private bosses: any
  private boss: BossOptions
  private finished: boolean

  constructor({ interaction, user, locale, channel, boss, author, client }: BattleOptions) {
    this.interaction = interaction
    this._user = user
    this.locale = locale
    this.channel = channel
    this.author = author
    this.started = false
    this.bosses = {
      cleiton: {
        name: 'cleiton',
        energy: 200000,
        minDamage: 2300,
        maxDamage: 5788,
        def: 200
      },
      vladimir: {
        name: 'vladimir',
        energy: 90000,
        minDamage: 2300,
        maxDamage: 3005,
        def: 600
      }
    }
    this.boss = this.bosses[boss]
    this.finished = false
    this.client = client
  }
  start() {
    setInterval(() => { this.startBattle() }, 10000)
  }

  async startBattle() {
    this.user = await User.findById(this._user)
    if (!this.finished) {
      const embed = new Embed()

      if (this.user.energy <= 0 || this.boss.energy <= 0) return this.checkWinner()
      else this.checkWinner()

      switch (this.boss.name) {
        case 'cleiton': {
          if (!this.started) {
            this.started = true

            embed.setTitle(this.locale.get('commands.boss.summoned'))
            embed.setDescription(this.locale.get('commands.boss.cleiton.started'))

            const webhooks = await this.channel.getWebhooks()
            var webhook = webhooks.filter(w => w.name === 'Cleiton Trovoada (Boss)')[0]

            if (!webhook) webhook = await this.channel.createWebhook(
              {
                name: 'Cleiton Trovoada (Boss)',
                avatar: 'https://imgur.com/7pZAh67'
              }
            )

            this.client.executeWebhook(webhook.id, webhook.token as string,
              {
                content: this.author.mention,
                embed,
                avatarURL: 'https://imgur.com/7pZAh67.png',
                username: 'Cleiton Trovoada (Boss)'
              } as MessageWebhookContent
            )
          }
          else {
            var damage = this.user.usingWeapon.damage ?? 0
            damage += this.user.usingWeapon.artifact.damage ?? 0
            damage += parseInt(this.user.usingWeapon.damage ?? 0 * this.user.usingWeapon.artifact.percentDamage)
            damage -= this.boss.def

            if (damage < 0) damage = 0

            var bossDamage = Math.floor(Math.random() * (this.boss.maxDamage - this.boss.minDamage) + this.boss.minDamage)
            bossDamage -= this.user.usingBulletProof.def ?? 0
            bossDamage -= this.user.usingBulletProof.artifact.def ?? 0
            bossDamage -= parseInt(this.user.usingBulletProof.def ?? 0 * this.user.usingBulletProof.artifact.percentDef)

            var rand = ['player', 'boss']
            var random = rand[Math.floor(Math.random() * rand.length)]

            if (random === 'player') {
              embed.setTitle('Cleiton Trovoada')
              embed.setDescription(this.locale.get('commands.boss.attack',
                {
                  damage
                }
              ))

              const webhooks = await this.channel.getWebhooks()
              var webhook = webhooks.filter(w => w.name === 'Cleiton Trovoada (Boss)')[0]

              if (!webhook) webhook = await this.channel.createWebhook(
                {
                  name: 'Cleiton Trovoada (Boss)',
                  avatar: 'https://imgur.com/7pZAh67'
                }
              )

              this.client.executeWebhook(webhook.id, webhook.token as string,
                {
                  content: this.author.mention,
                  embed,
                  avatarURL: 'https://imgur.com/7pZAh67.png',
                  username: 'Cleiton Trovoada (Boss)'
                } as MessageWebhookContent
              )

              this.boss.energy -= damage
            }
            else {
              var array = ['success', 'failed']
              var percentual = Math.floor(Math.random() * 100) + 1
              var index

              if (percentual >= 65) index = 0
              else if (percentual >= 35) index = 1

              var result = array[index as number]

              if (result == 'success') {
                embed.setTitle('Cleiton Trovoada')
                embed.setDescription(this.locale.get('commands.boss.cleiton.attack',
                  {
                    damage: bossDamage
                  }
                ))

                const webhooks = await this.channel.getWebhooks()
                var webhook = webhooks.filter(w => w.name === 'Cleiton Trovoada (Boss)')[0]

                if (!webhook) webhook = await this.channel.createWebhook(
                  {
                    name: 'Cleiton Trovoada (Boss)',
                    avatar: 'https://imgur.com/7pZAh67'
                  }
                )

                this.client.executeWebhook(webhook.id, webhook.token as string,
                  {
                    content: this.author.mention,
                    embed,
                    avatarURL: 'https://imgur.com/7pZAh67.png',
                    username: 'Cleiton Trovoada (Boss)'
                  } as MessageWebhookContent
                )

                this.user.energy -= parseInt(bossDamage.toString())
              }
              else {
                embed.setTitle('Cleiton Trovoada')
                embed.setDescription(this.locale.get('commands.boss.cleiton.tried_attack'))

                const webhooks = await this.channel.getWebhooks()
                var webhook = webhooks.filter(w => w.name === 'Cleiton Trovoada (Boss)')[0]

                if (!webhook) webhook = await this.channel.createWebhook(
                  {
                    name: 'Cleiton Trovoada (Boss)',
                    avatar: 'https://imgur.com/7pZAh67'
                  }
                )

                this.client.executeWebhook(webhook.id, webhook.token as string,
                  {
                    content: this.author.mention,
                    embed,
                    avatarURL: 'https://imgur.com/7pZAh67.png',
                    username: 'Cleiton Trovoada (Boss)'
                  } as MessageWebhookContent
                )
              }
            }
          }
        }
          break
        case 'vladimir': {
          if (!this.started) {
            this.started = true

            embed.setTitle(this.locale.get('commands.boss.summoned'))
            embed.setDescription(this.locale.get('commands.boss.vladimir.started'))

            const webhooks = await this.channel.getWebhooks()
            var webhook = webhooks.filter(w => w.name === 'Vladimir (Boss)')[0]

            if (!webhook) webhook = await this.channel.createWebhook(
              {
                name: 'Vladimir (Boss)',
                avatar: 'https://imgur.com/YCQAlba.png'
              }
            )

            this.client.executeWebhook(webhook.id, webhook.token as string,
              {
                content: this.author.mention,
                embed,
                avatarURL: 'https://imgur.com/YCQAlba.png',
                username: 'Vladimir (Boss)'
              } as MessageWebhookContent
            )
          }
          else {
            var damage = this.user.usingWeapon.damage ?? 0
            damage += this.user.usingWeapon.artifact.damage ?? 0
            damage += parseInt(this.user.usingWeapon.damage ?? 0 * this.user.usingWeapon.artifact.percentDamage)
            damage -= this.boss.def

            if (damage > 0) damage = 0

            var bossDamage = Math.floor(Math.random() * (this.boss.maxDamage - this.boss.minDamage) + this.boss.minDamage)
            bossDamage -= this.user.usingBulletProof.def ?? 0
            bossDamage -= this.user.usingBulletProof.artifact.def ?? 0
            bossDamage -= parseInt(this.user.usingBulletProof.def ?? 0 * this.user.usingBulletProof.artifact.percentDef)

            var rand = ['player', 'boss']
            var random = rand[Math.floor(Math.random() * rand.length)]

            if (random === 'player') {
              embed.setTitle('Vladimir')
              embed.setDescription(this.locale.get('commands.boss.attack',
                {
                  damage
                }
              ))

              const webhooks = await this.channel.getWebhooks()
              var webhook = webhooks.filter(w => w.name === 'Vladimir (Boss)')[0]

              if (!webhook) webhook = await this.channel.createWebhook(
                {
                  name: 'Vladimir (Boss)',
                  avatar: 'https://imgur.com/YCQAlba.png'
                }
              )

              this.client.executeWebhook(webhook.id, webhook.token as string,
                {
                  content: this.author.mention,
                  embed,
                  avatarURL: 'https://imgur.com/YCQAlba.png',
                  username: 'Vladimir (Boss)'
                } as MessageWebhookContent
              )

              this.boss.energy -= damage
            }
            else {
              var array = ['success', 'failed']
              var percentual = Math.floor(Math.random() * 100) + 1
              var index

              if (percentual >= 65) index = 0
              else if (percentual >= 35) index = 1

              var result = array[index as number]

              if (result == 'success') {
                embed.setTitle('Vladimir')
                embed.setDescription(this.locale.get('commands.boss.vladimir.attack',
                  {
                    damage: bossDamage
                  }
                ))

                const webhooks = await this.channel.getWebhooks()
                var webhook = webhooks.filter(w => w.name === 'Vladimir (Boss)')[0]

                if (!webhook) webhook = await this.channel.createWebhook(
                  {
                    name: 'Vladimir (Boss)',
                    avatar: 'https://imgur.com/YCQAlba.png'
                  }
                )

                this.client.executeWebhook(webhook.id, webhook.token as string,
                  {
                    content: this.author.mention,
                    embed,
                    avatarURL: 'https://imgur.com/YCQAlba.png',
                    username: 'Vladimir (Boss)'
                  } as MessageWebhookContent
                )

                this.user.energy -= parseInt(bossDamage.toString())
              }
              else {
                embed.setTitle('Vladimir')
                embed.setDescription(this.locale.get('commands.boss.vladimir.tried_attack'))

                const webhooks = await this.channel.getWebhooks()
                var webhook = webhooks.filter(w => w.name === 'Vladimir (Boss)')[0]

                if (!webhook) webhook = await this.channel.createWebhook(
                  {
                    name: 'Vladimir (Boss)',
                    avatar: 'https://imgur.com/YCQAlba.png'
                  }
                )

                this.client.executeWebhook(webhook.id, webhook.token as string,
                  {
                    content: this.author.mention,
                    embed,
                    avatarURL: 'https://imgur.com/YCQAlba.png',
                    username: 'Vladimir (Boss)'
                  } as MessageWebhookContent
                )
              }
            }
          }
        }
      }
    }
    this.user.save()
  }

  async checkWinner() {
    var granex = Math.floor(Math.random() * (10000 - 2000) + 2000)
    var weaponArtifacts = [
      {
        _type: 'diamond',
        damage: 507,
        percentDamage: 0.5,
        level: 0,
        exp: 0,
        xpRequired: 150
      },
      {
        _type: 'platinum',
        damage: 350,
        percentDamage: 0.45,
        level: 0,
        exp: 0,
        xpRequired: 150
      },
      {
        _type: 'gold',
        damage: 300,
        percentDamage: 0.3,
        level: 0,
        exp: 0,
        xpRequired: 150
      },
      {
        _type: 'ruby',
        damage: 257,
        percentDamage: 0.28,
        level: 0,
        exp: 0,
        xpRequired: 150
      },
      {
        _type: 'iron',
        damage: 152,
        percentDamage: 0.3,
        level: 0,
        exp: 0,
        xpRequired: 150
      },
      {
        _type: 'copper',
        damage: 152,
        percentDamage: 0.12,
        level: 0,
        exp: 0,
        xpRequired: 150
      }
    ]
    var bulletProofArtifacts = [
      {
        _type: 'diamond',
        def: 507,
        percentDef: 0.5,
        level: 0,
        exp: 0,
        xpRequired: 150
      },
      {
        _type: 'platinum',
        def: 350,
        percentDef: 0.45,
        level: 0,
        exp: 0,
        xpRequired: 150
      },
      {
        _type: 'gold',
        def: 300,
        percentDef: 0.3,
        level: 0,
        exp: 0,
        xpRequired: 150
      },
      {
        _type: 'ruby',
        def: 257,
        percentDef: 0.28,
        level: 0,
        exp: 0,
        xpRequired: 150
      },
      {
        _type: 'iron',
        def: 152,
        percentDef: 0.3,
        level: 0,
        exp: 0,
        xpRequired: 150
      },
      {
        _type: 'copper',
        def: 152,
        percentDef: 0.12,
        level: 0,
        exp: 0,
        xpRequired: 150
      }
    ]

    var artifactTypes = ['WEAPON', 'BULLET_PROOF']
    var type = artifactTypes[Math.floor(Math.random() * artifactTypes.length)]
    var artifact

    switch (type) {
      case 'WEAPON': {
        var percentual = Math.floor(Math.random() * (500 - 1) + 1)
        var index

        if (percentual >= 85) index = 5
        else if (percentual >= 80) index = 4
        else if (percentual >= 70) index = 3
        else if (percentual >= 50) index = 2
        else if (percentual >= 30) index = 1
        else if (percentual >= 10) index = 0

        artifact = weaponArtifacts[index as number]
      }
        break
      default: {
        var percentual = Math.floor(Math.random() * (500 - 1) + 1)
        var index

        if (percentual >= 85) index = 5
        else if (percentual >= 80) index = 4
        else if (percentual >= 70) index = 3
        else if (percentual >= 50) index = 2
        else if (percentual >= 30) index = 1
        else if (percentual >= 10) index = 0

        artifact = bulletProofArtifacts[index as number]
      }
    }

    const embed = new Embed()

    switch (this.boss.name) {
      case 'cleiton': {
        if (this.boss.energy <= 0) {
          embed.setDescription(this.locale.get('commands.boss.you_win'))
          embed.addField(this.locale.get('commands.boss.embed.field.name'), this.locale.get('commands.boss.embed.field.value',
            {
              granex: granex.toLocaleString(),
              artifact: artifact._type,
              type
            }
          ))
    
          const webhooks = await this.channel.getWebhooks()
          var webhook = webhooks.filter(w => w.name === 'Cleiton Trovoada (Boss)')[0]
    
          if (!webhook) webhook = await this.channel.createWebhook(
            {
              name: 'Cleiton Trovoada (Boss)',
              avatar: 'https://imgur.com/7pZAh67.png',
            }
          )
    
          this.client.executeWebhook(webhook.id, webhook.token as string,
            {
              content: this.author.mention,
              embed,
              avatarURL: 'https://imgur.com/7pZAh67.png',
              username: 'Cleiton Trovoada (Boss)'
            } as MessageWebhookContent
          )
    
          this.user.artifacts.push(artifact)
          this.user.save()
    
          this.finished = true
        }
        else if (this.user.energy <= 0) {
          embed.setDescription(this.locale.get('commands.boss.you_lost'))
    
          const webhooks = await this.channel.getWebhooks()
          var webhook = webhooks.filter(w => w.name == 'Cleiton Trovoada (Boss)')[0]
    
          if (!webhook) webhook = await this.channel.createWebhook(
            {
              name: 'Cleiton Trovoada (Boss)',
              avatar: 'https://imgur.com/7pZAh67.png',
            }
          )
    
          this.client.executeWebhook(webhook.id, webhook.token as string,
            {
              content: this.author.mention,
              embed,
              avatarURL: 'https://imgur.com/7pZAh67.png',
              username: 'Cleiton Trovoada (Boss)'
            } as MessageWebhookContent
          )
    
          this.user.deadAt = Date.now() + 3.6e+6
          this.user.save()
    
          this.finished = true
        }
      }
      break
      case 'vladimir': {
        if (this.boss.energy <= 0) {
          embed.setDescription(this.locale.get('commands.boss.you_win'))
          embed.addField(this.locale.get('commands.boss.embed.field.name'), this.locale.get('commands.boss.embed.field.value',
            {
              granex: granex.toLocaleString(),
              artifact: artifact._type,
              type
            }
          ))
    
          const webhooks = await this.channel.getWebhooks()
          var webhook = webhooks.filter(w => w.name === 'Vladimir (Boss)')[0]
    
          if (!webhook) webhook = await this.channel.createWebhook(
            {
              name: 'Vladimir (Boss)',
              avatar: 'https://imgur.com/YCQAlba.png',
            }
          )
    
          this.client.executeWebhook(webhook.id, webhook.token as string,
            {
              content: this.author.mention,
              embed,
              avatarURL: 'https://imgur.com/YCQAlba.png',
              username: 'Vladimir (Boss)'
            } as MessageWebhookContent
          )
    
          this.user.artifacts.push(artifact)
          this.user.save()
    
          this.finished = true
        }
        else if (this.user.energy <= 0) {
          embed.setDescription(this.locale.get('commands.boss.you_lost'))
    
          const webhooks = await this.channel.getWebhooks()
          var webhook = webhooks.filter(w => w.name == 'Vladimir (Boss)')[0]
    
          if (!webhook) webhook = await this.channel.createWebhook(
            {
              name: 'Vladimir (Boss)',
              avatar: 'https://imgur.com/YCQAlba.png',
            }
          )
    
          this.client.executeWebhook(webhook.id, webhook.token as string,
            {
              content: this.author.mention,
              embed,
              avatarURL: 'https://imgur.com/YCQAlba.png',
              username: 'Vladimir (Boss)'
            } as MessageWebhookContent
          )
    
          this.user.deadAt = Date.now() + 3.6e+6
          this.user.save()
    
          this.finished = true
        }
      }
    }
  }
}