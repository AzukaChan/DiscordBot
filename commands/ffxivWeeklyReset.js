const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  function getTime(offset) {
    var d = new Date();
    // localTime = d.getTime();
    // localOffset = d.getTimezoneOffset() * 60000;

    // utc = localTime + localOffset;
    // var nd = new Date(utc + (3600000*offset));
    // utc = new Date(utc);
    console.log(d.getDay());
    let days = 9 - d.getDay();
    let hours = d.getHours();
    let minutes = 60 - d.getMinutes();
    let seconds = 60 - d.getSeconds();
    if (days < 0) {
      days = 0;
    }
    let result =
      days +
      " Days " +
      hours +
      " Hours " +
      minutes +
      " Minutes " +
      seconds +
      " Seconds ";
    return result;
  }
  let embed = new Discord.MessageEmbed()
    .setTitle("**Weekly Reset!**")
    .setColor("#f22")
    .setThumbnail("https://icons.azukachan.com/timer.png")
    .addField("Time Until Weekly Reset:", `**${getTime(12)}**`);
  return message.channel.send(embed);
};
module.exports.help = {
  name: "weekly",
};
