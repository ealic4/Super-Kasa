const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports =(req, res, next)=>{

    const { authorization } = req.headers;
    
    if(!authorization){
        return res.status(401).send({error:'Morate biti prijavljeni'});
    }

    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {

        if(err){
            return res.status(401).send({error:'Morate biti prijavljeni'});
        }

        const {userId}=payload;

        const user = await User.findById(userId);

        req.user=user;

        next();

    });

};