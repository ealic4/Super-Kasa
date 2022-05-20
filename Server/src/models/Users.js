const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    ime:{
        type: String,
        required: true
    },
    prezime:{
        type: String,
        required: true
    },
    jmbg:{
        type: String,
        required: true
    },
    omiljenaBoja:{
        type: String,
        required: true
    },
    omiljenaZivotinja:{
        type: String,
        required: true
    },
    tip:{
        type: String,
        required: true
    },


});

userSchema.pre('save' , function(next){

    const user = this;

    if(!user.isModified('password')){
        return next;
    }

    

            user.password=user.password;

            next();

        

    

});



userSchema.methods.comparePassword = function(candidatePassword){

    const user = this;

    return new Promise((resolve, reject)=>{


        if(candidatePassword==user.password){
            console.log("tacne");
            return resolve(true);
        }
        else{
            console.log("netacne");
            reject(false);
        }
        

    });

}

mongoose.model('User', userSchema);