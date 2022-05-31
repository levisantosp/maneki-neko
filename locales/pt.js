const emojis = require("../discord/src/util/emojis");
const permissions = require("./pt.permissions.json");

module.exports = {
    get: function(content, options = {}) {
        switch(content) {
            case "botLatency": return `Pong! \`${options.latency}ms\``
            case "dontHavePermission": return `Você precisa da permissão \`${permissions[options.permission]}\` para executar este comando!`
            case "invalidArg": return `Argumento inválido! Tente \`${options.try}\``
            case "error": return `Gomen, gomen... ocorreu um erro inesperado...\n\`${options.error}\``
            case "mentionBot": return `Howdy! Meu prefixo neste servidor é \`${options.prefix}\``
            case "dailyWasCollected": return `Calma lá, meu patrão! Você já coletou suas asuras diárias. Volte novamente <t:${parseInt(options.remaining/1000)}:R>`
            case "dailyCollected": return `Parabéns! No daily de hoje você recebeu ${options.asurasGain} asuras.`
            case "yourAsuras": return `Você tem ${options.asuras} asuras.`
            case "hisAsuras": return `${options.user} tem ${options.asuras} asuras.`
            case "invalidUser": return `Usuário inválido! Verifique se o ID do usuário ou menção estão corretos.`
            case "oddEvenWinner": return `Parabéns, você venceu! Você escolheu \`${options.chosen}\` (${options.chosen === "odd" ? "ímpar" : "par"}), e ${options.number} é ${options.chosen === "odd" ? "ímpar" : "par"}! Você ganhou ${options.asuras} asuras.`
            case "oddEvenLoser": return `Parabéns, você perdeu! Você escolheu \`${options.chosen}\` (${options.chosen === "odd" ? "ímpar" : "par"}), e ${options.number} é ${options.chosen !== "odd" ? "ímpar" : "par"}! ${options.user} ganhou ${options.asuras} asuras.`
            case "oddEvenWinner2": return `Parabéns, você venceu! Você escolheu \`${options.chosen}\` (${options.chosen === "odd" ? "ímpar" : "par"}), e ${options.number} é ${options.chosen === "odd" ? "ímpar" : "par"}!`
            case "oddEvenLoser2": return `Parabéns, você perdeu! Você escolheu \`${options.chosen}\` (${options.chosen === "odd" ? "ímpar" : "par"}), e ${options.number} é ${options.chosen !== "odd" ? "ímpar" : "par"}!`
            case "argIsNaN": return `O valor \`${options.arg}\` não é um número.`
            case "oddEvenBet": return `${options.user} Parece que ${options.author} quer apostar ${options.asuras} asuras com você! Vai encarar ou não?`
            case "youDontHaveAsuras": return `Você não tem esta quantia de asuras.`
            case "dontHaveAsuras": return `${options.user} não tem esta quantidade de asuras.`
            case "weeklyWasCollected": return `Calma lá, meu patrão! Você já coletou suas asuras semanais. Volte novamente <t:${parseInt(options.remaining/1000)}:R>`
            case "weeklyCollected": return `Parabéns! No semanal de hoje você recebeu ${options.asurasGain} asuras.`
            case "aboutmeChangedTo": return `Sua biografia de perfil foi alterada para \`${options.aboutme}\``
            case "prefixChangedTo": return `Meu prefixo neste servidor foi alterado para \`${options.prefix}\``
            case "invalidChannel": return `Canal inválido! Verifique se a menção ou ID do canal estão corretos.`
            case "invalidRole": return `Cargo inválido! Verifique se a menção ou ID do cargo estão corretos.`
            case "limitChannels": return `Este servidor atingiu o limite de canais permitidos comandos. (${options.limit})`
            case "limitRoles": return `Este servidor atingiu o limite de cargos permitidos comandos em qualquer canal (${options.limit})`
            case "wrongChannel": return `Você não pode executar comandos neste canal! Tente em: ${options.tryIn}`
            case "allowedChannelsSet": return `${options.channel} foi adicionado com sucesso.`
            case "ingnoredRolesSet": return `${options.role} foi adicionado com sucesso.`
            case "userIsNotInDatabase": return `Este usuário não está salvo no banco de dados.`
            case "noAsuras": return `São necessárias 5,000 asuras de cada para que se casem.`
            case "marrieageRequest": return `${options.user} ${options.author} quer se casar com você! Aceita ou não?`
            case "gotMarried": return `Parabéns! Vocês se casaram!`
            case "alreadyMarried": return `Você já está casado com alguém!`
            case "alreadyMarried2": return `${options.user} está casado(a) com alguém!`
            case "bankNoAsuras": return `Parece que o banco ficou sem dinheiro... aguarde até o banco seja reabastecido e tente novamente.`
            case "nowYouAre": return `Agora você é um \`${options.job}\``
            case "certificateDelivered": return `Agora você pode ser um \`${options.job}\` em qualquer servidor!`
            case "noLevel": return `Você precisa ser nível ${options.level} para pegar este emprego.`
            case "noCar": return `Você precisa comprar um carro na loja para poder pegar este emprego.`
            case "noMotorcicle": return `Você precisa comprar uma moto na loja para poder pegar este emprego.`
            case "noFarm": return `Você precisa comprar uma fazenda.`
            case "youDontHaveJob": return `Você não possui emprego! Pegue um usando \`${options.usage}\``
            case "workHasCollected": return `Você já trabalhou! Volte novamente <t:${parseInt(options.remaining/1000)}:R>`
            case "youWorked": return `Você trabalhou duro como \`${options.job}\` e recebeu ${options.asurasGain} asuras e ${options.xpGain} xp.`
            case "tooLittle": return `Muito pouco... tente pagar uma quantia maior ou igual a 100, afinal, eu preciso cobrar aquela taxa de 10% para manter a economia firme e forte!`
            case "payConfirm": return `Você está prestes a transferir ${options.asuras} asuras para ${options.user}. Tem certeza disso?`
            case "payConfirmed": return `Transação realizada com sucesso!`
            case "waitingBackground": return `Você já enviou um background para análise! Aguarde até que o mesmo seja verificado e tente novamente.`
            case "attachFile": return `Anexe um arquivo. É recomendável que a resolução seja \`1920x1080\`.`
            case "imgurFalse": return `Não foi possível fazer o upload dessa imagem no Imgur. Verifique se o tipo da imagem é \`PNG\` ou \`JPG\`.`
            case "imageUploaded": return `Seu background foi enviado para análise com sucesso!\nO prazo para verificação é de até 24 horas.`
            case "notAPolice": return `Este usuário não possui certificado de polícia, logo, ele não pode ser policial deste servidor.`
            case "tooMuchPolice": return `Este servidor chegou ao limite de policiais (${options.limit}).`
            case "policeAdded": return `${options.user} agora é um policial deste servidor!`
            case "policeRemoved": return `${options.user} não é mais um policial neste servidor!`
            case "notAFireman": return `Este usuário não possui certificado de bombeiro, logo, ele não pode ser bombeiro deste servidor.`
            case "tooMuchFireman": return `Este servidor chegou ao limite de bombeiros (${options.limit}).`
            case "firemanAdded": return `${options.user} agora é um bombeiro deste servidor!`
            case "firemanRemoved": return `${options.user} não é mais um bombeiro neste servidor!`
            case "youAreDead": return `Você está morto! Tente novamente <t:${parseInt(options.remaining/1000)}:R> ou chame um bombeiro, clicando no botão abaixo (custa 5.000 asuras).`
            case "firemanOnTheWay": return `Um bombeiro está a caminho para te curar. Aguarde até que o mesmo compareça ao local.`
            case "noFiremans": return `Infelizmente este servidor não possui nenhum bombeiro...`
            case "noChannelAnnouncements": return `Este servidor não possui um canal para os anúncios. Peça para alguém da administração configurar um canal e tente novamente.`
            case "announcementChannel": return `${options.channel} foi setado como canal de anúncios com sucesso!`
            case "needWeapon": return `Você precisa de uma arma para completar esta ação.`
            case "successfulRobbery": return `Roubo efetuado com sucesso! Você conseguiu roubar ${options.value} asuras deste usuário.`
            case "unsuccessfulRobbery": return `Ih, rapaz! Parece que a polícia te pegou bem no ato. Você pagou uma multa de ${options.value} asuras.`
            case "chooseItem": return `Selecione um item.`
            case "itemBought": return `Item comprado com sucesso!`
            case "alreadyBought": return `Você já comprou este item.`
            case "friskReply": return `Este usuário está armado e não possui porte de arma de fogo. Use \`${options.prefix}fine [user]\` para multá-lo.`
            case "friskReply2": return "Este usuário não tem nada de ilegal."
            case "userFined": return `Usuário multado com sucesso!\nA multa é de 35.000 asuras e, após pagar a multa, o usuário tem sua arma confiscada.`
            case "restoreEnergy": return `Foram restaurados ${options.percentual}% de sua energia.`
            case "missingItem": return `Você não possui este item no seu inventário. Verifique se o item realmente existe e tente novamente.`
            case "missingItem2": return `Você não está usando este item.`
            case "usingItem": return `Agora você está usando este item.`
            case "itemStashed": return `Item guardado com sucesso!`
            default: return content;
        }
    }
}