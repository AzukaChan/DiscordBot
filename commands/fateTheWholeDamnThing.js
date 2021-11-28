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

// [FATE] The Head, The Tail, The Whole Damned Thing
const embed = new Discord.MessageEmbed()
	//.setTitle('The Head, The Tail, The Whole Damned Thing')
	.setAuthor('[FATE] The Head, The Tail, The Whole Damned Thing', 'https://i.ibb.co/jkc0LSk/60px-Map65-Icon.png',)
	.addField("**Locations: **", ` The Tempest (X: 27, Y: 26)  `)
	.addField("**Rewards: **", `★ Archaeotania's Horn ★ \n Used to buy the frog suit.`)
	.addField("**Server: **", (args[0]) )

	.setColor("#00FF00") // Color in HEX
	.setThumbnail("https://ffxiv.gamerescape.com/w/images/thumb/9/91/Archaeotania.png/300px-Archaeotania.png"); //Thumbnail
	message.channel.send(embed);
};

// Command Name
module.exports.help = {
  name: "tempest",
};
