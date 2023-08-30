
const ee = require("../../botconfig/embed.json");
const Discord = require("discord.js");



module.exports = async (client, message, args, cmd, prefix) => {
  if (cmd === "setup") {
    if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return message.reply({ embeds: [new Discord.MessageEmbed().setColor(ee.color).setDescription(":x: | You don't have enough Permissions!")] });
    let {
      channel
    } = message.member.voice;
    if (channel) {
      message.reply({
        embeds: [new Discord.MessageEmbed()
          .setTitle("👑 **Setup Complete for One-tap**")
            .setColor(ee.color)
            .setDescription(`\n> **Current Temporary Channel: ${channel}**`)
        ]
      });
      client.settings.set(message.guild.id, channel.id, `channel`)
    } else {
      message.guild.channels.create("One-Tap", {
        type: 'GUILD_VOICE',
        bitrate: 8000,
        userLimit: 1,
        permissionOverwrites: [{
            id: message.guild.id,
            allow: ['VIEW_CHANNEL', "CONNECT"],
            deny: ["SPEAK"]
          }
        ],
      }).then(vc => {
        if (message.channel.parent) vc.setParent(message.channel.parent.id)
                  message.reply({
        embeds: [new Discord.MessageEmbed()
          .setTitle("👑 **Setup Complete for One-tap**")
            .setColor(ee.color)
            .setDescription(`\n> **Current Temporary Channel: ${vc}**`)
        ]
      });
        client.settings.set(message.guild.id, vc.id, `channel`);
      })
    };

    return
  } else if (cmd === "setupname") {

    if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) 
      return message.reply({ embeds: [new Discord.MessageEmbed()
                                      .setColor(ee.color).setDescription("**:x: | You don't have enough Permissions!**")] });
    if (!args[0]) return message.reply({ embeds: [new Discord.MessageEmbed().setColor(ee.color).setDescription("**:x: | You didn't add a Channel name**").setDescription(`**Usage: \`${prefix}setupname [new Channel Name]\` | Note: {user} will be replaced with username**`)] });
    if (args[0].length > 32) return message.reply({ embeds: [new Discord.MessageEmbed().setColor(ee.color).setTitle("**:x: | Your provided Channel Name is too Long**").setDescription(`**The maximum length for a Channel name is \`32\` Letters**`)] });
    client.settings.set(message.guild.id, args.join(" "), "channelname");
    message.reply({
      embeds: [new Discord.MessageEmbed()
        .setTitle("え・Successfully changed the Channel Name")
        .setColor(ee.color)
        .setDescription(`*え・New Channel name: *\`${client.settings.get(message.guild.id, "channelname")}\`\n\n*え・What it could look like:* \`${client.settings.get(message.guild.id, "channelname").replace("{user}", message.author.username)}\``)
      ]
    });
    return;
    
  } else if (cmd === "set-role") {

      let role = await message.mentions.roles.first() || await message.guild.roles.cache.get(args[0]);
         if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return message.reply({ embeds: [new Discord.MessageEmbed()                                                            .setColor(ee.color)
                  .setTitle(":x: | You don't have enough Permissions!")] });

    if (!args[0]) return message.reply({ embeds: [new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setTitle(":x: | You didn't add a Role")                  .setDescription(`Usage: \`${prefix}set-role <role/id>\``)] });
    if(!role) return message.reply(`Role?`)
    client.settings.set(message.guild.id, role.id, "role");
    return message.reply({
      embeds: [
        new Discord.MessageEmbed().setColor(ee.color)
          .setTitle("✅ ⮞ Successfully changed the Role for the Server")
          .setDescription(`⮞・New role: <@&${client.settings.get(message.guild.id, "role")}>`)
      ]
    })
  }
}