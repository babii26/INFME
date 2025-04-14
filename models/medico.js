"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Physician = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const user_1 = require("./user");
const physicianSchema = new Schema({
    licençaMedica: { type: String, required: true },
    alerts: [{
            alertNumber: { type: Number, default: 0 },
            patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
            message: [{ type: String }]
        }],
});
exports.Physician = user_1.User.discriminator('Physician', physicianSchema);
// Later:
/*
const drSmith = new Physician({
  userType: "PHYSICIAN", // Required
  medicalLicense: "ABC123"
});
*/ 
