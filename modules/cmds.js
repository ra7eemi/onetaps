const chalk = require("chalk");

module.exports = (client) => {
  client.category = {
    voice: [
      "lock",
      "unlock",
      "kick",
      "vcinvite",
      "vcadd",
      "invite",
      "voiceadd",
      "reject",
      "permit",
      "limit",
      "promote",
      "ghost",
      "show",
      "name",
      "owner",
      "control",
      "vcinfo",
      "newname",
      "rename",
      "transfer",
      "hide",
      "unhide",
      "claim",
      "blacklist",
      "bl",
      "whitelist",
      "cf",
      "manager",
      "man",
    ],

    setup: ["setup", "setupname", "set-role"],

    economy: [
      "credits",
      "credit",
      "profile",
      "balance",
      "bal",
      "give",
      "level",
      "daily",
      "top",
      "profile",
      "facebook",
      "instagram",
      "twitter",
      "whatsapp",
      "vote",
    ],
  };

  client.on("ready", (bah) => {
    require("../modules/events/ready")(client);
  });

  client.on("messageCreate", (message) => {
    require("../modules/events/message")(client, message);
  });

  client.on("guildCreate", (guild) => {
    require("../modules/events/guildCreate")(client, guild);
  });

  client.on("interactionCreate", (interaction) => {
    require("../modules/events/button")(client, interaction);
  });

  client.on("messageCreate", (message) => {
    require("../modules/events/modal")(client, message);
  });

  /*    client.on("messageCreate", (msg) => {
    require("../modules/events/react")(client, msg)
  });*/

  console.log(chalk.green(`Commands Loaded Successfully`));
};
