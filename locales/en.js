const permissions = require("./en.permissions.json");

module.exports = {
    get: function(content, options = {}) {
        switch(content) {
            case "botLatency": return `Pong! \`${options.latency}ms\``
            case "dontHavePermission": return `You need the \`${permissions[options.permission]}\` permission to execute this command!`
            case "botDontHavePermission": return `I need the ${permissions[options.permission.map(perm => `\`${perm}\``).join(", ")]} permission to execute this command!`
            case "invalidArg": return `Invalid argument! Try \`${options.try}\``
            case "error": return `Gomen, gomen... an error has occurred...\n\`${options.error}\``
            case "mentionBot": return `Howdy! My prefix on this server is \`${options.prefix}\``
            case "dailyWasCollected": return `You already collected your daily granex. Come back again <t:${parseInt(options.remaining/1000)}:R>`
            case "dailyCollected": return `Congratulations! In the today"s daily you received ${options.granexGain} granex.`
            case "yourgranex": return `You have ${options.granex} granex.`
            case "hisgranex": return `${options.user} has ${options.granex} granex.`
            case "invalidUser": return `Invalid user! Check that the user ID or mention are correct.`
            case "oddEvenWinner": return `Congratulations, you won! You"ve chosen \`${options.chosen}\`, and ${options.number} is ${options.chosen}! You won ${options.granex} granex.`
            case "oddEvenLoser": return `Congratulations, you"ve lost! You"ve chosen \`${options.chosen}\`, and ${options.number} is ${options.chosen == "odd" ? "even" : "odd"}! ${options.user} won ${options.granex} granex.`
            case "oddEvenWinner2": return `Congratulations, you won! You"ve chosen \`${options.chosen}\`, and ${options.number} is ${options.chosen}!`
            case "oddEvenLoser2": return `Congratulations, you"ve lost! You"ve chosen \`${options.chosen}\`, and ${options.number} is ${options.chosen == "odd" ? "even" : "odd"}!`
            case "argIsNaN": return `The \`${options.arg}\` value is not a number.`
            case "oddEvenBet": return `${options.user} Hey! ${options.author} wants to bet ${options.granex} granex with you! Will you take it or not?`
            case "youDontHavegranex": return `You don't have this granex quantity.`
            case "dontHavegranex": return `${options.user} doesn"t have this granex quantity.`
            case "weeklyWasCollected": return `You already collected your weekly granex. Come back again <t:${parseInt(options.remaining/1000)}:R>`
            case "weeklyCollected": return `Congratulations! In the today"s weekly you received ${options.granexGain} granex.`
            case "aboutmeChangedTo": return `Your profile biography has been changed to \`${options.aboutme}\``
            case "prefixChangedTo": return `My prefix on this server has been changed to \`${options.prefix}\``
            case "invalidChannel": return `Invalid channel! Check that mention or role ID is correct.`
            case "invalidRole": return `Invalid role! Check that the mention or role ID is correct.`
            case "limitChannels": return `This server has reached the limit of channels allowed commands. (${options.limit})`
            case "limitRoles": return `This server has reached the limit of roles allowed commands on any channel. (${options.limit})`
            case "wrongChannel": return `You can"t execute commands in this channel! Try in: ${options.tryIn}`
            case "allowedChannelsSet": return `${options.channel} has been added sucessfully.`
            case "ingnoredRolesSet": return `${options.role} has been added sucessfully.`
            case "userIsNotInDatabase": return `This user was not save in database.`
            case "noGranex": return `It takes 5,000 granex of each for you to get married.`
            case "marrieageRequest": return `${options.user} ${options.author} wants to marry you! Do you accept or not?`
            case "gotMarried": return `Congratulations! You got married!`
            case "alreadyMarried": return `You are already married to someone!`
            case "alreadyMarried2": return `${options.user} is already married to someone!`
            case "bankNoGranex": return `It looks like the bank has run out of money... wait until the bank is replenished and try again.`
            case "nowYouAre": return `Now you are one \`${options.job}\``
            case "certificateDelivered": return `Now you can be a \`${options.job}\` on any server!`
            case "noLevel": return `You need to be level ${options.level} to get this job.`
            case "noCar": return `You need buy a car in shop to get this job.`
            case "noMotorcicle": return `You need buy a motorcycle in shop to get this job.`
            case "noFarm": return `You need buy a farm.`
            case "youDontHaveJob": return `You don't have job! Take one using \`${options.usage}\``
            case "workHasCollected": return `You already worked. Come back again <t:${parseInt(options.remaining/1000)}:R>`
            case "youWorked": return `You worked hard as \`${options.job}\` and received ${options.granexGain} granex and ${options.xpGain} xp.`
            case "tooLittle": return `Too little... try to pay an amount greater than or equal to 100, after all, I need to collect that 10% fee to keep the economy going strong!`
            case "payConfirm": return `You are about to transfer ${options.granex} granex to ${options.user}. Are you sure about this?`
            case "payConfirmed": return `Transaction done successfully!`
            case "waitingBackground": return `You have already sent a background for review! Please wait until it is verified and try again.`
            case "attachFile": return `Attach a file. It is recommended that the resolution be \`1920x1080\`.`
            case "imgurFalse": return `This image could not be uploaded to Imgur. Please check ifthe image type is \`PNG\` or \`JPG\`.`
            case "imageUploaded": return `Your background has been sent for analysis successfully!\nThe deadline for verification is up to 24 hours.`
            case "notAPolice": return `This user has no police certificate, so he cannot be a police officer on this server.`
            case "tooMuchPolice": return `This server has reached the limit of police officers (${options.limit}).`
            case "policeAdded": return `${options.user} is now a police officer on this server!`
            case "policeRemoved": return `${options.user} is no longer a police officer on this server!`
            case "notAFireman": return `This user has no fireman certificate, so he cannot be a fireman on this server.`
            case "tooMuchFireman": return `This server has reached the limit of firefighters (${options.limit}).`
            case "firemanAdded": return `${options.user} is now a fireman on this server!`
            case "firemanRemoved": return `${options.user} is no longer a fireman on this server!`
            case "youAreDead": return `You are dead! Try again <t:${parseInt(options.remaining/1000)}:R> or call a fireman by clicking the button below (costs 5.000 granex).`
            case "firemanOnTheWay": return `A fireman is on his way to heal you. Wait until he arrives on the scene.`
            case "noFiremans": return `Unfortunately this server does not have any firefighters...`
            case "noChannelAnnouncements": return `This server does not have a channel for announcements. Ask someone from the administration to set up a channel and try again.`
            case "announcementChannel": return `${options.channel} has been successfully set as an announcement channel!`
            case "needWeapon": return `You need a weapon to complete this action.`
            case "successfulRobbery": return `Successful robbery! You got it rob ${options.value} granex from this user.`
            case "unsuccessfulRobbery": return `Hey, boy! Looks like the police caught you right in the act. You paid a fine of ${options.value} granex.`
            case "chooseItem": return `Select an item.`
            case "itemBought": return `Item bought sucessfully!`
            case "alreadyBought": return `You already bought this item.`
            case "friskReply": return `This user is armed and does not have a license to carry a firearm. Use \`${options.prefix}fine [user]\` to fine him.`
            case "friskReply2": return "There is nothing illegal about this user."
            case "userFined": return `User fined sucessfully!\nThe fine is 35.000 granex, and after paying the fine, the user has his gun confiscated.`
            case "restoreEnergy": return `${options.percentual}% of its energy has been restored.`
            case "missingItem": return `You don't have this item in your inventory. Check if the item really exists and try again.`
            case "missingItem2": return `You aren't using this item.`
            case "usingItem": return `You are now using this item.`
            case "itemStashed": return `Item stashed sucessfully!`
            case "noPlant": return "You don't have this plant."
            case "alreadyHasFarm": return "You already has a farm in this server."
            default: return content;
        }
    }
}