const Discord = require("discord.js");
const Raffle = require("../models/Raffle");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("You do not have permission to execute this command!");
    const raffleNameR = message.guild.members.cache.get(args[0]);
    const raffleName = args.join(" ");
    if (!raffleName) return message.reply("Please type a raffle name!");

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const findRaffle = Raffle.findOne({
            raffleName: raffleName,
            guildId: message.guild.id,
        },
        (err, foundObject) => {
            if (!foundObject) {
                return message.member
                    .send("There is no raffles with that name available")
                    .then((msg) => msg.delete(5000));
            } else {
                let winner =
                    foundObject.usersJoined[
                        getRandomInt(0, foundObject.usersJoined.length - 1)
                    ];
                console.log(winner);
                if (!winner) {
                    return message.member.send(
                        `There was no participants in the raffle ${foundObject.raffleName}`
                    );
                }

                let enbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTitle(`${foundObject.raffleName} raffle has ended!`)
                    .setThumbnail("https://i.ibb.co/F4sdsfS/crown.png")
                    .addField("Winner:", `<@${winner}>`)
                    .setTimestamp()
                    .setColor("#00FF00");
                message.channel
                    .send(enbed)
                    .then((msg) => message.delete({
                        timeout: 3000
                    }));
            }
        }
    );
};

module.exports.help = {
    name: "rafflewinner",
};