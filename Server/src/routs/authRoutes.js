const express = require('express'); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const User = mongoose.model('User');

const router = express.Router();

 router.post('/signup', async (req, res)=>{

    const {email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja} = req.body;

    try{

    const user = new User({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja});
    await user.save();

    const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
    res.send({token});

    }catch(err){
        res.status(422).send(err.message);
    }


 });

 router.post('/dodaj', async (req, res)=>{

    const {email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja} = req.body;

    try{

    const user = new User({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja});
    await user.save();

    const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
    res.send({token});

    }catch(err){
        res.status(422).send({error:"greska"});
    }


 });

 router.post("/korisnikEdit", async (req,res) => { 
    const {email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja} = req.body;

    try {
        const izmjena = new User({email, password, ime, prezime, jmbg, omiljenaBoja, omiljenaZivotinja});
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
                    omiljenaZivotinja:izmjena.omiljenaZivotinja
                }
            });
        const user= await User.findOne({jmbg});
        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
        res.send({token});

    } catch(err) {
        res.status(422).send({error:"greska"});
    }
    
 })

 router.post('/signin', async (req, res)=>{

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(422).send({error:'Polja email i password ne smiju biti prazna'});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(422).send({error:'Nepravilan email ili password'});
    }

    try{
        await user.comparePassword(password)
        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
        res.send({token});
    }catch(err){
        return res.status(422).send({error:'Nepravilan email ili password'});
    }



 });

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

    if(user)
    console.log("ssss:"+user.toString());

    else {
        console.log("ssss:eeeee");

    }

    res.send({user});

  
});



 module.exports=router;