const Discord = require("discord.js");
const mongoose = require("mongoose");
const Axios = require("axios");
const User = require("../models/User");

module.exports.run = async (bot, message, args) => {
  let rMember = message.guild.member(message.mentions.users.first());
  if (!rMember)
    return message.reply("You forgot to @mention a user!").then((msg) => {
      msg.delete(5000);
    });
  console.log(
    `The user ${message.author.username} searched for ${rMember.user.username}'s FFXIV character.`
  );
  const user = User.findOne(
    {
      userId: rMember.id,
      guildId: message.guild.id,
    },
    (err, foundObject) => {
      if (err) {
        return message.reply("An error has occured").then((msg) => {
          msg.delete(5000);
        });
      } else {
        if (!foundObject) {
          message.channel.send("This user has not registered a character!");
        } else {
          Axios.get(`https://xivapi.com/character/${foundObject.ffixID}`).then(
            (res) => {
              if (res.data) {
                const {
                  Portrait,
                  Name,
                  Nameday,
                  DC,
                  Server,
                  Gender,
                  Race,
                  FreeCompanyId,
                  Avatar,
                  Title,
                } = res.data.Character;
                Axios.get(`https://xivapi.com/title/${Title}`).then(
                  async (res) => {
                    if (FreeCompanyId === null) {
                      let embed = new Discord.MessageEmbed()
                        .setAuthor(
                          `${Name}, ${
                            Gender === 1
                              ? res.data.Name_en
                                ? res.data.Name_en
                                : ""
                              : res.data.NameFemale_en
                              ? res.data.NameFemale_en
                              : ""
                          }`,
                          Avatar
                        )
                        .addField("Name:", `${Name}`, true)
                        .addField("Nameday:", `${Nameday}`, true)
                        .addField("DC:", `${DC}`, true)
                        .addField("Server:", `${Server}`, true)
                        .addField(
                          "Gender:",
                          `${Gender === 1 ? "Male" : "Female"}`,
                          true
                        )
                        .addField("Race:", `${Race}`, true)
                        .addField("Free Company:", `No free company `, true)
                        .setImage(Portrait)
                        .setTimestamp()
                        .setColor("#00FF00");

                      message.channel.send(embed);
                    } else {
                      Axios.get(
                        `https://xivapi.com/freecompany/${FreeCompanyId}`
                      ).then((secondRes) => {
                        if (secondRes) {
                          let embed = new Discord.MessageEmbed()
                            .setAuthor(
                              `${Name}, ${
                                Gender === 1
                                  ? res.data.Name_en
                                    ? res.data.Name_en
                                    : ""
                                  : res.data.NameFemale_en
                                  ? res.data.NameFemale_en
                                  : ""
                              }`,
                              Avatar
                            )
                            .addField("Name:", `${Name}`, true)
                            .addField("Nameday:", `${Nameday}`, true)
                            .addField("DC:", `${DC}`, true)
                            .addField("Server:", `${Server}`, true)
                            .addField(
                              "Gender:",
                              `${Gender === 1 ? "Male" : "Female"}`,
                              true
                            )
                            .addField("Race:", `${Race}`, true)
                            .addField(
                              "Free Company:",
                              `${secondRes.data.FreeCompany.Name} «${secondRes.data.FreeCompany.Tag}»`,
                              true
                            )
                            .addField(
                              "FC GrandCompany:",
                              `${secondRes.data.FreeCompany.GrandCompany}`,
                              true
                            )
                            .addField(
                              "FC Rank:",
                              `${secondRes.data.FreeCompany.Rank}`,
                              true
                            )
                            .setImage(Portrait)
                            .setTimestamp()
                            .setColor("#00FF00");

                          message.channel.send(embed);
                        } else {
                          message
                            .reply("An error has occurred")
                            .then((msg) => msg.delete(5000));
                        }
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
};

module.exports.help = {
  name: "whois",
};
