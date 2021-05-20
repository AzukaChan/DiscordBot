const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.reply("pong"); // message.reply will reply tagging the user that typed the command. Ex: John types !ping,  the bot returns @John, Pong
};

module.exports.help = {
  name: "ping",
};
