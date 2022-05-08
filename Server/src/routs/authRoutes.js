const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");
const Proizvod = require("../models/Proizvod.js");

const Log = require("../models/Log.js");
const Poslovnica = require("../models/Poslovnica.js");

const router = express.Router();

router.post("/singout", async (req, res) => {
  let user = req.body;
  let tipKorisnika = "Korisnik";
  if (user.email === "admin") tipKorisnika = "Admin";

  const log = new Log({
    korisnikId: user.id,
    korisnikEmail: user.email,
    tipKorisnika: tipKorisnika,
    vrijeme: new Date().toLocaleString("en-GB"),
    opisAkcije: `Odjava korisnika '${user.email}'`,
  });

  try {
    await log.save();
    res.status(200).send({});
  } catch (err) {
    console.error(err);
    res.status(422).send({ err });
  }
});

router.post("/signup", async (req, res) => {
  const {
    email,
    password,
    ime,
    prezime,
    jmbg,
    omiljenaBoja,
    omiljenaZivotinja,
  } = req.body;

  try {
    var tip="Korisnik"
    const user = new User({
      email,
      password,
      ime,
      prezime,
      jmbg,
      omiljenaBoja,
      omiljenaZivotinja,
      tip
    });
    const log = new Log({
      korisnikId: user._id,
      korisnikEmail: user.email,
      tipKorisnika: "Korisnik",
      vrijeme: new Date().toLocaleString("en-GB"),
      opisAkcije: `Korisnik '${user.email}' uspjesno registrovan`,
    });
    await user.save();
    await log.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token, id: user._id, email: user.email });
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/dodaj", async (req, res) => {
  const {
    email,
    password,
    ime,
    prezime,
    jmbg,
    omiljenaBoja,
    omiljenaZivotinja,
    value,
  } = req.body;

  try {
    var tip=value
    const user = new User({
      email,
      password,
      ime,
      prezime,
      jmbg,
      omiljenaBoja,
      omiljenaZivotinja,
      tip,
    });
    const log = new Log({
      korisnikId: user._id,
      korisnikEmail: user.email,
      tipKorisnika: "Admin",
      vrijeme: new Date().toLocaleString("en-GB"),
      opisAkcije: `Korisnik '${user.email}' uspjesno dodan od strane administratora`,
    });
    await user.save();
    await log.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token, id: user._id, email: user.email });
  } catch (err) {
    res.status(422).send({ error: "greska" });
  }
});

router.post("/dodajPos", async (req,res) =>{                   //////////////////////////////////////////////////RUTA ZA DODAVANJE POSLOVNICE//////////////////////////////////////////////////
  const {naziv, grad, adresa} = req.body;

  try {
    const posl = new Poslovnica({naziv,grad,adresa});
    await posl.save();
  } catch(err) {
    res.status(422).send({ error: "greska" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "Polja email i password ne smiju biti prazna" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ error: "Nepravilan email ili password" });
  }

  try {
    let korisnik = "Korisnik";
    if (user.email === "admin") korisnik = "Admin";

    const log = new Log({
      korisnikId: user._id,
      korisnikEmail: user.email,
      tipKorisnika: korisnik,
      vrijeme: new Date().toLocaleString("en-GB"),
      opisAkcije: `Prijava korisnika '${user.email}'`,
    });
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    await log.save();
    res.send({ token, id: user._id, email: user.email });
  } catch (err) {
    return res.status(422).send({ error: "Nepravilan email ili password" });
  }
});


 router.post("/korisnikEdit", async (req,res) => { 
    const {email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja, value} = req.body;

    try {
        var tip=value
        console.log(tip)
        const izmjena = new User({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja, tip});
        await User.updateOne(
            {
                jmbg:izmjena.jmbg
            },
            {
                $set: {
                    email:izmjena.email,
                    password:izmjena.password,
                    ime:izmjena.ime,
                    prezime:izmjena.prezime,
                    omiljenaBoja:izmjena.omiljenaBoja,
                    omiljenaZivotinja:izmjena.omiljenaZivotinja,
                    tip:izmjena.tip
                }
            });
            const log = new Log({
              korisnikId: izmjena._id,
              korisnikEmail: izmjena.email,
              tipKorisnika: "Korisnik",
              vrijeme: new Date().toLocaleString("en-GB"),
              opisAkcije: `Korisnik sa emailom '${izmjena.email}' je promijenio svoje podatke`,
            });
        const user= await User.findOne({jmbg});
        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
        await log.save();
        res.send({token});

    } catch(err) {
        res.status(422).send({error:"greska"});
    }
    
 })


 router.get('/korisnici', async (req,res)=>{

    const user = await User.find();
    
    let rez=`{"lista" : [{`;

    for(i=1; i<user.length; i++){
        rez+=`"id":`+`"`+i+`"`+`,"email":`+`"`+user[i].email+`"`+"},{";
    }

    rez = rez.slice(0, -1);
    rez = rez.slice(0, -1);

    rez+="]}"

    res.send(JSON.parse(rez));
 
 });
 
 router.get("/korisnikPodaci/:email", async (req, res) => {

    const user = await User.findOne(  { 'email': req.params.email });

    res.send({user});

  
});

router.delete("/izbrisi/:email", async (req, res) => {

  const user = await User.findOne(  { 'email': req.params.email });

  console.log("email:"+ req.params.email)

  if(user){
      User.deleteOne({
      email: req.params.email,
    }, function (err, user) {

  if (err)
    res.send("Ne postoji korisnik");

    console.log('User successfully removed!');
    res.send('Korisnik Izbrisan');


    });
  }

  else 
    res.send("Ne postoji korisnik");

});

router.post("/dodajProizvod", async (req, res) => {

  const {naziv,kolicina,jedinica} = req.body;

  try {

    const proizvod = new Proizvod({naziv,kolicina,jedinica});

    await proizvod.save();

    res.send(proizvod);

  } catch (err) {
    res.status(422).send({ error: "greska" });
  }
});

router.get('/proizvodi', async (req,res)=>{

  const proizvodi = await Proizvod.find();
  
  let rez=`{"listaP" :[`;

  for(i=0; i<proizvodi.length; i++){
      rez+=`{"proizvod" : {"id":`+`"`+i+`"`+`,"naziv":`+`"`+proizvodi[i].naziv+`"`+`,"kolicina":`+`"`+proizvodi[i].kolicina+`"`+`,"jedinica":`+`"`+proizvodi[i].jedinica+`"`+"}},";
  }

  rez = rez.slice(0, -1);
  rez = rez.slice(0, -1);

  rez+="}]}"

  res.send(JSON.parse(rez));

});

 module.exports=router;
