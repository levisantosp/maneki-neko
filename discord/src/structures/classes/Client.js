const {Client, Collection} = require("eris");
const {readdirSync} = require("fs");
const {connect} = require("mongoose");
const Logger = require("../util/Logger");

class App extends Client {
    constructor(token, options) {
        super(token, options);
        this.commands = new Collection();
        this.aliases = new Collection();
    }
    async login() {
        var commandModule = readdirSync("discord/src/commands");
        commandModule.forEach(module => {
            var commands = readdirSync(`discord/src/commands/${module}`);
            commands.forEach(cmd => {
                const Command = require(`../../commands/${module}/${cmd}`);
                const command = new Command(this);
                this.commands.set(command.name, command);
                if(command.aliases) {
                    command.aliases.forEach(alias => {
                        this.aliases.set(alias, command.name);
                    });
                }
            });
        });
        var listenerType = readdirSync("discord/src/listeners");
        listenerType.forEach(type => {
            var listeners = readdirSync(`discord/src/listeners/${type}`);
            listeners.forEach(listen => {
                const Listener = require(`../../listeners/${type}/${listen}`);
                const listener = new Listener(this);
                Logger.warn(`[${listener.name}] listener loaded sucessfully`);
                this.on(listener.name, (...args) => listener.on(...args).catch(err => new Logger(this).error(err)));
            });
        });
        await connect(process.env.MONGO_URI);
        await Logger.send("Database connected sucessfully");
        this.connect();
    }
}
module.exports = new App(process.env.TOKEN, {
    restMode: true,
    compress: true,
    defaultImageFormat: "png",
    defaultImageSize: 4096,
    allowedMentions: {
        repliedUser: true,
        users: true,
        roles: true,
        everyone: false
    },
    intents: ["all"]
});