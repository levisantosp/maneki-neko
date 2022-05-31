const {Command, Embed, SelectMenu} = require("../../structures");
const {User} = require("../../../../database");
const {ComponentInteraction} = require("eris");

module.exports = class extends Command {
    constructor() {
        super({
            name: "job",
            aliases: ["emprego"],
            description: "Get a job, yay",
            category: "Roleplay",
            botPermissions: ["embedLinks"]
        });
    }
    async run(message) {
        const embed = new Embed();
        embed.setTitle(this._locale.get("jobEmbedTitle"));
        embed.addField(this._locale.get("trashman"), this._locale.get("trashmanDescription"), true);
        embed.addField(this._locale.get("newsagent"), this._locale.get("newsagentDescription"), true);
        embed.addField("Uber Eats", this._locale.get("ubereatsDescription"), true);
        embed.addField("Uber", this._locale.get("uberDescription"), true);
        embed.addField(this._locale.get("tanker"), this._locale.get("tankerDescription"), true);
        embed.addField(this._locale.get("trucker"), this._locale.get("truckerDescription"), true);
        embed.addField(this._locale.get("postoffice"), this._locale.get("postofficeDescription"), true);
        embed.addField(this._locale.get("fireman"), this._locale.get("firemanDescription"), true);
        embed.addField(this._locale.get("police"), this._locale.get("policeDescription"), true);
        embed.addField(this._locale.get("mafiaboss"), this._locale.get("mafiabossDescription"), true);
        embed.addField(this._locale.get("lawyer"), this._locale.get("lawyerDescription"), true);
        embed.addField(this._locale.get("farmer"), this._locale.get("farmerDescription"), true);

        const menu = new SelectMenu();
        menu.setPlaceholder("Select One");
        menu.addOption(this._locale.get("trashman"), this._locale.get("trashmanDescription"), "trashman");
        menu.addOption(this._locale.get("newsagent"), this._locale.get("newsagentDescription"), "newsagent");
        menu.addOption("Uber Eats", this._locale.get("ubereatsDescription"), "ubereats");
        menu.addOption("Uber", this._locale.get("uberDescription"), "uber");
        menu.addOption(this._locale.get("tanker"), this._locale.get("tankerDescription"), "tanker");
        menu.addOption(this._locale.get("trucker"), this._locale.get("truckerDescription"), "trucker");
        menu.addOption(this._locale.get("postoffice"), this._locale.get("postofficeDescription"), "postoffice");
        menu.addOption(this._locale.get("fireman"), this._locale.get("firemanDescription"), "fireman");
        menu.addOption(this._locale.get("police"), this._locale.get("policeDescription"), "police");
        menu.addOption(this._locale.get("mafiaboss"), this._locale.get("mafiabossDescription"), "mafiaboss");
        menu.addOption(this._locale.get("lawyer"), this._locale.get("lawyerDescription"), "lawyer");
        menu.addOption(this._locale.get("farmer"), this._locale.get("farmerDescription"), "farmer");
        menu.setCustomID("menu-job");
        
        const msg = await message.reply({
            embed,
            components: [{
                type: 1,
                components: [menu]
            }]
        });
        this.client.on("interactionCreate", async interaction => {
            if(interaction instanceof ComponentInteraction) {
                if(interaction.data.custom_id !== "menu-job") return;
                if(interaction.channel.id !== message.channel.id) return;
                if(interaction.message.id !== msg.id) return;
                if(interaction.member.id !== message.member.id) return interaction.deferUpdate();
                await interaction.deferUpdate();
                const user = await User.findById(message.member.id) || new User({_id: interaction.member.id})
                switch(interaction.data.values[0]) {
                    case "trashman":
                        user.job = "trashman";
                        user.save();
                        message.reply("nowYouAre", {job: this._locale.get("trashman")});
                            break;
                    case "newsagent":
                        if(user.level < 5) return message.reply("noLevel", {level: 5});
                        user.job = "newsagent";
                        user.save();
                        message.reply("nowYouAre", {job: this._locale.get("newsagent")});
                            break;
                    case "ubereats":
                        if(user.level < 10) return message.reply("noLevel", {level: 10});
                        if(!user.hasMotorcicle) return message.reply("noMotorcicle");
                        user.job = "ubereats";
                        user.save();
                        message.reply("nowYouAre", {job: this._locale.get("ubereats")});
                            break;
                    case "uber":
                        if(user.level < 15) return message.reply("noLevel", {level: 15});
                        if(!user.hasCar) return message.reply("noCar");
                        user.job = "uber";
                        user.save();
                        message.reply("nowYouAre", {job: this._locale.get("uber")});
                            break;
                    case "tanker":
                        if(user.level < 20) return message.reply("noLevel", {level: 20});
                        user.job = "tanker";
                        user.save();
                        message.reply("nowYouAre", {job: this._locale.get("tanker")});
                            break;
                    case "trucker":
                        if(user.level < 25) return message.reply("noLevel", {level: 25});
                        if(!user.hasTruck) return message.reply("noTruck");
                        user.job = "trucker";
                        user.save();
                        message.reply("nowYouAre", {job: this._locale.get("trucker")});
                            break;
                    case "postoffice":
                        if(user.level < 30) return message.reply("noLevel", {level: 30});
                        user.job = "postoffice";
                        user.save();
                        message.reply("nowYouAre", {job: this._locale.get("postoffice")});
                            break;
                    case "fireman":
                        if(user.certificates.includes("fireman")) return;
                        if(user.level < 35) return message.reply("noLevel", {level: 35});
                        user.certificates.push("fireman");
                        user.certificates = user.certificates;
                        user.save();
                        message.reply("certificateDelivered", {job: this._locale.get("fireman")});
                            break;
                    case "police":
                        if(user.certificates.includes("police")) return;
                        if(user.level < 40) return message.reply("noLevel", {level: 40});
                        user.certificates.push("police");
                        user.certificates = user.certificates;
                        user.save();
                        message.reply("certificateDelivered", {job: this._locale.get("police")});
                            break;
                    case "mafiaboss":
                        if(user.level < 45) return message.reply("noLevel", {level: 45});
                        user.job = "mafiaboss";
                        user.save();
                        message.reply("nowYouAre", {job: this._locale.get("mafiaboss")});
                            break;
                    case "lawyer":
                        if(user.level < 50) return message.reply("noLevel", {level: 50});
                        user.job = "lawyer";
                        user.save();
                        message.reply("nowYouAre", {job: this._locale.get("lawyer")});
                            break;
                    case "farmer":
                        if(user.level < 55) return message.reply("noLevel", {level: 55});
                        if(!user.hasFarm) return message.reply("noFarm");
                        user.job = "farmer";
                        user.save();
                        message.reply("nowYouAre", {job: this._locale.get("farmer")})
                }
            }
        });
    }
}