const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  function getTime(offset) {
    var d = new Date();
    // localTime = d.getTime();
    // localOffset = d.getTimezoneOffset() * 60000;

    // utc = localTime + localOffset;
    // var nd = new Date(utc + (3600000*offset));
    // utc = new Date(utc);
    let hours = 24 - d.getHours();
    console.log(hours, d.getHours());
    let minutes = 60 - d.getMinutes();
    let seconds = 60 - d.getSeconds();

    let result =
      hours + " Hours " + minutes + " Minutes " + seconds + " Seconds ";
    return result;
  }
  let embed = new Discord.MessageEmbed()
    .setTitle("**Daily Reset!**")
    .setColor("#f22")
    .setThumbnail("https://icons.azukachan.com/timer.png")
    .addField("Time Until Day Reset:", `**${getTime(10)}**`);
  message.channel.send(embed);
};

module.exports.help = {
  name: "dailytest",
};
