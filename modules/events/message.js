const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { databasing, escapeRegex } = require("../../modules/functions");
const Duration = require("humanize-duration");
const ms = require("ms");
const cooldown = new Map();
const Discord = require("discord.js");
const paginator = require("./modal");
const {
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");

module.exports = async (client, message) => {
  if (
    !message.guild ||
    message.guild.available === false ||
    !message.channel ||
    message.webhookId
  )
    return;

  var channeler = message.member.voice;
  const mm = client.jointocreatemap.get(
    `owner_${message.guild.id}_${channeler.id}`
  );

  client.list.ensure(`${message}-${message.guild.id}`, {
    managers: ["1072163630776336426"],
  });

  client.jail.ensure(`${message.guild.id}-${message.author.id}`, {
    verified_by: "**Unknown Verificator**",
  });

  const arg = message.content.slice().trim().split(/ +/);
  const command = arg.shift()?.toLowerCase();

  try {
    databasing(message.guild.id, client);

    const guild_settings = client.settings.get(message.guild.id);

    let { prefix } = guild_settings;

    if (message.author.bot) return;

    if (prefix === null) prefix = config.prefix;

    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
    );

    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);
    ///////////////////////////////////////////////
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);

    const cmd = args.shift()?.toLowerCase();

    if (
      !message.guild.me.permissions.has(Discord.Permissions.FLAGS.VIEW_CHANNEL)
    )
      return;
    if (
      !message.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)
    )
      return;
    if (
      !message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS)
    )
      return message.reply(
        `❌ **I am missing the Permission to EMBED LINKS (Sending Embeds)**`
      );
    if (
      !message.guild.me.permissions.has(
        Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS
      )
    )
      return message.reply(
        `❌ **I am missing the Permission to USE EXTERNAL EMOJIS**`
      );
    if (
      !message.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS)
    )
      return message.reply(
        `❌ **I am missing the Permission to ADD REACTIONS**`
      );
    if (
      !message.guild.me.permissions.has(
        Discord.Permissions.FLAGS.MANAGE_CHANNELS
      )
    )
      return message.reply(
        `❌ **I am missing the Permission to MANAGE CHANNELS**`
      );

    if (["h", "help", "cmd"].includes(cmd))
      require("../../modules/handlers/help_cmd")(
        client,
        message,
        args,
        cmd,
        prefix
      );
    else if (client.category.voice.includes(cmd))
      require("../../modules/handlers/voice_cmds")(
        client,
        message,
        args,
        cmd,
        prefix
      );
    else if (client.category.setup.includes(cmd))
      require("../../modules/handlers/setup_cmds")(
        client,
        message,
        args,
        cmd,
        prefix
      );
    else {
      let row = new Discord.MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("PRIMARY")
          .setLabel("Need Help")
          .setCustomId("help")
      );
      const row2 = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("bl")
          .setStyle("DANGER")
          .setLabel(`BlackList Help`),
        new MessageButton()
          .setCustomId("cf")
          .setStyle("PRIMARY")
          .setLabel("WhiteList Help"),
        new MessageButton()
          .setCustomId("man")
          .setStyle("SUCCESS")
          .setLabel("Manage Help")
      );
      let row1 = new Discord.MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Support")
          .setURL("https://discord.gg/culda")
          .setStyle("LINK")
      );
      client.on("interactionCreate", async (interaction) => {
        let { MessageButton, MessageActionRow } = require("discord.js");
        if (interaction.customId == "help") {
          interaction.reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor("#2e3135")
                // .setThumbnail(guild.iconURL({ dynamic: true }))
                .setDescription(
                  `**・<:friend_master:1061239663907586078> 》 Voice Cmd・**
\`🔑\`・\`${prefix}Permit\`
**💡 Give a user access to join the channel**
\`👋\` ・\`${prefix}Reject\`
**💡 Remove access to a user from joining the channel**
\`♾️\` ・\`${prefix}Limit\`
**💡 Limit the number of users in the channel**
\`🔒\` ・\`${prefix}Lock\`
**💡 Block the users from joining the channel**
\`🔓\` ・\`${prefix}Unlock\`
**💡 Unblock the channel**
\`☄️\` ・\`${prefix}Claim\`
**💡 Claim ownership of channel once the owner has left**
\`👻\` ・\`${prefix}Ghost\` (Must Have <@&${
                    client.settings.get(interaction.guild.id, "role") ||
                    "No Role"
                  }>)
**💡 Make the channel invisible**
\`👀\` ・\`${prefix}Show\` (Must Have <@&${
                    client.settings.get(interaction.guild.id, "role") ||
                    "No Role"
                  }>)
**💡 Make the channel visible**
\`🔗\` ・\`${prefix}invite\`
**💡 Invite a user to Your Voice Channel.**
\`👑\` ・\`${prefix}Owner\` 
**💡 Shows current channel owner**
\`👑\` ・\`${prefix}transfer\`
**💡 Transfer channel ownership to someone else**
\`😎\` ・\`${prefix}cf help\`
**💡 Shows how to use Close Friends Feature**
\`💀\` ・\`${prefix}bl help\`
**💡 Shows how to use Blacklist Feature**
\`⚖️\`・\`${prefix}man help\`
**💡 Shows how to use Managers Feature**`
                )
                .setFooter(
                  `Thanks For Using  ${client.user.tag} ❤️`,
                  client.user.displayAvatarURL({ dynamic: true })
                ),
            ],
            components: [row1, row2],
            ephemeral: true,
          });

          return;
        }
      });
      const ROW2 = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("SECONDARY")
          .setLabel("Lock")
          .setCustomId("lock")
          .setDisabled(false),
        new MessageButton()
          .setStyle("SECONDARY")
          .setLabel("Unlock")
          .setCustomId("unlock")
          .setDisabled(false),
        new MessageButton()
          .setStyle("SECONDARY")
          .setLabel("Hide")
          .setCustomId("hide")
          .setDisabled(false),
        new MessageButton()
          .setStyle("SECONDARY")
          .setLabel("Show")
          .setCustomId("show")
          .setDisabled(false),
        new MessageButton()
          .setStyle("DANGER")
          .setLabel("Setup")
          .setCustomId("setup")
          .setDisabled(false)
      );
      return message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("#2e3135")
            .setDescription(`**To see all Commands type: \`${prefix}help\`**`),
        ],
        components: [ROW2, row2],
        allowedMentions: [{ repliedUser: false }],
      });
    }
  } catch (e) {
    console.log(e).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 7500);
    });
  }
};
