const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  await message.reply("Deleting the requested messages.");
  let ddArgs = args.join("  ");
  if (!ddArgs)
    return message.reply("Please specify the number of messages to be deleted");
  if (args[0] > 100)
    return message.reply(
      "The maximum number of messages that can be deleted is 100 at a time."
    );
  else {
    message.channel.bulkDelete(args[0]);
  }
};

module.exports.help = {
  name: "delete",
};
