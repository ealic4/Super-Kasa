const mongoose = require("mongoose");

const poslovnicaSchema = mongoose.Schema({
  naziv: {
    type: String,
    required: true,
  },
  grad: {
    type: String,
    required: true,
  },
  adresa: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Poslovnica", poslovnicaSchema);
