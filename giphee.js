const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const GphApiClient = require("giphy-js-sdk-core");
const express = require("express");
const app = express();

require("dotenv").config();

const giphy = GphApiClient(process.env.GIPHY_TOKEN);

const searchGifs = (query) => {
  return giphy.translate("gifs", { s: query });
};

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith(config.prefix)) {
    let tag = message.content.slice(config.prefix.length).trim();
    if (tag == "help" || tag == "") {
      message.channel.send(
        "Type '!g' followed by a <tag>. Multiple tags must be separated by space. "
      );
    } else {
      searchGifs(tag).then((res) => {
        // console.log(res)
        message.channel.send(res.data.url);
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

// searchGifs("awesome").then(console.log);
