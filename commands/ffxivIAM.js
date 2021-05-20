const Discord = require("discord.js");
const Axios = require("axios");
const mongoose = require("mongoose");
const User = require("../models/User");
module.exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      "Please type the server name, !wiam <server> <name>"
    );
  if (!args[1])
    return message.channel.send("Please type your name, !wiam <server> <name>");
  Axios.get(
    `https://xivapi.com/character/search?name=${args[1]}%20${args[2]}&server=${args[0]}&data=AC,FR,FC,FCM,PVP `
  )
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        let filteredData = res.data.Results.filter((item) => {
          item.Name === `${args[1]} ${args[2]}`;
          console.log(`${args[1]}${args[2]}` === item.Name);
        });
        console.log(filteredData);
        const { Avatar, ID, Name, Server } = res.data.Results[0];
        let iAmEmbed = new Discord.MessageEmbed()
          .setDescription(
            "Character saved \n You may now recall your character with !who"
          )
          .setTitle("**Success**")
          .setColor("#06bc46")
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL()
          );

        message.channel
          .send(iAmEmbed)
          .then((msg) => msg.delete({ timeout: 5000 }))
          .catch((err) => console.log(err));

        const userExists = User.findOne(
          {
            userId: message.author.id,
            guildId: message.guild.id,
          },
          (err, foundObject) => {
            if (!foundObject) {
              const user = User.create(
                {
                  name: message.author.username,
                  userId: message.author.id,
                  ffixID: ID,
                  guildId: message.guild.id,
                },
                (err, createdObject) => {
                  if (err) {
                    return message.channel.send(
                      "An error has occured, the bot could not create the user in the database."
                    );
                  } else {
                    let iAmEmbed = new Discord.MessageEmbed()
                      .setDescription(
                        "Character saved \n You may now recall your character with !who"
                      )
                      .setTitle("**Success**")
                      .setColor("#06bc46")
                      .setAuthor(
                        message.author.username,
                        message.author.displayAvatarURL()
                      );

                    message.channel
                      .send(iAmEmbed)
                      .then((msg) => msg.delete({ timeout: 5000 }))
                      .catch((err) => console.log(err));
                  }
                }
              );
            } else {
              if (foundObject.ffixID) {
                foundObject.ffixID = ID;
              }
              foundObject.save((err, savedObject) => {
                if (savedObject) {
                  console.log("Data saved successfully in the database!");
                }
              });
            }
          }
        );
      }
    })
    .catch((err) => console.log(err));
};

module.exports.help = {
  name: "iam",
};
