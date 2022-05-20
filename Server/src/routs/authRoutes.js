const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");
const Proizvod = require("../models/Proizvod.js");
const Log = require("../models/Log.js");
const Poslovnica = require("../models/Poslovnica.js");
const Narudzba = require("../models/Narudzba.js");

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
    var tip = "Korisnik";
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
    var tip = value;
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

router.post("/dodajPos", async (req, res) => {
  const { naziv, grad, adresa } = req.body;
  try {
    const posl = new Poslovnica({
      naziv: naziv,
      grad: grad,
      adresa: adresa,
      proizvodi: [],
    });
    await posl.save();
    res.send({ naziv: posl.naziv });
  } catch (err) {
    res.status(422).send({ error: "greska" });
  }
});

router.post("/dodajProSkladiste", async (req, res) => {
  const { naziv, kolicina, jedinica, stanje } = req.body;
  try {
    const proizvod = new Proizvod({
      naziv,
      kolicina,
      jedinica,
      stanje
    });
    await proizvod.save();
    console.log("proizvod dodan u skladiste");
    res.send({ proizvod });
  } catch (err) {
    res.status(422).send({ error: "greska" });
  }
});


router.get("/uvediPro/:naziv", async (req, res) => {           /////////////////////////////////////////////////////////////////RUTA ZA UVODJENJE PROIZVODA U POSLOVNICU//////////////////////////////////////////////////////////

  const proizvod = await Proizvod.findOne({ naziv: req.params.naziv });

  res.send({ proizvod });
});


router.post("/uvediPro", async (req, res) => {
  /////////////////////////////////////////////////////////////////RUTA ZA UVODJENJE PROIZVODA U POSLOVNICU//////////////////////////////////////////////////////////
  const {naziv_poslovnice, stringparam} = req.body;
  const proizvodi = stringparam.split(",");
  try {
    const poslovnica = await Poslovnica.findOne({ naziv: naziv_poslovnice });

    if(poslovnica) {
      const stara_adresa = poslovnica.adresa;
      const stari_grad = poslovnica.grad;
      const novi_proizvodi = [];

      for(var i=0;i<proizvodi.length;i++) {
        novi_proizvodi.push(proizvodi[i]);  
      }


      Poslovnica.deleteOne(
        {
          naziv: naziv_poslovnice
        },
        function (err, proizvod) {
          if (err) res.send("Ne postoji poslovnica");
  
          console.log("Poslovnica removed!");
          res.send("poslovnica Izbrisana");
        }
      );

      const zamjena = new Poslovnica({
        naziv:naziv_poslovnice,
        grad:stari_grad,
        adresa:stara_adresa,
        proizvodi:novi_proizvodi
      });

      await zamjena.save();
      res.send({ poruka: "uspjesno" });
    }
    else {
      res.send("Ne postoji poslovnica");
    }    
  } catch (err) {
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

router.post("/korisnikEdit", async (req, res) => {
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
    var tip = value;
    console.log(tip);
    const izmjena = new User({
      email,
      password,
      ime,
      prezime,
      jmbg,
      omiljenaBoja,
      omiljenaZivotinja,
      tip,
    });
    await User.updateOne(
      {
        jmbg: izmjena.jmbg,
      },
      {
        $set: {
          email: izmjena.email,
          password: izmjena.password,
          ime: izmjena.ime,
          prezime: izmjena.prezime,
          omiljenaBoja: izmjena.omiljenaBoja,
          omiljenaZivotinja: izmjena.omiljenaZivotinja,
          tip: izmjena.tip,
        },
      }
    );
    const log = new Log({
      korisnikId: izmjena._id,
      korisnikEmail: izmjena.email,
      tipKorisnika: "Korisnik",
      vrijeme: new Date().toLocaleString("en-GB"),
      opisAkcije: `Korisnik sa emailom '${izmjena.email}' je promijenio svoje podatke`,
    });
    const user = await User.findOne({ jmbg });
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    await log.save();
    res.send({ token });
  } catch (err) {
    res.status(422).send({ error: "greska" });
  }
});

router.post("/proizvodEdit", async (req, res) => {
  const { nazivS, naziv, kolicina, jedinica } = req.body;
  try {
    const izmjena = new Proizvod({ naziv, kolicina, jedinica });
    await Proizvod.updateOne(
      {
        naziv: nazivS,
      },
      {
        $set: {
          naziv: izmjena.naziv,
          kolicina: izmjena.kolicina,
          jedinica: izmjena.jedinica,
        },
      }
    );
    res.send("radi");
  } catch (err) {
    res.status(422).send({ error: "greska" });
  }
});

router.post("/preuzimanjePro/:nazivS", async (req,res) => {
   const naziv = req.params.nazivS;
   
   try {
     
     await Proizvod.updateOne(
       {
         naziv:naziv,
       },
       {
         $set: {
           stanje:"primljen"
         }
       }
     )
     res.send("radi preuzimanje");
   }catch(err) {
    res.status(422).send({ error: "greska" });
  }
 });

router.get("/korisnici", async (req, res) => {
  const user = await User.find();

  let rez = `{"lista" : [{`;

  for (i = 1; i < user.length; i++) {
    rez +=
      `"id":` + `"` + i + `"` + `,"email":` + `"` + user[i].email + `"` + "},{";
  }

  rez = rez.slice(0, -1);
  rez = rez.slice(0, -1);

  rez += "]}";

  res.send(JSON.parse(rez));
});

router.get("/korisnikPodaci/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  res.send({ user });
});

router.get("/proizvodPodaci/:naziv", async (req, res) => {
  const proizvod = await Proizvod.findOne({ naziv: req.params.naziv });
  res.send({ proizvod });
});

router.get("/korisnici", async (req, res) => {
  const user = await User.find();

  let rez = `{"lista" : [{`;

  for (i = 1; i < user.length; i++) {
    rez +=
      `"id":` + `"` + i + `"` + `,"email":` + `"` + user[i].email + `"` + "},{";
  }

  rez = rez.slice(0, -1);
  rez = rez.slice(0, -1);

  rez += "]}";

  res.send(JSON.parse(rez));
});

router.get("/korisnikPodaci/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  res.send({ user });
});

router.get("/proizvodPodaci/:naziv", async (req, res) => {
  const proizvod = await Proizvod.findOne({ naziv: req.params.naziv });
  res.send({ proizvod });
});

router.delete("/izbrisiPro/:naziv", async (req, res) => {
  console.log(req.params.naziv);
  const proizvod = await Proizvod.findOne({ naziv: req.params.naziv });

  if (proizvod) {
    Proizvod.deleteOne(
      {
        naziv: req.params.naziv,
      },
      function (err, proizvod) {
        if (err) res.send("Ne postoji proizvod");

        console.log("User successfully removed!");
        res.send("proizvod Izbrisan");
      }
    );
  } else res.send("proizvod ne postoji");
});

router.delete("/izbrisi/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  console.log("email:" + req.params.email);

  if (user) {
    User.deleteOne(
      {
        email: req.params.email,
      },
      function (err, user) {
        if (err) res.send("Ne postoji korisnik");

        console.log("User successfully removed!");
        res.send("Korisnik Izbrisan");
      }
    );
  } else res.send("Ne postoji korisnik");
});

router.post("/dodajProizvod", async (req, res) => {
  const { naziv, kolicina, jedinica } = req.body;

  try {
    const proizvod = new Proizvod({ naziv, kolicina, jedinica });

    await proizvod.save();

    res.send(proizvod);
  } catch (err) {
    res.status(422).send({ error: "greska" });
  }
});

router.get("/proizvodi", async (req, res) => {
  const proizvodi = await Proizvod.find();

  let rez = `{"listaP" :[`;

  for (i = 0; i < proizvodi.length; i++) {
    rez +=
      `{"proizvod" : {"id":` +
      `"` +
      i +
      `"` +
      `,"naziv":` +
      `"` +
      proizvodi[i].naziv +
      `"` +
      `,"kolicina":` +
      `"` +
      proizvodi[i].kolicina +
      `"` +
      `,"jedinica":` +
      `"` +
      proizvodi[i].jedinica +
      `"` +
      "}},";
  }

  rez = rez.slice(0, -1);
  rez = rez.slice(0, -1);

  rez += "}]}";

  res.send(JSON.parse(rez));
});

router.get("/poslovnice", async (req, res) => {
  const poslovnice = await Poslovnica.find();

  let listaPoslovnica = [];

  for (i = 0; i < poslovnice.length; i++) {
    let temp = {
      poslovnica: {
        id: poslovnice[i]._id,
        naziv: poslovnice[i].naziv,
        grad: poslovnice[i].grad,
        adresa: poslovnice[i].adresa,
        proizvodi: poslovnice[i].proizvodi,
      },
    };
    listaPoslovnica.push(temp);
  }

  res.send({ listaPoslovnica: listaPoslovnica });
});

router.delete("/poslovnice/:id", (req, res) => {
  Poslovnica.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => console.error(error));
});

router.get("/narudzbe/:idKorisnik", async (req, res) => {

  const narudzbe = await Narudzba.find(  { 'idKorisnik': req.params.idKorisnik });

  let listaNarudzbi = [];

  for (i = 0; i < narudzbe.length; i++) {
    const pos = await Poslovnica.findOne(  { '_id': narudzbe[i].idPoslovnice });

    let temp = {
      narudzba: {
        id: narudzbe[i]._id,
        naziv: narudzbe[i].naziv,
        stol: narudzbe[i].stol,
        nazivPoslovnce: pos.naziv,
      },
    };
    listaNarudzbi.push(temp);
  }


  res.send({ listaNarudzbi: listaNarudzbi });
});

router.post("/dodajNarudzbu", async (req, res) => {


  const { naziv, idKorisnik, poslovnica, stol } = req.body;

  try {

    var idProizvoda = '-';
    var kolicina = '-';
    const pos = await Poslovnica.findOne(  { 'naziv': poslovnica });
    const idPoslovnice = pos._id
    const narudzbe = new Narudzba({ naziv, stol, idKorisnik, idPoslovnice, idProizvoda, kolicina });


    await narudzbe.save();

    res.send(narudzbe);

  } catch (err) {
    console.log(err)
    res.status(422).send({ error: "greska" });
  }
});

router.post("/proizvodi-poslovnice", async (req, res) => {
  try {
    let proizvodi = await Proizvod.find({ _id: { $in: req.body.proizvodi } });

    res.send({ listaProizvoda: proizvodi });
  } catch (err) {
    console.log("Error sa bazom podataka");
    console.error(err);

  }
});

module.exports = router;
