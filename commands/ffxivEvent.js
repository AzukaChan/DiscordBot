const Discord = require("discord.js");
const puppeteer = require("puppeteer");

module.exports.run = async (bot, message, args) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page
    .goto(`https://www.xenoveritas.org/static/ffxiv/timer.html`)
    .catch((err) =>
      message
        .reply("Currently unable to retreive data!")
        .then((msg) => msg.delete(2000))
    );

  const result = await page.evaluate(async () => {
    let items = [];
    let title = document.querySelector(".title");
    let days = document.querySelector(".days");
    let hours = document.querySelector(".hours");

    items.push(title.textContent, days.textContent, hours.textContent);

    return items;
  });
  browser.close();
  console.log(result[0], result[1]);

  if (result.length === 0) {
    let noEvents = new Discord.MessageEmbed()
      .setDescription("No events available at the moment")
      .setColor("#FF0000");
    return message.reply(noEvents).then((msg) => msg.delete(5000));
  }
  let embed = new Discord.MessageEmbed()
    .addField("Event", result[0])
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .addField("Ends in", result[1] + result[2])
    .setColor("00FF00");
  message.reply(embed);
};

module.exports.help = {
  name: "event",
};
