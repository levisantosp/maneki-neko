const {Command} = require("../../structures");

module.exports = class extends Command {
    constructor() {
        super({
            name: "farm",
            aliases: ["fazenda", "ranch", "rancho"],
            description: ""
        });
    }
}