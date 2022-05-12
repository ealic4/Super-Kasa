require("./models/Users");
const express = require("express");
const mongoose = require("mongoose");
const authRouts = require("./routs/authRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());

app.use(authRouts);

const mongoUri =
  "mongodb+srv://admin:admin@cluster0.a9vmk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoUri, (err) => {
  if (err) console.error(err);
  else console.log("Connected to DB");
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, function () {
  console.log("Server radina portu: " + 3000);
});
//