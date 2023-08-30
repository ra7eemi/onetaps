
require("events").EventEmitter.defaultMaxListeners = 50000;
const ee = require("../../botconfig/embed.json");
const Discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const paginator = require("../events/modal.js");
const ms = require('ms');




module.exports =  async (client, message, args, cmd, prefix, interaction) => {
 const guild = message.guild;
  if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS)) return message.reply("**Please give me the Permission, to Send Embeded Messages!**");

  if(client.settings.get(message.guild.id, "role") === undefined || `<@${client.settings.get(message.guild.id, "role")}>` === "@deleted-role") 
    return message.reply(`**Please Use : \`${prefix}set-role <role/id>\` first**`);


  if (!args[0]) {
  

    let home = new Discord.MessageEmbed()
      .setColor(ee.color)
      //.setImage("https://media.discordapp.net/attachments/1070030947711471637/1071595161756385350/20230205_015603.jpg") 
      .setAuthor({ name: ` ` })
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setDescription(`
ㅤㅤㅤㅤ       **・<:friend_master:1061239663907586078> 》 Voice Cmd・**
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
\`🔑\`・\`${prefix}Permit\`
**<:masterreply:1056568815695171704>  Give a user access to join the channel**
\`👋\` ・\`${prefix}Reject\`
**<:masterreply:1056568815695171704>  Remove access to a user from joining the channel**
\`♾️\` ・\`${prefix}Limit\`
**<:masterreply:1056568815695171704>  Limit the number of users in the channel**
\`☄️\` ・\`${prefix}Claim\`
**<:masterreply:1056568815695171704>  Claim ownership of channel once the owner has left**
\`🔗\` ・\`${prefix}invite\`
**<:masterreply:1056568815695171704>  Invite a user to Your Voice Channel.**
\`👑\` ・\`${prefix}Owner\` 
**<:masterreply:1056568815695171704>  Shows current channel owner**
\`👑\` ・\`${prefix}transfer\`
**<:masterreply:1056568815695171704>  Transfer channel ownership to someone else**`).setFooter(`Thanks For Using  ${client.user.tag} ❤️`, client.user.displayAvatarURL({ dynamic: true}))

    


    const row = new MessageActionRow()
      .addComponents(				
        new MessageButton()
          .setCustomId('bl')
          .setStyle('DANGER')
          .setEmoji(`💀`)
          .setLabel(`BlackList`),
        new MessageButton()
          .setCustomId('cf')
          .setStyle('PRIMARY')
          .setEmoji(`✅`)
          .setLabel('WhiteList'),
        new MessageButton()
          .setCustomId('man')
          .setStyle('SUCCESS')
          .setEmoji(`👑`)
          .setLabel('Manage'),
      )

            const ROW2 = new MessageActionRow()
           .addComponents(
               new MessageButton() .setStyle('SECONDARY')    .setLabel('Lock')     .setCustomId('lock')      .setDisabled(false),
               new MessageButton() .setStyle('SECONDARY')   .setLabel('Unlock')  .setCustomId('unlock')      .setDisabled(false),
               new MessageButton() .setStyle('SECONDARY') .setLabel('Hide')     .setCustomId('hide')      .setDisabled(false),
               new MessageButton() .setStyle('SECONDARY')   .setLabel('Show')    .setCustomId('showw')      .setDisabled(false),
               new MessageButton() .setStyle('DANGER')      .setLabel('Setup')   .setCustomId('setup')     .setDisabled(false))
    
    const curPage = await message.reply({ embeds: [home], components: [ROW2,row] });
  }
   
};