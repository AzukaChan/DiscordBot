const Discord = require("discord.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports.run = async (bot, message, args) => {
  const generateEmbed = (available) => {
    let embed = new Discord.MessageEmbed()
      .setTitle(`${available ? `Servers are offline!` : "Servers are online!"}`)
	  .setThumbnail("https://icons.azukachan.com/ffxivarr-crystal.png")
      .setColor(`${available ? "#080" : "#f22"}`)
      .setDescription(
        `${
          available
            ? "FFXIV is currently down for maintenance."
            : "There is currently no maintenance."
        }`
      )
      .setFooter("Feature in BETA")
      .setTimestamp();
    return embed;
  };
  var ping = new XMLHttpRequest();
  var url = "adasd";
  ping.onreadystatechange = () => {
    if (ping.readyState === 4) {
      message.reply(generateEmbed(false));
      if (ping.readyState === 200) {
        message.reply(generateEmbed(true));
      }
    }
  };
  ping.open("GET", url, true);
  ping.send();
};

module.exports.help = {
  name: "mainttest",
};
