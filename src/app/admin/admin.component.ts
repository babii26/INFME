import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { user } from '../user';
import { medico } from '../medico';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  error: string | null = null;
  users: user[] = [];
  medicos: user[] = [];
  sortKey: string = '';
  sortDirection: boolean = true;
  selectedUser: user | null = null;
  showDoctorsModal: boolean = false;

  // Inicializar o construtor com estes parâmetros sempre que quisermos "injetar" serviços na componente e/ou acrescentar navegabilidade (classe Router)
  constructor(private authService: AuthService) {}

  // Sempre que o admin aceder a componente "Admin", é invocado o método loadUsers para listar os utilizadores atuais
  ngOnInit(): void {
    this.loadUsers();
  }

  // Invoca o método getUsers implementado em "auth.service", que por sua vez envia a requisição HTTP ao backend para listar os utilizadores atuais
  loadUsers(): void {
    this.authService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        alert(error.message);
        this.error = error.message || 'Erro ao carregar utilizadores';
      }
    );
  }

  sortData(key: keyof user): void {
    if (this.sortKey === key) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortKey = key;
      this.sortDirection = true;
    }

    this.users.sort((a, b) => {
      if (a[key] < b[key]) {
        return this.sortDirection ? -1 : 1;
      } else if (a[key] > b[key]) {
        return this.sortDirection ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  showUserDetails(user: user): void {
    this.selectedUser = user;
  }

  closeModal(): void {
    this.selectedUser = null;
  }

  closeDoctorsModal(): void {
    this.showDoctorsModal = false;
  }

  loadMedicos(): void {
    this.authService.getMedicos().subscribe(
      (data) => {
        this.medicos = data;
        this.showDoctorsModal = true;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  // Lógica para atribuir um médico ao usuário
  assignDoctor(user: user, medico: user): void {
    this.authService
      .assignDoctor(user, medico)
      .subscribe(
        (resposta: string) => {
          this.closeDoctorsModal();
          this.closeModal();
          alert('Médico atribuído com sucesso!')
        },
        (error) => {
          console.log(error);
          alert('Erro ao designar o médico:' );
        }
      );
  }

  ativarUtilizador(user: user): void {
    if (
      confirm('Tem certeza de que deseja alterar o estado deste utilizador?')
    ) {
      this.authService.ativarUtilizador(user._id).subscribe(
        (response) => {
          // Atualizar a lista de utilizadores após a exclusão
          this.loadUsers();
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
}
