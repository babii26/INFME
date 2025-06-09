import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../user'
import { catchError, map, switchMap } from 'rxjs/operators';
import { Paciente } from '../paciente'
import { Medico } from '../medico';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/med';  // URL base da aplicação backend

  currentUser: User = {
    name: '',
    password: '',
    email: '',
    isAdmin: false,
    _id: ''
  };

  currentPatient: Paciente = {
    medico: '',
    user: '',
    name: '',
    password: '',
    email: '',
    peso: 0,
    altura: 0,
    NIF: '',
    examesRealizados: 0,
    isAdmin: false,
    /*formAnswers: {
        personalInfo: {
            age: null,
            gender: null
        },
        medicalHistory: {
            comorbidities: []
        },
        lifestyle: {
            exercisesRegularly: null,
            smokes: null
        },
        familyHistory: {
            cancer: null,
            heartDisease: null
        }
    },
    alerts: [
        {
            alertNumber: 0,
            message: []
        }
    ],*/
    _id: ''
  };

  userId: string = '';
  userToken: any | null = null;
  userType: any | null = null;
  physicianID: any | null = null;
  patientID: any | null = null;


  // Inicializar o construtor com estes parâmetros já que os métodos desta classe fazem requisições HTTP e navegabilidade (classe Router)
  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined') { // Garantir que o localStorage só está a ser acedido a partir do lado cliente
      this.userToken = localStorage.getItem('userToken');
      this.userId = localStorage.getItem('userId') || '';
      this.userType = localStorage.getItem('userType');
      this.physicianID = localStorage.getItem('physicianID');
      this.patientID = localStorage.getItem('patientID');
    }
  }

  // Envia uma requisição HTTP ao backend para fazer o login. Os dados do utilizador (ID, token, tipo) são guardados. 
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email, password });

    return this.http.post(`${this.baseUrl}/login`, body, { headers }).pipe(
      switchMap((response: any) => {
        if (response && response.token) {
          this.userId = response.userId;
          this.userType = response.userType;
          this.userToken = response.token;

          if (typeof window !== 'undefined') {
            localStorage.setItem('userToken', this.userToken);
            localStorage.setItem('userId', this.userId);
            localStorage.setItem('userType', this.userType);
          }

          return this.getCurrentUser().pipe(
            switchMap((user: User) => {    
              this.currentUser = user;

              if (response.userType === 'physician') { // Se for médico, é obtido o ID do médico que corresponde ao user em questão
                return this.fetchPhysicianId(response.userId).pipe(
                  map((physicianId: string) => {
                    this.physicianID = physicianId;
                    localStorage.setItem('physicianID', physicianId);
                    return response;
                  })
                );
              } else if (response.userType === 'patient') {// Se for paciente, são carregados os dados do paciente que corresponde ao user em questão
                return this.fetchPatientById(response.userId).pipe(
                  map((patient: Paciente) => {
                    this.currentPatient = patient;
                    localStorage.setItem('patientID', patient._id);
                    return response;
                  })
                );
              } else {   
                return of(response);
              }
            })
          );
        }
        return of(null); // Retorna null se não houver uma resposta adequada
      })
    );
  }


  //POST para registar um novo utilizador 
  createUser(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Register/User', user);
  }


  // GET para Listar os utilizadores todos (adm)
  getUsers(): Observable<any> {

    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';

    const headers = new HttpHeaders().set('x-access-token', token || '');

    return this.http.get<any>(this.baseUrl + '/ListUsers', { headers }).pipe(
      catchError((error: any) => {
        console.error('Erro ao buscar utilizadores', error);
        return throwError(error);
      })
    );
  }


  // Obter o médico através do ID do utilizador
  fetchPhysician(userId: string | null): Observable<Medico | null> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';

    const headers = new HttpHeaders().set('x-access-token', token || '');
    const url = `${this.baseUrl}/physicians/user/${userId}`;

    return this.http.get<{ physician: Medico | null }>(url, { headers }).pipe(
      map((response: { physician: any; }) => response?.physician || null), // Extraia o physician do objeto retornado
      catchError((error: any) => {
        console.error('Error fetching physician:', error);
        return of(null); // Retorna um Observable com valor null em caso de erro
      })
    );
  }

  // Obter o ID do médico através do seu ID de utilizador
  private fetchPhysicianId(userId: string): Observable<string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';

    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get<{ physicianId: string }>(`${this.baseUrl}/physicians/user/${userId}`, { headers }).pipe(
      map((response: { physicianId: any; }) => response.physicianId)
    );
  }


  // Obter o paciente através do seu ID de utilizador
  fetchPatientById(userId: string): Observable<Paciente> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';

    const headers = new HttpHeaders().set('x-access-token', token || '');

    return this.http.get<{ patient: Paciente }>(`${this.baseUrl}/patients/user/${userId}`, { headers }).pipe(
      map((response: { patient: any; }) => response.patient)
    );
  }


  // Listar os pacientes através do ID do médico
  listPatientByPhysicianId(): Observable<Paciente[]> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';
    const physician_id = typeof window !== 'undefined' ? localStorage.getItem('physicianID') : '';


    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get<{ patients: Paciente[] }>(`${this.baseUrl}/ListPatients/${physician_id}`, { headers }).pipe(
      map((response: { patients: any; }) => response.patients)
    );
  }


  // Método invocado após o login para obter os dados do utilizador atual 
  getCurrentUser(): Observable<User> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';
    const user_id = typeof window !== 'undefined' ? localStorage.getItem('userId') : '';

    const headers = new HttpHeaders().set('x-access-token', token || '');
    return this.http.get<{ user: User }>(`${this.baseUrl}/Users/${user_id}`, { headers }).pipe(
      map((response: { user: any; }) => response.user)
    );
  }

  // DELETE para remover um utilizador específico
  deleteUser(userId?: string | undefined): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : '';

    const headers = new HttpHeaders().set('x-access-token', token || '');

    return this.http.delete<any>(`${this.baseUrl}/DeleteUser/${userId}`, { headers }).pipe(
      catchError((error: { message: string; }) => {
        throw 'Erro ao excluir o utilizador: ' + error.message;
      })
    );
  }

  // Retorna o token do utilizador atual
  getCurrentUserToken(): string | null {
    return this.userToken;
  }

  // Carrega os dados do paciente atual através do método GET
  getCurrentPatient(): Observable<Paciente> {
    const patient_id = typeof window !== 'undefined' ? localStorage.getItem('patientID') : '';

    return this.http.get<{ patient: Paciente }>(`${this.baseUrl}/patients/${patient_id}`).pipe(
      map((response: { patient: any; }) => response.patient)
    );
  }


  // "Limpa" os dados todos após logout e redireciona o utilizador para a página inicial
  logout(): void {
    this.userToken = null;
    this.userId = '';
    this.userToken = null;
    this.userType = null;
    this.physicianID = null;
    this.patientID = null;

    // Limpa as variáveis guardadas no localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userType');
      localStorage.removeItem('physicianID');
      localStorage.removeItem('patientID');
    }

    this.currentUser = {
      name: '',
      password: '',
      email: '',
      isAdmin: false,
      _id: ''
    };

    this.currentPatient = {
      medico: '',
      user: '',
      name: '',
      password: '',
      email: '',
      peso: 0,
      altura: 0,
      NIF: '',
      examesRealizados: 0,
      isAdmin: false,

      /*
      formAnswers: {
          personalInfo: {
              age: null,
              gender: null
          },
          medicalHistory: {
              comorbidities: []
          },
          lifestyle: {
              exercisesRegularly: null,
              smokes: null
          },
          familyHistory: {
              cancer: null,
              heartDisease: null
          }
      },
      alerts: [
          {
              alertNumber: 0,
              message: []
          }
      ],*/
      _id: ''
    };

    this.router.navigate(['/login']);
  }

}
