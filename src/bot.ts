import { config } from "dotenv";
config();

import { Client, Message } from "discord.js";
import { prefix } from "./config.json";
import axios from 'axios';

const GphApiClient = require("giphy-js-sdk-core");
const { GIPHY_TOKEN } = process.env;
const personaje = []
const client: Client = new Client();
const giphy = GphApiClient(GIPHY_TOKEN);
let region = '';
let server = '';
let name = '';



client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("message", async (message: Message) => {
  console.log(message.content);
  region= "us";
  server= "stormrage";
  name = "naridruid"

  if (message.content.startsWith(`${prefix}`)) {
    let mensaje = message.content.split('/')
    let discordUser = message.member
    region= mensaje[4];
    server= mensaje[5];
    name = mensaje[6];
    let role2000 = message.guild.roles.find(r => r.name === "2000+");
    let role2500 = message.guild.roles.find(r => r.name === "2500+");
    let role2750 = message.guild.roles.find(r => r.name === "2750+");
    let role2900 = message.guild.roles.find(r => r.name === "2900+");
    let role3000 = message.guild.roles.find(r => r.name === "3000+");
    axios.get('https://raider.io/api/v1/characters/profile?region='+region+'&realm='+server+'&name='+name+'&fields=mythic_plus_scores_by_season%3Acurrent')
    .then((response: any) => {
      console.log(response.data.mythic_plus_scores_by_season[0].scores.all);
      let score = response.data.mythic_plus_scores_by_season[0].scores.all
      message.channel.send( discordUser +" su personaje actualizado correctamente. Score actual "+ score );
      if ((score > 2000) && (score < 2500)) { 
        discordUser.addRole(role2000);
        discordUser.removeRole(role2500)
        discordUser.removeRole(role2750)
        discordUser.removeRole(role2900)
        discordUser.removeRole(role3000)

      }
      if ((score >= 2500) && (score < 2750)) { 
        discordUser.addRole(role2500);
        discordUser.removeRole(role2000)
        discordUser.removeRole(role2750)
        discordUser.removeRole(role2900)
        discordUser.removeRole(role3000)
      }
      if ((score >= 2750) && (score < 2900)) { 
        discordUser.addRole(role2750);
        discordUser.removeRole(role2500)
        discordUser.removeRole(role2000)
        discordUser.removeRole(role2900)
        discordUser.removeRole(role3000)
      }
      if ((score >= 2900) && (score < 3000)) { 
        discordUser.addRole(role2900);
        discordUser.removeRole(role2500)
        discordUser.removeRole(role2750)
        discordUser.removeRole(role2000)
        discordUser.removeRole(role3000)
      }

      if (score >= 3000) { 
        discordUser.addRole(role3000);
        discordUser.removeRole(role2500)
        discordUser.removeRole(role2750)
        discordUser.removeRole(role2900)
        discordUser.removeRole(role2000)

      }
    })
    .catch(error => {
      console.log(error);
    });

    message.delete()
  }


});

client.login(process.env.TOKEN);
