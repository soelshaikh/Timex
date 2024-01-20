const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    imgpath :{
        type:String,
        required:true
    },
    catName : {
        type : String,
        required : true
    },
    dataCreated :{
        type : Date,
        default : Date.now
    }
})

const categorydb = new mongoose.model("categories",categorySchema)

module.exports = categorydb

