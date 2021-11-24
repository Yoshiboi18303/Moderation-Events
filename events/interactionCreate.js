const ChristmasUsers = require("../schemas/christmasSchema");
const HalloweenUsers = require("../schemas/halloweenSchema");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isCommand()) {
      if (!interaction.guild)
        return await interaction.reply({
          content: "You need to run these commands in a guild!",
          ephemeral: true,
        });
      if (interaction.user.bot) return;
      const command = client.commands.get(interaction.commandName);

      /*
      if(typeof command.config.guildOnly != "undefined" && command.config.guildOnly) {
        if(interaction.guild.id != config.bot.testServerId) return await interaction.reply({ content: `**${command.data.name}** is restricted to **${client.guilds.cache.get(config.bot.testServerId).name}** for right now!` })
      }
      */

      global.hexColor = interaction.member.displayHexColor;

      if (!command) return;

      /*
      if(!interaction.member.roles.cache.has(interaction.guild.roles.cache.get('900922312935735336'))) {
        if(interaction.replied || interaction.deferred) {
          return await interaction.editReply({ content: `You don't have the ${interaction.guild.roles.cache.get('900922312935735336').name} role! Which means you can't access the commands on this bot!\n\nView the info on this role with \`/roleinfo\`!`, ephemeral: true })
        } else {
          return await interaction.reply({ content: `You don't have the ${interaction.guild.roles.cache.get('900922312935735336').name} role! Which means you can't access the commands on this bot!`, ephemeral: true })
        }
      }
      */
      console.log(`Trying to execute command "${interaction.commandName}"...`);
      try {
        await command.execute(interaction);
      } catch (e) {
        console.error(e)
        if (interaction.replied || interaction.deferred) {
          return interaction.editReply({
            content:
              "There was an error executing this command! This has been reported to the developer(s).",
            ephemeral: true,
          });
        } else {
          return interaction.reply({
            content:
              "There was an error executing this command! This has been reported to the developer(s).",
            ephemeral: true,
          });
        }
      }
    } else if(interaction.isButton() && !interaction.isCommand()) {
      if(interaction.customId == "csys-present-open") {
        ChristmasUsers.findOne({
          user: interaction.user.id
        }, async(err, data) => {
          if(err) throw err
          if(!data) {
            data = new ChristmasUsers({
              user: interaction.user.id
            })
            data.save()
            await interaction.reply({
              content: "I have set up your profile, click the button again!",
              ephemeral: true
            })
          } else {
            var presents = data.presents
            var big_money_chance = Math.random() > 0.80
            if(big_money_chance == true) {
              var presents_earned = Math.floor(Math.random() * 50) + 100
            } else {
              var presents_earned = Math.floor(Math.random() * 50) + 3
            }
            data = await ChristmasUsers.findOneAndUpdate({
              user: interaction.user.id
            },
            {
              $inc: {
                presents: presents_earned
              }
            })
            data.save()
            await interaction.reply({
              content: `You opened up one of your presents and earned $${presents_earned} money from it!\n\n-----\n\n**You now have ${presents + presents_earned} money in your balance!**`,
              ephemeral: true
            })
          }
        })
      }
    }
  }
}