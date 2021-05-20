const Discord = require("discord.js");
const Raffle = require("../models/Raffle");

module.exports.run = async (bot, message, args) => {
  message.delete({ timeout: 5000 });
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You don't have permission to execute this command!");

  let raffleName = args[0];
  if (!raffleName)
    return message
      .reply("Please type a raffle name to be deleted")
      .then((msg) => msg.delete({ timeout: 5000 }));

  const findRaffle = Raffle.findOneAndDelete(
    {
      raffleName,
      guildId: message.guild.id,
    },
    (err, foundObject) => {
      if (!foundObject) {
        return message.reply(
          `There is no raffle availabe with the name ${raffleName} running on your server!`
        );
      } else {
        foundObject.delete((err, deletedObject) => {
          if (!err) {
            message.member.send("Raffle deleted successfully");
          } else {
            message.member.send("There was an errror deleting the raffle!");
          }
        });
      }
    }
  );
};
module.exports.help = {
  name: "raffledelete",
};
