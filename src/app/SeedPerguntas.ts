// src/models/seedPerguntas.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pergunta from './Pergunta';

dotenv.config();

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/prostata';

const perguntas = [
  { texto: "Tem historial familiar de cancro da próstata?", peso: 3 },
  { texto: "Algum familiar direto (pai, irmão) teve cancro da próstata antes dos 65 anos?", peso: 3 },
  { texto: "Tem familiares com outros tipos de cancro (ex: mama, ovário, pâncreas)?", peso: 2 },
  { texto: "Tem mais de 50 anos?", peso: 2 },
  { texto: "Tem ascendência africana ou afrodescendente?", peso: 2 },
  { texto: "Já realizou testes genéticos associados a risco de cancro (BRCA1, BRCA2)?", peso: 1 },
  { texto: "Já foi diagnosticado com hiperplasia benigna da próstata (HBP)?", peso: 2 },
  { texto: "Já realizou algum exame de PSA (Antígeno Específico da Próstata)?", peso: 1 },
  { texto: "Já realizou toque retal?", peso: 1 },
  { texto: "Algum médico já lhe recomendou biópsia da próstata?", peso: 2 },
  { texto: "Já teve prostatite (inflamação da próstata)?", peso: 1 },
  { texto: "Já foi submetido a tratamento hormonal?", peso: 2 },
  { texto: "Tem dificuldade em iniciar a micção?", peso: 2 },
  { texto: "O jato de urina é fraco ou interrompido?", peso: 2 },
  { texto: "Sente necessidade frequente de urinar, especialmente à noite?", peso: 2 },
  { texto: "Tem urgência para urinar?", peso: 2 },
  { texto: "Sente dor ou ardor ao urinar?", peso: 1 },
  { texto: "Já notou sangue na urina?", peso: 3 },
  { texto: "Já notou sangue no sémen?", peso: 2 },
  { texto: "Sente dor na região lombar?", peso: 1 },
  { texto: "Sente dor na zona pélvica ou entre os testículos e o ânus?", peso: 2 },
  { texto: "Sente dor ao ejacular?", peso: 2 },
  { texto: "Sente dor nos ossos (especialmente costas, ancas ou coxas)?", peso: 3 },
  { texto: "Tem disfunção erétil frequente?", peso: 1 },
  { texto: "Notou diminuição da libido nos últimos meses?", peso: 1 },
  { texto: "Fuma ou já fumou regularmente?", peso: 2 },
  { texto: "Consome bebidas alcoólicas com freqüuência?", peso: 1 },
  { texto: "A sua alimentação é rica em gorduras animais e pobre em vegetais?", peso: 2 },
  { texto: "Pratica atividade física menos de 2 vezes por semana?", peso: 1 },
  { texto: "Está exposto a ambientes com produtos químicos (ex: pesticidas, metais pesados)?", peso: 2 }
];

const seed = async () => {
  try {
    await mongoose.connect(mongodbUri);
    await Pergunta.deleteMany({});
    await Pergunta.insertMany(perguntas);
    console.log('✅ Perguntas inseridas com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao inserir perguntas:', err);
    process.exit(1);
  }
};

seed();