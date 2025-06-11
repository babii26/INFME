import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { respostasForm } from '../paciente'


@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  formData: respostasForm = {
    personalInfo: {
      age: null,
      gender: null,
      race: null,
      hasChildren: null,
    },
    medicalHistory: {
      menarcheBefore12: null,
      menopause: null,
      hadCancerBefore: null,
      geneticProblems: null,
      hasBreatsCysts: null,
      hormonalTreatment: null,
    },
    lifestyle: {
      exercisesRegularly: null,
      smokes: null,
      drinks: null,
      selfTracking: null,
    },
    familyHistory: {
      cancer: null,
    },
    majorRiskFactors: {
      sizeAndShapeChanges: null,
      breastTenderness: null,
      nippleDischarge: null,
      breastNodule: null,
      breastPain: null,
    }
  };

  getFormData() {
    return this.formData;
  }

  updateSection(section: keyof respostasForm, data: any) {
    this.formData[section] = { ...this.formData[section], ...data };
  }

  getSummaryData() {
    const sections = [
      { name: 'Informação Pessoal', key: 'personalInfo' as keyof respostasForm },
      { name: 'Histórico Médico', key: 'medicalHistory' as keyof respostasForm },
      { name: 'Estilo de Vida', key: 'lifestyle' as keyof respostasForm },
      { name: 'Histórico Familiar', key: 'familyHistory' as keyof respostasForm },
      { name: 'Principais Fatores de Risco', key: 'majorRiskFactors' as keyof respostasForm },
    ];

    const summary = sections.map(section => {
      const data = this.formData[section.key];
      return {
        title: section.name,
        data: Object.keys(data).map(key => ({
          label: this.humanizeLabel(key),
          value: this.formatValue(data, key as keyof typeof data)
        }))
      };
    });

    return summary;
  }

  private humanizeLabel(label: string): string {
    return label
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/_/g, ' ');
  }

  private formatValue(data: any, key: keyof typeof data): string {
    return data[key] === true ? 'Sim' : data[key] === false ? 'Não' : data[key];
  }
}
