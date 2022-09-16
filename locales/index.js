const fs = require('fs')

module.exports = {
    get: (lang, content, args = {}) => {
        var locale = JSON.parse(fs.readFileSync(`locales/${lang}/locales.json`))
        
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