const Discord = require("discord.js");
const Raffle = require("../models/Raffle");

module.exports.run = async (bot, message, args) => {
    message.delete({
        timeout: 3000
    });
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("You don't have permission to execute this command!");
    let raffleName = args
        .join("")
        .replace(/[0-9]/g, "")
        .replace("<@&>", "")
        .replace("everyone", "");
    let raffleRole = message.mentions.roles.first() || args[2];
    if (args[1] === "everyone" || args[1] === "Everyone") {
        raffleRole = "everyone";
    }
    if (!raffleRole)
        return message
            .reply("Please type a role")
            .then((msg) => msg.delete({
                timeout: 4000
            }));
    if (!raffleName)
        return message
            .reply("Please type a name")
            .then((msg) => msg.delete({
                timeout: 4000
            }));

    const raffleExists = Raffle.findOne({
            raffleName,
        },
        (err, foundObject) => {
            if (!foundObject) {
                const newRaffle = Raffle.create({
                        guildId: message.guild.id,
                        raffleRole: raffleRole === "everyone" ? "everyone" : raffleRole.id,
                        raffleName,
                        raffleRoleName: raffleRole === "everyone" ? "everyone" : raffleRole.name,
                        usersJoined: [],
                        createdById: message.author.id,
                        createdByName: message.author.username,
                    },
                    (err, createdObject) => {
                        if (createdObject) {
                            message.member.send("Raffle created successfully");

                            let createdEnbed = new Discord.MessageEmbed()
                                .setAuthor(message.author.username, message.author.displayAvatarURL())
                                .setThumbnail("https://cdn.iconscout.com/icon/free/png-256/confetti-48-576562.png")
                                .setTitle(`${createdObject.raffleName} raffle has started!`)
                                .addField("Created By", `${message.author.username}`, true)
                                .addField(
                                    "Roles",
                                    `${
                    createdObject.raffleRole === "everyone"
                      ? "everyone"
                      : `<@&${createdObject.raffleRole}>`
                  }`,
                                    true
                                )
                                .addField("Join Command",`!rafflejoin ${createdObject.raffleName}`,true)
                                .setColor("#800080")
                                .setThumbnail("https://cdn.iconscout.com/icon/free/png-256/confetti-48-576562.png")
                                .setTimestamp();
                            message.channel.send(createdEnbed);
                        }
                    }
                );
            } else {
                message.member.send("Raffle already created!");
                let foundObjectEnbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .addField("Db ID", `**${foundObject._id}**`)
                    .addField("Guild ID", `**${foundObject.guildId}**`)
                    .addField("Raffle Role", `**${foundObject.raffleRole}**`)
                    .addField("Raffle Name", `**${foundObject.raffleName}**`)
                    .setTimestamp()
                    .setColor("#FFAB32");

                message.member.send(foundObjectEnbed);
            }
        }
    );
};

module.exports.help = {
    name: "rafflestart",
};