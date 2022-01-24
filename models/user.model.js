const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 200,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: [{
      type: Number,
      required: true  
    }],
    referredBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    referrals: {
        type: Number,
        default: 1
    }
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel