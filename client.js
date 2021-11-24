const { Client, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: 32767,
  allowedMentions: {
    parse: ["users", "roles"],
  },
  shards: "auto",
});
const token = process.env.TOKEN;

global.Discord = require("discord.js");
global.client = client;
global.bot = client;
global.MessageEmbed = require("discord.js").MessageEmbed;
global.c = require("colors");
global.fs = require("fs");
global.mongoose = require("mongoose");

client.commands = new Collection();

const functions = fs
  .readdirSync("./functions/")
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync("./events/")
  .filter((file) => file.endsWith(".js"));
const commandFolder = fs.readdirSync("./commands/");
const mongoEventFiles = fs
  .readdirSync("./mongoEvents")
  .filter((file) => file.endsWith(".js"));

(async () => {
  for (const file of functions) {
    require(`./functions/${file}`)(client);
  }

  client.handleMongoEvents(mongoEventFiles, "./mongoEvents");
  client.handleClientEvents(eventFiles, "./events");
  client.handleCommands(commandFolder, "./commands");
  client.login(token);
})();
