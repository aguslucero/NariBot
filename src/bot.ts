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
    region= mensaje[4];
    server= mensaje[5];
    name = mensaje[6];
    axios.get('https://raider.io/api/v1/characters/profile?region='+region+'&realm='+server+'&name='+name+'&fields=mythic_plus_scores_by_season%3Acurrent')
    .then((response: any) => {
      console.log(response.data.mythic_plus_scores_by_season[0].scores.all);
      let score = response.data.mythic_plus_scores_by_season[0].scores.all
      message.channel.send("Personaje actualizado correctamente. Score actual "+ score);
    })
    .catch(error => {
      console.log(error);
    });
    
    
  }

});

client.login(process.env.TOKEN);
