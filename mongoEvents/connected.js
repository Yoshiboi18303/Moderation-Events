module.exports = {
  name: "connected",
  once: false,
  execute() {
    const bot_name = "M-E".blue
    const connected_text = "Connected to MongoDB!".green
    console.log(`${bot_name} >> ${connected_text}`)
  }
}