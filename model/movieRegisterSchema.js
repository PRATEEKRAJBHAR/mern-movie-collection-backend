const mongoose = require("mongoose");
const movieregisterSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    age: {
        required: true,
        type: Number,
        max: 100,
        min: 1
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    confirm_password: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
      role: {
        type: String,
         enum: ['user','admin'],
          default: 'user'
    }

})
module.exports = mongoose.model("Movieregister", movieregisterSchema)
