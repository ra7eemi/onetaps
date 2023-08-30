const { MessageActionRow, MessageButton } = require('discord.js');
const ms = require("ms");

const paginator = async (client, message, pages, clanslength) => {
  
    if(!message && !message.channel) throw new Error("Provide a message to access the channel");

      const row1 = new MessageButton()
        .setCustomId('back')
        .setLabel('')
       .setEmoji('👈')
        .setStyle('PRIMARY')
    const row2 = new MessageButton()
        .setCustomId('next')
        .setLabel('')
        .setEmoji('👉')
        .setStyle('PRIMARY')
    const row3 = new MessageButton()
        .setCustomId('delete')
        .setLabel('❌')
        .setStyle('DANGER')
    const row = new MessageActionRow()
        .addComponents(row1, row3, row2)
    

  
    var page = 0;

    const curPage = await message.reply({ embeds: [pages[page || 0]], components: [row] });

  if(pages.length == 0) return;
  

  
    const filter = (m) => m.member.id === message.author.id;
  
    const col = curPage.createMessageComponentCollector({ filter, time: ms("30s") });

    col.on('collect', async (interaction) => {
            if(!interaction.deferred) await interaction.deferUpdate();
            
            if (interaction.customId === 'back') {
                if(page !== 0) {
                --page;
               return await curPage.edit({ embeds: [pages[page]], components: [row], allowedMentions: { repliedUser: false } });
          } else if (page == 0) {
                page = pages.length - 1;
               return await curPage.edit({ embeds: [pages[page]], components: [row], allowedMentions: { repliedUser: false } });
          }
        } else if (interaction.customId === 'next') {
                if(page < pages.length - 1) {
                  page++;
                return await curPage.edit({ embeds: [pages[page]], components: [row], allowedMentions: { repliedUser: false } });
          } else if(page == pages.length - 1) {
                  page = 0;
                return await curPage.edit({ embeds: [pages[page]], components: [row], allowedMentions: { repliedUser: false } });
          } 
            } else if (interaction.customId === 'delete') {
                return await curPage.delete();
    } 
            curPage.edit({embed: [pages[page]], components: [row]})
        });

    col.on('end', async () => {
          const deadrow = new MessageActionRow()
        .addComponents(row1.setDisabled(true), row3.setDisabled(true), row2.setDisabled(true), )
        await curPage.edit({embeds: [pages[page]], components: [deadrow]})
    });

    return curPage
}

module.exports = paginator