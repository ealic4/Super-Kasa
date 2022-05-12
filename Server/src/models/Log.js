const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
  korisnikId: {
    type: String,
    required: true,
  },
  korisnikEmail: {
    type: String,
    required: true,
  },
  tipKorisnika: {
    type: String,
    required: true,
  },
  vrijeme: String,
  opisAkcije: String,
});


module.exports = mongoose.model("Log", logSchema);
