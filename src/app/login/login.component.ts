import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { paciente } from '../paciente';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = '';

  // Inicializar o construtor com estes parâmetros sempre que quisermos "injetar" serviços na componente e/ou acrescentar navegabilidade (classe Router)
  constructor(private authService: AuthService, private router: Router) {}

  // Invoca a função login implementada em "auth.service". Consoante o tipo de utilizador selecionado no formulário de login (variável userType), o utilizador é redirecionado para a componente adequada
  login(): void {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials.email, credentials.password).subscribe(
      (response) => {
        if (response && response.token) {
          alert('Login realizado com sucesso!');
          if (this.authService.userType === 'paciente') {
            this.router.navigate(['paciente', {pacienteId:this.authService.PacienteAtual._id}]);
          } else if (this.authService.userType === 'medico') {
            this.router.navigate(['medico', {medicoId:this.authService.MedicoAtual._id}]);
          } else if (this.authService.userType === 'admin') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          alert(response.message);
        }
      },
      (error) => {
        alert('Erro ao realizar login.' + error.message);
      }
    );
  }
}
