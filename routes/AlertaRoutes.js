"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/AlertaRoutes.ts
const express_1 = __importDefault(require("express"));
const Alerta_1 = __importDefault(require("../models/Alerta"));
const router = express_1.default.Router();
// GET /alertas/medico/:medicoId
// Lista todos os alertas enviados para um médico
router.get('/medico/:medicoId', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const alertas = yield Alerta_1.default.find({ medicoId: req.params.medicoId }).sort({ data: -1 });
            res.status(200).json(alertas);
        }
        catch (error) {
            console.error('Erro ao buscar alertas do médico:', error);
            res.status(500).json({ error: 'Erro ao buscar alertas' });
        }
    });
});
// GET /alertas/paciente/:pacienteId
// Lista todos os alertas recebidos por um paciente
router.get('/paciente/:pacienteId', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const alertas = yield Alerta_1.default.find({ pacienteId: req.params.pacienteId }).sort({ data: -1 });
            res.status(200).json(alertas);
        }
        catch (error) {
            console.error('Erro ao buscar alertas do paciente:', error);
            res.status(500).json({ error: 'Erro ao buscar alertas' });
        }
    });
});
// PUT /alertas/:id/lido
// Marca um alerta como lido
router.put('/:id/lido', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const alerta = yield Alerta_1.default.findByIdAndUpdate(req.params.id, { lido: true }, { new: true });
            if (!alerta) {
                return res.status(404).json({ error: 'Alerta não encontrado' });
            }
            res.status(200).json(alerta);
        }
        catch (error) {
            console.error('Erro ao atualizar alerta:', error);
            res.status(500).json({ error: 'Erro ao atualizar alerta' });
        }
    });
});
exports.default = router;
