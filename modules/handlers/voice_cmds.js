

const ee = require("../../botconfig/embed.json");

const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js')
const Duration = require('humanize-duration');
const ms = require('ms');
const paginator = require('../events/modal')
const cooldown = new Map();

module.exports = async (client, master, args, cmd, prefix) => {
  
  if (cmd === "lock") {
    let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")

      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`,false);
    
client.jointocreatemap.ensure(`${master.guild.id}_${channel.id}`, {
        managers: [],
});


    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        
      };
const mm = client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`);
      
const show = client.list.get(`${mm}-${master.guild.id}`, "managers");

if(!show) console.log("No data")
      if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === master.author.id || show.includes(master.author.id)) owner = true;
      if (!owner)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | You have to be the Owner of the Channel.")
          ]
        })
      vc.permissionOverwrites.edit(master.guild.id, {

            CONNECT: false
          })
       .then(lol => {
     vc.permissionOverwrites.edit(master.author.id, {

            VIEW_CHANNEL: true,

            CONNECT: true
          })
          return master.reply({
            embeds: [new Discord.MessageEmbed()
              .setColor(ee.color)
              .setDescription(`🔒 | ${master.author} channel successfully locked.`)
            ]
          })
        })

    } else {
      return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(":x: | Couldn't fetch the channel please make a new one! (make sure that your current voice channel is a One-Tap )")

        ]
      })
    }
  }else if (cmd === "unlock") {
    let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")

      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        
      };
      const mm = client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`);
const show = client.list.get(`${mm}-${master.guild.id}`, "managers");
      if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === master.author.id || show.includes(master.author.id)) owner = true;
      if (!owner)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | You have to be the Owner of the Channel")

          ]
        });
      vc.permissionOverwrites.edit(master.guild.id, {
        CONNECT: true
      }).then(lol => {
        vc.permissionOverwrites.edit(master.author.id, {
          VIEW_CHANNEL: true,
          CONNECT: true
        });
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`🔓 | ${master.author} channel successfully unlocked.`)
          ]
        })
      })
    } else {
      return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(":x: | Couldn't fetch the channel please make a new one! (make sure that your current voice channel is a One-Tap )")

        ]
      })
    }
  } else if (cmd === "kick") {
    let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")

      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`))
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        
      };
      const mm = client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`);
const show = client.list.get(`${mm}-${master.guild.id}`, "managers");
      if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === master.author.id || show.includes(master.author.id)) owner = true;
      if (!owner)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | You have to be the Owner of the Channel.")
 
          ]
        });
      if (!args[0]) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(":x: | Invalid Arguments")
        .setDescription(`\n\n> **Usage: \`${prefix}kick @User\`** \n\n> **Example: \`${prefix}kick @Master\`** `)
        ]
      });
      let member = master.mentions.members.first() || master.guild.members.cache.get(args[0]);
      if (!member || member == null || member == undefined) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(":x: | Invalid Arguments")
        .setDescription(`\n\n> **Usage: \`${prefix}kick @User\`** \n\n> **Example: \`${prefix}kick @Master\`**`)
        ]
      });
        if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === member.id) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`:x: | Sorry, I Can't Kick Owners`)
        ]
      });
      if (!member.voice.channel)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | Your pinged user, is not connected to a Channel")

          ]
        });
      if (member.voice.channel.id != channel.id)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | Your pinged user, is not connected To your Channel")

          ]
        });
      try {
        member.voice.disconnect();
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`:white_check_mark: | ${master.author} Kicked ${member} out of the Channel.`)
          ]
        })
      } catch (e) {
        console.log(String(e.stack).bgRed);
        
      }
    } else {
      return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(":x: | Couldn't fetch the channel please make a new one! (make sure that your current voice channel is a One-Tap )")

        ]
      })
    }
  } else if (["vcinvite", "vcadd", "voiceinvite", "invite"].includes(cmd)) {
    let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")

      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        
      };
      const mm = client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`);
const show = client.list.get(`${mm}-${master.guild.id}`, "managers");
      if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === master.author.id || show.includes(master.author.id)) owner = true;
      if (!owner)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | You have to be the Owner of the Channel.")
            
          ]
        });
      if (!args[0]) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(":x: | Invalid Arguments")
        .setDescription(`\n\n> **Usage: \`${prefix}vcinvite @User [optional master]\`** \n\n> **Example: \`${prefix}vcinvite @Master [optional master]\`**`)
        ]
      });
      let member = master.mentions.users.first() || master.guild.members.cache.get(args[0]);
      if (!member || member == null || member == undefined) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}vcinvite @User [optional master]\`** \n\n> **Example: \`${prefix}vcinvite @Master [optional master]\`**`)
        ]
      });
      let txt = args.slice(1).join(" ");
      try {
        channel.createInvite().then(invite => {
          vc.permissionOverwrites.edit(member, {
            VIEW_CHANNEL: true,
            CONNECT: true
          }).then(lol => {
            vc.permissionOverwrites.edit(master.author.id, {
              VIEW_CHANNEL: true,
              CONNECT: true
            });
            member.send({
              embeds: [new Discord.MessageEmbed()
                .setColor(ee.color)
                .setTitle(`<:channels_master:1058306502026334248>・You got invited to join ${channel.name}`)
              .setDescription(`> **💌 | Click Below to join** ⤵️ \n\n${txt ? txt : ""}`.substr(0, 2000))
                
              ]
            });
            member.send(`${invite.url}`).catch(e => {
              console.log(String(e.stack).bgRed);
              return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`:x: Error | Couldn't Dm \`${member.user.tag}\``)
 
                  
                ]
              })
            })
          });
          return master.reply({
            embeds: [new Discord.MessageEmbed()
              .setColor(ee.color)
              .setDescription(`💌 | ${master.author} Invited ${member} to join the Channel`)
            ]
          })
        })

      } catch (e) {
        console.log(String(e.stack).bgRed);
      }
    } else {
      return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(":x: | Couldn't fetch the channel please make a new one! (make sure that your current voice channel is a One-Tap )")

        ]
      })
    }
  } else if (cmd === "reject") {
    let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")

      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`, false);


    
    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        
      };
      const mm = client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`);
const show = client.list.get(`${mm}-${master.guild.id}`, "managers");
      if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === master.author.id || show.includes(master.author.id)) owner = true;
      if (!owner)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | You have to be the Owner of the Channel")

          ]
        });
      if (!args[0]) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}reject @User\`** \n\n> **Example: \`${prefix}reject @Master\`**`)

        ]
      });
      let member = master.mentions.members.first() || master.guild.members.cache.get(args[0]) || master.guild.roles.cache.get(args[0]);
      if (!member || member == null || member == undefined) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}reject @User\`** \n\n> **Example: \`${prefix}reject @Master\`**`)
        ]
      });
  if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === member.id) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`:x: | Sorry, I Can't reject Owners`)
        ]
      });
      if (member.voice.channel && member.voice.channel.id == channel.id)
        try {
          member.voice.setChannel(client.settings.get(master.guild.id, `channel`));

        } catch (e) {
          console.log(String(e.stack).bgRed);

        };
      vc.permissionOverwrites.edit(member, {

        CONNECT: false
      }).then(lol => {
      vc.permissionOverwrites.edit(master.author.id, {

          CONNECT: true
      });
        master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`:white_check_mark: | ${master.author} rejected ${member} out from the Channel.`)
          ]
        })
        
      })


    } else {
      return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(":x: | Couldn't fetch the channel please make a new one! (make sure that your current voice channel is a One-Tap )")

        ]
      })
    }
  } else if (cmd === "permit") {
    let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")
        
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false)
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        
      };
      const mm = client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`);
const show = client.list.get(`${mm}-${master.guild.id}`, "managers");
      if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === master.author.id || show.includes(master.author.id)) owner = true;
      if (!owner)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | You have to be the Owner of the Channel.")

          ]
        });
      if (!args[0]) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(":x: | Invalid Arguments")
        .setDescription(`\n\n> **Usage: \`${prefix}permit @User\`** \n\n> **Example: \`${prefix}permit @Master\`**`)
        ]
      });
      let member = master.mentions.members.first() || master.guild.members.cache.get(args[0]);
      if (!member || member == null || member == undefined) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}permit @User\`** \n\n> **Example: \`${prefix}permit @Master\`**`)
        ]
      });
      vc.permissionOverwrites.edit(member.user.id, {
         VIEW_CHANNEL: true,
         CONNECT: true
      }).then(lol => {
        vc.permissionOverwrites.edit(master.author.id, {
          VIEW_CHANNEL: true,
          CONNECT: true
        });
        master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`:white_check_mark: | ${master.author} permitted ${member}, to have access to the channel. `)
          ]
        })
      })
    } else {
      return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(":x: | Couldn't fetch the channel please make a new one! (make sure that your current voice channel is a One-Tap )")

        ]
      })
    }
  } else if (cmd === "limit") {
    let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")
      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
        
      };
      const mm = client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`);
const show = client.list.get(`${mm}-${master.guild.id}`, "managers");
      if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === master.author.id || show.includes(master.author.id)) owner = true;
      if (!owner)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | You have to be the Owner of the Channel")

          ]
        });
      if (!args[0]) return master.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(":x: | Invalid Arguments")
        .setDescription(`\n\n> **Usage: \`${prefix}limit <number>\`** \n\n> **Example: \`${prefix}limit 4\`**`)
        ]
      });
      if (isNaN(args[0])) return master.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor('RANDOM')
             .setTitle(":x: | Invalid Arguments")
        .setDescription(`\n\n> **Usage: \`${prefix}limit <number>\`** \n\n> **Example: \`${prefix}limit 4\`**`)
        ]
      });
      let userlimit = Number(args[0]);
      if (userlimit > 99 || userlimit < 0) return master.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | Your included Number is not in the valid Range (`0` - `99`)")
        ]
      });
      channel.setUserLimit(userlimit).then(vc => {
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`📌 |  Channel user limit updated to **__${voice.userLimit}__** users successfully.`)
          ]
        })
      })
    } else {
      return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(":x: | Couldn't fetch the channel please make a new one! (make sure that your current voice channel is a One-Tap )")

        ]
      })
    }
  } else if (["transfer", "promote"].includes(cmd)) {
    let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")

      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
       
      };
      if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === master.author.id) owner = true;
      if (!owner)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | You have to be the Owner of the Channel")

          ]
        });

      let member = master.mentions.members.first() || master.guild.members.cache.get(args[0]);
      if (!member || member == null || member == undefined) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}transfer @User\`** \n\n> **Example: \`${prefix}transfer @Master\`**`)

        ]
      });
      if (!member.voice.channel)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | Your pinged user, is not connected to a Channel")

          ]
        });
      if (member.voice.channel.id != channel.id)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | Your pinged user, is not connected in your Channel")

          ]
        });


      let filter = (m) => m.author.id === master.author.id;
    return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setTitle("Transferring **OwnerShip** ")
                  .setDescription(`❓ | ${master.author} Please Reply with \`YES\` / \`NO\` within **30 seconds**`)

                ]
              }).then(() => {
      master.channel.awaitmasters({ filter: filter, max: 1, time: 30000 })
        .then(master => {
          master = master.first()
          if (master.content.toUpperCase() == 'YES' || master.content.toUpperCase() == 'Y') {
         try {
        vc.permissionOverwrites.edit(member.user.id, {
          VIEW_CHANNEL: true,
          CONNECT: true
        }).then(l => {
          vc.permissionOverwrites.edit(master.author.id, {
            VIEW_CHANNEL: true,
            CONNECT: true
          })
            .then(lol => {
              client.jointocreatemap.set(`owner_${vc.guild.id}_${vc.id}`, member.user.id);
              return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setDescription(`:white_check_mark: | ${master.author} PromoTed ${member} to be the new Owner of The Channel.`)

                ]
              })
            })
        })
      } catch (e) {
        console.log(String(e.stack).bgRed);

      }
          } else if (master.content.toUpperCase() == 'NO' || master.content.toUpperCase() == 'N') {
            return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`:x: | You've Cancelled The Action`)

                ]})
          } else {
            return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`:x: | ${master.author} Please reply Just With \`YES\`/\`No\``)

                ]})
          }
        })
        .catch(collected => {
            master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`⏰ | ${master.author} You Took Too Long To Answer.(time runs out)`)]})
        });
    })
  } else {
      return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(":x: | Couldn't fetch the channel please make a new one! (make sure that your current voice channel is a One-Tap )")

        ]
      })
    }
  } else if (["name", "rename", "newname"].includes(cmd)) {
    let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")

      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
       
      };
      const mm = client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`);
const show = client.list.get(`${mm}-${master.guild.id}`, "managers");
      if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === master.author.id || show.includes(master.author.id)) owner = true;
      if (!owner)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | You have to be the Owner of the Channel")
          ]
        });
      
  const name = args.join(" ")
        

        if (!name) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(":x: | Invalid Arguments")
        .setDescription(`\n\n> **Usage: \`${prefix}name <new name>\`** \n\n> **Example: \`${prefix}name MIDNIGHT\`**`)

      ]
    })

       const cooldownTime = ms('5m')
       const cooldownUser = cooldown.get(channel.id)
       if(cooldownUser){
        let remaining = Duration(cooldownUser - Date.now(), {units: ['h', 'm', 's'], round: true })

        return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`⏰ | Your are On Cooldown You have To wait (\`${remaining}\`)`)

      ]
    });       
      
       }else{
          channel.setName(name).then(vc => {
                master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.color)
        .setDescription(`🎁 | Channel name changed to \`${name}\` Successfully`)

      ]
    });

          cooldown.set(channel.id, Date.now() + cooldownTime) 
          setTimeout(() => { cooldown.delete(channel.id)}, cooldownTime);   
           })
         }
       

       
     }
    
  } else if (['hide','ghost'].includes(cmd)) {
     let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")

      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
       
      };
      const mm = client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`);
const show = client.list.get(`${mm}-${master.guild.id}`, "managers");
      if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === master.author.id || show.includes(master.author.id)) owner = true;
      if (!owner)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | You have to be the Owner of the Channel")

          ]
        })
  const data1 = client.settings.get(master.guild.id, "role");
      if(master.member.roles.cache.find(r => r.id === data1)){ 

    vc.permissionOverwrites.edit(master.guild.id, {
        VIEW_CHANNEL: false
      }).then(lol => {
        vc.permissionOverwrites.edit(master.author.id, {
          VIEW_CHANNEL: true,
          CONNECT: true
        });
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`👻 | ${master.author} You made your channel invisible`)
          ]
        })
      })
        

      } else {

        master.reply({embeds:[new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`:x: | this feature is only reserved for <@&${client.settings.get(master.guild.id, "role")}> users `)]})
        
      }


      } else {
      return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(":x: | Couldn't fetch the channel please make a new one! (make sure that your current voice channel is a One-Tap )")

        ]
      })
    }
  } else if (['unhide','show'].includes(cmd)) {
     let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")

      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
       
      };
      const mm = client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`);
const show = client.list.get(`${mm}-${master.guild.id}`, "managers");
      if (client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`) === master.author.id || show.includes(master.author.id)) owner = true;
      if (!owner)
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(":x: | You have to be the Owner of the Channel")

          ]
        })
      const data2 = client.settings.get(master.guild.id, "role");
      if(master.member.roles.cache.find(r => r.id === data2)){ 

    vc.permissionOverwrites.edit(master.guild.id, {
        VIEW_CHANNEL: true
      }).then(lol => {
        vc.permissionOverwrites.edit(master.author.id, {
          VIEW_CHANNEL: true,
          CONNECT: true
        });
        return master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`👁️ | ${master.author} You made your channel visible`)
          ]
        })
      })
        

      } else {

        master.reply({embeds:[new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`:x: | this feature is only reserved for <@&${client.settings.get(master.guild.id, "role")}> users `)]})
        
      }


      } else {
      return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(":x: | Couldn't fetch the channel please make a new one! (make sure that your current voice channel is a One-Tap )")

        ]
      })
    }
  } else if (cmd === 'claim') {
        let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
       
      };
      const ownerr = client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`);
        
      if(master.guild.members.cache.get(client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`)).voice.channel == master.member.voice.channel) {
        master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          .setDescription(`:x: | The channel is already owned By <@${ownerr}>`)

        ]
      })
        
      } else {
        
        client.jointocreatemap.set(`owner_${vc.guild.id}_${vc.id}`, master.author.id);

        return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          .setDescription(`🌟 | Congrats! channel claimed successfully, the channel ownership is now yours!`)

        ]
      })
        
      }

    } else {
      return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          .setDescription(":x: | Couldn't fetch the channel please make a new one! (make sure that your current voice channel is a One-Tap )")

        ]
      })
    }
    
  } else if (cmd === 'owner') {
        let {
      channel
    } = master.member.voice;
    if (!channel) return master.reply({
      embeds: [new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(":x: | You're not connected to a voice channel, please try again.")

      ]
    });
    client.jointocreatemap.ensure(`tempvoicechannel_${master.guild.id}_${channel.id}`, false);
    client.jointocreatemap.ensure(`owner_${master.guild.id}_${channel.id}`, false);
    if (client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`)) {
      var vc = master.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${master.guild.id}_${channel.id}`));
      let perms = vc.permissionsFor(master.author.id);
      let owner = false;
      for (let i = 0; i < perms.length; i++) {
       
      };
      const ownerv = client.jointocreatemap.get(`owner_${master.guild.id}_${channel.id}`);
        
            return  master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          .setDescription(`👑 | <@${ownerv}> is the Current Owner of the Channel.`)

        ]
      })

    } else {
      return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.color)
          .setDescription(":x: | Couldn't fetch the channel please make a new one! (make sure that your current voice channel is a One-Tap )")

        ]
      })
    }
    
    } else if (['blacklist','bl'].includes(cmd)) {
    if(!args[0]) {
            master.reply({
        embeds: [new Discord.MessageEmbed()
                 .setColor(ee.color)
                 .setDescription(`:x: | Unknown or invalid option, Please use **__${prefix}blacklist help__** for more help.`)]
      })
    }
    if(args[0].toLowerCase() === "help") {
    const help =  new Discord.MessageEmbed()
                 .setColor(ee.color)
                 .setThumbnail(master.guild.iconURL({ dynamic: true }))
                 .setThumbnail(master.guild.iconURL({ dynamic: true }))
                 .setFooter({ text:`❓ 〉.v bl <add/remove> <user/id>`, iconURL: master.guild.iconURL({ dynamic: true })})
                 .setDescription(`
**__<:sao_asunasmug:1072358449335246900> About__ : \`${prefix}blacklist\`**
command allows to automatically reject blacklisted users for joining your future channels.

**__<:sao_asunasmug:1072358449335246900> How to Use__ :**

\`➕\` **〉Add a user to your blacklist**
\`${prefix} blacklist add <user/id>\`

\`➖\` **〉Remove a user from your blacklist**
\`${prefix} blacklist remove <user/id>\`

\`🚽\` **〉Remove all users from your Blacklist**
\`${prefix}blacklist clear\`

\`📈\` **〉Allows you to list all users on your Blacklist.**
\`${prefix}blacklist show\``)
    const row = new MessageActionRow()
      .addComponents(				
        new MessageButton()
          .setCustomId('show')
          .setStyle('SUCCESS')
          .setEmoji(`🔔`)
          .setLabel('· Remove'),
        new MessageButton()
          .setCustomId('clear')
          .setStyle('DANGER')
          .setEmoji(`➕`)
          .setLabel('·BlackList'))
        const row1 = new MessageActionRow()
       .addComponents(				
/*        new MessageButton()
          .setCustomId('show')
          .setStyle('SUCCESS')
          .setDisabled(true)
          .setLabel('· Show'),*/
        new MessageButton()
          .setCustomId('clear')
          .setStyle('DANGER')
          .setEmoji(`➕`)
          .setLabel('· BlackList')
          .setDisabled(true)
       )
      
  master.reply({ embeds: [help], components: [row]}).then(msg => {
                    setTimeout(function() {
                        msg.edit({ embeds: [help], components: [row1] })
                    }, 10000);
                })
    }
    if(args[0].toLowerCase() === "add") {

      client.list.ensure(`${master.author.id}-${master.guild.id}`, {
        black: [],
        white: [],
      }); 
      
      if (!args[0]) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}blacklist add <user/id>\`** \n\n> **Example: \`${prefix}blacklist add @Master\`**`)

        ]
      });
      const show = client.list.get(`${master.author.id}-${master.guild.id}`, "black");
      const Data = show.map(black => client.users.cache.get(black));

      const shows = client.list.get(`${master.author.id}-${master.guild.id}`, "white");
      
      let member = master.mentions.members.first() || master.guild.members.cache.get(args[1]);
      if (!member || member == null || member == undefined) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: | Invalid arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}blacklist add <user/id>\`** \n\n> **Example: \`${prefix}blacklist add @Master\`**`)
        ]
      });
      if (member.user.bot) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`:x: | You Can't add Bots`)
        ]
      });
      if(member.id === master.author.id) return;
      if(show.includes(member.id)) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`This user is already in Your blacklist`)
        ]
      });
      if(Data.length >= 21) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`You've Reached Your blacklist users Limit`)]})
      if(shows.includes(member.id)) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`This user is already in Your whitelist`)
        ]
      })
      
      client.list.ensure(`${master.author.id}-${master.guild.id}-${member.id}`, {
        time: Date.now()
      });

   client.list.push(`${master.author.id}-${master.guild.id}`, member.id, "black");


 master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`💀 〉${master.author} Sucessfully blacklisted ${member} From your channel`)
          ]
        })
    } 
    if((['show','list'].includes(args[0].toLowerCase()))) {
        
          client.list.ensure(`${master.author.id}-${master.guild.id}`, {
        black: [],
        white: []
      });
    
    const show = client.list.get(`${master.author.id}-${master.guild.id}`, 'black');
    const Data = show.map(black => client.users.cache.get(black));

          let pagesNum = Math.ceil(Data.length / 10);
            if(pagesNum === 0) pagesNum = 1;
    
            const userStrings = [];
            for (let i = 0; i < Data.length; i++) {
                const e = Data[i];
                userStrings.push(
				`**${i + 1}. ${e} | **(\`${Duration(Date.now() - client.list.get(`${master.author.id}-${master.guild.id}-${e.id}`,"time"),  {largest: 1})} ago\`)
				`);
            }
    
            const pages = [];
            for (let i = 0; i < pagesNum; i++) {
                const str = userStrings.slice(i * 10, i * 10 + 10).join('');
    
                const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `Blacklisted Users List For ${master.author.tag}`, iconURL: master.author.avatarURL({ dynamic: true }) })
                .setThumbnail(master.guild.iconURL({ dynamic: true }))
				.setColor(ee.color)
				.setDescription(`${str == '' ? '**__No Blacklisted Users__**' : '\n' + str}`)
				.setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${Data.length} • Total Blacklisted Users`, iconURL: master.guild.iconURL({ dynamic: true })});
    
                pages.push(embed);
            }
    
            if (!args[1]) {
                if (pages.length == pagesNum && Data.length > 10) paginator(client, master, pages, 30000, Data.length);
                else return master.reply({ embeds: [pages[0]] });
            } else {
                if (isNaN(args[1])) return master.reply('Page must be a number.');
                if (args[1] > pagesNum) return master.reply(`There are only ${pagesNum} pages available.`);
                const pageNum = args[1] == 0 ? 1 : args[1] - 1;
                return master.reply({ embeds: [pages[pageNum]] });
            }
 }
    if(args[0].toLowerCase() === "remove") {
          
      client.list.ensure(`${master.author.id}-${master.guild.id}`, {
        black: [],
        white: []
      });

      if (!args[0]) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> ***Usage: \`${prefix}blacklist remove <user/id>\`*** \n\n> ***Example: \`${prefix}blacklist remove @Master\`***`)

        ]
      });
       const show = client.list.get(`${master.author.id}-${master.guild.id}`, "black");
      let member = master.mentions.members.first() || master.guild.members.cache.get(args[1]) || master.guild.roles.cache.get(args[1]) || master.mentions.roles.first();

     if(!show.includes(member.id)) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`This user is not in Your Blacklist`)
        ]
      });
      if (!member || member == null || member == undefined) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}blacklist <user/id> \`** \n\n> **Example: \`${prefix}blacklist @Master\`**`)
        ]
      });

   client.list.remove(`${master.author.id}-${master.guild.id}`, member.id, "black");
   client.list.delete(`${master.author.id}-${master.guild.id}-${member.id}`, "time");


 master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`:white_check_mark: | Successfully removed ${member} from your blacklist`)
          ]
        })
    };
    if(args[0].toLowerCase() === "clear") {
      
      client.list.ensure(`${master.author.id}-${master.guild.id}`, {
        black: [],
        white: []
      });
      
      const show = client.list.get(`${master.author.id}-${master.guild.id}`, 'black');

      const Data = show.map(black => client.users.cache.get(black));
      
      
      if(!show) return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setDescription(`❓ | You dont have any Users in Your Blacklist`)]
              })
      
            let filter = (m) => m.author.id === master.author.id;
    return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setDescription(`❓ | Are you sure you want to remove ${Data.length} user from your blacklist, this action is irreversible! (reply with yes or no within 30 seconds)`)

                ]
              }).then(() => {
      master.channel.awaitmasters({ filter: filter, max: 1, time: 30000 })
        .then(master => {
          master = master.first()
          if (master.content.toUpperCase() == 'YES' || master.content.toUpperCase() == 'Y') {
         try {
           
for (let i = 0; i < Data.length; i++) {
            const e = Data[i];

  client.list.delete(`${master.author.id}-${master.guild.id}`, 'black');
client.list.delete(`${master.author.id}-${master.guild.id}-${e.id}`, "time");
            }
           


              return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setDescription(`🗑 | A total of __**${Data.length}**__ users were successfully removed from your blacklist`)]
              })
        
      } catch (e) {
        console.log(String(e.stack).bgRed);

      }
          } else if (master.content.toUpperCase() == 'NO' || master.content.toUpperCase() == 'N') {
            return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`:x: | You've Cancelled The Action`)

                ]})
          } else {
            return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`:x: 〉${master.author} Please reply Just With \`YES\`/\`No\``)

                ]})
          }
        })
        .catch(collected => {
            master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`⏰ 〉${master.author} You Took Too Long To Answer.(time runs out)`)]})
        });
    })
  }
    /**/
    
  } else if (['whitelist','cf'].includes(cmd)) {
    if(!args[0]) {
            master.reply({
        embeds: [new Discord.MessageEmbed()
                 .setColor(ee.color)
                 .setDescription(`:x: | Unknown or invalid option, Please use **__${prefix}cf help__** for more help.`)]
      })
    }
    if(args[0].toLowerCase() === 'help') {

   const help = new Discord.MessageEmbed()
                 .setColor(ee.color)
                .setFooter( {text: `❓ 〉.v cf <add/remove> <user/id>`, iconURL: master.guild.iconURL({ dynamic: true })})
                 .setDescription(`
**__<:sao_asunasmug:1072358449335246900> About__ : \`${prefix}whitelist\`**
Command allows to automatically allow whitelisted users to join Your futur channels.

**__<:sao_asunasmug:1072358449335246900> How to Use__ :**

\`➕\` **〉Add a user to your Whitelist**
\`${prefix}whitelist add <user/id>\`

\`➖\` **〉Remove a user from your Whitelist**
\`${prefix}whitelist remove <user/id>\`

\`🚽\` **〉Remove all users from your Whitelist**
\`${prefix}whitelist clear\`

\`📈\` **〉Allows you to list all users on your Whitelist.**
\`${prefix}whitelist show\`


`)
     const row = new Discord.MessageActionRow()
       .addComponents(				
        new MessageButton()
          .setCustomId('show')
          .setStyle('SUCCESS')
          .setEmoji(`🔔`)
          .setLabel('· Remove'),
        new MessageButton()
          .setCustomId('clear')
          .setStyle('DANGER')
          .setEmoji(`➕`)
          .setLabel('· BlackList'))
        const row1 = new MessageActionRow()
       .addComponents(				
/*        new MessageButton()
          .setCustomId('show')
          .setStyle('SUCCESS')
          .setDisabled(true)
          .setLabel('· Show'),*/
        new MessageButton()
          .setCustomId('clear')
          .setStyle('DANGER')
          .setEmoji(`➕`)
          .setLabel('· BlackList')
          .setDisabled(true)
       )
      
  master.reply({ embeds: [help], components: [row]}).then(msg => {
                    setTimeout(function() {
                        msg.edit({ embeds: [help], components: [row1] })
                    }, 10000);
                })
      
  //
    }
    if(args[0].toLowerCase() === "add") {

            client.list.ensure(`${master.author.id}-${master.guild.id}`, {
        black: [],
        white: []
      });

      if (!args[0]) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}cf add <user/id>\`**\n\n> **Example: \`${prefix}cf add @Master\`**`)

        ]
      });
      const show = client.list.get(`${master.author.id}-${master.guild.id}`, "black");
      const shows = client.list.get(`${master.author.id}-${master.guild.id}`, "white");
      const Data = shows.map(black => client.users.cache.get(black));
      
      let member = master.mentions.members.first() || master.guild.members.cache.get(args[1]);
      if (!member || member == null || member == undefined) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: | Invalid arguments")
          .setDescription(`\n\n> ***Usage: \`${prefix}whitelist add <user/id>\`*** \n\n> ***Example: \`${prefix}whitelist add @Master\`***`)
        ]
      });
      if (member.user.bot) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`:x: | You Can't add Bots`)
        ]
      });
      
      if(member.id === master.author.id) return;
      if(show.includes(member.id)) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`This user is already in Your blacklist`)
        ]
      });
      if(Data.length >= 21) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`You've Reached Your whitelisted users Limit`)
        ]
      });
      if(shows.includes(member.id)) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`This user is already in Your whitelist`)
        ]
      })

client.list.ensure(`${master.author.id}-${master.guild.id}-${member.id}`, {
        time: Date.now()
      });
      
   client.list.push(`${master.author.id}-${master.guild.id}`, member.id, "white");


 master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`🎈 | Sucessfully added ${member} to your Whitelist`)
          ]
        })
    } 
    if((['show','list'].includes(args[0].toLowerCase()))) {
        
          client.list.ensure(`${master.author.id}-${master.guild.id}`, {
        black: [],
        white: []
      });
    
    const show = client.list.get(`${master.author.id}-${master.guild.id}`, 'white');
    const Data = show.map(black => client.users.cache.get(black));

          let pagesNum = Math.ceil(Data.length / 10);
            if(pagesNum === 0) pagesNum = 1;
    
            const userStrings = [];
            for (let i = 0; i < Data.length; i++) {
                const e = Data[i];
                userStrings.push(
				`**${i + 1}. ${e} | **(\`${Duration(Date.now() - client.list.get(`${master.author.id}-${master.guild.id}-${e.id}`,"time"),  {largest: 1})} ago\`)
				`);
            }
    
            const pages = [];
            for (let i = 0; i < pagesNum; i++) {
                const str = userStrings.slice(i * 10, i * 10 + 10).join('');
    
                const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `Whitelisted Users List For ${master.author.tag}`, iconURL: master.author.avatarURL({ dynamic: true }) })
                .setThumbnail(master.guild.iconURL({ dynamic: true }))
				.setColor(ee.color)
				.setDescription(`${str == '' ? '**__No Whitelisted Users__**' : '\n' + str}`)
				.setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${Data.length} • Total Whitelisted Users`, iconURL: master.guild.iconURL({ dynamic: true })});
    
                pages.push(embed);
            }
    
            if (!args[1]) {
                if (pages.length == pagesNum && Data.length > 10) paginator(client, master, pages, 30000, Data.length);
                else return master.reply({ embeds: [pages[0]] });
            } else {
                if (isNaN(args[1])) return master.reply('Page must be a number.');
                if (args[1] > pagesNum) return master.reply(`There are only ${pagesNum} pages available.`);
                const pageNum = args[1] == 0 ? 1 : args[1] - 1;
                return master.reply({ embeds: [pages[pageNum]] });
            }
 }
    if(args[0].toLowerCase() === "remove") {
          
            client.list.ensure(`${master.author.id}-${master.guild.id}`, {
        black: [],
        white: []
      });;

      if (!args[0]) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> ***Usage: \`${prefix}cf remove <user/id>\`*** \n\n> ***Example: \`${prefix}cf remove @Master\`***`)

        ]
      });
      const show = client.list.get(`${master.author.id}-${master.guild.id}`, "white");
      let member = master.mentions.members.first() || master.guild.members.cache.get(args[1]) || master.guild.roles.cache.get(args[1]) || master.mentions.roles.first();

     if(!show.includes(member.id)) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`This user is not in Your Whitelist`)
        ]
      });
      
      if (!member || member == null || member == undefined) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}cf remove <user/id> \`** \n\n> **Example: \`${prefix}cf remove @Master\`**`)
        ]
      });

   client.list.remove(`${master.author.id}-${master.guild.id}`, member.id, "white");
      client.list.delete(`${master.author.id}-${master.guild.id}-${member.id}`, "time");


 master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`:white_check_mark: | Successfully removed ${member} from your close friends list`)
          ]
        })
    };
    if(args[0].toLowerCase() === "clear") {

            client.list.ensure(`${master.author.id}-${master.guild.id}`, {
        black: [],
        white: []
      });
      
      const show = client.list.get(`${master.author.id}-${master.guild.id}`, 'white');
      if(!show) return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setDescription(`❓ | You dont have any Close friends in Your list`)]
              })
      const Data = show.map(black => client.users.cache.get(black));
            let filter = (m) => m.author.id === master.author.id;
    return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setDescription(`❓ | Are you sure you want to clear ${Data.length} of Your Friends, this action is irreversible! (reply with yes or no within 30 seconds)`)

                ]
              }).then(() => {
      master.channel.awaitmasters({ filter: filter, max: 1, time: 30000 })
        .then(master => {
          master = master.first()
          if (master.content.toUpperCase() == 'YES' || master.content.toUpperCase() == 'Y') {
         try {

for (let i = 0; i < Data.length; i++) {
            const e = Data[i];

  client.list.delete(`${master.author.id}-${master.guild.id}`, 'white');
client.list.delete(`${master.author.id}-${master.guild.id}-${e.id}`, "time");
            }

              return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setDescription(`🗑 | A total of __**${Data.length}**__ users were successfully removed from your whitelist`)

                ]
              })
        
      } catch (e) {
        console.log(String(e.stack).bgRed);

      }
          } else if (master.content.toUpperCase() == 'NO' || master.content.toUpperCase() == 'N') {
            return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`:x: | You've Cancelled The Action`)

                ]})
          } else {
            return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`:x: 〉${master.author} Please reply Just With \`YES\`/\`No\``)

                ]})
          }
        })
        .catch(collected => {
            master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`⏰ 〉${master.author} You Took Too Long To Answer.(time runs out)`)]})
        });
    })
  }
 } else if (['manager','man'].includes(cmd)) {
    if(!args[0]) {
            master.reply({
        embeds: [new Discord.MessageEmbed()
                 .setColor(ee.color)
                 .setDescription(`:x: | Unknown or invalid option, Please use **__${prefix}blacklist help__** for more help.`)]
      })
    }
    if(args[0].toLowerCase() === 'help') {
    const help =  new Discord.MessageEmbed()
                 .setColor(ee.color)
                 .setThumbnail(master.guild.iconURL({ dynamic: true }))
                 .setThumbnail(master.guild.iconURL({ dynamic: true }))
                 .setFooter({ text:`❓ 〉.v man <add/remove> <user/id>`, iconURL: master.guild.iconURL({ dynamic: true })})
                 .setDescription(`
**__<:sao_asunasmug:1072358449335246900> About__ : \`${prefix}manager\`**
command allows to automatically Give Manage Room Access To Your Managers List.

**__<:sao_asunasmug:1072358449335246900> How to Use__ :**

\`➕\` **〉Add a user to your Managers List**
\`${prefix}manager add <user/id>\`

\`➖\` **〉Remove a user from your blacklist**
\`${prefix}manager remove <user/id>\`

\`🚽\` **〉Remove all users from your Managers list**
\`${prefix}manager clear\`

\`📈\` **〉Allows you to list all Managers on your Whitelist.**
\`${prefix}manager show\``)
    const row = new MessageActionRow()
      .addComponents(				
        new MessageButton()
          .setCustomId('show')
          .setStyle('SUCCESS')
          .setEmoji(`🔔`)
          .setLabel('· Remove'),
        new MessageButton()
          .setCustomId('clear')
          .setStyle('DANGER')
          .setEmoji(`➕`)
          .setLabel('· BlackList'))
        const row1 = new MessageActionRow()
       .addComponents(				
/*        new MessageButton()
          .setCustomId('show')
          .setStyle('SUCCESS')
          .setDisabled(true)
          .setLabel('· Show'),*/
        new MessageButton()
          .setCustomId('clear')
          .setStyle('DANGER')
          .setEmoji(`➕`)
          .setLabel('· BlackList')
          .setDisabled(true)
       )
      
  master.reply({ embeds: [help], components: [row]}).then(msg => {
                    setTimeout(function() {
                        msg.edit({ embeds: [help], components: [row1] })
                    }, 10000);
                })
    }
    if(args[0].toLowerCase() === "add") {

      client.list.ensure(`${master.author.id}-${master.guild.id}`, {
        black: [],
        white: [],
        managers: []
      }); 
      
      if (!args[0]) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}manager add <user/id>\`** \n\n> **Example: \`${prefix}manager add @Master\`**`)

        ]
      });
      const show = client.list.get(`${master.author.id}-${master.guild.id}`, "managers");
      const Data = show.map(black => client.users.cache.get(black));

    
      
      let member = master.mentions.members.first() || master.guild.members.cache.get(args[1]);
      if (!member || member == null || member == undefined) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: | Invalid arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}manager add <user/id>\`** \n\n> **Example: \`${prefix}manager add @Master\`**`)
        ]
      });
      if (member.user.bot) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`:x: | You Can't add Bots`)
        ]
      });
      if(member.id === master.author.id) return;
      if(show.includes(member.id)) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`This user is already in Your Managers List.`)
        ]
      });
      if(Data.length >= 21) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`You've Reached Your Managers Limit.`)]});
      
      client.list.ensure(`${master.author.id}-${master.guild.id}-${member.id}`, {
        time: Date.now()
      });

   client.list.push(`${master.author.id}-${master.guild.id}`, member.id, "managers");


 master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`💀 〉${master.author} Sucessfully Added ${member} To Your Managers List`)
          ]
        })
    } 
    if((['show','list'].includes(args[0].toLowerCase()))) {
      
 client.list.ensure(`${master.author.id}-${master.guild.id}`, {
        black: [],
        white: [],
        managers: []
      }); 
      
    
    const show = client.list.get(`${master.author.id}-${master.guild.id}`, 'managers');
  //  const time = client.list.get(member.id, 'time');
    const Data = show.map(black => client.users.cache.get(black));

      let pagesNum = Math.ceil(Data.length / 10);
        if(pagesNum === 0) pagesNum = 1;

        const userStrings = [];
        for (let i = 0; i < Data.length; i++) {
            const e = Data[i];
			userStrings.push(
				`**${i + 1}. ${e} | **(\`${Duration(Date.now() - client.list.get(`${master.author.id}-${master.guild.id}-${e.id}`,"time"),  {largest: 1})} ago\`)
				`);
		}

		const pages = [];
		for (let i = 0; i < pagesNum; i++) {
			const str = userStrings.slice(i * 10, i * 10 + 10).join('');

			const embed = new Discord.MessageEmbed()
                .setAuthor({ name: `Managers List For ${master.author.tag}`, iconURL: master.author.avatarURL({ dynamic: true }) })
                .setThumbnail(master.guild.iconURL({ dynamic: true }))
				.setColor(ee.color)
				.setDescription(`${str == '' ? '**__No Managers__**' : '\n' + str}`)
				.setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${Data.length} • Total Managers `, iconURL: master.guild.iconURL({ dynamic: true })});

			pages.push(embed);
		}

		if (!args[1]) {
			if (pages.length == pagesNum && Data.length > 10) paginator(client, master, pages, ['⏮', '⏭'], 30000, Data.length);
			else return master.channel.send({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args[1])) return master.channel.send('Page must be a number.');
			if (args[1] > pagesNum) return master.channel.send(`There are only ${pagesNum} pages available.`);
			const pageNum = args[1] == 0 ? 1 : args[1] - 1;
			return master.channel.send({ embeds: [pages[pageNum]] });
		}
    };
    if(args[0].toLowerCase() === "remove") {
          
      client.list.ensure(`${master.author.id}-${master.guild.id}`, {
        black: [],
        white: []
      });

      if (!args[0]) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> ***Usage: \`${prefix}manager remove <user/id>\`*** \n\n> ***Example: \`${prefix}manager remove @Master\`***`)

        ]
      });
       const show = client.list.get(`${master.author.id}-${master.guild.id}`, "managers");
      let member = master.mentions.members.first() || master.guild.members.cache.get(args[1]) || master.guild.roles.cache.get(args[1]) || master.mentions.roles.first();

     if(!show.includes(member.id)) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setDescription(`This user is not in Your Managers List`)
        ]
      });
      if (!member || member == null || member == undefined) return master.reply({
        embeds: [new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: | Invalid Arguments")
          .setDescription(`\n\n> **Usage: \`${prefix}manager remove <user/id> \`** \n\n> **Example: \`${prefix}manager remove @Master\`**`)
        ]
      });

   client.list.remove(`${master.author.id}-${master.guild.id}`, member.id, "managers");
   client.list.delete(`${master.author.id}-${master.guild.id}-${member.id}`, "time");


 master.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`:white_check_mark: | Successfully removed ${member} from Your Managers List.`)
          ]
        })
    };
    if(args[0].toLowerCase() === "clear") {
      
      client.list.ensure(`${master.author.id}-${master.guild.id}`, {
        black: [],
        white: [],
        managers: []
      }); 
      
      const show = client.list.get(`${master.author.id}-${master.guild.id}`, 'managers');

      const Data = show.map(black => client.users.cache.get(black));
      
      
      if(!show) return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setDescription(`❓ | You dont have any Users in Managers List`)]
              })
      
            let filter = (m) => m.author.id === master.author.id;
    return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setDescription(`❓ | Are you sure you want to remove ${Data.length} user from your Managers List, this action is irreversible! (reply with **yes** or **no** within 30 seconds)`)

                ]
              }).then(() => {
      master.channel.awaitmasters({ filter: filter, max: 1, time: 30000 })
        .then(master => {
          master = master.first()
          if (master.content.toUpperCase() == 'YES' || master.content.toUpperCase() == 'Y') {
         try {
           
for (let i = 0; i < Data.length; i++) {
            const e = Data[i];

  client.list.delete(`${master.author.id}-${master.guild.id}`, 'managers');
client.list.delete(`${master.author.id}-${master.guild.id}-${e.id}`, "time");
            }
           


              return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setDescription(`🗑 | A total of __**${Data.length}**__ users were successfully removed from your Managers List.`)]
              })
        
      } catch (e) {
        console.log(String(e.stack).bgRed);

      }
          } else if (master.content.toUpperCase() == 'NO' || master.content.toUpperCase() == 'N') {
            return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`:x: | You've Cancelled The Action`)

                ]})
          } else {
            return master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`:x: 〉${master.author} Please reply Just With \`YES\`/\`No\``)

                ]})
          }
        })
        .catch(collected => {
            master.reply({
                embeds: [new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setDescription(`⏰ 〉${master.author} You Took Too Long To Answer.(time runs out)`)]})
        });
    })
  }
 }
}