const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    id: String,
    product_name: {
        type: String,
        trim: true,
        required: true
    },
    imgpath: {
        type: String,
        required: true
    },
    selling_price: {
        type: Number,
        required: true,
        default: 0
    },
    actual_price: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    product_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    isFeatured:{
        type : Boolean,
        default : false
    },
    isActive:{
        type : Boolean,
        default : false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

const productdb = new mongoose.model("products",productSchema)
module.exports = productdb