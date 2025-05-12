"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const patientSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medico: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico' },
    peso: { type: Number, required: true },
    altura: { type: Number, required: true },
    NIF: { type: String, required: true },
    examesRealizados: { type: Number, required: true },
    historicoFamiliar: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    alerts: [{
            alertNumber: { type: Number, default: 0 },
            message: [{ type: String }]
        }],
});
const Paciente = mongoose.model('Paciente', patientSchema);
module.exports = Paciente;
