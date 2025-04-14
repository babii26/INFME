// src/models/RespostaFormulario.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IRespostaItem {
  perguntaId: mongoose.Types.ObjectId;
  resposta: boolean;
}

export interface IRespostaFormulario extends Document {
  pacienteId: mongoose.Types.ObjectId;
  respostas: IRespostaItem[];
  dataResposta: Date;
}

const RespostaItemSchema = new Schema<IRespostaItem>({
  perguntaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pergunta', required: true },
  resposta: { type: Boolean, required: true }
});

const RespostaFormularioSchema = new Schema<IRespostaFormulario>({
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  respostas: [RespostaItemSchema],
  dataResposta: { type: Date, default: Date.now }
});

export default mongoose.model<IRespostaFormulario>('RespostaFormulario', RespostaFormularioSchema);
