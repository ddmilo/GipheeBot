const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const GphApiClient  = require('giphy-js-sdk-core');

giphy = GphApiClient(config.giphy_token)

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  

  if(message.content.startsWith(config.prefix)) {
    let tag = message.content.slice(config.prefix.length).trim().split(/ +/g)
    if(tag == "help"){
      message.channel.send("Type '!g' followed by a <tag>. ");      
    }
    else    
      giphy.random('gifs', {tag})
        .then((res) => {
          console.log(res);
          message.channel.send(res.data.url);        
        })
  }
  
});

client.login(config.token);

