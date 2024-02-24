const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 3,
        max : 30,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        min : 6,
        max : 40,
    }
}) 

module.exports = mongoose.model("UserDetails", UserSchema);