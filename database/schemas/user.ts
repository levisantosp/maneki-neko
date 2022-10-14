import { Schema, model } from 'mongoose'

const user = new Schema({
    _id: String,
    energy: { type: Number, default: 2000 },
    energyTime: { type: Number, default: 0 },
    deadAt: Number,
    granex: { type: Number, default: 0 },
    job: String,
    exp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    xpRequired: { type: Number, default: 150 },
    aboutme: { type: String, default: '' },
    banned: Boolean,
    bannedReason: String,
    bannedUntil: Number,
    dailyTime: { type: Number, default: 0 },
    weeklyTime: { type: Number, default: 0 },
    workTime: { type: Number, default: 0 },
    premium: Boolean,
    premiumTime: { type: Number, default: 0 },
    background: { type: String, default: 'https://i.imgur.com/R0Y7XCF.jpg' },
    waitingBackground: String,
    marriedWith: String,
    marryTime: Number,
    reps: { type: Number, default: 0 },
    repTime: { type: Number, default: 0 },
    hasCar: Boolean,
    hasMotorcycle: Boolean,
    hasTruck: Boolean,
    certificates: { type: Array, default: [] },
    inventory: { weapons: Array, foods: Array, plants: Array },
    usingWeapon: {
        weapon: String, damage: Number, artifact: {
            _type: String,
            damage: { type: Number, default: 0 },
            percentDamage: { type: Number, default: 0 },
            level: { type: Number, default: 0 },
            exp: { type: Number, default: 0 },
            xpRequired: { type: Number, default: 0 }
        }
    },
    usingBulletProof: {
        name: String, def: Number, artifact: {
            _type: String,
            def: { type: Number, default: 0 },
            percentDef: { type: Number, default: 0 },
            level: { type: Number, default: 0 },
            exp: { type: Number, default: 0 },
            xpRequired: { type: Number, default: 0 }
        }
    },
    hasGunLicense: Boolean,
    farms: Array,
    farmTime: { type: Number, default: 0 },
    mineTime: { type: Number, default: 0 },
    ores: {
        diamond: { type: Number, default: 0 },
        platinum: { type: Number, default: 0 },
        gold: { type: Number, default: 0 },
        ruby: { type: Number, default: 0 },
        iron: { type: Number, default: 0 },
        copper: { type: Number, default: 0 }
    },
    robTime: { type: Number, default: 0 },
    artifacts: { type: Array, default: [] },
    bossTime: { type: Number, default: 0 },
    templates: { type: Array, default: [] },
    profileTemplate: { type: String, default: 'default' }
})

export default model('users', user)