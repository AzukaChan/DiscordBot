const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You don't have permission to use this command!");
  let rMember = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!rMember) return message.reply("There is no user with that username!");
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("You have to type a role.!");
  let gRole = message.guild.roles.cache.find((x) => x.name === `${args[1]}`);
  if (!gRole) return message.reply("There is no role with that name!");

  if (!rMember.roles.cache.has(gRole.id))
    return message.reply("The member typed doesn't have the role you typed.");
  await rMember.roles.remove(gRole.id);

  try {
    await rMember.send(`The role ${gRole.name} was removed from your account!`);
  } catch (e) {
    message
      .reply(
        `Member <@${rMember.id}>, got the role ${gRole.name} removed. We tried to send this message in the direct message, but the dm is blocked.`
      )
      .then((msg) => msg.delete(5000));
  }
};

module.exports.help = {
  name: "removerole",
};
