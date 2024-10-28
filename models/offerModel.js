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
    ,products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    }]
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