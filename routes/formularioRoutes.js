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
const express_1 = __importDefault(require("express"));
const Pergunta_1 = __importDefault(require("../models/Pergunta"));
const RespostaFormulario_1 = __importDefault(require("../models/RespostaFormulario"));
const Alerta_1 = __importDefault(require("../models/Alerta"));
const router = express_1.default.Router();
// POST /formulario/responder
router.post('/responder', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pacienteId, medicoId, respostas } = req.body;
        if (!pacienteId || !medicoId || !respostas || !Array.isArray(respostas)) {
            return res.status(400).json({ error: 'Dados inválidos' });
        }
        const perguntaIds = respostas.map((r) => r.perguntaId);
        const perguntas = yield Pergunta_1.default.find({ _id: { $in: perguntaIds } });
        let total = 0;
        respostas.forEach((r) => {
            const pergunta = perguntas.find(p => p._id.toString() === r.perguntaId);
            if (pergunta && r.resposta === true) {
                total += pergunta.peso;
            }
        });
        let risco = 'BAIXO';
        if (total >= 15)
            risco = 'ELEVADO';
        else if (total >= 7)
            risco = 'MODERADO';
        const novaResposta = yield RespostaFormulario_1.default.create({
            pacienteId,
            medicoId,
            respostas,
            risco
        });
        const mensagem = `O paciente ${pacienteId} tem ${risco} risco  de cancro da próstata.`;
        yield Alerta_1.default.create({
            pacienteId,
            medicoId,
            mensagem,
            risco
        });
        return res.status(201).json({
            message: 'Formulário submetido com sucesso.',
            risco,
            alerta: mensagem
        });
    }
    catch (error) {
        console.error('Erro ao processar o formulário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}));
// GET /formulario/perguntas
router.get('/perguntas', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const perguntas = yield Pergunta_1.default.find().sort({ _id: 1 });
        res.json(perguntas);
    }
    catch (err) {
        console.error('Erro ao buscar perguntas:', err);
        res.status(500).json({ error: 'Erro ao buscar perguntas' });
    }
}));
// GET /formulario/respostas/:pacienteId
router.get('/respostas/:pacienteId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respostas = yield RespostaFormulario_1.default.find({ pacienteId: req.params.pacienteId })
            .populate('respostas.perguntaId', 'texto peso')
            .sort({ dataResposta: -1 });
        res.json(respostas);
    }
    catch (err) {
        console.error('Erro ao buscar respostas:', err);
        res.status(500).json({ error: 'Erro ao buscar respostas' });
    }
}));
exports.default = router;
