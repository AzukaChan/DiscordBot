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

// [FATE] A Horse Outside
const embed = new Discord.MessageEmbed()
	//.setTitle('A Horse Outside')
	.setAuthor('[FATE] A Horse Outside', 'https://i.ibb.co/jkc0LSk/60px-Map65-Icon.png',)
	.addField("**Locations: **", ` The Lochs \n (X: 4, Y: 15) \n (X: 29, Y:9) \n (X: 16, Y: 22)  `)
	.addField("**Rewards: **", `★ Ixion Horn ★ \n Used to buy Ixion Mount, Barding and Housing Items.`)
	.addField("**Server: **", (args[0]) )

	.setColor("#00FF00") // Color in HEX
	.setThumbnail("https://ffxiv.consolegameswiki.com/mediawiki/images/b/b5/Ixion_Image.png"); //Thumbnail
	message.channel.send(embed);
};

// Command Name
module.exports.help = {
  name: "ixion",
};
