const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    manufacturingDate: {
        type: Date,
        required: true,
    },
    warrantyPeriod:{
        type: Date,
    },
    manufacturingAddress:{
        type: String,
        required: true,
    },
   serialNumber:{
       type: Number,
       required: true,
   },
   batchNumber:{
       type: Number,
       required: true,
   },
   description: {
        type: String,
        required: true,
    },

}, {timestamps: true});

module.exports = mongoose.model("Products", ProductsSchema)