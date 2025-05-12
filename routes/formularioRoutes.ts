import express from 'express';
import Pergunta from '../models/Pergunta';
import RespostaFormulario from '../models/RespostaFormulario';
import Alerta from '../models/Alerta';

const router = express.Router();

// POST /formulario/responder
router.post('/responder', async (req:any, res:any) => {
  try {
    const { pacienteId, medicoId, respostas } = req.body;

    if (!pacienteId || !medicoId || !respostas || !Array.isArray(respostas)) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const perguntaIds = respostas.map((r: any) => r.perguntaId);
    const perguntas = await Pergunta.find({ _id: { $in: perguntaIds } });

    let total = 0;
    respostas.forEach((r: any) => {
      const pergunta = perguntas.find(p => p._id.toString() === r.perguntaId);
      if (pergunta && r.resposta === true) {
        total += pergunta.peso;
      }
    });

    let risco: 'BAIXO' | 'MODERADO' | 'ELEVADO' = 'BAIXO';
    if (total >= 15) risco = 'ELEVADO';
    else if (total >= 7) risco = 'MODERADO';

    const novaResposta = await RespostaFormulario.create({
      pacienteId,
      medicoId,
      respostas,
      risco
    });

    const mensagem = `O paciente ${pacienteId} tem ${risco} risco  de cancro da próstata.`;

    await Alerta.create({
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
  } catch (error) {
    console.error('Erro ao processar o formulário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /formulario/perguntas
router.get('/perguntas', async (_req, res) => {
  try {
    const perguntas = await Pergunta.find().sort({ _id: 1 });
    res.json(perguntas);
  } catch (err) {
    console.error('Erro ao buscar perguntas:', err);
    res.status(500).json({ error: 'Erro ao buscar perguntas' });
  }
});

// GET /formulario/respostas/:pacienteId
router.get('/respostas/:pacienteId', async (req, res) => {
  try {
    const respostas = await RespostaFormulario.find({ pacienteId: req.params.pacienteId })
      .populate('respostas.perguntaId', 'texto peso')
      .sort({ dataResposta: -1 });

    res.json(respostas);
  } catch (err) {
    console.error('Erro ao buscar respostas:', err);
    res.status(500).json({ error: 'Erro ao buscar respostas' });
  }
});

export default router;
