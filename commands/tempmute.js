const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  let tomute = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!tomute) return message.reply("User not found!");
  if (tomute.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You cannot change this user!");

  let muteRole = message.guild.roles.cache.find((x) => x.name === "Muted");
  if (!muteRole) {
    try {
      muteRole = await message.guild.roles.create({
        data: {
          name: "Muted",
          permissions: ["VIEW_CHANNEL"],
          color: "DEFAULT",
        },
      });

      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  // CHANGE ROLE
  let muteTime = args[1];
  if (!muteTime) return message.reply("Please type a time.");

  await tomute.roles.add(muteRole.id);
  message
    .reply(`<@${tomute.id}> was mutted ${ms(ms(muteTime))}`)
    .then((msg) => msg.delete({ timeout: 4000 }));

  let icon = bot.user.avatarURL;
  let muteEmbed = new Discord.MessageEmbed()
    .setDescription("~TempMute~")
    .setColor("#424ef4")
    .addField("Who was muted", `${tomute} ID: ${tomute.id}`)
    .addField("Who muted", `${message.author} ID: ${message.author.id}`)
    .addField("How long", `${ms(ms(muteTime))}`)
    .setThumbnail(icon);

  let muteChannel = message.guild.channels.cache.find(
    (x) => x.name === "punishments"
  );
  if (!muteChannel)
    return message.channel.send("There's no punishments channel.");

  message.delete().catch((O_o) => {});
  muteChannel.send(muteEmbed);
};

module.exports.help = {
  name: "tempmute",
};
