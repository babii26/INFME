import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { medico } from '../medico';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  // URL base da aplicação backend
  private baseUrl = 'http://localhost:8080/app';

  constructor(private http: HttpClient) {}

  // Método para fazer POST de um novo médico
  createMedico(novoMedico: medico): Observable<medico> {
    return this.http.post<medico>(
      this.baseUrl + '/registar/medico',
      novoMedico
    );
  }
}
