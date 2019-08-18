const Discord = require("discord.js");
const fs = require('fs')
const client = new Discord.Client();

var prefix = "<";

const warns = JSON.parse(fs.readFileSync('./warns.json'))
const bans = JSON.parse(fs.readFileSync('./bans.json'))
const kick = JSON.parse(fs.readFileSync('./kicks.json'))

client.login("NjEyMjIwODg2NTMxMDQ3NDI1.XVfP_w.JKyrtKPYzwB9Fm7NS5MIDQOwGFk")

//message d'arrivé
client.on("guildMemberAdd", user =>{
    let joinEmbed = new Discord.RichEmbed()
        .setTitle(" Seurveur Test # Arrivé :tada: ")
        .setColor("#0029f6")
        .setAuthor(user.user.username, user.user.displayAvatarURL)
        .setDescription("Bienvenue " + user + " sur le server " + user.guild.name + "!\n" + "Nous sommes désormais : " + user.guild.memberCount)
        .setFooter("Server test || overbot")
    user.guild.channels.get("611320670424662079").send(joinEmbed)
    user.addRole("611325516279971851")
});

// message de départ 
client.on("guildMemberRemove", user =>{
    let leaveEmbed = new Discord.RichEmbed()
        .setTitle(" Seurveur Test # Départ :cry: \n ")
        .setColor("#f0142a")
        .setAuthor(user.user.username, user.user.displayAvatarURL)
        .setDescription("\n Oh NON " + user + " à quitté le serveur ! \n" + "Nous sommes désormais : " + user.guild.memberCount)
        .setFooter("\nServer test || overbot")
    user.guild.channels.get("611320670424662079").send(leaveEmbed)
});

// Réaction à Bonjour Salut et Hey
client.on("message", message =>{

    if(message.content === "Bonjour"){
        message.channel.send("Bonjour " + message.author + " !\nComment allez-vous ?")
    }
    if(message.content === "Salut"){
        message.channel.send("Bonjour " + message.author + " !\nComment allez-vous ?")
    }
    if(message.content === "Hey"){
        message.channel.send("Bonjour " + message.author + " !\nComment allez-vous ?")
    }
})

//commande d'aide
client.on("message", message => {
    if(message.content === prefix + "help"){
        let help_Embed = new Discord.RichEmbed()
            .setTitle("Commande de XPACE ¤BOT¤ \n ")
            .setColor("#000000")
            .setDescription(" Pour les commandes de modérations seul le satff y à accés ! \n ")
            .addField(" - ...")
            .addField(" - Test") 
            .setFooter(" \nServer test || XSPACE ¤BOT¤")
            message.author.sendMessage(help_Embed)
            message.channel.sendMessage("Les commandes ont été envoier en Privé !")
            message.delete();
    }
})

//commande modo
client.on("message", message => {
    if(message.content === prefix + "modo")
    if (message.guild.member(message.member).roles.some(role => role.id === '611990653223567360')){
        let mode_Embed = new Discord.RichEmbed()
            .setTitle("Commande de XPACE ¤BOT¤ \n ")
            .setColor("#000000")
            .setDescription(" Liste des commandes de modérations ! \n ")
            .addField(" - ban ''concerné' 'durée' ")
            .addField(" - warn") 
            .addField(" - kick")
            .setFooter(" \nServer test || XSPACE ¤BOT¤")
            message.author.sendMessage(mode_Embed)
            message.channel.sendMessage("Les commandes ont été envoier en Privé !")
            message.delete();
            console.log(message.author + message.author.username + " à demandé les commandes de modérateurs !")
    }
    else{
        message.delete();
        message.author.sendMessage("Vous n'avez pas les permissions pour cette commande !")
    }
})

//commande admin
client.on("message", message => {
    if(message.content === prefix + "admin")
    if(message.guild.member(message.member).roles.some(role => role.id === '611971905007910920')) {
        let admin_Embed = new Discord.RichEmbed()
            .setTitle("Commande de XPACE ¤BOT¤ \n")
            .setColor("#000000")
            .setDescription(" Liste des commandes pour admin ! \n ")
            .addField(" - giverole ''concerné' 'durée' \n| Pour donner un rôle ! ")
            .addField(" - delrole \n| Pour enlever le role a quelqu'un !") 
            .addField(" - bandef 'concerné' \n| Bannir définitivement quelqu'un !")
            .setFooter(" \nServer test || XSPACE ¤BOT¤")
            message.author.sendMessage(admin_Embed)
            message.channel.sendMessage("Les commandes ont été envoier en Privé !")
            message.delete();
            console.log(message.author + message.author.username + " à demandé les commandes d'admins !")
    }
    else{
        message.delete();
        message.author.sendMessage("Vous n'avez pas les permissions pour cette commande !")
    }
})

//commande de ping
client.on("message", message => {
    if (message.content === prefix + "ping") {

        message.reply("pong !")
    }
})

//Commande de warn
client.on("message", function (message) {
    if (!message.guild) return 
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "warn") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un membre")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas warn ce membre")
        let reason = args.slice(2).join(' ')
        if (!reason) return message.channel.send("Veuillez indiquer une raison")
        
        if (!warns[member.id]) {
            warns[member.id] = []
        }
        warns[member.id].unshift({
            reason: reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        
        let warn_Embed = new Discord.RichEmbed()
            .setColor("#E89113")
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .setDescription(member + " à été warn pour : " + reason)
            .setFooter("overbot || Modération")
            .setTimestamp()
        message.channel.send(warn_Embed)
        member.guild.channels.get("611963681802027026").send(warn_Embed)
    }
 
    if (args[0].toLowerCase() === prefix + "infractions") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un membre")
        let embed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .addField('10 derniers warns', ((warns[member.id] && warns[member.id].length) ? warns[member.id].slice(0, 10).map(e => e.reason) : "Ce membre n'a aucun warns"))
            .setTimestamp()
        message.channel.send(embed)
    }

        //unwarn
        if (args[0].toLowerCase() === prefix + "unwarn") {
            let member = message.mentions.members.first()
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
            if(!member) return message.channel.send("Membre introuvable")
            if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unwarn ce membre.")
            if(!member.manageable) return message.channel.send("Je ne pas unwarn ce membre.")
            if(!warns[member.id] || !warns[member.id].length) return message.channel.send("Ce membre n'a actuellement aucun warns.")
            warns[member.id].shift()
            fs.writeFileSync('./warns.json', JSON.stringify(warns))
            message.channel.send("Le dernier warn de " + member + " a été retiré :white_check_mark:")
        }

})

/*Kick*/
client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + 'kick') {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
        if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
        member.kick()
        message.channel.send('**' + member.user.username + '** a été exclu :white_check_mark:')
        console.log(message.author + message.author.username + " à kick " + member.user.username)
        member.guild.channels.get("611963681802027026").send('**' + member.user.username + '** a été exclu :white_check_mark:' + " par " + message.author.username)
    }
})

/*Ban*/
client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban') {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
        if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
        message.guild.ban(member, {days: 1})
        message.channel.send('**' + member.user.username + '** a été banni :white_check_mark:')
        memeber.guild.channels.get("611963681802027026").send('**' + member.user.username + '** a été ban :white_check_mark:' + " par " + message.author.username)
        console.log(message.author + message.author.username + " à ban " + member.user.username)
    }
})      

//clear
client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = parseInt(args[1])
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(count + 1, true)
    }
})

//mute
client.on('message', function (message){
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

        if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (!member.manageable) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }

            //unmute
            if (args[0].toLowerCase() === prefix + "unmute") {
                if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
                let member = message.mentions.members.first()
                if(!member) return message.channel.send("Membre introuvable")
                if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unmute ce membre.")
                if(!member.manageable) return message.channel.send("Je ne pas unmute ce membre.")
                let muterole = message.guild.roles.find(role => role.name === 'Muted')
                if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
                message.channel.send(member + ' a été unmute :white_check_mark:')
            }
})