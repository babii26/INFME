"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var accountType;
(function (accountType) {
    accountType["paciente"] = "PACIENTE";
    accountType["medico"] = "MEDICO";
    accountType["administ"] = "ADMIN";
})(accountType || (accountType = {}));
const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    userType: {
        type: String,
        required: false,
        enum: ["PACIENTE", "MEDICO", "ADMIN"] //Valores aceitáveis
    },
    isAdmin: { type: Boolean, default: false, required: false }, //n sei se são precisos admins, portanto por agora fica
    active: { type: Boolean, default: true, required: false },
});
userSchema.pre('save', function (next) {
    if (this.userType === "ADMIN") {
        this.isAdmin = true;
    }
    next();
});
const userModelo = mongoose.model('User', userSchema);
module.exports = userModelo;
