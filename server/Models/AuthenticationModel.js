const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    otp: {
        type: String 
    },
    otpExpiresAt: {
        type: Date
    },
    warranty: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
        },
        purchaseDate: {
            type: Date,
        },
        purchaseAddress: {
            type: String,
        },
        warrantyPeriod: {
            type: Date,
        }
    }]

}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);
