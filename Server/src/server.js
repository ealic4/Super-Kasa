require('./models/Users');
const express = require('express');
const mongoose = require('mongoose');
const authRouts = require('./routs/authRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());

app.use(authRouts);

const mongoUri = 'mongodb+srv://admin:admin@cluster0.a9vmk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri,{


});

mongoose.connection.on('connected', ()=>{

console.log("connected to mongo instnce");

});

mongoose.connection.on('error', (err)=>{

    console.error("connected to mongo instnce", err);
    
});

app.get("/", requireAuth, (req, res) =>{

    res.send(`Your email: ${req.user.email}`);

});

app.listen(3000, function(){
    console.log("Server radina portu: "+ 3000);
});