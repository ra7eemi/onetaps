/*module.exports = async (client, msg, pages, emojiList, timeout, clanLength) => {
   if (!msg && !msg.channel) console.log('Channel is inaccessible.');
   if (!pages) console.log("page are not given");
//   (emojiList.length !== 2) console.log('Need two emojis.');
   let page = 0;
    const curPage = await msg.channel.send({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${clanLength} • Total Users`})] });
    if(pages.length == 0) return;

    const permissions = msg.channel.permissionsFor(client.user);
    if (!permissions.has('ADD_REACTIONS')) return;
    for (const emoji of emojiList) await curPage.react(emoji);
    const filter = (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot;
    const reactionCollector = curPage.createReactionCollector({ filter, time: timeout });
    reactionCollector.on('collect', (reaction, user) => {
        if(!user.bot && permissions.has('MANAGE_MESSAGES')) reaction.users.remove(user.id);
        switch (reaction.emoji.name) {
            case emojiList[0]:
                page = page > 0 ? --page : pages.length - 1;
                break;
            case emojiList[1]:
                page = page + 1 < pages.length ? ++page : 0;
                break;
            default:
                break;
        }
        curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${clanLength} • Total Users`})] });
    });
    reactionCollector.on('end', () => curPage.reactions.removeAll());
    return curPage;
};*/