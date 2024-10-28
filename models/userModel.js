const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required: [true, 'Please enter your name'],
        trim : true,
    },
    email : {
        type : String,
        required : [true , 'Please enter your email'],
        unique : true,
        lowercase:true,
    },
    password :{
        type: String,
        required: true,
    },
    role:{
        type:String,
        enum: ['customer', 'admin'],
        default:'customer',
    },
    profilePicture :{
        type:String,
    },
    createdAt : {
        type: Date,
        default : Date.now,
    }
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchedPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}

const User = mongoose.model('User',userSchema);

module.exports = User;
