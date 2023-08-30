
const config = require("../botconfig/config.json");
const { databasing, check_voice_channels, create_join_to_create_Channel } = require("../modules/functions");
const { MessageEmbed } = require("discord.js");
const Duration = require('humanize-duration');
module.exports = function (client) {
  console.log(` :: ⬜️ Module: jointocreate`);

  client.on("ready", () => {
    check_voice_channels(client);
    setInterval(() => check_voice_channels(client), config.check_all_channels_Interval_in_seconds * 1000)
  });
  client.on("voiceStateUpdate", async (oldState, newState) => {
////////////////// NEW STATE //////////////////////////////////////
const newstateKey = client.clan.findKey(value => value.clan_members.includes(newState.id) && value.guild_id.includes(newState.guild.id));
    
const newstateclan = client.clan.get(newstateKey)
///////////////// OLD STATE ///////////////////////////////////////
const oldstateKey = client.clan.findKey(value => value.clan_members.includes(oldState.id) && value.guild_id.includes(oldState.guild.id));
    
    const oldstateclan = client.clan.get(oldstateKey)
////////////////////////////////////////////////////////////////////    
/*    const voices = [];
            for (let i = 0; i < clans.length; i++) {
              
                   const e = clans[i];
                   voices.push(e.clan_voice)
                   console.log(voices)
            };*/

    
/*  let newUserChannel = newState.channel;
  let oldUserChannel = oldState.channel;

  if (newState.channelId && oldUserChannel === null && newUserChannel !== null ) {

          let perms = newUserChannel.permissionsFor(newState.member.id);

          for (let i = 0; i < perms.length; i++) {
            if (perms[i].allow.toArray().includes("CONNECT") && perms[i].id == oldState.member.user.id)
              newState.disconnect();
          };

    
    console.log("connected to voice channel")
    
    } else {
    console.log("No Clan")
    }
    
  if (newstateclan.clan_voice === newState.channelId && oldUserChannel === null && newUserChannel !== null ) {

    client.economy.set(`${newUserChannel.id}`, Date.now(), "timer")

    console.log("member join")
    
    } else {
    console.log("No Clan")
    }
    
    if (oldstateclan.clan_voice === oldState.channelId && oldUserChannel !== null && newUserChannel === null) {

    console.log("member left")
    
      var chrono = client.clan.get(oldstateKey, "clan_count");
    
      var timer = client.economy.get(`${oldUserChannel.id}`, "timer");


    var count = Date.now();
    
      count -= timer;
    
    var gettimer = (chrono + count);

    console.log(oldstateclan.clan_members.length)

    console.log(Duration(gettimer, {units: ['h', 'm', 's'], round: true }));
    
  await client.clan.set(oldstateKey, gettimer, "clan_count");

    client.economy.set(`${oldUserChannel.id}`, 0, "timer")

    } else {
    console.log("No Clan")
    }
    if (oldstateclan.clan_voice === oldState.channelId && oldUserChannel !== null && newUserChannel !== null) {

    console.log("member Switch left")

    
      var chrono = client.clan.get(oldstateKey, "clan_count");
    
      var timer = client.economy.get(`${oldUserChannel.id}`, "timer");


    var count = Date.now();
    
      count -= timer;
    
    var gettimer = (chrono + count);

    console.log(oldstateclan.clan_members.length)

    console.log(Duration(gettimer, {units: ['h', 'm', 's'], round: true }));
    
  await client.clan.set(oldstateKey, gettimer, "clan_count");

    client.economy.set(`${oldUserChannel.id}`, 0, "timer")
    
  } else if (newstateclan.clan_voice === newState.channelId && oldUserChannel !== null && newUserChannel !== null) {

    console.log("member Switch join")
    
    client.economy.set(`${newUserChannel.id}`, Date.now(), "timer")
    
  }*/

    if (!oldState.channelId && newState.channelId) {
      databasing(newState.guild.id, client); 




      client.list.ensure(`${newState.member.user.id}-${newState.guild.id}`, {
        black: [],
        white: [],
        managers: []
      });

      client.list.ensure(`${oldState.member.user.id}-${oldState.guild.id}`, {
        black: [],
        white: [],
        managers: []
      });

/*      const vcs = newState.channelId;

      const permissions = vcs.permissionsFor(newState.id);
    if (!permissions.has('CONNECT')) 
      newState.disconnect();*/

      
/*const vcs = newState.channelId;
let perms = vcs.permissionsFor(newState.member.id);
          for (let i = 0; i < perms.length; i++) {
            if (perms[i].allow.toArray().includes("CONNECT") && perms[i].id == newState.member.user.id) newState.disconnect()
          };*/

/*        var vcs = client.jointocreatemap.get(`tempvoicechannel_${newState.guild.id}_${newState.channelId}`)
      
      if (newState.member.permissionsIn(vcs).missing(['CONNECT'])) {
    newState.disconnect();
}*/
      let channels = [];
      channels.push(client.settings.get(newState.guild.id, `channel`));


      
      for (let i = 0; i < channels.length; i++) {
        if (channels[i].length > 2 && channels[i].includes(newState.channelId)) {
          create_join_to_create_Channel(client, newState, i + 1);
          break
        }
      };
      return
    };
    


    if (oldState.channelId && !newState.channelId) {
      databasing(oldState.guild.id, client); 
      
client.list.ensure(`${newState.member.user.id}-${newState.guild.id}`, {
        black: [],
        white: [],
        managers: []
      });

      client.list.ensure(`${oldState.member.user.id}-${oldState.guild.id}`, {
        black: [],
        white: [],
        managers: []
      });
      client.jointocreatemap.ensure(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`, false);
      if (client.jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`)) {
       
        var vc = oldState.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`));

//if (newState.permissionsIn(vcs).missing("CONNECT")) return newState.disconnect();
        
        if (vc.members.size < 1) {
          console.log(`Deleted the Channel: ${vc.name} in: ${vc.guild ? vc.guild.name : "undefined"}`.strikethrough.brightRed);
          client.jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`);
          client.jointocreatemap.delete(`owner_${vc.guild.id}_${vc.id}`);
          return vc.delete().catch(e => console.log("Couldn't delete room"))
        } 
      }
    };


    if (oldState.channelId && newState.channelId) {
      databasing(newState.guild.id, client);
      if (oldState.channelId !== newState.channelId) {
        let channels = [];
        channels.push(client.settings.get(newState.guild.id, `channel`));

        for (let i = 0; i < channels.length; i++) {
          if (channels[i].length > 2 && channels[i].includes(newState.channelId)) {
            create_join_to_create_Channel(client, newState, i + 1);
            break
          }
        };

client.list.ensure(`${newState.member.user.id}-${newState.guild.id}`, {
        black: [],
        white: [],
        managers: []
      });

      client.list.ensure(`${oldState.member.user.id}-${oldState.guild.id}`, {
        black: [],
        white: [],
        managers: []
      });
        client.jointocreatemap.ensure(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`, false);

        if (client.jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`)) {
          var vc = oldState.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`));
          if (vc.members.size < 1) {
            console.log(`Deleted the Channel: ${vc.name} in: ${vc.guild ? vc.guild.name : "undefined"}`.strikethrough.brightRed);
            client.jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelId}`);
            client.jointocreatemap.delete(`owner_${vc.guild.id}_${vc.id}`);
            return vc.delete().catch(e => console.log("Couldn't delete room"))
          } 
        }
      }
    }
  })
};

