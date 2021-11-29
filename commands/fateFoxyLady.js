//Run Module and Delete Command
const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
message.delete({
	timeout: 1000
});

// Server Arg
let ServerName = args.join("  ");
if (!ServerName)
	return message.channel.send("Please specify server.").then((msg) => msg.delete({ timeout: 1000 }));

// [FATE] Foxy Lady
const embed = new Discord.MessageEmbed()
	//.setTitle('Foxy Lady')
	.setAuthor('[FATE] Foxy Lady', 'https://i.ibb.co/jkc0LSk/60px-Map65-Icon.png',)
	.addField("**Locations: **", ` Yanxia \n (X: 24, Y: 34) \n (X: 16, Y:12) \n (X: 11, Y: 17)  `)
	.addField("**Rewards: **", `★ Sassho-seki Fragment ★ \n Used to buy Tamamo Headband, Fox Kit and housing item`)
	.addField("**Server: **", (args[0]) )

	.setTimestamp()
	.setFooter('FATE Found', '')
	.setColor("#00FF00") // Color in HEX
	.setThumbnail("http://bot.azukachan.com/icons/foxylady.png"); //Thumbnail
	message.channel.send(embed);
};

// Command Name
module.exports.help = {
  name: "foxylady",
};
