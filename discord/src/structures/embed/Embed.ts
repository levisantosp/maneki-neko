interface EmbedAuthorOptions {
    name: string
    icon_url?: string | null
    url?: string | null
}

interface EmbedFieldsOptions {
    name: string
    value: string
    inline?: boolean | null
}

interface EmbedImageOption {
    url: string
}

interface EmbedFooterOptions {
    text: string
    icon_url?: string | null
}

export default class Embed {
    author?: EmbedAuthorOptions | null
    title?: string | null
    url?: string | null
    description?: string | null
    fields?: Array<EmbedFieldsOptions> | null
    image?: EmbedImageOption | null
    thumbnail?: EmbedImageOption | null
    timestamp?: Date | null
    footer?: EmbedFooterOptions | null
    color?: number | null

    constructor() {}

    setAuthor(name: string, icon_url: string, url: string) {
        this.author = {
            name,
            icon_url,
            url
        }
        return this
    }

    setTitle(title: string) {
        this.title = title
        return this
    }

    setDescription(description: string) {
        this.description = description.slice(0, 4096)
        return this
    }

    addField(name: string, value: string, inline?: boolean) {
        this.fields?.push(
            {
                name,
                value,
                inline
            }
        )
        return this
    }

    addFields(fields: Array<EmbedFieldsOptions>) {
        fields.forEach(field => {
            this.fields?.push(
                {
                    name: field.name,
                    value: field.value,
                    inline: field.inline
                }
            )
        })
        return this
    }

    setImage(url: string) {
        this.image = { url }
        return this
    }

    setThumbnail(url: string) {
        this.thumbnail = { url }
        return this
    }

    setTimestamp(timestamp: Date) {
        this.timestamp = timestamp ? timestamp : new Date()
        return this
    }

    setFooter(text: string, icon_url?: string) {
        this.footer = { text, icon_url }
    }

    setColor(color: string) {
        if (typeof color !== 'string') throw new Error('The color type must be a string')
        
        this.color = parseInt(color.toUpperCase().replace('#', ''), 16)
        return this
    }

    build(content: string) {
        if (!content) content = ''
        return {
            content,
            embed: this
        }
    }
}