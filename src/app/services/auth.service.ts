import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';

import { user } from '../user';
import { medico } from '../medico';
import { paciente, respostasForm } from '../paciente';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  // URL base da aplicação backend
  private baseUrl = 'http://localhost:8080/app';

  UserAtual: user = {
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

  MedicoAtual: medico = {
    _id: '',
    user: '',
    nrCedula: 0,
    especialidade: '',
  };

  PacienteAtual: paciente = {
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

  userId: string = '';
  userType: any = null;
  pacienteID: any = null;

  // Envia uma requisição HTTP ao backend para fazer o login. Os dados do utilizador (ID, token, tipo) são guardados.
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email, password });

    return this.http.post(`${this.baseUrl}/login`, body, { headers }).pipe(
      switchMap((response: any) => {
        if (response && response.token) {
          this.userId = response.userId;
          this.userType = response.userType;

          localStorage.setItem('token', response.token);

          return this.getCurrentUser(this.userId).pipe(
            switchMap((user: user) => {
              this.UserAtual = user;

              if (response.userType === 'medico') {
                // Se for médico, é obtido o ID do médico que corresponde ao user em questão
                return this.getMedicoByUserId(response.userId).pipe(
                  map((medico: medico) => {
                    this.MedicoAtual = medico;
                    return response;
                  })
                );
              } else if (response.userType === 'paciente') {
                // Se for paciente, são carregados os dados do paciente que corresponde ao user em questão
                return this.getPacienteByUserId(response.userId).pipe(
                  map((paciente: paciente) => {
                    this.PacienteAtual = paciente;
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

  //Faz um POST para registar um novo utilizador
  createUser(user: user): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/registar/utilizador', user);
  }

  // Invocado após o login para obter os dados do utilizador
  getCurrentUser(userId: string): Observable<user> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );
    return this.http
      .get<{ user: user }>(`${this.baseUrl}/utilizadores/${userId}`, {
        headers,
      })
      .pipe(map((response) => response.user));
  }

  // Obter o ID do médico através do seu ID
  getMedicoByUserId(userId: string | null): Observable<medico> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );
    return this.http
      .get<{ medico: medico }>(`${this.baseUrl}/medicos/Utilizador/${userId}`, {
        headers,
      })
      .pipe(map((response) => response.medico));
  }

  // Obter o ID do médico através do seu ID
  getMedicoById(medicoId: string | null): Observable<medico> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );
    return this.http
      .get<{ medico: medico }>(`${this.baseUrl}/medicos/${medicoId}`, {
        headers,
      })
      .pipe(map((response) => response.medico));
  }

  // Obter o ID do médico através do seu ID
  getUserByMedicoId(medicoId: string | null): Observable<user> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );
    return this.http
      .get<{ user: user }>(`${this.baseUrl}/utilizador/medico/${medicoId}`, {
        headers,
      })
      .pipe(map((response) => response.user));
  }

  // Obter o paciente através do seu ID de utilizador
  getPacienteByUserId(userId: string | null): Observable<paciente> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );

    return this.http
      .get<{ paciente: paciente }>(
        `${this.baseUrl}/pacientes/utilizador/${userId}`,
        {
          headers,
        }
      )
      .pipe(map((response) => response.paciente));
  }

  // Obter o paciente através do seu ID
  getPacienteByPacienteId(userId: string | null): Observable<paciente> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );

    return this.http
      .get<{ paciente: paciente }>(`${this.baseUrl}/pacientes/${userId}`, {
        headers,
      })
      .pipe(map((response) => response.paciente));
  }

  // Faz um GET para Listar os utilizadores todos (admin)
  getUsers(): Observable<any> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );

    return this.http
      .get<any>(this.baseUrl + '/listarUtilizadores', { headers })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  // Faz um GET para Listar os utilizadores todos (admin)
  getMedicos(): Observable<any> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );

    return this.http
      .get<any>(this.baseUrl + '/listarMedicos', { headers })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getUsersByMedicoId(medicoId: string | null): Observable<any> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );

    return this.http
      .get<any>(`${this.baseUrl}/listarUtilizadores/Medico/${medicoId}`, {
        headers,
      })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  //Recebe lista que contem Users e Pacientes
  getPacientesByMedicoId(medicoId: string | null): Observable<any> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );

    return this.http
      .get<any>(`${this.baseUrl}/listarPacientes/medico/${medicoId}`, {
        headers,
      })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getAlertasByPacienteId(pacienteId: string | null): Observable<any> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );

    return this.http
      .get<any>(`${this.baseUrl}/listarAlertas/${pacienteId}`, { headers })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  // Faz um put para alterar um utilizador
  ativarUtilizador(userId?: string | undefined): Observable<any> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );

    return this.http
      .put(`${this.baseUrl}/estadoUtilizador/${userId}`, null, { headers })
      .pipe(
        catchError((error) => {
          throw 'Erro ao alterar o estado do utilizador: ' + error.message;
        })
      );
  }

  // Método utilizado para enviar as respostas do questionário através de um PUT (para além de gerar e enviar os alertas gerados)
  adicionarQuestionario(
    pacienteId: string | null,
    respostasForms: respostasForm
  ): Observable<any> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );

    return this.http.put(
      `${this.baseUrl}/pacientes/questionario/${pacienteId}`,
      { respostasForms },
      { headers }
    );
  }

  assignDoctor(user: user, medico: user): Observable<any> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('token') || ''
    );

    const info = { user, medico };

    return this.http.put(
      `${this.baseUrl}/pacientes/designarMedico`,
      { info },
      { headers }
    );
  }

  // "Limpa" os dados todos após logout e redireciona o utilizador para a página inicial
  logout(): void {
    this.userId = '';
    this.userType = null;
    this.pacienteID = null;

    this.UserAtual = {
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

    this.MedicoAtual = {
      _id: '',
      user: '',
      nrCedula: 0,
      especialidade: '',
    };

    this.PacienteAtual = {
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
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
