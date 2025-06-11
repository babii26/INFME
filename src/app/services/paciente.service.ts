import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { respostasForm, paciente } from '../paciente';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  // URL base da aplicação backend
  private baseUrl = 'http://localhost:8080/app';

  constructor(private http: HttpClient) {}

  // Método para fazer POST de um novo paciente
  createPaciente(novoPaciente: paciente): Observable<paciente> {
    return this.http.post<paciente>(
      this.baseUrl + '/registar/paciente',
      novoPaciente
    );
  }
}
