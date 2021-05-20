const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let nUser = args.join(" ").slice(1);
  let uUser = args[0];
  if (!uUser) return message.reply("You have to give the user id");
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You don't have the permission to do this command!");

  let unbanEmbed = new Discord.MessageEmbed()
    .setColor("#424ef4")
    .setDescription("~Unbanned~")
    .addField("User unbanned!", `${nUser} e o seu ID:`)
    .addField(
      "Who unbanned!",
      `${message.author} e o seu ID: ${message.author.id}`
    )
    .addField("Time", message.createdAt)
    .addField("Channel", message.channel);

  let canaldeKicks = message.guild.channels.cache.find(
    (x) => x.name === "punishments"
  );
  if (!canaldeKicks)
    return channel.send.message(
      "There is no channel punishments, please create one!"
    );
  message.guild.members.unban(uUser, ["command"]);

  return canaldeKicks.send(unbanEmbed);
};

module.exports.help = {
  name: "unban",
};
