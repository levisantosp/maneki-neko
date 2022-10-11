const locale = require('../../../../locales')
const { CommandInteraction } = require('eris')

module.exports = class CommandContext {
    constructor({ interaction, client, locale, db, guild }) {
        this.interaction = interaction
        this.client = client
        this.db = db
        this.locale = locale
        this.guild = guild
    }

    /**
     * 
     * @param {string | object} content 
     * @param {object} options 
     * @returns {CommandInteraction}
     */
    reply(content, options) {
        switch (typeof content) {
            case 'string': {
                if (options?.name && options?.file) {
                    return this.interaction.createMessage(
                        {
                            content: locale.get(this.locale, content, options)
                        },
                        {
                            file: options?.file,
                            name: options?.name
                        }
                    )
                }
                else return this.interaction.createMessage(
                    {
                        content: locale.get(this.locale, content, options)
                    }
                )
            }
            case 'object': {
                if (options?.options && options?.name) {
                    return this.interaction.createMessage(Object.assign(content,
                        {
                            interactionReference: {
                                interactionID: this.interaction.id
                            }
                        }),
                        {
                            file: options?.file,
                            name: options?.name
                        }
                    )
                }
                else return this.interaction.createMessage(Object.assign(content,
                    {
                        interactionReference: {
                            interactionID: this.interaction.id
                        }
                    })
                )
            }
        }
    }
}