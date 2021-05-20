const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!bUser) return message.reply("Please select a user.");
  let bReason = args.join(" ").slice(22);
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You don't have the permission to that.");
  if (bUser.hasPermission("MANAGE_MESSAGES"))
    return message.reply("This user can't be banned");
  let banEmbeb = new Discord.MessageEmbed()
    .setColor("#424ef4")
    .setDescription("~Banned~")
    .addField("Banned User", `${bUser} e o seu ID: ${bUser.id}`)
    .addField(
      "Who banned",
      `${message.author} e o seu ID: ${message.author.id}`
    )
    .addField("Reason ", bReason)
    .addField("Time", message.createdAt)
    .addField("Channel", message.channel);

  let canaldeKicks = message.guild.channels.cache.find(
    (x) => x.name === "punishments"
  );
  if (!canaldeKicks)
    return channel.send.message(
      "There is no channel with the name punishments."
    );

  message.guild.member(bUser).ban(bReason);
  canaldeKicks.send(banEmbeb);
};

module.exports.help = {
  name: "ban",
};
