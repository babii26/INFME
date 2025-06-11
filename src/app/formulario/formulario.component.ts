import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormularioService} from '../services/formulario.service';
import { AuthService } from '../services/auth.service';

import {paciente} from '../paciente';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {

  Paciente: paciente = {
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
      },
    },
  };

  pacienteId: string | null = null;

  constructor(private formService: FormularioService, private authService : AuthService, private router: Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.paramMap.get('pacienteId');
  }

  // Método utilizado para enviar as respostas do questionário através de um PUT (para além de gerar e enviar os alertas gerados)
  submitForm(){
      this.authService.adicionarQuestionario(this.pacienteId, this.Paciente.respostasForm).subscribe(
        (resposta : string ) => {
          alert("Alerta Enviado com sucesso.")
          this.router.navigate(['paciente', {pacienteId:this.authService.PacienteAtual._id}]);
        },
        error => {
          alert('Erro ao gravar o questionário:');
        }
      );
    }

}
