const {Command, Embed, Button} = require('../../structures');
const {User} = require('../../../../database');
//const {ImgurClient} = require('imgur');
//const client = new ImgurClient({clientId: process.env.IMGUR_CLIENT_ID, clientSecret: process.env.IMGUR_CLIENT_SECRET});

module.exports = class BackgroundCommand extends Command {
    constructor() {
        super({
            name: 'background',
            aliases: ['wallpaper', 'wp', 'bg'],
            description: 'Select you profile background',
            category: 'social'
        });
    }
    async run(message) {
        return message.reply('This command has been temporarily disabled');
        const user = await User.findById(message.author.id);
        if(!user) return message.reply('userIsNotInDatabase');
        if(user.waitingBackground) return message.reply('waitingBackground');
        if(!message.attachments[0]) return message.reply('attachFile');
        const attachment = message.attachments[0];
        const img = await client.upload({image: attachment.url, type: 'url'});
        if(!img.success) return message.reply('imgurFalse');
        user.waitingBackground = img.data.link;
        
        const embed = new Embed();
        embed.setTitle('Novo background enviado para análise');
        embed.setDescription(`${message.author.username}#${message.author.discriminator} enviou um background para análise!`);
        embed.setImage(img.data.link);
        embed.setThumbnail(message.author.avatarURL);
        embed.setFooter(user.id);
        const channel = this.client.getChannel('979035224556056586');
        const button = new Button();
        button.setStyle('GREEN');
        button.setLabel('Aprovar');
        button.setCustomID('aprovar');

        const button2 = new Button();
        button2.setStyle('RED');
        button2.setLabel('Reprovar');
        button2.setCustomID('reprovar');
        channel.createMessage({embed, components: [{
            type: 1,
            components: [button, button2]
        }]});
        user.save();
        message.reply('imageUploaded');
    }
}