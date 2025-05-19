import { float } from "webidl-conversions";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const patientSchema = new Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  medico: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico'},
  peso: { type: Number, required: false},
  altura: { type: Number, required: false},
  NIF: { type: String, required: true},
  examesRealizados: { type: Number, required: false},
  historicoFamiliar: { type: String, required: false},
  dataNascimento: { type: Date, required: false},


  alerts: [{
    alertNumber: { type: Number, default: 0 },
    message: [{ type: String }]
}],

})

const Paciente = mongoose.model('Paciente', patientSchema);
module.exports = Paciente;