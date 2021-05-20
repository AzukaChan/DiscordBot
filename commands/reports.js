const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!rUser)
    return message.channel.send("There is no member with that username!");
  let rreason = args.join(" ").slice(22);

  let reportEmbed = new Discord.MessageEmbed()
    .setDescription("Reports")
    .setColor("#424ef4")
    .addField("Reported user", `${rUser}  id: ${rUser.id}`)
    .addField("Reported by", `${message.author} id: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

  let reportschannel = message.guild.channels.cache.find(
    (x) => x.name === "reports"
  );
  if (!reportschannel)
    return message.channel
      .send("There is no report channel, please create one")
      .then((msg) => msg.delete({ timeout: 5000 }));

  message.delete().catch((O_o) => {});
  reportschannel.send(reportEmbed);
};

module.exports.help = {
  name: "report",
};
