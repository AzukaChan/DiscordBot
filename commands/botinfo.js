const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL();
  let botembed = new Discord.MessageEmbed()
    .setDescription("Bot Info")
    .setColor("#424ef4")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Main goal", "something")
    .addField("When it was created", bot.user.createdAt);

  return message.channel.send(botembed);
};

module.exports.help = {
  name: "botinfo",
};
