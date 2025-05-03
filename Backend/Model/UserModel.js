const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {  // Changed from gmail to email for more general use
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Only allows these values
        default: 'user',        // Defaults to 'user' if not specified
        required: true
    }
});

module.exports = mongoose.model("UserModel", userSchema);