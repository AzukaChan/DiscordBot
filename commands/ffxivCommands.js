const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed()

    //Final Fantasy Commands
    .addField(
      "**!quest Quest_Name_Here**",
      `Gets information on the requested FFXIV quest.`
    )
    .addField(
      "**!iam Server FirstName LastName**",
      `Register and bind your in-game FFXIV character to your Discord ID using AzukaBot!.`
    )
    .addField(
      "**!lodestone Server FirstName LastName**",
      `Pulls information about the specified character using only in-game server and character name.`
    )
    .addField(
      "**!whois @username**",
      `Pulls information about the mentioned users in-game FFXIV character directly from the lodestone and generates an image. Great for Free Company's with a large amount of members or discord chat that allow any username.`
    )
    .addField("**!event**", `Displays any currently running FFXIV events.`)
    .addField("**!daily**", `Displays daily FFXIV reset time.`)
    .addField("**!weekly**", `Displays weekly FFXIV reset time.`)

    .setColor("#800080	") // color for the side of the embed  (hex color)
    .setThumbnail(
      "https://www.iconsdb.com/icons/preview/purple/info-2-xxl.png"
    ); //Icon
  message.reply(embed);
};

module.exports.help = {
  name: "ffxivcommands",
};
