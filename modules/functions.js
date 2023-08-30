
const config = require("../botconfig/config.json");
const Discord = require("discord.js");

function databasing(guildid, client) {
    client.settings.ensure(guildid, {
        prefix: config.prefix,
        channel: "",
        channelname: "{user}' Room",
        guild: guildid,
    });
};

function reset_DB(guildid, client) {
    client.settings.set(guildid, {
        prefix: config.prefix,
        channel: "",
        channelname: "{user}' Room",
        guild: guildid,
    });

};


function escapeRegex(str) {
    try {
        return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`)
    } catch (e) {

    }
};

function change_status(client) {
try {
client.user.setActivity(`.v help`, {
    type: "ONLINE",
    url:"https://discord.gg/culda",
    shardID: shard
});
} catch (e) {
    client.user.setActivity(`.v help`, {
        type: "ONLINE",
        shardID: 0,
        url:"https://discord.gg/culda"
    });
}
}
function check_voice_channels(client) {
    let guilds = client.guilds.cache.map(guild => guild.id);
    for (let i = 0; i < guilds.length; i++) {
        try {
            let guild = client.guilds.cache.get(guilds[i]);
            databasing(guild.id, client);
            let jointocreate = [];
            jointocreate.push(client.settings.get(guild.id, "channel"));

            for (let j = 0; j < jointocreate.length; j++) {
                let channel = guild.channels.cache.get(jointocreate[j]);
                if (!channel) continue;
                let members = channel.members.map(guild => guild.id);
                if (!members) continue;
                for (let k = 0; k < members.length; k++) {
                    let member = guild.members.cache.get(members[k]);
                    create_join_to_create_Channel(client, member.voice, j + 1)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    return
};


function create_join_to_create_Channel(client, user, type) {
    if (type == 1) chname = client.settings.get(user.member.guild.id, "channelname");
    else chname = "{user}'s Room";
    let allowed = true;
    if (!user.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) {
        allowed = false;
        try {
            user.member.user.send(`${user.member.user} | :x: Error | Please give me the permission, \`MANGE CHANNELS\` --> I need to be able to create Channels ...`)
        } catch {
            try {
                let channel = guild.channels.cache.find(
                    channel =>
                        channel.type === "text" &&
                        channel.permissionsFor(guild.me).has("SEND_MESSAGES")
                );
                channel.send(`${user.member.user} | :x: Error | Please give me the permission, \`MANGE CHANNELS\` --> I need to be able to create Channels ...`)
            } catch { }
        }
    };
    if (allowed) {
      
client.list.ensure(`${user.member.user.id}-${user.guild.id}`, {
        black: [],
        white: []
      });
      

      
const blacklist = client.list.get(`${user.member.user.id}-${user.guild.id}`, "black");

      var Data = blacklist.map(black => client.users.cache.get(black));

const whitelist = client.list.get(`${user.member.user.id}-${user.guild.id}`, "white");

      var Dataa = whitelist.map(white => client.users.cache.get(white));
//const whitelist = client.list.get(`${user.member.user.id}-${user.guild.id}`, "white");
      
        console.log(`Created the Channel: ${String(chname.replace("{user}", user.member.user.username)).substr(0, 32)} in: ${user.guild ? user.guild.name : "undefined"}`.brightGreen);

        user.guild.channels.create(String(chname.replace("{user}", user.member.displayName)).substr(0, 32), {
            type: 'GUILD_VOICE'
        }).then(vc => {
   

            if (user.channel.parent) 
  vc.setParent(user.channel.parent)
            client.jointocreatemap.set(`owner_${vc.guild.id}_${vc.id}`, user.id);
      client.jointocreatemap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);
//
    //blacklisted

  Data.forEach(member => {
    client.users.fetch(member).then(user => {
      setTimeout(() => vc.permissionOverwrites.create(user.id, {
           CONNECT: false
             }), 2000);
        });
   });

  Dataa.forEach(member => {
    client.users.fetch(member).then(user=> {
      setTimeout(() => vc.permissionOverwrites.create(user.id, {
           CONNECT: true
             }), 2000);
      }); 
    });
          
  setTimeout(() => user.setChannel(vc), 500);
   /*else */  
//whitelisted
      })
    }
};


module.exports.databasing = databasing;
module.exports.reset_DB = reset_DB;
module.exports.escapeRegex = escapeRegex;
module.exports.change_status = change_status;
module.exports.check_voice_channels = check_voice_channels;
module.exports.create_join_to_create_Channel = create_join_to_create_Channel;