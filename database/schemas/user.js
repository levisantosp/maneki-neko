const {Schema, model} = require("mongoose");

const user = new Schema({
    _id: String,
    energy: {type: Number, default: 2000},
    deadAt: Number,
    asuras: {type: Number, default: 0},
    job: String,
    exp: {type: Number, default: 0},
    level: {type: Number, default: 0},
    xpRequired: {type: Number, default: 150},
    aboutme: {type: String, default: ""},
    banned: Boolean,
    bannedReason: String,
    dailyTime: {type: Number, default: 0},
    weeklyTime: {type: Number, default: 0},
    workTime: {type: Number, default: 0},
    premium: Boolean,
    premiumTime: {type: Number, default: 0},
    background: {type: String, default: "https://i.imgur.com/R0Y7XCF.jpg"},
    waitingBackground: String,
    marriedWith: String,
    marryTime: Number,
    reps: {type: Number, default: 0},
    job: String,
    hasCar: Boolean,
    hasMotorcicle: Boolean,
    hasTruck: Boolean,
    hasFarm: Boolean,
    certificates: {type: Array, default: []},
    inventory: {weapons: Array, foods: Array},
    usingWeapon: {weapon: String, damage: Number},
    usingBulletProof: {name: String, protection: Number},
    hasGunLicense: Boolean
});

module.exports = model("users", user);