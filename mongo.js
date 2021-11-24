const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(process.env.MONGO_CS, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
}