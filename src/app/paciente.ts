import { User } from "./user";

export interface Paciente extends User{
  user: string,
  medico: string,
  peso: number,
  altura: number,
  NIF: string,
  examesRealizados: number
  /*,
  historicoFamiliar: string,
  dataNascimento: Date,*/
}

export interface FormAnswers {
  personalInfo: {
    age?: number; 
    gender?: string; 
  };
  medicalHistory: {
    comorbidities: string[]; 
  };
  lifestyle: {
    exercisesRegularly?: boolean; 
    smokes?: boolean; 
  };
  familyHistory: {
    cancer?: boolean; 
    heartDisease?: boolean; 
  };
}

  export interface alerts {
    alertNumber: { type: Number, default: 0 },
    message: [{ type: String }]
}
