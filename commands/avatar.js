const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let pedido = await message.channel.send("Avatar being generated.");
  let uAvatar = message.mentions.users.first() || message.author;

  await message.channel.send({
    files: [
      {
        attachment: uAvatar.displayAvatarURL(),
        name: "avatar.png",
      },
    ],
  });
  message.delete();
};

module.exports.help = {
  name: "avatar",
};
