const {Schema, model} = require('mongoose');

const guild = new Schema({
    _id: String,
    prefix: {type: String, default: '.'},
    lang: {type: String, default: 'en'},
    allowedChannels: {type: Array, default: []},
    plan: String,
    polices: Array,
    firemans: Array,
    level: {type: Number, default: 0},
    exp: {type: Number, default: 0},
    xpRequired: {type: Number, default: 150},
    announcements: String
});

module.exports = model('guilds', guild);