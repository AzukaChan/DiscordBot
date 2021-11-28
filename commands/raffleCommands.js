const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed()

    //Raffle Commands
    .addField("**!rafflestart @Role Raffle Name**", `Starts a raffle for the specified discord role.`)
    .addField("**!rafflejoin RaffleName**", `Joins the specified raffle.`)
    .addField("**!rafflewinner RaffleName**", `Randomly selects a winner for the specified raffle.`)
    .addField("**!raffledelete RaffleName**", `Deletes the specified raffle.`)
    .addField("**!rafflelist**", `List any currently running raffles.`)

    .setColor("#800080") // color for the side of the embed  (hex color)
    .setThumbnail("https://www.iconsdb.com/icons/preview/purple/info-2-xxl.png"); //Icon
  message.reply(embed);
};

module.exports.help = {
  name: "rafflecommands",
};
