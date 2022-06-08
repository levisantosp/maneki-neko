const {Command, Embed} = require("../../structures");
const malScraper = require("mal-scraper");
const translate = require("@iamtraction/google-translate");

module.exports = class AnimeCommand extends Command {
    constructor() {
        super({
            name: "anime",
            description: "View a anime\"s information",
            category: "misc",
            botPermissions: ["embedLinks"]
        });
    }
    async run(message) {
        const anime = message.args[0];
        if(!anime) return message.reply("invalidArg", {try: `${message.guild.db.prefix}anime <anime>`});
        const data = await malScraper.getInfoFromName(anime);
        const synopsis = await translate(data.synopsis, {to: message.guild.db.lang});

        const embed = new Embed();
        embed.setTitle(data.title);
        embed.setURL(data.url);
        embed.setDescription(synopsis.text);
        embed.setColor("0x7289DA")
        embed.setThumbnail(data.picture);
        embed.addField(this._locale.get("type"), data.type, true);
        embed.addField(this._locale.get("eps"), data.episodes, true);
        embed.addField(this._locale.get("exibition"), data.aired, true);
        embed.addField(this._locale.get("score"), data.score, true);
        embed.addField(this._locale.get("scoreStats"), data.scoreStats, true);
        embed.addField(this._locale.get("genres"), data.genres.map(genre => genre).join(", "), true);
        embed.addField(this._locale.get("popularity"), data.popularity, true);
        embed.addField("Ranking", data.ranked, true);
        if(data.trailer) embed.addField("Trailer", `[Click here](${data.trailer})`, true);

        message.reply(embed.build());
    }
}