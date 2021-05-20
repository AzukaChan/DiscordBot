const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed()

    //General Commands
    .addField("**!generalcommands**", `Useful commands for managing your discord server.`)
    .addField("**!ffxivcommands**", `Useful commands for Final Fantasy XIV.`)
    .addField("**!rafflecommands**", `Host a raffle using the raffle commands!`)

    .setColor("#800080") // color for the side of the embed  (hex color)
    .setThumbnail("https://www.iconsdb.com/icons/preview/purple/info-2-xxl.png"); //Icon
  message.channel.send(embed);
};

module.exports.help = {
  name: "commandlist",
};
