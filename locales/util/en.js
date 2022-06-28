const emojis = require('../../discord/src/util/emojis');

module.exports = {
    get: function(content, options) {
        switch(content) {
            case 'helpTitle': return 'My Commands'
            case 'helpDescription': return `Do you need help? Enter in my Discord server to make your questions! ${process.env.SUPPORT_SERVER}`
            case 'helpButtonLabel': return 'My Discord server'
            case 'usertag': return 'User Tag'
            case 'userid': return 'User ID'
            case 'userCreatedAt': return 'Account Created At'
            case 'roles': return 'Roles'
            case 'guildId': return 'Guild ID'
            case 'guildOwner': return 'Owner'
            case 'guildCreatedAt': return 'Guild Created At'
            case 'channels': return `Channels (${options.size})`
            case 'typeChannelsSize': return `Text: ${options.text}\nVoice: ${options.voice}\nStage: ${options.stage}`
            case 'guildMembers': return 'Members'
            case 'type': return 'Type'
            case 'eps': return 'Episodes'
            case 'exibition': return 'Exibition'
            case 'score': return 'Score'
            case 'scoreStats': return 'Score Stats'
            case 'genres': return 'Genres'
            case 'popularity': return 'Popularity'
            case 'inviteMe': return 'Invite Me To Your Server'
            case 'inviteDescription': return `You can invite me to your Discord server or to server that you manages [clicking here](${process.env.BOT_INVITE})\n\nDo you need help? Enter in my Discord server to make your questions! [Click here](${process.env.SUPPORT_SERVER})`
            case 'oddEvenButtonLabel': return 'Accept'
            case 'jobless': return 'Jobless'
            case 'marriedWith': return `Married with ${options.user.username}#${options.user.discriminator}`
            case 'alone': return 'Bachelor'
            case 'accept': return 'Accept'
            case 'channelsList': return 'Channels List Allowed Commands'
            case 'jobEmbedTitle': return 'Available Jobs'
            case 'trashman': return 'Trashman'
            case 'newsagent': return 'Newsagent'
            case 'tanker': return 'Tanker'
            case 'trucker': return 'Trucker'
            case 'postoffice': return 'Post Office'
            case 'fireman': return 'Fireman'
            case 'police': return 'Police Officer'
            case 'mafiaboss': return 'Mafia Boss'
            case 'lawyer': return 'Lawyer'
            case 'farmer': return 'Farmer'
            case 'trashmanDescription': return 'Income: 100 granex and 25 xp'
            case 'newsagentDescription': return 'Requirements: Level 5\nIncome: 150 granex and 50 xp'
            case 'ubereatsDescription': return 'Requirements: Level 10, 1 motorcicle\nIncome: 200 granex and 100 xp'
            case 'uberDescription': return 'Requirements: Level 15, 1 car\nIncome: 250 granex and 150 xp'
            case 'tankerDescription': return 'Requirements: Level 20\nIncome: 300 granex and 200 xp'
            case 'truckerDescription': return 'Requirements: Level 25\nIncome: 350 granex and 250 xp'
            case 'postofficeDescription': return 'Requirements: Level 30\nIncome: 400 granex and 300 xp'
            case 'firemanDescription': return 'Requirements: Level 35\nIncome: 450 granex and 350 xp'
            case 'policeDescription': return 'Requirements: Level 40\nIncome: 500 granex and 400 xp'
            case 'mafiabossDescription': return 'Requirements: Level 45\nIncome: 550 granex and 450 xp'
            case 'lawyerDescription': return 'Requirements: Level 50\nIncome: 600 granex and 500 xp'
            case 'farmerDescription': return 'Requirements: Level 55, 1 farm\nIncome: 650 granex and 550 xp'
            case 'levelUp': return `${emojis['confetti']} Congratulations! You have upgraded to level ${options.level}`
            case 'botinfoTitle': return 'Howdy! I\'m Maneki Neko!'
            case 'botinfoDescription': return `Howdy! I'm Maneki Neko, and I'm a powerful Discord bot with multiple features, such as configuration, economy, social, miscellaneous, roleplay, e utils, besides being able to interact in Brazilian Portuguese and American English.\n\nI'm currently on ${options.guilds} guilds, I know ${options.users} diferent people and I have ${options.commands} commands.\n\nI was developed in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) using the [Eris](https://abal.moe/Eris/) library.\n[\`${options.dev}\`](https://github.com/Levi0100) is my developer.`
            case 'botinfoButtonLabel': return 'Community and Support'
            case 'firemanAnnouncement': return `Hello, firefighters on duty!\nWe have a call from the user ${options.user} in ${options.channel}. He is lifeless and needs to be healed!\n${options.jumpLink}\n\n${options.users}`
            case 'policemanAnnouncement': return `Hello, police officers on duty!\nWe have a call from the user ${options.user} in ${options.channel}.\n\n**Reason:** \`${options.reason}\`\n${options.jumpLink}\n\n${options.users}`
            case 'weaponsEmbedTitle': return 'Weapons Shop'
            case 'weaponsEmbedDescription': return `To buy any weapon, use \`${options.usage}\`.\n\n**9mm:** Damage: 20 | ${emojis['granex']} 5.000 \`(10% chance of sucess in robberies)\`\n**PT 100:** Damage: 40 | ${emojis['granex']} 10.000 \`(15% chance of sucess in robberies)\`\n**Glock:** Damage: 60 | ${emojis['granex']} 12.000 \`(20% chance of sucess in robberies)\`\n**MT-40:** Damage: 120 | ${emojis['granex']} 24.000 \`(25% chance of sucess in robberies)\`\n**Uzi:** Damage: 130 | ${emojis['granex']} 28.000 \`(30% chance of sucess in robberies)\`\n**MP5:** Damage: 150 | ${emojis['granex']} 32.000 \`(35% chance of sucess in robberies)\`\n**UMP:** Damage: 150 | ${emojis['granex']} 33.000 \`(40% chance of sucess in robberies)\`\n**Carabina CT-40:** Damage: 200 | ${emojis['granex']} 45.000 \`(45% chance of sucess in robberies)\`\n**Carabina 556:** Damage: 220 | ${emojis['granex']} 48.000 \`(50% chance of sucess in robberies)\`\n**ParaFal:** Damage: 250 | ${emojis['granex']} 56.000 \`(55% chance of sucess in robberies)\`\n**M4A1:** Damage: 300 | ${emojis['granex']} 62.000 \`(60% chance of sucess in robberies)\`\n**AK-9:** Damage: 400 | ${emojis['granex']} 78.000 \`(65% chance of sucess in robberies)\`\n**AK-47:** Damage: 420 | ${emojis['granex']} 81.000 | \`(70% chance of sucess in robberies)\`\n**AKM:** Damage: 430 | ${emojis['granex']} 84.000 \`(75% chance of sucess in robberies)\`\n**SCAR:** Damage: 500 | ${emojis['granex']} 97.000 \`(80% chance of sucess in robberies)\``
            case 'foodsEmbedTitle': return 'Foods Shop'
            case 'foodsEmbedDescription': return `To buy any food, use \`${options.usage}\`.\n\n**Water:** ${emojis['granex']} 100 \`(restore 10% energy)\`\n**Hamburguer:** ${emojis['granex']} 225 \`(restore 35% energy)\`\n**Pizza:** ${emojis['granex']} 275 \`(restore 40% energy)\``
            case 'vehiclesEmbedTitle': return `Vehicles Shop`
            case 'vehiclesEmbedDescription': return `To buy any vehicle, use \`${options.usage}\`\n\n**Motorcycle:** ${emojis['granex']} 15.000 \`(can be used to work as an uber eats)\`\n**Car:** ${emojis['granex']} 25.000 \`(can be used to work as an uber)\`\n**Truck:** ${emojis['granex']} 105.000 \`(can be used to work as an trucker)\``
            case 'farmEmbedTitle': return 'Farm Shop and Others'
            case 'farmEmbedDescription': return `To buy any item related to the farm, or even the farm itself, use \`${options.usage}\`.\n**Farm:** ${emojis['granex']} 400.000 \`(releases the farmer's job)\`\n**Chicken:** ${emojis['granex']} 100 \`(increases the farm's profit by 5%)\`\n**Cow:** ${emojis['granex']} 550 \`(increases the farm's profit by 15%)\`\n**Lettuce:** ${emojis['granex']} 25 \`(increases the farm's profit by 5%)\`\n**Tomato:** ${emojis['granex']} 30 \`(increases the farm's profit by 5%)\`\n**Carrot:** ${emojis['granex']} 30 \`(increases the farm's profit by 5%)\``
            case 'weapons': return 'Weapons'
            case 'foods': return 'Foods'
            case 'vehicles': return 'Vehicles'
            case 'yourInventory': return 'Your Inventory'
            case 'inUse': return 'In Use'
            case 'guildLevelUp': return `This server just upped to **level ${options.level}**!\nAs a result, +10 vacancies were opened for fireman and +10 vacancies for policeman! What are you waiting for? Join now!`
            case 'guildLevelUp2': return `This server just upped to **level ${options.level}**!`
            case 'dblTitle': return 'Vote for Me!'
            case 'dblDescription': return 'Vote for me to help me get promoted to more and more people here on the platform! For now, you get nothing but my thanks, but soon, you will!'
            default: return content;
        }
    }
}