const mongoose = require("mongoose");

const proizvodSchema = mongoose.Schema({
  naziv: {
    type: String,
    required: true,
  },
  kolicina: {
    type: String,
    required: true,
  },
  jedinica: {
    type: String,
    required: true,
  },
  stanje: {
    type: String,
    required: true,
    default: 'poslan'
  }
});


module.exports = mongoose.model("Proizvod", proizvodSchema);
