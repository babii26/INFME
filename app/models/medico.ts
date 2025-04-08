import mongoose = require("mongoose");

var Schema = mongoose.Schema;

  const physicianSchema = new Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    specialty: { type: String, required: true },

    alerts: [{
      alertNumber: { type: Number, default: 0 },
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
      message: [{ type: String }]
  }],

    })

const PhysicianModel = mongoose.model('Physician', physicianSchema);

module.exports = PhysicianModel;











