# DiscordBot
A basic DiscordBot written in Javascript.

Node.js - JavaScript runtime environment is required. 


# Dependencies
After cloning the files in this repo, use Windows Powershell to run **npm install** inside your 'DiscordBot' folder to download the following dependency files. The bot will not work without this step.

1) discord.js
2) cheerio
3) puppeteer
4) mongoose
5) pretty-ms
6) dotenv
7) node-fetch


# Registering your DiscordApp (Bot)
You will need to create a 'Discord app' here: 
https://discordapp.com/developers/applications/

1) After making your application, find your client ID in the 'Bot' section.
2) Under your bots username, you will need to click to reveal your bots unique token.
3) Place your unique token in the botconfig.json, remember to leave the quotes!


# Inviting the bot to your server
After making your application, go to the OAuth2 section of the discord developer portal and select the "bot" and "administrator" checkboxes. You should see a link generated on that page once you have checked those boxes; that is your bots invite link.

# Start the bot
1) Open a Windows Powershell in the root of the 'DiscordBot' folder.
2) type: node index.js

Your bot should now be online.
