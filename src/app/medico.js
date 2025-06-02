"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medico = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const physicianSchema = new Schema({
    licençaMedica: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    alerts: [{
            alertNumber: { type: Number, default: 0 },
            //patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
            message: [{ type: String }]
        }],
});
//export const Physician = User.discriminator('Physician', physicianSchema);
exports.Medico = mongoose.model('Médico', physicianSchema);
module.exports = exports.Medico;
/*
const drSmith = new Physician({
  userType: "PHYSICIAN", // Required
  medicalLicense: "ABC123"
});
*/ 
