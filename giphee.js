const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if(message.content.startsWith(config.prefix)) {
    message.channel.send("pong!");
  }
});

client.login(config.token);

