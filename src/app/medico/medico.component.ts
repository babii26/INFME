import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { medico } from '../medico';
import { user } from '../user';
import { paciente } from '../paciente';
import { alerta } from '../alerta';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
})
export class MedicoComponent implements OnInit {
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

  Medico: medico = {
    _id: '',
    user: '',
    nrCedula: 0,
    especialidade: '',
  };

  isLoading: boolean = true;
  error: string | null = null;
  PacientesUser: user[] = [];
  Pacientes: paciente[] = [];
  alertas: alerta[] = [];
  combinedList: any[] = [];
  medicoId: string | null = null;
  showMedicoDetails: boolean = false;

  filteredPacientes: paciente[] = [];
  itemCombinedList: any | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.medicoId = this.route.snapshot.paramMap.get('medicoId');
    await this.loadMedicoData();
    await this.loadUsers();
    await this.loadPacientes();
    await this.combinarListas();
    // await this.loadAlertas();
    this.isLoading = false;
  }

  async loadMedicoData(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.authService.getMedicoById(this.medicoId).subscribe(
        (medico: medico) => {
          this.Medico = medico;
          this.loadMedicoUserData();
          resolve();
        },
        (error) => {
          console.error('Erro ao obter o médico', error);
          alert('Erro ao obter o médico :' + error.message);
          reject(error);
        }
      );
      this.Medico = this.authService.MedicoAtual;
    });
  }

  loadMedicoUserData(): void {
    this.authService.getUserByMedicoId(this.medicoId).subscribe(
      (user: user) => {
        this.User = user;
      },
      (error) => {
        alert('Erro ao obter o utilizador do médico.');
      }
    );
    this.User = this.authService.UserAtual;
  }

  async loadUsers(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.authService.getUsersByMedicoId(this.medicoId).subscribe(
        (data) => {
          this.PacientesUser = data;
          resolve();
        },
        (error) => {
          alert(error.message);
          this.error = error.message || 'Erro ao carregar utilizadores';
          reject(error);
        }
      );
    });
  }

  async loadPacientes(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.authService.getPacientesByMedicoId(this.medicoId).subscribe(
        (data) => {
          this.Pacientes = data;
          resolve();
        },
        (error) => {
          alert(error.message);
          this.error = error.message || 'Erro ao carregar Pacientes';
          reject(error);
        }
      );
    });
  }

  async loadAlertas(pacienteId:string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.authService
        .getAlertasByPacienteId(pacienteId)
        .subscribe(
          (data) => {
            this.alertas = data;
            console.log(this.alertas);
            resolve();
          },
          (error) => {
            alert(error.message);
            this.error = error.message || 'Erro ao carregar Pacientes';
            reject(error);
          }
        );
    });
  }

  toggleMedicoDetails(): void {
    this.showMedicoDetails = !this.showMedicoDetails;
  }

  async verMaisDetalhes(item: any): Promise <void> {
    if (this.itemCombinedList == null) {
      this.itemCombinedList = item;
      await this.loadAlertas(item.paciente._id);
    } else {
      this.itemCombinedList = null;
    }
  }

  async combinarListas(): Promise<void> {
    for (let i = 0; i < this.PacientesUser.length; i++) {
      this.combinedList.push({
        pacienteUser: this.PacientesUser[i],
        paciente: this.Pacientes[i],
      });
    }

  }
}
