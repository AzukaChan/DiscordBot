const Discord = require("discord.js");
const Raffle = require("../models/Raffle");

module.exports.run = async (bot, message, args) => {
  if (message.guild === null) {
    return message.reply("This command is only available in the server!");
  }
  message.delete({ timeout: 5000 });
  const raffle = Raffle.find(
    {
      guildId: message.guild.id,
    },
    (err, foundObject) => {
      if (!foundObject) {
        return message.member.send(
          "There is no raffles available on your server at the moment!"
        );
      } else {
        if (foundObject.length > 10) {
          return message.reply(
            "There are more than 10 raffles registered in the server, for better performance won't be displayed!"
          );
        }
        foundObject.map((item) => {
          let enbed = new Discord.MessageEmbed()
            .setTitle(`${item.raffleName}`)
            .addField("Name:", `${item.raffleName}`)
            .addField("Role", `${item.raffleRoleName}`)
            .addField("CreatedBy", `<@${item.createdById}>`)
            .setTimestamp()
            .setColor("#2FF");
          message.member.send(enbed);
        });
      }
    }
  );
};
module.exports.help = {
  name: "rafflelist",
};
