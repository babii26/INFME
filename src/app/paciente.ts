export interface PersonalInfo {
  age: string | null;
  gender: string | null;
  race: null;
  hasChildren: null;
}

export interface MedicalHistory {
  menarcheBefore12: null;
  menopause: null;
  hadCancerBefore: null;
  geneticProblems: null;
  hasBreatsCysts: null;
  hormonalTreatment: null;
}

export interface Lifestyle {
  exercisesRegularly: null;
  smokes: null;
  drinks: null;
  selfTracking: null;
}

export interface FamilyHistory {
  cancer: null;
}

export interface majorRiskFactors {
  sizeAndShapeChanges: null;
  breastTenderness: null;
  nippleDischarge: null;
  breastNodule: null;
  breastPain: null;
}

export interface respostasForm {
  personalInfo: PersonalInfo;
  medicalHistory: MedicalHistory;
  lifestyle: Lifestyle;
  familyHistory: FamilyHistory;
  majorRiskFactors:majorRiskFactors;
}

export interface paciente {
  _id: string;
  user: string;
  medico: string;
  respostasForm: respostasForm;
  numUtente: Number;
  morada: string;
  nacionalidade: string;

};
