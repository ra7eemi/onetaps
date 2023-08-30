const { reset_DB } = require("../../modules/functions");

module.exports = (client, guild) => {
    if (!guild) return;


    let channel = guild.channels.cache.find(channel =>
        channel.type == "GUILD_TEXT" &&
        channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    );
    if (!channel) return;
    reset_DB(guild.id, client);
    
};