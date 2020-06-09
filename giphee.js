const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const GphApiClient  = require('giphy-js-sdk-core');
const http = require('http');
const express = require('express');
const app = express();

require('dotenv').config();

giphy = GphApiClient(process.env.GIPHY_TOKEN)

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  

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

