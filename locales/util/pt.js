const emojis = require("../../discord/src/util/emojis");

module.exports = {
    get: function(content, options) {
        switch(content) {
            case 'helpTitle': return 'Meus Comandos'
            case 'helpDescription': return `Precisando de ajuda? Entre no meu servidor Discord para sanar suas dúvidas! ${process.env.SUPPORT_SERVER}`
            case 'helpButtonLabel': return 'Meu servidor Discord'
            case 'usertag': return 'Tag do Usuário'
            case 'userid': return 'ID do Usuário'
            case 'userCreatedAt': return 'Conta Criada Em'
            case 'roles': return 'Cargos'
            case 'guildId': return 'ID do Servidor'
            case 'guildOwner': return 'Dono'
            case 'guildCreatedAt': return 'Servidor Criado Em'
            case 'channels': return `Canais (${options.size})`
            case 'typeChannelsSize': return `Texto: ${options.text.length}\Voz: ${options.voice.length}\Estágio: ${options.stage.length}`
            case 'guildMembers': return 'Membros'
            case 'type': return 'Tipo'
            case 'eps': return 'Episódios'
            case 'exibition': return 'Exibido'
            case 'score': return 'Avaliação'
            case 'scoreStats': return 'Avaliado por'
            case 'genres': return 'Gêneros'
            case 'popularity': return 'Popularidade'
            case 'inviteMe': return 'Me Convide Para o Seu Servidor'
            case 'inviteDescription': return `Você pode me convidar para o seu servidor ou para o servidor que você administra [clicando aqui](${process.env.BOT_INVITE})\n\nPrecisando de ajuda? Entre no meu servidor Discord para sanar suas dúvidas! [Clique aqui](${process.env.SUPPORT_SERVER})`
            case 'oddEvenButtonLabel': return 'Encarar'
            case 'jobless': return 'Desempregado(a)'
            case 'marriedWith': return `Casado com ${options.user.username}#${options.user.discriminator}`
            case 'alone': return 'Solteirão'
            case 'accept': return 'Aceitar'
            case 'channelsList': return 'Lista de Canais Permitidos Comandos'
            case 'jobEmbedTitle': return 'Empregos Disponíveis'
            case 'trashman': return 'Lixeiro'
            case 'newsagent': return 'Jornaleiro'
            case 'tanker': return 'Petroleiro'
            case 'trucker': return 'Caminhoneiro'
            case 'postoffice': return 'Correios'
            case 'fireman': return 'Bombeiro'
            case 'police': return 'Policial'
            case 'mafiaboss': return 'Chefe da Máfia'
            case 'lawyer': return 'Advogado'
            case 'farmer': return 'Fazendeiro'
            case 'trashmanDescription': return 'Renda: 100 asuras e 25 xp'
            case 'newsagentDescription': return 'Requisitos: Nível 5\nRenda: 150 asuras e 50 xp'
            case 'ubereatsDescription': return 'Requisitos: Nível 10, 1 moto\n Renda: 200 asuras e 100 xp'
            case 'uberDescription': return 'Requisitos: Nível 15, 1 carro\nRenda: 250 asuras e 150 xp'
            case 'tankerDescription': return 'Requisitos: Nível 20\nRenda: 300 asuras e 200 xp'
            case 'truckerDescription': return 'Requisitos: Nível 25\nRenda: 350 asuras e 250 xp'
            case 'postofficeDescription': return 'Requisitos: Nível 30\nRenda: 400 asuras e 300 xp'
            case 'firemanDescription': return 'Requisitos: Nível 35\nRenda: 450 asuras e 350 xp'
            case 'policeDescription': return 'Requisitos: Nível 40\nRenda: 500 asuras e 400 xp'
            case 'mafiabossDescription': return 'Requisitos: Nível 45\nRenda: 550 asuras e 450 xp'
            case 'lawyerDescription': return 'Requisitos: Nível 50\nRenda: 600 asuras e 500 xp'
            case 'farmerDescription': return 'Requisitos: Nível 55, 1 fazenda\nRenda: 650 asuras e 550 xp'
            case 'levelUp': return `${emojis['confetti']} Parabéns! Você upou para o nível ${options.level}`
            case 'botinfoTitle': return 'Howdy! Me chamo Meow!'
            case 'botinfoDescription': return `Olá! Eu sou a Meow, e sou um poderoso bot para Discord com múltiplas funcionalidades, tais como configuração, economia, social, miscelânea, roleplay, e utilidade, além de poder interagir em português brasileiro e inglês americano.\n\nAtualmente estou em ${options.guilds} servidores, conheço ${options.users} pessoas diferentes e possuo ${options.commands} comandos.\n\nFui desenvolvida em ${emojis['js']} [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) utilizando a livraria ${emojis['eris']} [Eris](https://abal.moe/Eris/).\n[\`${options.dev}\`](https://github.com/Levi0100) é o meu developer.`
            case 'botinfoButtonLabel': return 'Comunidade e Suporte'
            case 'firemanAnnouncement': return `Alô, bombeiros de plantão!\nTemos um chamado do usuário ${options.user} em ${options.channel}. Ele está sem vida e precisa ser curado!\n${options.jumpLink}\n\n${options.users}`
            case 'weaponsEmbedTitle': return 'Loja de Armas'
            case 'weaponsEmbedDescription': return `Para comprar qualquer arma basta usar \`${options.usage}\`.\n\n**9mm:** Dano: 20 | ${emojis['asura']} 5.000 \`(10% de chance de sucesso em assaltos)\`\n**PT 100:** Dano: 40 | ${emojis['asura']} 10.000 \`(15% de chance de sucesso em assaltos)\`\n**Glock:** Dano: 60 | ${emojis['asura']} 12.000 \`(20% de chance de sucesso em assaltos)\`\n**MT-40:** Dano: 120 | ${emojis['asura']} 24.000 \`(25% de chance de sucesso em assaltos)\`\n**Uzi:** Dano: 130 | ${emojis['asura']} 28.000 \`(30% de chance de sucesso em assaltos)\`\n**MP5:** Dano: 150 | ${emojis['asura']} 32.000 \`(35% de chance de sucesso em assaltos)\`\n**UMP:** Dano: 150 | ${emojis['asura']} 33.000 \`(40% de chance de sucesso em assaltos)\`\n**Carabina CT-40:** Dano: 200 | ${emojis['asura']} 45.000 \`(45% de chance de sucesso em assaltos)\`\n**Carabina 556:** Dano: 220 | ${emojis['asura']} 48.000 \`(50% de chance em assaltos)\`\n**ParaFal:** Dano: 250 | ${emojis['asura']} 56.000 \`(55% de chance de sucesso em assaltos)\`\n**M4A1:** Dano: 300 | ${emojis['asura']} 62.000 \`(60% de chance de sucesso em assaltos)\`\n**AK-9:** Dano: 400 | ${emojis['asura']} 78.000 \`(65% de chance de sucesos em assaltos)\`\n**AK-47:** Dano: 420 | ${emojis['asura']} 81.000 | \`(70% de chance de sucesso em assaltos)\`\n**AKM:** Dano: 430 | ${emojis['asura']} 84.000 \`(75% de chance de sucesso em assaltos)\`\n**SCAR:** Dano: 500 | ${emojis['asura']} 97.000 \`(80% de chance de sucesso em assaltos)\``
            case 'foodsEmbedTitle': return 'Loja de Alimentos'
            case 'foodsEmbedDescription': return `Para comprar qualquer alimento basta usar \`${options.usage}\`.\n\n**Água:** ${emojis['asura']} 100 \`(restaura 10% de energia)\`\n**Hamburguer:** ${emojis['asura']} 225 \`(restaura 35% de energia)\`\n**Pizza:** ${emojis['asura']} 275 \`(restaura 40% de energia)\``
            case 'vehiclesEmbedTitle': return `Loja de Automóveis`
            case 'vehiclesEmbedDescription': return `Para comprar qualquer automóvel basta usar \`${options.usage}\`\n\n**Moto:** ${emojis['asura']} 15.000 \`(pode ser usada para trabalhar de uber eats)\`\n**Carro:** ${emojis['asura']} 25.000 \`(pode ser usado para trabalhar de uber)\`\n**Caminhão:** ${emojis['asura']} 105.000 \`(pode ser usado para trabalhar de caminhoneiro)\``
            case 'weapons': return 'Armas'
            case 'foods': return 'Alimentos'
            case 'vehicles': return 'Veículos'
            case 'yourInventory': return 'Seu Inventário'
            case 'inUse': return 'Em Uso'
            case 'guildLevelUp': return `Este servidor acaba de upar para o **nível ${options.level}**!\nComo resultado, foram abertas +10 vagas para bombeiros e +10 vagas para policiais! Tá esperando o quê? Aliste-se já!`
            case 'guildLevelUp2': return `Este servidor acaba de upar para o **nível ${options.level}**!`
            default: return content;
        }
    }
}