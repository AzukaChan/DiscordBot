const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!kUser)
    return message.channel.send("There is no user with that username!");
  let kReason = args.join(" ").slice(22);
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      "You don't have the permission to kick this member"
    );
  if (kUser.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("You can't kick this member!");

  let kickEmbed = new Discord.MessageEmbed()
    .setDescription("~Kick~")
    .setColor("#424ef4")
    .addField("Kicked User", `${kUser} with the id **${kUser.id}**`)
    .addField(
      "Who kicked",
      `<@${message.author.id}> with the id ${message.author.id}`
    )
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

  let kickChannel = message.guild.channels.cache.find(
    (x) => x.name === "punishments"
  );
  if (!kickChannel)
    return message.channel.send("There's no punishments channel.");
  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);
};

module.exports.help = {
  name: "kick",
};
