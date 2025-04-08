import mongoose = require("mongoose");

var Schema = mongoose.Schema;

const patientSchema = new Schema({
    
 physician: { type: mongoose.Schema.Types.ObjectId, ref: 'Physician'},

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    
  formAnswers: {
    personalInfo: {
      age: { type: Number, default: null },
      gender: { type: String, default: null },
    },
    medicalHistory: {
      comorbidities: [{ type: String }],
    },
    lifestyle: {
      exercisesRegularly: { type: Boolean, default: null },
      smokes: { type: Boolean, default: null },
    },
    familyHistory: {
      cancer: { type: Boolean, default: null },
      heartDisease: { type: Boolean, default: null },
    },
  },

  alerts: [{
    alertNumber: { type: Number, default: 0 },
    message: [{ type: String }]
}],

})

// Interface para representar as respostas do formulário
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

   export default FormAnswers;

    const patientModel = mongoose.model('Patient', patientSchema);
    module.exports = patientModel;

