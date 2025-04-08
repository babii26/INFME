import mongoose = require("mongoose");

var Schema = mongoose.Schema;

  const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    })

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;








