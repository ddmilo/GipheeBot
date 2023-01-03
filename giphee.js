const Discord = require("discord.js");
const { Client, GatewayIntentBits } = require('discord.js');
const config = require("./config.json");
const GphApiClient  = require('giphy-js-sdk-core');
const http = require('http');
const express = require('express');
const app = express();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

require('dotenv').config();

giphy = GphApiClient(process.env.GIPHY_TOKEN)

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}`);
}, 280000);

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("messageCreate", (message) => {
  

  if(message.content.startsWith(config.prefix)) {
    let tag = message.content.slice(config.prefix.length).trim().split(/ +/g)
    if(tag == "help" || tag == ''){
      message.channel.send("Type '!g' followed by a <tag>. Multiple tags must be separated by a '-'. ");      
    }
    else    
      giphy.random('gifs', {tag})
        .then((res) => {
          // console.log(res);
          message.channel.send(res.data.url);        
        })
  }
  
});

client.login(process.env.DISCORD_TOKEN);

