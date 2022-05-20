const mongoose = require("mongoose");

const narudzbaSchema = mongoose.Schema({
  naziv: {
    type: String,
    required: true,
  },
  idKorisnik: {
    type: String,
    required: true,
  },
  idPoslovnice: {
    type: String,
    required: true,
  },
  proizvodi: []
});


module.exports = mongoose.model("Narudzba", narudzbaSchema);
