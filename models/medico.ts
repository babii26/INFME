var mongoose = require("mongoose");
var Schema = mongoose.Schema;

import { User } from './user';

const physicianSchema = new Schema({
  licençaMedica: { type: String, required: true },

  alerts: [{
    alertNumber: { type: Number, default: 0 },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    message: [{ type: String }]
}],
});

export const Physician = User.discriminator('Physician', physicianSchema);

// Later:
/*
const drSmith = new Physician({
  userType: "PHYSICIAN", // Required
  medicalLicense: "ABC123"
});
*/