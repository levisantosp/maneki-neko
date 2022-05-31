const emojis = require('../discord/src/util/emojis');
const permissions = require('./en.permissions.json');

module.exports = {
    get: function(content, options = {}) {
        switch(content) {
            case 'botLatency': return `${emojis['ping_pong']} Pong! \`${options.latency}ms\``
            case 'dontHavePermission': return `${emojis['error']} You need the \`${permissions[options.permission]}\` permission to execute this command!`
            case 'botDontHavePermission': return `${emojis['error']} I need the ${permissions[options.permission.map(perm => `\`${perm}\``).join(', ')]} permission to execute this command!`
            case 'invalidArg': return `${emojis['error']} Invalid argument! Try \`${options.try}\``
            case 'error': return `${emojis['error']} Gomen, gomen... an error has occurred...\n\`${options.error}\``
            case 'mentionBot': return `Howdy! My prefix on this server is \`${options.prefix}\``
            case 'dailyWasCollected': return `${emojis['error']} You already collected your daily asuras. Come back again <t:${parseInt(options.remaining/1000)}:R>`
            case 'dailyCollected': return `${emojis['asura']} Congratulations! In the today's daily you received ${options.asurasGain} asuras.`
            case 'yourAsuras': return `${emojis['asura']} You have ${options.asuras} asuras.`
            case 'hisAsuras': return `${emojis['asura']} ${options.user} has ${options.asuras} asuras.`
            case 'invalidUser': return `${emojis['error']} Invalid user! Check that the user ID or mention are correct.`
            case 'oddEvenWinner': return `${emojis['asura']} Congratulations, you won! You've chosen \`${options.chosen}\`, and ${options.number} is ${options.chosen}! You won ${options.asuras} asuras.`
            case 'oddEvenLoser': return `${emojis['asura']} Congratulations, you've lost! You've chosen \`${options.chosen}\`, and ${options.number} is ${options.chosen == 'odd' ? 'even' : 'odd'}! ${options.user} won ${options.asuras} asuras.`
            case 'oddEvenWinner2': return `${emojis['asura']} Congratulations, you won! You've chosen \`${options.chosen}\`, and ${options.number} is ${options.chosen}!`
            case 'oddEvenLoser2': return `${emojis['asura']} Congratulations, you've lost! You've chosen \`${options.chosen}\`, and ${options.number} is ${options.chosen == 'odd' ? 'even' : 'odd'}!`
            case 'argIsNaN': return `${emojis['asura']} The \`${options.arg}\` value is not a number.`
            case 'oddEvenBet': return `${emojis['warn']} ${options.user} Hey! ${options.author} wants to bet ${options.asuras} asuras with you! Will you take it or not?`
            case 'youDontHaveAsuras': return `${emojis['error']} You don't have this asuras quantity.`
            case 'dontHaveAsuras': return `${emojis['error']} ${options.user} doesn't have this asuras quantity.`
            case 'weeklyWasCollected': return `${emojis['error']} You already collected your weekly asuras. Come back again <t:${parseInt(options.remaining/1000)}:R>`
            case 'weeklyCollected': return `${emojis['asura']} Congratulations! In the today's weekly you received ${options.asurasGain} asuras.`
            case 'aboutmeChangedTo': return `${emojis['sucess']} Your profile biography has been changed to \`${options.aboutme}\``
            case 'prefixChangedTo': return `${emojis['sucess']} My prefix on this server has been changed to \`${options.prefix}\``
            case 'invalidChannel': return `${emojis['error']} Invalid channel! Check that mention or role ID is correct.`
            case 'invalidRole': return `${emojis['error']} Invalid role! Check that the mention or role ID is correct.`
            case 'limitChannels': return `${emojis['error']} This server has reached the limit of channels allowed commands. (${options.limit})`
            case 'limitRoles': return `${emojis['error']} This server has reached the limit of roles allowed commands on any channel. (${options.limit})`
            case 'wrongChannel': return `${emojis['error']} You can't execute commands in this channel! Try in: ${options.tryIn}`
            case 'allowedChannelsSet': return `${emojis['sucess']} ${options.channel} has been added sucessfully.`
            case 'ingnoredRolesSet': return `${emojis['sucess']} ${options.role} has been added sucessfully.`
            case 'userIsNotInDatabase': return `${emojis['error']} This user was not save in database.`
            case 'noAsuras': return `${emojis['warn']} It takes 5,000 asuras of each for you to get married.`
            case 'marrieageRequest': return `${emojis['ring']} ${options.user} ${options.author} wants to marry you! Do you accept or not?`
            case 'gotMarried': return `${emojis['confetti']} Congratulations! You got married!`
            case 'alreadyMarried': return `${emojis['error']} You are already married to someone!`
            case 'alreadyMarried2': return `${emojis['error']} ${options.user} is already married to someone!`
            case 'bankNoAsuras': return `${emojis['warn']} It looks like the bank has run out of money... wait until the bank is replenished and try again.`
            case 'nowYouAre': return `${emojis['sucess']} Now you are one \`${options.job}\``
            case 'certificateDelivered': return `${emojis['sucess']} Now you can be a \`${options.job}\` on any server!`
            case 'noLevel': return `${emojis['error']} You need to be level ${options.level} to get this job.`
            case 'youDontHaveJob': return `${emojis['error']} You don't have job! Take one using \`${options.usage}\``
            case 'workHasCollected': return `${emojis['error']} You already worked. Come back again <t:${parseInt(options.remaining/1000)}:R>`
            case 'youWorked': return `${emojis['asura']} You worked hard as \`${options.job}\` and received ${options.asurasGain} asuras and ${options.xpGain} xp.`
            case 'tooLittle': return `${emojis['warn']} Too little... try to pay an amount greater than or equal to 100, after all, I need to collect that 10% fee to keep the economy going strong!`
            case 'payConfirm': return `${emojis['warn']} You are about to transfer ${options.asuras} asuras to ${options.user}. Are you sure about this?`
            case 'payConfirmed': return `${emojis['sucess']} Transaction done successfully!`
            case 'waitingBackground': return `${emojis['error']} You have already sent a background for review! Please wait until it is verified and try again.`
            case 'attachFile': return `${emojis['error']} Attach a file. It is recommended that the resolution be \`1920x1080\`.`
            case 'imgurFalse': return `${emojis['error']} This image could not be uploaded to Imgur. Please check ifthe image type is \`PNG\` or \`JPG\`.`
            case 'imageUploaded': return `${emojis['sucess']} Your background has been sent for analysis successfully!\n${emojis['warn']} The deadline for verification is up to 24 hours.`
            case 'notAPolice': return `${emojis['error']} This user has no police certificate, so he cannot be a police officer on this server.`
            case 'tooMuchPolice': return `${emojis['warn']} This server has reached the limit of police officers (${options.limit}).`
            case 'policeAdded': return `${emojis['sucess']} ${options.user} is now a police officer on this server!`
            case 'policeRemoved': return `${emojis['sucess']} ${options.user} is no longer a police officer on this server!`
            case 'notAFireman': return `${emojis['error']} This user has no fireman certificate, so he cannot be a fireman on this server.`
            case 'tooMuchFireman': return `${emojis['warn']} This server has reached the limit of firefighters (${options.limit}).`
            case 'firemanAdded': return `${emojis['sucess']} ${options.user} is now a fireman on this server!`
            case 'firemanRemoved': return `${emojis['sucess']} ${options.user} is no longer a fireman on this server!`
            case 'youAreDead': return `${emojis['warn']} You are dead! Try again <t:${parseInt(options.remaining/1000)}:R> or call a fireman by clicking the button below (costs 5.000 asuras).`
            case 'firemanOnTheWay': return `${emojis['sucess']} A fireman is on his way to heal you. Wait until he arrives on the scene.`
            case 'noFiremans': return `${emojis['error']} Unfortunately this server does not have any firefighters...`
            case 'noChannelAnnouncements': return `${emojis['error']} This server does not have a channel for announcements. Ask someone from the administration to set up a channel and try again.`
            case 'announcementChannel': return `${emojis['sucess']} ${options.channel} has been successfully set as an announcement channel!`
            case 'needWeapon': return `${emojis['warn']} You need a weapon to complete this action.`
            case 'successfulRobbery': return `${emojis['sucess']} Successful robbery! You got it rob ${options.value} asuras from this user.`
            case 'unsuccessfulRobbery': return `${emojis['error']} Hey, boy! Looks like the police caught you right in the act. You paid a fine of ${options.value} asuras.`
            case 'chooseItem': return `Select an item.`
            case 'itemBought': return `${emojis['sucess']} Item bought sucessfully!`
            case 'alreadyBought': return `${emojis['error']} You already bought this item.`
            case 'friskReply': return `This user is armed and does not have a license to carry a firearm. Use \`${options.prefix}fine [user]\` to fine him.`
            case 'friskReply2': return 'There is nothing illegal about this user.'
            case 'userFined': return `${emojis['sucess']} User fined sucessfully!\n${emojis['warn']} The fine is 35.000 asuras, and after paying the fine, the user has his gun confiscated.`
            case 'restoreEnergy': return `${emojis['sucess']} ${options.percentual}% of its energy has been restored.`
            case 'missingItem': return `${emojis['error']} You don't have this item in your inventory. Check if the item really exists and try again.`
            case 'missingItem2': return `${emojis['error']} You aren't using this item.`
            case 'usingItem': return `${emojis['sucess']} You are now using this item.`
            case 'itemStashed': return `${emojis['sucess']} Item stashed sucessfully!`
            default: return content;
        }
    }
}