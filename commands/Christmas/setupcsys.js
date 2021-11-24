const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js");

var types = {
  GUILD_TEXT: "Text Channel",
  GUILD_VOICE: "Voice Channel",
  GUILD_CATEGORY: "Category",
  GUILD_STAGE_VOICE: "Stage VC",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setupcsys")
    .setDescription("Setup the Christmas system!")
    .addChannelOption((option) => option.setName("channel").setDescription("The channel to send the embed to").setRequired(true)),
  async execute(interaction) {
    if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return await interaction.reply({ content: "You can't use this command due to poor permissions!" })
    var channel = interaction.options.getChannel("channel")
    if(channel.type != "GUILD_TEXT") return await interaction.reply({ content: `Expected the channel to put the embed in to be a text channel, got ${
          types[channel.type]
        } instead.` })

    const christmas_embed = new MessageEmbed()
      .setColor("#ff6a6a")
      .setTitle("It's Christmas!")
      .setDescription(`Time to open your presents, click the button below to open one!`)
    const present_row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Open Present")
        .setCustomId("csys-present-open")
        .setDisabled(false)
    )
    await channel.send({
      embeds: [christmas_embed],
      components: [present_row]
    })
    await interaction.reply({
      content: `The Christmas system is now bound to <#${channel.id}>!`
    })
  }
}