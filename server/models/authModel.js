const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
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
            required: true
        },
        purchaseAddress: {
            type: String,
            required: true
        }
    }]

}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);
