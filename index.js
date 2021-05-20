//Dependencies
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const mongoose = require("mongoose");

const bot = new Discord.Client({
    disableEveryone: true
});

mongoose.connect(
    "mongodb+srv://webmanager:MONGO-DB-LINK", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
);
//Load Commands Fodler
const fs = require("fs");
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("There's no commands.!");
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

//Bot Online and Ready
bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Type: !commandlist", {
        type: "PLAYING"
    });
});

//Basic Reactions
bot.on("message", async message => {
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
    const messageCheck = message.content.toLowerCase();
    //AzukaLove Reaction
    if (messageCheck.includes("azuka")) {
        message.react("561444430351958024").catch(err => console.log(err));
    }

    //AzukaHype Reaction
    if (messageCheck.includes("hype")) {
        message.react("561420574996561921").catch(err => console.log(err));
    }

    //AzukaHype Reaction
    if (messageCheck.includes("ask azuka")) {
        message.channel.send("My ears are burning!～").catch(err => console.log(err));
    }
});

bot.login(botconfig.token);