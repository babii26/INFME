import { Component} from '@angular/core';
import { User } from '../../../../models/user';
import { AuthService } from '../servicos/auth.servico';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
    users: User[] = [];
    loading = true;
    error: string | null = null;

    selectedUser?: User | undefined = {
      name: '',
      password: '',
      email: '',
      isAdmin: false,
      _id: ''
  };  

      // Inicializar o construtor com estes parâmetros sempre que quisermos "injetar" serviços na componente e/ou acrescentar navegabilidade (classe Router)
    constructor(private authService: AuthService, private router:Router) {}
  
    // Sempre que o admin aceder a componente "Admin", é invocado o método loadUsers para listar os utilizadores atuais
    ngOnInit(): void {
      this.loadUsers();
    }

    goToRegister() {
  this.router.navigate(['/register']);
}
  
  // Invoca o método getUsers implementado em "auth.service", que por sua vez envia a requisição HTTP ao backend para listar os utilizadores atuais
    loadUsers(): void {
      this.loading = true;
      this.authService.getUsers().subscribe(
        (data: User[]) => {
          this.users = data;
          this.loading = false;
        },
        (error: { message: string; }) => {
          this.error = error.message || 'Erro ao carregar utilizadores';
          this.loading = false;
        }
      );
    }

    // Atribui o utilizador selecionado (cujo botão foi selecionado) à variável selectedUser
    selectUser(user: User): void {
      this.selectedUser = user;
    }

  
    // Remove o utilizador atribuído à variável selectedUser. O método deleteUser implementado em "auth.service" envia a requisição DELETE ao backend
    deleteUser(): void {
      if (confirm('Tem certeza de que deseja excluir este utilizador?')) {
        if(this.selectedUser){
        this.authService.deleteUser(this.selectedUser._id).subscribe(
          (response: { message: any; }) => {
            console.log(response.message);
            // Atualizar a lista de utilizadores após a exclusão
            this.loadUsers();
          },
          () => {
            alert('Erro ao excluir o utilizador:');
          }
        );
      }
      }
    }

}
