import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { PacienteService } from '../services/paciente.service';
import { MedicoService } from '../services/medico.service';

import { user } from '../user';
import { medico } from '../medico';
import { paciente } from '../paciente';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private authService: AuthService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private router: Router
  ) {}

  novoUser: user = {
    _id: '',
    firstName: '',
    lastName: '',
    dataNascimento: new Date(),
    genero: '',
    email: '',
    nrTelemovel: 0,
    tipoUtilizador: '',
    estadoUtilizador: false,
    password: '',
    isAdmin: false,
  };

  novoMedico: medico = {
    _id: '',
    user: '',
    nrCedula: 0,
    especialidade: '',
  };

  novoPaciente: paciente = {
    _id: '',
    user: ',',
    medico: '',
    numUtente: 0,
    morada: '',
    nacionalidade: '',
    respostasForm: {
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
    },
  };

  onTipoUtilizadorChange(event: any) {
    this.novoUser.tipoUtilizador = event.target.value;
    // Reseta os campos na mudança de tipo
    this.novoMedico.nrCedula = 0;
    this.novoMedico.especialidade = '';
    this.novoPaciente.medico = '';
    this.novoPaciente.numUtente = 0;
    this.novoPaciente.morada = '';
    this.novoPaciente.nacionalidade = '';
  }

  // Método executado ao aceder submeter o formulário do componente register
  onSubmit() {
    console.log(this.novoUser);
    console.log(this.novoPaciente);
    this.registarUser();
    this.router.navigate(['login']); // Garante que após registar o novo utilizador, regressamos à componente do login
  }

  // Invoca o método createUser implementado na service "auth.service", que por sua vez envia a requisição HTTP para o backend
  registarUser() {
    this.authService.createUser(this.novoUser).subscribe(
      (response: any) => {
        const userId = response.utilizador._id;
        if (this.novoUser.tipoUtilizador === 'medico') {
          this.novoMedico.user = userId;
          this.createMedico();
        } else if (this.novoUser.tipoUtilizador === 'paciente') {
          this.novoPaciente.user = userId;
          this.createPaciente();
        }
      },
      (error) => {
        alert('Erro ao registar o utilizador.');
      }
    );
  }

  // Invoca o método createUser implementado na service "auth.service", que por sua vez envia a requisição HTTP para o backend
  createUser() {
    this.authService.createUser(this.novoUser).subscribe(
      (response) => {
        alert('Utilizador registado com sucesso!');
      },
      (error) => {
        alert('Erro ao registar utilizador.');
      }
    );
  }

  // Invoca o método createPhysician implementado na service "physician.service", que por sua vez envia a requisição HTTP para o backend
  createMedico() {
    this.medicoService.createMedico(this.novoMedico).subscribe(
      (response) => {
        alert('Médico registado com sucesso!');
      },
      (error) => {
        alert('Erro ao registar o médico.');
      }
    );
  }

  // Invoca o método createPatient implementado na service "patient.service", que por sua vez envia a requisição HTTP para o backend
  createPaciente() {
    this.pacienteService.createPaciente(this.novoPaciente).subscribe(
      (response) => {
        alert('Paciente registado com sucesso!');
      },
      (error) => {
        alert('Erro ao registar paciente');
      }
    );
  }
}
