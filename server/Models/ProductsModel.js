const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    productImage: {
        type: String
    },
    productName: {
        type: String
    },
    brand: {
        type: String
    },
    price: {
        type: String
    },
    manufacturingDate: {
        type: Date
    },
    warrantyPeriod:{
        type: Number,
    },
    manufacturingAddress:{
        type: String
    },
   serialNumber:{
       type: Number
   },
   batchNumber:{
       type: Number
   },
   description: {
        type: String
    },

}, {timestamps: true});

module.exports = mongoose.model("Products", ProductsSchema)