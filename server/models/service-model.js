const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  disastername: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, required: true },
});

const Service = new model("Reports", serviceSchema);

module.exports = Service;