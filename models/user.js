"use strict";
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
        required: false,
        enum: ["PACIENTE", "MEDICO"] //Valores aceitáveis
    },
    isAdmin: { type: Boolean, default: false, required: false }, //n sei se são precisos admins, portanto por agora fica
    active: { type: Boolean, default: true, required: false },
});
const userModel = mongoose.model('User', userSchema);
//export { userModel as User };
module.exports = userModel;
