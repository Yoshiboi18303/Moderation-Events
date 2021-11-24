const { Schema, model } = require("mongoose");

const reqString = {
  type: String,
  required: true
}

const christmasSchema = Schema({
  user: reqString,
  presents: {
    type: Number,
    default: 0
  }
})

module.exports = model("christmas-event-users", christmasSchema)