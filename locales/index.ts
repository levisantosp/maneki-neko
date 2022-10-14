import fs from 'fs'

export default {
    get: (lang: 'pt' | 'en', content: string, args: object) => {
        var locale = JSON.parse(fs.readFileSync(`locales/${lang}/locales.json`), 'UTF-8')
        
        for (const file of content.split('.')) {
            locale = locale[file]
            if (!locale) return content
        }
        if (typeof content === 'string') {
            for (const arg of Object.keys(args)) {
                locale = locale.replaceAll(`{${arg}}`, args[arg])
            }
            return locale
        }
    }
}