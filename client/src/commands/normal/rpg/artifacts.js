const { Command, Embed, Button, SelectMenu, Modal, ModalBuilder } = require('../../../structures')
const { User, Bank } = require('../../../../../database')
const { ComponentInteraction } = require('eris')

module.exports = class ArtifactsCommand extends Command {
    constructor() {
        super({
            name: 'artifacts',
            aliases: ['artefatos'],
            description: 'View your artifacts, upgrade them, and more',
            category: 'RPG',
            syntax: 'artifacts <options>',
            examples: [
                'artifacts',
                'artifacts upgrade [artifact_id] [ore] <quantity>',
                'artifacts equip [artifact_id] [weapon]'
            ]
        })
    }
    async run (message) {
        const user = await User.findById(message.author.id)
        const bank = await Bank.findById('bank')

        switch (message.args[0]?.toLowerCase()) {
            case 'upgrade': {
                const artifact = user.artifacts[message.args[1]]
                const ore = message.args[2]
                const quantity = message.args[3] ?? 1

                if (!artifact) return message.reply('commands.artifacts.you_dont_have_this_artifact', { id: message.args[1] })
                if (user.ores[ore] <= 0) return message.reply('commands.artifacts.you_dont_have_this_ore')
                if (isNaN(quantity)) return message.reply('helper.arg_is_NaN', { arg: quantity })

                if (artifact.level == 20) return message.reply('commands.artifacts.artifact_is_upgraded')

                var exp
                var granex
                switch (ore) {
                    case 'copper':
                        exp = 50 * quantity
                        granex = 100 * quantity
                        break
                    case 'iron':
                        exp = 100 * quantity
                        granex = 200 * quantity
                        break
                    case 'ruby':
                        exp = 150 * quantity
                        granex = 300 * quantity
                        break
                    case 'gold':
                        exp = 200 * quantity
                        granex = 400 * quantity
                        break
                    case 'platinum':
                        exp = 250 * quantity
                        granex = 500 * quantity
                        break
                    case 'diamond':
                        exp = 300 * quantity
                        granex = 600 * quantity
                }

                user.artifacts[message.args[1]].exp += exp

                var index = message.args[1]

                if (user.artifacts[index].exp > user.artifacts[index].xpRequired) {
                    user.artifacts[index].exp = 0
                    user.artifacts[index].xpRequired += 500
                    user.artifacts[index].level += 1
                    
                    if (artifact.percentDamage) {
                        user.artifacts[index].damage += 52
                        user.artifacts[index].percentDamage += 0.3
                    }
                    else {
                        user.artifacts[index].def += 77
                        user.artifacts[index].percentDef += 0.15
                    }

                    message.reply('commands.artifacts.artifact_upgraded', {
                        artifact,
                        level: user.artifacts[index].level,
                        granex: granex.toLocaleString(message.guild.db.lang === 'en' ? 'en-US' : 'pt-BR')
                    })
                }
                else message.reply('commands.artifacts.artifact_upgraded2', { granex: granex.toLocaleString(message.guild.db.lang === 'en' ? 'en-US' : 'pt-BR') })

                user.artifacts.splice(index, 1, user.artifacts[index])
                user.ores[ore] -= quantity
                user.granex -= granex
                
                bank.granex += granex

                bank.save()
                user.save()
            }
                break
            case 'equip': {
                const artifact = user.artifacts[message.args[1]]
                if (!artifact) return message.reply('commands.artifacts.you_dont_have_this_artifact', { id: message.args[1] })
                if (!user.usingWeapon.weapon) return message.reply('commands.artifacts.equip_a_weapon')

                if (artifact.percentDamage) {
                    if (user.usingWeapon.artifact._type) {
                        user.artifacts.push(...user.usingWeapon.artifact)
                    }
                    user.usingWeapon.artifact = artifact

                    var index = user.artifacts.indexOf(artifact)
                    user.artifacts.splice(index, 1)

                    message.reply('commands.artifacts.artifact_equiped', {
                        type: artifact._type,
                        percentDamage: parseInt(artifact.percentDamage * 100),
                        damage: artifact.damage
                    })
                }
                else {
                    if (!user.usingBulletProof.name) return message.reply('commands.artifacts.equip_a_vest')
                    if (user.usingBulletProof.artifact._type) {
                        user.artifacts.push(...user.usingBulletProof.artifact)
                    }
                    user.usingBulletProof.artifact = artifact

                    var index = user.artifacts.indexOf(artifact)
                    user.artifacts.splice(index, 1)

                    message.reply('commands.artifacts.artifact_equiped2', {
                        type: artifact._type,
                        percentDef: parseInt(artifact.percentDef * 100),
                        def: artifact.def
                    })
                }

                user.save()
            }
                break
            default: {
                const embed = new Embed()
                embed.setTitle(this.locale.get('commands.artifacts.embed.title'))

                var id = 0

                user.artifacts.forEach(artifact => {
                    embed.addField(this.locale.get('commands.artifacts.embed.field', { id: id++ }), `${artifact._type} (${artifact.def ? 'BULLET_PROOF' : 'WEAPON'})\nLevel ${artifact.level}`)
                })

                if (!embed.fields[0]) embed.setDescription(this.locale.get('commands.artifacts.empty'))

                const menu = new SelectMenu()

                var _id = 0
                var id_ = 0

                user.artifacts.slice(0, 24)
                user.artifacts.forEach(artifact => {
                    menu.addOption(this.locale.get('commands.artifacts.embed.field', { id: _id++ }), `${artifact._type} (${artifact.def ? 'BULLET_PROOF' : 'WEAPON'})`, id_++)
                    menu.setCustomID(`artifacts`)
                })

                var msg

                if (user.artifacts[0]) {
                    msg = await await message.reply(
                        {
                            embed,
                            components: [
                                {
                                    type: 1,
                                    components: [menu]
                                }
                            ]
                        }
                    )
                }
                else {
                    msg = await message.reply(embed.build())
                }

                this.client.on('interactionCreate', async interaction => {
                    if (interaction instanceof ComponentInteraction) {
                        if (interaction.channel.id !== message.channel.id) return
                        if (interaction.member.id !== message.author.id) return interaction.deferUpdate()
                        if (interaction.message.id !== msg.id) return

                        switch (interaction.data.custom_id) {
                            case 'artifacts': {
                                const artifact = user.artifacts[interaction.data.values[0]]

                                const embed = new Embed()
                                const copper = new Button().setDisabled()
                                const iron = new Button().setDisabled()
                                const ruby = new Button().setDisabled()
                                const gold = new Button().setDisabled()
                                const platinum = new Button().setDisabled()
                                const diamond = new Button().setDisabled()

                                copper.setStyle('BLUE')
                                copper.setLabel(this.locale.get('commands.artifacts.upgrade_with.copper'))
                                copper.setCustomID('copper')

                                iron.setStyle('BLUE')
                                iron.setLabel(this.locale.get('commands.artifacts.upgrade_with.iron'))
                                iron.setCustomID('iron')

                                ruby.setStyle('BLUE')
                                ruby.setLabel(this.locale.get('commands.artifacts.upgrade_with.ruby'))
                                ruby.setCustomID('ruby')

                                gold.setStyle('BLUE')
                                gold.setLabel(this.locale.get('commands.artifacts.upgrade_with.gold'))
                                gold.setCustomID('gold')

                                platinum.setStyle('BLUE')
                                platinum.setLabel(this.locale.get('commands.artifacts.upgrade_with.platinum'))
                                platinum.setCustomID('platinum')

                                diamond.setStyle('BLUE')
                                diamond.setLabel(this.locale.get('commands.artifacts.upgrade_with.diamond'))
                                diamond.setCustomID('diamond')

                                /*if (user.ores.copper <= 0) copper.setDisabled()
                                if (user.ores.iron <= 0) iron.setDisabled()
                                if (user.ores.ruby <= 0) ruby.setDisabled()
                                if (user.ores.gold <= 0) gold.setDisabled()
                                if (user.ores.platinum <= 0) platinum.setDisabled()
                                if (user.ores.diamond <= 0) diamond.setDisabled()*/

                                await interaction.defer(64)

                                switch (interaction.data.values[0]) {
                                    case '0': {
                                        embed.setTitle(this.locale.get('commands.artifacts.embed.field', { id: interaction.data.values[0] }))
                                        embed.setDescription(this.locale.get('commands.artifacts.embed.description',
                                            {
                                                level: artifact.level,
                                                exp: artifact.exp,
                                                xpRequired: artifact.xpRequired,
                                                percentDamage: parseInt(artifact.percentDamage * 100),
                                                damage: artifact.damage,
                                                def: artifact.def,
                                                percentDef: parseInt(artifact.percentDef * 100)
                                            }
                                        ))
                                        interaction.createMessage(
                                            {
                                                embed,
                                                components: [
                                                    {
                                                        type: 1,
                                                        components: [copper, iron, ruby]
                                                    },
                                                    {
                                                        type: 1,
                                                        components: [gold, platinum, diamond]
                                                    }
                                                ]
                                            }
                                        )
                                    }
                                        break
                                    case '1': {
                                        embed.setTitle(this.locale.get('commands.artifacts.embed.field', { id: interaction.data.values[0] }))
                                        embed.setDescription(this.locale.get('commands.artifacts.embed.description',
                                            {
                                                level: artifact.level,
                                                exp: artifact.exp,
                                                xpRequired: artifact.xpRequired,
                                                percentDamage: parseInt(artifact.percentDamage * 100),
                                                damage: artifact.damage,
                                                def: artifact.def,
                                                percentDef: parseInt(artifact.percentDef * 100)
                                            }
                                        ))
                                        interaction.createMessage(
                                            {
                                                embed,
                                                components: [
                                                    {
                                                        type: 1,
                                                        components: [copper, iron, ruby]
                                                    },
                                                    {
                                                        type: 1,
                                                        components: [gold, platinum, diamond]
                                                    }
                                                ]
                                            }
                                        )
                                    }
                                        break
                                    case '2': {
                                        embed.setTitle(this.locale.get('commands.artifacts.embed.field', { id: interaction.data.values[0] }))
                                        embed.setDescription(this.locale.get('commands.artifacts.embed.description',
                                            {
                                                level: artifact.level,
                                                exp: artifact.exp,
                                                xpRequired: artifact.xpRequired,
                                                percentDamage: parseInt(artifact.percentDamage * 100),
                                                damage: artifact.damage,
                                                def: artifact.def,
                                                percentDef: parseInt(artifact.percentDef * 100)
                                            }
                                        ))
                                        interaction.createMessage(
                                            {
                                                embed,
                                                components: [
                                                    {
                                                        type: 1,
                                                        components: [copper, iron, ruby]
                                                    },
                                                    {
                                                        type: 1,
                                                        components: [gold, platinum, diamond]
                                                    }
                                                ]
                                            }
                                        )
                                    }
                                        break
                                    case '3': {
                                        embed.setTitle(this.locale.get('commands.artifacts.embed.field', { id: interaction.data.values[0] }))
                                        embed.setDescription(this.locale.get('commands.artifacts.embed.description',
                                            {
                                                level: artifact.level,
                                                exp: artifact.exp,
                                                xpRequired: artifact.xpRequired,
                                                percentDamage: parseInt(artifact.percentDamage * 100),
                                                damage: artifact.damage,
                                                def: artifact.def,
                                                percentDef: parseInt(artifact.percentDef * 100)
                                            }
                                        ))
                                        interaction.createMessage(
                                            {
                                                embed,
                                                components: [
                                                    {
                                                        type: 1,
                                                        components: [copper, iron, ruby]
                                                    },
                                                    {
                                                        type: 1,
                                                        components: [gold, platinum, diamond]
                                                    }
                                                ]
                                            }
                                        )
                                    }
                                        break
                                    case '4': {
                                        embed.setTitle(this.locale.get('commands.artifacts.embed.field', { id: interaction.data.values[0] }))
                                        embed.setDescription(this.locale.get('commands.artifacts.embed.description',
                                            {
                                                level: artifact.level,
                                                exp: artifact.exp,
                                                xpRequired: artifact.xpRequired,
                                                percentDamage: parseInt(artifact.percentDamage * 100),
                                                damage: artifact.damage,
                                                def: artifact.def,
                                                percentDef: parseInt(artifact.percentDef * 100)
                                            }
                                        ))
                                        interaction.createMessage(
                                            {
                                                embed,
                                                components: [
                                                    {
                                                        type: 1,
                                                        components: [copper, iron, ruby]
                                                    },
                                                    {
                                                        type: 1,
                                                        components: [gold, platinum, diamond]
                                                    }
                                                ]
                                            }
                                        )
                                    }
                                        break
                                    case '5': {
                                        embed.setTitle(this.locale.get('commands.artifacts.embed.field', { id: interaction.data.values[0] }))
                                        embed.setDescription(this.locale.get('commands.artifacts.embed.description',
                                            {
                                                level: artifact.level,
                                                exp: artifact.exp,
                                                xpRequired: artifact.xpRequired,
                                                percentDamage: parseInt(artifact.percentDamage * 100),
                                                damage: artifact.damage,
                                                def: artifact.def,
                                                percentDef: parseInt(artifact.percentDef * 100)
                                            }
                                        ))
                                        interaction.createMessage(
                                            {
                                                embed,
                                                components: [
                                                    {
                                                        type: 1,
                                                        components: [copper, iron, ruby]
                                                    },
                                                    {
                                                        type: 1,
                                                        components: [gold, platinum, diamond]
                                                    }
                                                ]
                                            }
                                        )
                                    }
                                        break
                                    case '6': {
                                        embed.setTitle(this.locale.get('commands.artifacts.embed.field', { id: interaction.data.values[0] }))
                                        embed.setDescription(this.locale.get('commands.artifacts.embed.description',
                                            {
                                                level: artifact.level,
                                                exp: artifact.exp,
                                                xpRequired: artifact.xpRequired,
                                                percentDamage: parseInt(artifact.percentDamage * 100),
                                                damage: artifact.damage,
                                                def: artifact.def,
                                                percentDef: parseInt(artifact.percentDef * 100)
                                            }
                                        ))
                                        interaction.createMessage(
                                            {
                                                embed,
                                                components: [
                                                    {
                                                        type: 1,
                                                        components: [copper, iron, ruby]
                                                    },
                                                    {
                                                        type: 1,
                                                        components: [gold, platinum, diamond]
                                                    }
                                                ]
                                            }
                                        )
                                    }
                                        break
                                    case '7': {
                                        embed.setTitle(this.locale.get('commands.artifacts.embed.field', { id: interaction.data.values[0] }))
                                        embed.setDescription(this.locale.get('commands.artifacts.embed.description',
                                            {
                                                level: artifact.level,
                                                exp: artifact.exp,
                                                xpRequired: artifact.xpRequired,
                                                percentDamage: parseInt(artifact.percentDamage * 100),
                                                damage: artifact.damage,
                                                def: artifact.def,
                                                percentDef: parseInt(artifact.percentDef * 100)
                                            }
                                        ))
                                        interaction.createMessage(
                                            {
                                                embed,
                                                components: [
                                                    {
                                                        type: 1,
                                                        components: [copper, iron, ruby]
                                                    },
                                                    {
                                                        type: 1,
                                                        components: [gold, platinum, diamond]
                                                    }
                                                ]
                                            }
                                        )
                                    }
                                        break
                                    case '8': {
                                        embed.setTitle(this.locale.get('commands.artifacts.embed.field', { id: interaction.data.values[0] }))
                                        embed.setDescription(this.locale.get('commands.artifacts.embed.description',
                                            {
                                                level: artifact.level,
                                                exp: artifact.exp,
                                                xpRequired: artifact.xpRequired,
                                                percentDamage: parseInt(artifact.percentDamage * 100),
                                                damage: artifact.damage,
                                                def: artifact.def,
                                                percentDef: parseInt(artifact.percentDef * 100)
                                            }
                                        ))
                                        interaction.createMessage(
                                            {
                                                embed,
                                                components: [
                                                    {
                                                        type: 1,
                                                        components: [copper, iron, ruby]
                                                    },
                                                    {
                                                        type: 1,
                                                        components: [gold, platinum, diamond]
                                                    }
                                                ]
                                            }
                                        )
                                    }
                                        break
                                    case '9': {
                                        embed.setTitle(this.locale.get('commands.artifacts.embed.field', { id: interaction.data.values[0] }))
                                        embed.setDescription(this.locale.get('commands.artifacts.embed.description',
                                            {
                                                level: artifact.level,
                                                exp: artifact.exp,
                                                xpRequired: artifact.xpRequired,
                                                percentDamage: parseInt(artifact.percentDamage * 100),
                                                damage: artifact.damage,
                                                def: artifact.def,
                                                percentDef: parseInt(artifact.percentDef * 100)
                                            }
                                        ))
                                        interaction.createMessage(
                                            {
                                                embed,
                                                components: [
                                                    {
                                                        type: 1,
                                                        components: [copper, iron, ruby]
                                                    },
                                                    {
                                                        type: 1,
                                                        components: [gold, platinum, diamond]
                                                    }
                                                ]
                                            }
                                        )
                                    }
                                }
                            }
                                break
                            case 'copper': {
                                return interaction.deferUpdate()
                                const modal = new Modal()
                                modal.setPlaceholder('test test')
                                modal.setLabel('test')
                                modal.setCustomID('modal')
                                modal.setStyle('SHORT')
                                modal.isRequired()

                                const builded = new ModalBuilder()
                                builded.addComponent(
                                    {
                                        type: 1,
                                        components: [modal]
                                    }
                                )

                                console.log(builded)

                                interaction.createMessage(
                                    {
                                        content: 'test message',
                                        components: [builded]
                                    }
                                )
                            }
                        }
                    }
                })
            }
        }
    }
}