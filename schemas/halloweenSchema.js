const { Schema, model } = require("mongoose");

const reqString = {
  type: String,
  required: true
}

const halloweenSchema = Schema({
  user: reqString,
  candy: {
    type: Number,
    default: 0
  }
})

module.exports = model("halloween-event-users", halloweenSchema)