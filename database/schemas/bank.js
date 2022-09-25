const { Schema, model } = require('mongoose')

const bank = new Schema({
    _id: String,
    granex: { type: Number, default: 1000000 },
    fillTime: { type: Number, default: 0 },
    taxTime: { type: Number, default: 0 }
})

module.exports = model('bank', bank)