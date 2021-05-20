const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL();
  let botembed = new Discord.MessageEmbed()
    .setDescription("Bot Command Syntax")
    .setColor("#424ef4")
    .setThumbnail(bicon)
    .addField("!quest", "!quest Quest_Name_Here")
    .addField("!kick", "!kick @username")
    .addField("!report", "!report @username REASON")
    .addField("!avatar", "!avatar @username")
    .addField("!delete", "!delete 10");
  return message.channel.send(botembed);
};

module.exports.help = {
  name: "bothelp",
};
