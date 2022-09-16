const { Schema, model } = require('mongoose')

const hg = new Schema({
    _id: String,
    closed: { type: Boolean, default: false },
    players: { type: Array, default: [] },
    maxPlayers: { type: Number, default: 50 },
    startsIn: { type: Number, default: 0 },
    lastWinner: String,
    channelsInteract: { type: Array, default: [] }
})

module.exports = model('hg', hg)