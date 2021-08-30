const Augur = require("augurbot"),
  u = require("../utils/utils");

// Message context menu for bookmarking a message.

const Module = new Augur.Module()
.addInteractionCommand({name: "Bookmark",
  commandId: undefined,
  process: async (interaction) => {
    try {
      await interaction?.deferReply({ephemeral: true});
      let message = await interaction.channel.messages.fetch(interaction.targetId);
      if (message) {
        await interaction.reply({content: "I'm sending you a DM!", ephemeral: true});
        let embed = u.embed()
          .setAuthor(message.member?.displayName || message.author?.username, message.author?.displayAvatarURL({size: 16}), message.url)
          .setDescription(message.cleanContent)
          .setColor(message.member?.displayColor)
          .setTimestamp(message.createdAt)
          .setImage(message.attachments.first()?.url);
        interaction.user.send({embeds: [embed].concat(message.embeds)});
      } else {
        interaction.reply({content: "Against all odds, I couldn't find that message.", ephemeral: true});
      }
    } catch(error) {
      u.errorHandler(error, interaction);
    }
  }
});

module.exports = Module;
