const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    fname :{
        type:String,
        required : true
    },
    lname :{
        type:String,
        required : true
    },
    streetAddress :{
        type:String,
        required : true
    },
    landmark :{
        type:String,
        required : true
    },
    city:{
        type:String,
        required : true
    },
    state:{
        type:String,
        required : true
    },
    pincode:{
        type:String,
        required : true
    },
    phone:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    dateCreated :{
        type:Date,
        default : Date.now
    }
})

const addressdb = new mongoose.model("address",addressSchema)

module.exports = addressdb