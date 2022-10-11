require('dotenv').config()
const { Client } = require('./src/structures')
Client.login()
Client.setMaxListeners(Infinity)