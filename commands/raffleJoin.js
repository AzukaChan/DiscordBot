const Discord = require("discord.js");
const Raffle = require("../models/Raffle");

module.exports.run = async (bot, message, args) => {
  message.delete({ timeout: 5000 });
  if (!args[0]) return message.reply("Type a raffle name!");

  const checkRole = Raffle.findOne(
    {
      raffleName: args[0],
      guildId: message.guild.id,
    },
    (err, foundObject) => {
      if (!foundObject) {
        return message
          .reply("There is no raffles with that name available")
          .then((msg) => msg.delete({ timeout: 5000 }));
      } else {
        if (foundObject.raffleRole === "everyone") {
          let raffleNameRequest = message.guild.members.cache.get(args[0]);
          let raffleName = args.join("");
          if (!raffleName) return message.reply("Type a raffle name!");

          if (foundObject.usersJoined.includes(message.author.id)) {
            return message.member.send(
              `You already joined the raffle ${foundObject.raffleName}`
            );
          } else {
            if (foundObject.usersJoined.includes(message.author.id)) {
              return message.member.send("You already joined this raffle!");
            } else {
              foundObject.usersJoined.push(message.author.id);
            }
            foundObject.save((err, savedObject) => {
              if (err) {
                return message.member.send(
                  "There was an error please contact an admin"
                );
              } else {
                if (savedObject) {
                  let joinedEnbed = new Discord.MessageEmbed()
                    .setAuthor(
                      message.author.username,
                      message.author.displayAvatarURL
                    )
                    .setTitle("~You have entered the raffle~")
                    .addField("**Username**", message.author.username)
                    .addField("Server Name", `${message.guild.name}`)
                    .addField("Raffle Name", `${foundObject.raffleName}`)
                    .addField("Created By", `${foundObject.createdByName}`)
                    .setColor("#00FF00")
                    .setThumbnail(
                      "https://cdn.iconscout.com/icon/free/png-256/confetti-48-576562.png"
                    )
                    .setTimestamp();
                  return message.member.send(joinedEnbed);
                }
              }
            });
          }
        } else {
          if (
            !message.member.roles.cache.has(
              foundObject.raffleRole
                .replace("<", "")
                .replace(">", "")
                .replace("@", "")
            )
          ) {
            return message.member.send(
              "You do not have the permission to join this raffle!"
            );
          } else {
            if (foundObject.usersJoined.includes(message.author.id)) {
              let alreadyJoined = new Discord.MessageEmbed()
                .setAuthor(
                  message.author.username,
                  message.author.displayAvatarURL
                )
                .addField("**Username**", message.author.username)
                .addField("Server Name", `${message.guild.name}`)
                .addField("Raffle Name", `${foundObject.raffleName}`)
                .addField("Created By", `${foundObject.createdByName}`)
                .setDescription(
                  `You have already joined the raffle ${foundObject.raffleName}`
                )
                .setColor("#ff0000")
                .setThumbnail(
                  "https://cdn.iconscout.com/icon/free/png-256/confetti-48-576562.png"
                );
              return message.member.send(alreadyJoined);
            } else {
              foundObject.usersJoined.push(message.author.id);
              console.log(
                `${message.author.username} has joined the ${foundObject.raffleName}`
              );
            }
            foundObject.save((err, savedObject) => {
              if (err) {
                let alreadyJoined = new Discord.MessageEmbed()
                  .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                  )
                  .addField("**Username**", message.author.username)
                  .addField("Server Name", `${message.guild.name}`)
                  .addField("Raffle Name", `${foundObject.raffleName}`)
                  .addField("Created By", `${foundObject.createdByName}`)
                  .setDescription(
                    `You have already joined the raffle ${foundObject.raffleName}`
                  )
                  .setColor("##FF0000")
                  .setThumbnail(
                    "https://cdn.iconscout.com/icon/free/png-256/confetti-48-576562.png"
                  );
                return message.member.send(alreadyJoined);
              } else {
                if (savedObject) {
                  let joinedEnbed = new Discord.MessageEmbed()
                    .setAuthor(
                      message.author.username,
                      message.author.displayAvatarURL()
                    )
                    .setTitle("~You have entered the raffle~")
                    .addField("**Username**", message.author.username)
                    .addField("Server Name", `${message.guild.name}`)
                    .addField("Raffle Name", `${foundObject.raffleName}`)
                    .addField("Created By", `${foundObject.createdByName}`)
                    .setColor("#00FF00")
                    .setThumbnail(
                      "https://cdn.iconscout.com/icon/free/png-256/confetti-48-576562.png"
                    );
                  return message.member.send(joinedEnbed);
                }
              }
            });
          }
        }
      }
    }
  );
};

module.exports.help = {
  name: "rafflejoin",
};
