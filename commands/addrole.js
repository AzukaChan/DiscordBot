const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You don`t have the permission to use that command !");
  let rMember = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!rMember)
    return message
      .reply("There`s no user with that username!")
      .then((msg) => msg.delete({ timeout: 5000 }));
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Please select a role.");
  let gRole = message.guild.roles.cache.find((x) => x.name === `${args[1]}`);
  if (!gRole)
    return message
      .reply("There is no role with that name.")
      .then((msg) => msg.delete({ timeout: 5000 }));
  if (rMember.roles.cache.has(gRole.id))
    return message
      .reply("This member already has the role.!")
      .then((msg) => msg.delete({ timeout: 5000 }));
  await rMember.roles.add(gRole.id);

  try {
    await rMember.send(`You received the role ${gRole.name}!`);
  } catch (e) {
    message
      .reply(
        `Congratulations <@${rMember.id}>, you received the  ${gRole.name}. We tried to send you but your direct message was blocked.`
      )
      .then((msg) => msg.delete({ timeout: 5000 }));
  }
};

module.exports.help = {
  name: "addrole",
};
