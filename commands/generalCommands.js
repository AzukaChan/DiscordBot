const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed()

    //General Commands
    .addField("**!bothelp**", `Displays command syntax`)
    .addField("**!botinfo**", `Displays general bot information`)
    .addField("**!serverinfo**", `Displays discord server information`)
    .addField("**!kick @username**", `Kicks the mentioned user.`)
    .addField("**!report @username For reasons**", `Reports the mentioned user, reason is optional.`)
    .addField("**!delete**", `Deletes the specified number of previous messages.`)
    .addField("**!avatar @username**", `Generated a full-size image of the users discord photo.`)
    .addField("**!addrole**", `Adds a role to the specified user.`)
	.addField("**!removerole**", `Removes a role to the specified user.`)
	.addField("**!report @user Reason goes here!**", `Reports the specified user.`)

    .setColor("#800080") // color for the side of the embed  (hex color)
    .setThumbnail("https://www.iconsdb.com/icons/preview/purple/info-2-xxl.png"); //Icon
  message.channel.send(embed);
};

module.exports.help = {
  name: "generalcommands",
};
