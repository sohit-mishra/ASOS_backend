const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    discount:{
        type:Number,
        required:true,
    }
    ,userId:{
        type:String,
        required:true,
    }
    ,startDate:{
        type:Date,
        required:true,
    }
    ,endDate:{
        type:Date,
        required:true,
    }
    ,isActive:{
        type:Boolean,
        default:true,
    },
    createdAt:{
        type:Date,
        default : Date.now,
    }
});

const Offer = mongoose.model('Offer',offerSchema);

module.exports = Offer;