// src/routes/AlertaRoutes.ts
import express from 'express';
import Alerta from '../Frontend/src/app/Alerta';


const router = express.Router();

// GET /alertas/medico/:medicoId
// Lista todos os alertas enviados para um médico
router.get('/medico/:medicoId', async function(req:any, res:any) {
  try {
    const alertas = await Alerta.find({ medicoId: req.params.medicoId }).sort({ data: -1 });
    res.status(200).json(alertas);
  } catch (error) {
    console.error('Erro ao buscar alertas do médico:', error);
    res.status(500).json({ error: 'Erro ao buscar alertas' });
  }
});

// GET /alertas/paciente/:pacienteId
// Lista todos os alertas recebidos por um paciente
router.get('/paciente/:pacienteId', async function(req:any, res:any) {
  try {
    const alertas = await Alerta.find({ pacienteId: req.params.pacienteId }).sort({ data: -1 });
    res.status(200).json(alertas);
  } catch (error) {
    console.error('Erro ao buscar alertas do paciente:', error);
    res.status(500).json({ error: 'Erro ao buscar alertas' });
  }
});

// PUT /alertas/:id/lido
// Marca um alerta como lido
router.put('/:id/lido',async function(req:any, res:any){
  try {
    const alerta = await Alerta.findByIdAndUpdate(
      req.params.id,
      { lido: true },
      { new: true }
    );

    if (!alerta) {
      return res.status(404).json({ error: 'Alerta não encontrado' });
    }

    res.status(200).json(alerta);
  } catch (error) {
    console.error('Erro ao atualizar alerta:', error);
    res.status(500).json({ error: 'Erro ao atualizar alerta' });
  }
});

export default router;
