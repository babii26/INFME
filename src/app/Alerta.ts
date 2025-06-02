import mongoose, { Schema, Document } from 'mongoose';

export interface IAlerta extends Document {
  pacienteId: mongoose.Types.ObjectId;
  medicoId: mongoose.Types.ObjectId;
  mensagem: string;
  risco: 'BAIXO' | 'MODERADO' | 'ELEVADO';
  data: Date;
  lido: boolean;
}

const AlertaSchema = new Schema<IAlerta>({
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  medicoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true },
  mensagem: { type: String, required: true },
  risco: { type: String, enum: ['BAIXO', 'MODERADO', 'ELEVADO'], required: true },
  data: { type: Date, default: Date.now },
  lido: { type: Boolean, default: false }
});

export default mongoose.model<IAlerta>('Alerta', AlertaSchema);
