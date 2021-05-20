const Discord = require("discord.js");
const puppeteer = require("puppeteer");

module.exports.run = async (bot, message, args) => {
  let guild = message.guild.members.get(args[0]);
  let questname = args.join("");
  if (!questname)
    return message
      .reply("Please enter a quest name.")
      .then((msg) => msg.delete(5000));
  await message
    .reply(
      `Fetching data for quest: **${questname}**. This feature is in Beta and can take up to 15 seconds`
    )
    .then((msg) => msg.delete(4000));

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page
    .goto(`https://ffxiv.gamerescape.com/wiki/${questname}`)
    .catch((err) =>
      message
        .reply("Currently unable to retreive data!")
        .then((msg) => msg.delete(2000))
    );

  const result = await page.evaluate(async () => {
    const items = [];
    document
      .querySelectorAll(".rightbox > tbody")
      .forEach((item) => items.push(item.textContent));
    return items;
  });

  browser.close();
  if (result.length === 0) {
    return message
      .reply(
        `There is no quest with the name ${questname}. You need to type it exactly as it is displayed in-game.`
      )
      .then((msg) => msg.delete(4000));
  }
  const npcIssuing = result
    .toString()
    .replace(/(^[ \t]*\n)/gm, "")
    // NPC Name Formatting
    .replace("Issuing NPC", "**__NPC Name & Location__**")
    // Quest Location Formatting (Temp fix to put NPC name on separate line)
    .replace("Eastern", "\nEastern")
    .replace("Southern", "\nSouthern")
    .replace("Northern", "\nNorthern")
    .replace("Western", "\nWestern")
    .replace("Outer", "\nOuter")
    .replace("Upper", "\nUpper")
    .replace("Central", "\nCentral")
    .replace("Middle", "\nMiddle")
    .replace("Mor", "\nMor")
    .replace("Foundation", "\nFoundation")
    .replace("Coerthas Central Highlands", "\nCoerthas Central Highlands")
    .replace("Coerthas Western Highlands", "\nCoerthas Western Highlands")
    .replace("The Sea of Clouds", "\nThe Sea of Clouds")
    .replace("The Tempest", "\nThe Tempest")
    .replace("Azys Lla", "\nAzys Lla")
    .replace("The Prima Vista Tiring Room", "\nThe Prima Vista")
    // Quest Type Formatting
    .replace("Type", "**Type**")
    .replace("Location:", "**Location:**")
    .replace("Guildleve:", "**Guildleve:**")
    .replace("Levequest:", "**Levequest:**")
    .replace("Guildhest:", "**Guildhest:**")
    .replace("Repeatable:", "**Repeatable:**")
    .replace("Reputation:", "**Reputation:**")
    // Quest Information Formatting
    .replace("Misc Reward", "**Misc Reward**")
    .replace("Quest:", "**Quest:**")
    .replace("Required Items", "")
    .replace("Lore & Dialogue", "**__Lore & Dialogue__**\n")
    .replace("Requirements", "\n**__Requirements__**")
    .replace("Class:", "**Class:**")
    .replace("Unlocks:", "**Unlocks:**")
    .replace("Classes:", "**Classes:**");
  // Misc Formatting

  const emdeb = new Discord.MessageEmbed()

    .setThumbnail(
      `https://ffxiv.gamerescape.com/w/images/thumb/4/41/Mainquest1_Icon.png/64px-Mainquest1_Icon.png`
    )
    .setTitle(`**${questname}**`)
    .addField("**----------**", `${npcIssuing}`)
    .setColor("#800080");
  message.channel.send(emdeb);
};

module.exports.help = {
  name: "quest",
};
