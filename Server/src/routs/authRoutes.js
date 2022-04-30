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

 module.exports=router;