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

// [HUNT] Supay
const embed = new Discord.MessageEmbed()
	//.setTitle('Supay')
	.setAuthor('[HUNT][A] Supay', 'https://ffxiv.gamerescape.com/w/images/b/b6/Huntmobicon.png',)
	.addFields(
		{ name: '**Location**', value: 'The Raktika Greatwood', inline: true },
		{ name: 'X: ', value: (args[0]), inline: true },
		{ name: 'Y: ', value: (args[1]), inline: true },
	)
	.addField("**Rewards: **", ` ★ 40 Sack of Nuts\n ★ 30 Tomestones of Poetics\n ★ 20 Tomestones of Allegory\n ★ 10 Tomestones of Revelation`)
	.addField("**Server: **", `Aegis` )
	
	.setTimestamp()
	.setFooter('The Hunt', '')
	.setColor("#00FF00") // Color in HEX
	.setThumbnail("https://ffxiv.consolegameswiki.com/mediawiki/images/thumb/7/7a/Supay_Daylight.jpg/195px-Supay_Daylight.jpg"); //Thumbnail
	message.channel.send(embed);
};

// Command Name
module.exports.help = {
  name: "supay",
};
