import { config } from "dotenv";
config();

import { Client, Message } from "discord.js";
import { prefix } from "./config.json";
import axios from 'axios';
import { ProcessEnvOptions } from "child_process";
import { Z_ASCII } from "zlib";

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
  let bolsaChannel = message.guild.channels.find(x => x.id === '722684170811473972');
    let discordUser = message.member
    var regex = /(\d+)/g;
    let aPagar = 0;
    let bolsaActual = parseInt(bolsaChannel.name);

  if (message.content.startsWith('!+')) {
    
    let venta =  message.content.match(regex)?.toString();
    let venta2 = 0
    let newSaldo = 0
    if(venta){
     let venta2 = parseInt(venta);
    
  
    if(discordUser.roles.find( role => role.name === "𝓟𝓻𝓮𝓼𝓲𝓭𝓮𝓷𝓽𝓮")) {
      aPagar = venta2 * 0.1;
      message.channel.send(discordUser + ' Presidente debe pagar '+ aPagar + ' a la mafia')
      newSaldo = venta2 + aPagar
    } 
    if(discordUser.roles.find( role => role.name === "𝓥𝓲𝓬𝓮𝓹𝓻𝓮𝓼𝓲𝓭𝓮𝓷𝓽𝓮")) {
      aPagar = venta2 * 0.2;
      message.channel.send(discordUser + ' Vicepresidente debe pagar '+ aPagar + ' a la mafia')
      newSaldo = venta2 + aPagar
    } 
    if(discordUser.roles.find( role => role.name === "𝓖𝓮𝓻𝓮𝓷𝓽𝓮")) {
      aPagar = venta2 * 0.3;
      message.channel.send(discordUser + ' Gerente, debe pagar '+ aPagar + ' a la mafia')
      newSaldo = venta2 + aPagar
    } 
    if(discordUser.roles.find( role => role.name === "𝓢𝓲𝓬𝓪𝓻𝓲𝓸")) {
      aPagar = venta2 * 0.4;
      message.channel.send(discordUser + ' Sicario, debe pagar '+ aPagar + ' a la mafia')
      newSaldo = venta2 + aPagar
    } 
    if(discordUser.roles.find( role => role.name === "𝓡𝓮𝓬𝓵𝓾𝓽𝓪")) {
      aPagar = venta2 * 0.5;
      message.channel.send(discordUser + ' Recluta, debe pagar '+ aPagar + ' a la mafia')
      newSaldo = venta2 + aPagar
    } 
    bolsaChannel.edit({name: newSaldo.toString()})
    

  }}

  if (message.content.startsWith('!bolsa=')) { 
    let newSaldo =  message.content.match(regex)?.toString();
    if( newSaldo) {
      bolsaChannel.edit({name: newSaldo.toString()})
      message.channel.send('bolsa actualizada nuevo valor'+ newSaldo.toString())
    }
    
  }

  if (message.content.startsWith('!bolsa-')) { 
    let newSaldo = 0
    let restar =  message.content.match(regex)?.toString();
    if( restar) {
     newSaldo = bolsaActual - parseInt(restar);
     bolsaChannel.edit({name: newSaldo.toString()})
     message.channel.send('bolsa actualizada nuevo valor'+ newSaldo.toString())
     console.log(newSaldo)
    }
  }
 


});

client.login(process.env.TOKEN);


  // if (message.content.startsWith(`${prefix}`)) {
  //   let mensaje = message.content.split('/')
  //   let discordUser = message.member
  //   region= mensaje[4];
  //   server= mensaje[5];
  //   name = mensaje[6];
  //   let role2000 = message.guild.roles.find(r => r.name === "2000+");
  //   let role2500 = message.guild.roles.find(r => r.name === "2500+");
  //   let role2750 = message.guild.roles.find(r => r.name === "2750+");
  //   let role2900 = message.guild.roles.find(r => r.name === "2900+");
  //   let role3000 = message.guild.roles.find(r => r.name === "3000+");
  //   let role3200 = message.guild.roles.find(r => r.name === "3200+");
  //   let role3400 = message.guild.roles.find(r => r.name === "3400+");
  //   axios.get('https://raider.io/api/v1/characters/profile?region='+region+'&realm='+server+'&name='+name+'&fields=mythic_plus_scores_by_season%3Acurrent')
  //   .then((response: any) => {
  //     console.log(response.data.mythic_plus_scores_by_season[0].scores.all);
  //     let score = response.data.mythic_plus_scores_by_season[0].scores.all
  //     if ((score > 2000) && (score < 2500)) { 
  //       discordUser.addRole(role2000);
  //       discordUser.removeRole(role2500)
  //       discordUser.removeRole(role2750)
  //       discordUser.removeRole(role2900)
  //       discordUser.removeRole(role3000)
  //       discordUser.removeRole(role3200)
  //       discordUser.removeRole(role3400)
  //       message.channel.send( discordUser +" Rango actualizado correctamente. Score actual "+ score + ", rango asignado -> 2000+");

  //     }
  //     if ((score >= 2500) && (score < 2750)) { 
  //       discordUser.addRole(role2500);
  //       discordUser.removeRole(role2000)
  //       discordUser.removeRole(role2750)
  //       discordUser.removeRole(role2900)
  //       discordUser.removeRole(role3000)
  //       discordUser.removeRole(role3200)
  //       discordUser.removeRole(role3400)
  //       message.channel.send( discordUser +" Rango actualizado correctamente. Score actual "+ score + ", rango asignado -> 2500+");
  //     }
  //     if ((score >= 2750) && (score < 2900)) { 
  //       discordUser.addRole(role2750);
  //       discordUser.removeRole(role2000)
  //       discordUser.removeRole(role2500)
  //       discordUser.removeRole(role2900)
  //       discordUser.removeRole(role3000)
  //       discordUser.removeRole(role3200)
  //       discordUser.removeRole(role3400)
  //       message.channel.send( discordUser +" Rango actualizado correctamente. Score actual "+ score + ", rango asignado -> 2750+");
  //     }
  //     if ((score >= 2900) && (score < 3000)) { 
  //       discordUser.addRole(role2900);
  //       discordUser.removeRole(role2000)
  //       discordUser.removeRole(role2500)
  //       discordUser.removeRole(role2750)
  //       discordUser.removeRole(role3000)
  //       discordUser.removeRole(role3200)
  //       discordUser.removeRole(role3400)
  //       message.channel.send( discordUser +" Rango actualizado correctamente. Score actual "+ score + ", rango asignado -> 2900+");
  //     }

  //     if ((score >= 3000) && (score < 3200)) { 
  //       discordUser.addRole(role3000);
  //       discordUser.removeRole(role2000)
  //       discordUser.removeRole(role2500)
  //       discordUser.removeRole(role2750)
  //       discordUser.removeRole(role2900)
  //       discordUser.removeRole(role3200)
  //       discordUser.removeRole(role3400)
        
  //       message.channel.send( discordUser +" Rango actualizado correctamente. Score actual "+ score + ", rango asignado -> 3000+");

  //     }
  //     if ((score > 3200) && (score < 3400)) { 
  //       discordUser.addRole(role3200);
  //       discordUser.removeRole(role2000)
  //       discordUser.removeRole(role2500)
  //       discordUser.removeRole(role2750)
  //       discordUser.removeRole(role2900)
  //       discordUser.removeRole(role3000)
  //       discordUser.removeRole(role3400)
  
  //       message.channel.send( discordUser +" Rango actualizado correctamente. Score actual "+ score + ", rango asignado -> 3200+");

  //     }
  //     if (score >= 3400)  { 
  //       discordUser.addRole(role3400);
  //       discordUser.removeRole(role2000)
  //       discordUser.removeRole(role2500)
  //       discordUser.removeRole(role2750)
  //       discordUser.removeRole(role2900)
  //       discordUser.removeRole(role3000)
  //       discordUser.removeRole(role3200)
  //       message.channel.send( discordUser +" Rango actualizado correctamente. Score actual "+ score + ", rango asignado -> 3400+");

  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  //   message.delete()
  // }