const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (message.guild === null) {
    return message.reply("This command is only available in the server!");
  }
  let sicon = message.guild.iconURL();
  let serverembeb = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setColor("#40E0D0")
    .addField("Server Name", message.guild.name, true)
    .addField("Member Count", message.guild.memberCount, true)
    .addField("Roles", message.guild.roles.cache.size, true)
    .addField("Channels", message.guild.channels.cache.size, true)
    .addField("Region", message.guild.region, true)
    .addField("Owner", `<@${message.guild.ownerID}>`, true)
    .setThumbnail(sicon)
    .addField("Server Created", message.guild.createdAt, true);

  return message.channel.send(serverembeb);
};

module.exports.help = {
  name: "serverinfo",
};
