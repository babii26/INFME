// src/models/Pergunta.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPergunta extends Document {
  texto: string;
  peso: number;
}

const PerguntaSchema = new Schema<IPergunta>({
  texto: { type: String, required: true },
  peso: { type: Number, required: true }
});

export default mongoose.model<IPergunta>('Pergunta', PerguntaSchema);
