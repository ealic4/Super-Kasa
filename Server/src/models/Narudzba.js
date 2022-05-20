const mongoose = require("mongoose");

const narudzbaSchema = mongoose.Schema({
  naziv: {
    type: String,
    required: true,
  },
  stol: {
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
  idProizvoda: {
    type: String,
    required: true,
  },
  kolicina: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Narudzba", narudzbaSchema);
