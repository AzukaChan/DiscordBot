//Run Module and Delete Command
const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
message.delete({
	timeout: 0000
});

// Server Arg
let PositionX = args.join("  ");
if (!PositionX)
	return message.channel.send("Specify X coordinate.").then((msg) => msg.delete({ timeout: 1000 }));

let PositionY = args.join("  ");
if (!PositionY)
	return message.channel.send("Specify Y coordinate.").then((msg) => msg.delete({ timeout: 1000 }));

// [HUNT] Senmurv
const embed = new Discord.MessageEmbed()
	//.setTitle('Senmurv')
	.setAuthor('[HUNT][S] Senmurv', 'https://ffxiv.gamerescape.com/w/images/b/b6/Huntmobicon.png',)
	.addFields(
		{ name: '**Location**', value: 'The Dravanian Forelands', inline: true },
		{ name: 'X: ', value: (args[0]), inline: true },
		{ name: 'Y: ', value: (args[1]), inline: true },
	)
	.addField("**Rewards: **", ` ★ 100 Centurio Seals\n ★ 100 Tomestones of Poetics\n ★ 30 Tomestones of Allegory`)
	.addField("**Server: **", `Aegis` )
	
	.setTimestamp()
	.setFooter('The Hunt', '')
	.setColor("#00FF00") // Color in HEX
	.setThumbnail("http://bot.azukachan.com/icons/senmurv.png"); //Thumbnail
	message.channel.send(embed);
};

// Command Name
module.exports.help = {
  name: "senmurv",
};
