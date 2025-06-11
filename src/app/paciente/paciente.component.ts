import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { PacienteService } from '../services/paciente.service';

import { paciente } from '../paciente';
import { user } from '../user';
import { alerta } from '../alerta';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css',
})
export class PacienteComponent {
  User: user = {
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

  paciente: paciente = {
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

  medicoName: string = '';
  alertas:alerta[] = [];
  pacienteId: string | null = null;
  showAlertas:boolean = false;

  // Inicializar o construtor com estes parâmetros sempre que quisermos "injetar" serviços na componente e/ou acrescentar navegabilidade (classe Router)
  constructor(
    private authService: AuthService,
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Método executado ao aceder a componente. Portanto são listados os dados do paciente logo ao aceder esta componente (após login)
  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.paramMap.get('pacienteId');
    this.loadPatientData();
  }

  // Método para carregar os dados do paciente. Invoca o método getCurrentPatient implementado em "auth.service", que por sua vez envia a requisição HTTP para o backend
  loadPatientData(): void {
    this.authService.getPacienteByPacienteId(this.pacienteId).subscribe(
      (paciente: paciente) => {
        this.paciente = paciente;
        this.loadUserData();
        this.loadMedicoData();
      },
      (error) => {
        alert('Erro ao obter o paciente.' + error.message);
      }
    );
  }

  // Método para carregar os dados do paciente. Invoca o método getCurrentPatient implementado em "auth.service", que por sua vez envia a requisição HTTP para o backend
  loadUserData(): void {
    this.authService.getCurrentUser(this.paciente.user).subscribe(
      (user: user) => {
        this.User = user;
      },
      (error) => {
        alert('Erro ao obter o utilizador.'+ error.message);
      }
    );

    this.User = this.authService.UserAtual;
  }

  // Método para carregar os dados do paciente. Invoca o método getCurrentPatient implementado em "auth.service", que por sua vez envia a requisição HTTP para o backend
  loadMedicoData(): void {
    this.authService.getUserByMedicoId(this.paciente.medico).subscribe(
      (user: user) => {
        this.medicoName = user.firstName + ' ' + user.lastName;
      },
      (error) => {
        alert('Erro ao obter o paciente.' + error.message);
      }
    );
  }


  // Método esconde os alertas enquanto a variável showAlerts for false (valor default). A variável showAlerts é passada a true quando o paciente carrega no botão "Ver Alertas"
  loadAlertas(): void {
      this.authService
        .getAlertasByPacienteId(this.pacienteId)
        .subscribe(
          (data) => {
            this.alertas = data;
            this.showAlertas = true;
          },
          (error) => {
            alert(error.message);
           }
        );
  }

  closeAlertas():void{
    this.alertas = [];
    this.showAlertas = false;
  }
  // Método que redireciona o paciente para a componente "questionario" sempre que este selecionar a opção para preencher ou atualizar o questionário
  GoToFormulario(): void {
    this.router.navigate(['/formulario', {pacienteId : this.paciente._id}]);
  }
}
