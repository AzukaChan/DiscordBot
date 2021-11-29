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

// [FATE] Prey Online
const embed = new Discord.MessageEmbed()
	//.setTitle('Prey Online')
	.setAuthor('[FATE] Prey Online', 'https://i.ibb.co/jkc0LSk/60px-Map65-Icon.png',)
	.addField("**Location: **", `Azys Lla \n (X:6, Y: 20) \n (X:27, Y: 5) \n (X:38, Y: 18) `)
	.addField("**Rewards: **", `★ Proto Ultima Exoplating ★ \n Used to buy Ultima Horns from Bertana in Idyllshire`)
	.addField("**Server: **", (args[0]) )

	.setTimestamp()
	.setFooter('FATE Found', '')
	.setColor("#00FF00") // Color in HEX
	.setThumbnail("http://bot.azukachan.com/icons/preyonline.png"); //Thumbnail
	message.channel.send(embed);
};

// Command Name
module.exports.help = {
  name: "preyonline",
};
