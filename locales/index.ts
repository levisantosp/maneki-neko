import fs from 'fs'

export const get = (lang: string, content: string, args?: any) => {
	var locale = JSON.parse(fs.readFileSync(`locales/${lang}/locales.json`, 'utf-8'))

	console.log(Object.keys(args))
	console.log(args)

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