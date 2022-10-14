import { Schema, model } from 'mongoose'

const bank = new Schema({
    _id: String,
    granex: { type: Number, default: 1000000 },
    fillTime: { type: Number, default: 0 },
    taxTime: { type: Number, default: 0 }
})

export default model('bank', bank)