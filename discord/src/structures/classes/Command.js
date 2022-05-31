module.exports = class Command {
    constructor(options = {}) {
        this.name = options.name;
        this.aliases = options.aliases || [];
        this.description = options.description;
        this.category = options.category;
        this.onlyOwner = options.onlyOwner || false;
        this.permissions = options.permissions || [];
        this.botPermissions = options.botPermissions || [];
        this.client = require('./Client');
    }
    async run() {}
}