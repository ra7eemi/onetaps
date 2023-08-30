
const ee = require("../../botconfig/embed.json");
const paginator = require('./modal.js')
const Duration = require('humanize-duration');
const Discord = require("discord.js");
const { Modal, MessageButton, MessageSelectMenu, TextInputComponent, MessageActionRow } = require('discord.js');
const config = require("../../botconfig/config.json");


// HERE THE EVENT STARTS
module.exports = async (client, interaction, args) => {

  const black =  new Discord.MessageEmbed()
      .setColor(ee.color)
    //.setImage("https://media.discordapp.net/attachments/1070030947711471637/1071595161756385350/20230205_015603.jpg")
  .setDescription(`
**__👉 About__ : \`${config.prefix}blacklist\`**
command allows to automatically reject blacklisted users for joining your future channels.

**__👉 How to Use__ :**

\`➕\` **〉Add a user to your blacklist**
\`${config.prefix} blacklist add <user/id>\`

\`➖\` **〉Remove a user from your blacklist**
\`${config.prefix} blacklist remove <user/id>\`

\`🚽\` **〉Remove all users from your Blacklist**
\`${config.prefix}blacklist clear\`

\`📈\` **〉Allows you to list all users on your Blacklist.**
\`${config.prefix}blacklist show\``).setFooter(`Thanks For Using  ${client.user.tag} ❤️`, client.user.displayAvatarURL({ dynamic: true}))

    const cf =  new Discord.MessageEmbed()
      .setColor(ee.color)
      //.setImage("https://media.discordapp.net/attachments/1070030947711471637/1071595161756385350/20230205_015603.jpg")
  .setDescription(`
**__👉 About__ : \`${config.prefix}whitelist\`**
Command allows to automatically allow whitelisted users to join Your futur channels.

**__👉 How to Use__ :**

\`➕\` **〉Add a user to your Whitelist**
\`${config.prefix}whitelist add <user/id>\`

\`➖\` **〉Remove a user from your Whitelist**
\`${config.prefix}whitelist remove <user/id>\`

\`🚽\` **〉Remove all users from your Whitelist**
\`${config.prefix}whitelist clear\`

\`📈\` **〉Allows you to list all users on your Whitelist.**
\`${config.prefix}whitelist show\``).setFooter(`Thanks For Using  ${client.user.tag} ❤️`, client.user.displayAvatarURL({ dynamic: true}))


    const man =  new Discord.MessageEmbed()
      .setColor(ee.color)
      //.setImage("https://media.discordapp.net/attachments/1070030947711471637/1071595161756385350/20230205_015603.jpg")
  .setDescription(`
**__👉 About__ : \`${config.prefix}manager\`**
command allows to automatically Give Manage Room Access To Your Managers List.

**__👉 How to Use__ :**

\`➕\` **〉Add a user to your Managers List**
\`${config.prefix}manager add <user/id>\`

\`➖\` **〉Remove a user from your blacklist**
\`${config.prefix}manager remove <user/id>\`

\`🚽\` **〉Remove all users from your Managers list**
\`${config.prefix}manager clear\`

\`📈\` **〉Allows you to list all Managers on your Whitelist.**
\`${config.prefix}manager show\``).setFooter(`Thanks For Using  ${client.user.tag} ❤️`, client.user.displayAvatarURL({ dynamic: true}))

  const pj =  new Discord.MessageEmbed()
      .setColor(ee.color)
      //.setImage("https://media.discordapp.net/attachments/1070030947711471637/1071595161756385350/20230205_015603.jpg") 


      const lock =  new Discord.MessageEmbed()
      .setColor(ee.color)
      //.setImage("https://media.discordapp.net/attachments/1070030947711471637/1071595161756385350/20230205_015603.jpg")
  .setDescription(`
**__👉 About__ : \`${config.prefix}lock\`**
Lock Your Channel Room.

**__👉 How to Use__ :**

\`🔒\` ・\`.v Lock\`
**⚙ Block the users from joining the channel**
\`🔓\` ・\`.v Unlock\`
**⚙ Unlock the channel**`).setFooter(`Thanks For Using  ${client.user.tag} ❤️`, client.user.displayAvatarURL({ dynamic: true}))

        const unlock =  new Discord.MessageEmbed()
      .setColor(ee.color)
      //.setImage("https://media.discordapp.net/attachments/1070030947711471637/1071595161756385350/20230205_015603.jpg")
  .setDescription(`
**__👉 About__ : \`${config.prefix}unlock\`**
Unlock Your Channel Room.

**__👉 How to Use__ :**

\`🔓\` ・\`${config.prefix} Unlock\`
**⚙ Unlock the channel**`).setFooter(`Thanks For Using  ${client.user.tag} ❤️`, client.user.displayAvatarURL({ dynamic: true}))

          const hide =  new Discord.MessageEmbed()
      .setColor(ee.color)
      //.setImage("https://media.discordapp.net/attachments/1070030947711471637/1071595161756385350/20230205_015603.jpg")
  .setDescription(`
**__👉 About__ : \`${config.prefix}hide\`**
Hide Your Channel Room.

**__👉 How to Use__ :**

\`👻\` ・\`${config.prefix}hide\` (Must Have <@&${client.settings.get(interaction.guild.id, "role") || 'No Role'}>)
**⚙ Make the channel invisible**`).setFooter(`Thanks For Using  ${client.user.tag} ❤️`, client.user.displayAvatarURL({ dynamic: true}))

            const show =  new Discord.MessageEmbed()
      .setColor(ee.color)
      //.setImage("https://media.discordapp.net/attachments/1070030947711471637/1071595161756385350/20230205_015603.jpg")
  .setDescription(`
**__👉 About__ : \`${config.prefix}show\`**
Hide Your Channel Room.

**__👉 How to Use__ :**

\`👁️\` ・\`${config.prefix}show\` (Must Have <@&${client.settings.get(interaction.guild.id, "role") || 'No Role'}>)
**⚙ Make the channel Visible**`).setFooter(`Thanks For Using  ${client.user.tag} ❤️`, client.user.displayAvatarURL({ dynamic: true}))


              const setup =  new Discord.MessageEmbed()
      .setColor(ee.color)
      
  .setDescription(`
**__👉 About__ : \`${config.prefix}show\`**
Hide Your Channel Room.

**__👉 How to Use__ :**

\`🌟\` ・\`${config.prefix}setup\` (Admin Perm Required)
**⚙ Creates a Join To Create Channel**

\`🌟\` ・\`${config.prefix}setupname <ChannelName>\` (Admin Perm Required)
**⚙ Changes the Created temp. Voice Channel's Name!
Note: Having {user} in your Channel name, will replace with the username!**

\`🌟\` ・\`${config.prefix}set-role\` (Admin Perm Required)
**⚙ Set Required Role To Hide&Show Channel**`).setFooter(`Thanks For Using  ${client.user.tag} ❤️`, client.user.displayAvatarURL({ dynamic: true}))

          let master = new Discord.MessageActionRow()
          .addComponents(
      new MessageButton()
      .setLabel('Support')
      .setURL("https://discord.gg/culda")
      .setEmoji('🛠')
      .setStyle('LINK'),
              );

  
   if (interaction.isButton()) {
            if (interaction.customId === 'bl') {
    await await interaction.reply({ embeds: [black],components: [master], ephemeral: true });

        } else if(interaction.customId === 'cf') {
    interaction.reply({ embeds: [cf],components: [master], ephemeral: true })
              
        } else if(interaction.customId === 'man') {
    interaction.reply({ embeds: [man],components: [master], ephemeral: true }) 
              
        } else if(interaction.customId === 'pj') {
    interaction.reply({ embeds: [pj],components: [master], ephemeral: true })

        } else if(interaction.customId === 'st') {
    interaction.reply({ embeds: [rl],components: [master], ephemeral: true }) 
              
        } 
      else if(interaction.customId === 'lock') {
    interaction.reply({ embeds: [lock],components: [master], ephemeral: true }) 
              
        } else if(interaction.customId === 'unlock') {
    interaction.reply({ embeds: [unlock],components: [master], ephemeral: true }) 
              
        } 
      else if(interaction.customId === 'hide') {
    interaction.reply({ embeds: [hide],components: [master], ephemeral: true }) 
              
        } 
     else if(interaction.customId === 'showw') {
    interaction.reply({ embeds: [show],components: [master], ephemeral: true }) 
              
        } 
     else if(interaction.customId === 'setup') {
    interaction.reply({ embeds: [setup],components: [master], ephemeral: true }) 
              
        } 
     
   } else if (interaction.isModalSubmit()) {

     	      if (interaction.customId === 'play') {

  const songname = interaction.fields.getTextInputValue('music');

         await interaction.reply({ content: `${interaction.user} Played ${songname}`}).then(msg => {
                    setTimeout(function() {
                        interaction.deleteReply();
                    }, 10000);
                })
              
                          let queue = client.player.createQueue(interaction.guild.id);
        await queue.join(interaction.guild.members.cache.get(interaction.member.user.id).voice.channelId);
              
        let song = await queue.play(songname).catch(err => {
            console.log(err);
            if(!guildQueue)
                queue.stop();
        });


              
  } else if (interaction.customId === 'volume') {

  const songname = interaction.fields.getTextInputValue('volume');

    if(isNaN(songname)) return interaction.reply({ content: ":x: | must be a number"})

         await interaction.reply({ content: `${interaction.user} setVolume to ${songname}`}).then(msg => {
                    setTimeout(function() {
                        interaction.deleteReply();
                    }, 10000);
                })
              guildQueue.setVolume(parseInt(songname));  
  }
}  
};