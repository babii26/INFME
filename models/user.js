"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var accountType;
(function (accountType) {
    accountType["paciente"] = "PACIENTE";
    accountType["medico"] = "MEDICO";
})(accountType || (accountType = {}));
const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    userType: {
        type: String,
        required: true,
        enum: ["PACIENTE", "MEDICO"] //Valores aceitáveis
    },
    isAdmin: { type: Boolean, default: false }, //n sei se são precisos admins, portanto por agora fica
});
const userModel = mongoose.model('User', userSchema);
exports.User = userModel;
//module.exports = userModel;
