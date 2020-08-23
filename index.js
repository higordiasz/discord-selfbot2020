const Discord = require('discord.js-self');
const client = new Discord.Client();
const config = require('./config.json')

let message = config.message
let linkDiscord = config.linkDiscord
let enterSERVER = config.enterSERVER
let memberADD = config.memberADD
let memberREMOVE = config.memberREMOVE
let timer = config.timer


client.on('ready', () => {
    console.log(`Conectado na conta: ${client.user.tag}`)
})

client.on('message', msg => {
    if (!msg.author.id == config.ownerID) return;
    if (!msg.content.startsWith(config.prefix)) return;
    if (msg.content.startsWith(`<@!${client.user.id}`) || msg.content.startsWith(`<@${client.user.id}`)) return;
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
    if (comando == 'setmessage') {
        let m = args.join(" ")
        message = m;
        msg.reply('Auterado!')
    }
    if (comando == 'setlink') {
        let link = args.join(" ")
        linkDiscord = link;
        msg.reply('Auterado!')
    }
    if (comando == 'setenterserver') {
        if (args[0] == 'false') {
            enterSERVER = false
        } else {
            if (args[0] == 'true') {
                enterSERVER = true
            }
        }
        msg.reply('Alterado!')
    }
    if (comando == 'memberadd') {
        if (args[0] == 'false') {
            memberADD = false
        } else {
            if (args[0] == 'true') {
                memberADD = true
            }
        }
        msg.reply('Alterado!')
    }
    if (comando == 'memberremove') {
        if (args[0] == 'false') {
            memberREMOVE = false
        } else {
            if (args[0] == 'true') {
                memberREMOVE = true
            }
        }
        msg.reply('Alterado!')
    }
    if (comando == 'timer') {
        let n = parseInt(args[0], 10);
        timer = n;
        msg.reply('Alterado!')
    }
    if (comando == 'stop') {
        client.destroy()
    }
})

client.on('guildMemberAdd', member => {
    if (memberADD == true) {
        member.user.send(`${message}\n${linkDiscord}`);
        console.log(`Mensagem enviada ao usuario : ${member.user.tag}`)
    }
})

client.on('guildMemberRemove', member => {
    if (memberREMOVE == true) {
        member.user.send(`${message}\n${linkDiscord}`);
        console.log(`Mensagem enviada ao usuario : ${member.user.tag}`)
    }
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.on('guildCreate', async guild => {
    if (enterSERVER == true) {
        const members = guild.members.cache.array();
        for (let membro of members) {
            await sleep(timer);
            membro.user.send(`${message}\n${linkDiscord}`);
            console.log(`Mensagem enviada ao usuario : ${membro.user.tag}`);
        }
    }
})

client.login(config.accountToken);