module.exports = {
  name: "ready",
  once: false,
  execute() {
    var statuses = [
      "events",
      `${client.guilds.cache.get("892603177248096306").name}`,
      `Merry (Early) Christmas!`
    ]
    var types = ["WATCHING", "LISTENING", "PLAYING"]
    var bot_name = `${client.user.username}`.rainbow.underline.bold
    console.log(`${bot_name} has logged on!`)
    setInterval(async () => {
      var status = statuses[Math.floor(Math.random() * statuses.length)]
      var type = types[Math.floor(Math.random() * types.length)]
      await client.user.setActivity(status, {
        type
      }, 15000)
    })
  }
}