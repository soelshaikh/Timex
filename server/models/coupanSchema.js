const mongoose = require("mongoose")

const coupanSchema = new mongoose.Schema({
    
    coupanName : {
        type : String,
        trim : true,
        required : true
    },
    coupanDiscount:{
        type : Number,
        trim : true,
        required : true
    },
    dataCreated :{
        type : Date,
        default : Date.now
    }
})

const coupandb = new mongoose.model("coupans",coupanSchema)

module.exports = coupandb

