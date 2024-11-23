const mongoose = require("mongoose");


const EmailsSchema = new mongoose.Schema({
    dateSent: {
        type: String
    },
    warrantyId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("Emails", EmailsSchema)