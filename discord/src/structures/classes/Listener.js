module.exports = class Listener {
    constructor(options) {
        this.name = options.name;
        this.client = require("./Client");
    }
    on() {}
}