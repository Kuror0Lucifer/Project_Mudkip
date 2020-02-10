process.on("unhandledRejection", (err) => {
  console.error(`Unhandled rejection: ${err}`);
});
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.queue = new Map();
bot.skipvote = new Map();
bot.db = require('quick.db');
bot.discord = require('discord.js');
bot.ytdl = require('ytdl-core');
require("./Modules/functions.js")(bot);
require("./Modules/logs.js")(bot);
require('dotenv').config();

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
  });
});

let folders = ["songcommands", "musiccommands", "imagecommands", "funcommands", "imagecommands/gifcommands", "modcommands", "maincommands", "economycommands", "economycommands/games", "ownercommands"];

folders.forEach(function(folder) {
  fs.readdir(`./BotCommands/${folder}/`, (err, files) => {
    if (err) return console.log(err);
     let jsfile = files.filter(f => f.split(".").pop() === "js")
      if (jsfile.length <= 0) {
        console.log("Could not find commands");
        return;
      } 

      jsfile.forEach((f, i) => {
        let props = require(`./BotCommands/${folder}/${f}`);
        console.log(`${f} Files loaded`);
        bot.commands.set(props.help.name, props);
        if (props.help.aliases) {
          props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props);
          });
        }
    });
  });
});

bot.login(process.env.TOKEN);