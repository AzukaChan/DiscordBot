//Run Module and Delete Command
const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
message.delete({
	timeout: 0000
});

// Server Arg
let ServerName = args.join("  ");
if (!ServerName)
	return message.channel.send("Please specify server.").then((msg) => msg.delete({ timeout: 1000 }));

// [FATE] A Finale Most Formidable
const embed = new Discord.MessageEmbed()
	//.setTitle('A Finale Most Formidable')
	.setAuthor('[FATE] A Finale Most Formidable', 'https://i.ibb.co/jkc0LSk/60px-Map65-Icon.png',)
	.addField("**Location: **", `Kholusia ( X: 33, Y: 21 ) `)
	.addField("**Rewards: **", `★ Formidable Cog ★ \n Used to buy Ironfrog Ambler Mount and Minion`)
	.addField("**Server: **", (args[0]) )

	.setTimestamp()
	.setFooter('FATE Found', '')
	.setColor("#00FF00") // Color in HEX
	.setThumbnail("http://bot.azukachan.com/icons/formidable.png"); //Thumbnail
	message.channel.send(embed);
};

// Command Name
module.exports.help = {
  name: "formidable",
};
