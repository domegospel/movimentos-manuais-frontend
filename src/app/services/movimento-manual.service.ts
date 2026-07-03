import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MovimentoManual,
  MovimentoManualRequest
} from '../models/movimento-manual.model';

@Injectable({
  providedIn: 'root'
})
export class MovimentoManualService {

  private readonly apiUrl = 'http://localhost:8080/api/movimentos-manuais';

  constructor(private readonly http: HttpClient) {}

  listarMovimentos(): Observable<MovimentoManual[]> {
    return this.http.get<MovimentoManual[]>(this.apiUrl);
  }

  incluirMovimento(request: MovimentoManualRequest): Observable<MovimentoManual> {
    return this.http.post<MovimentoManual>(this.apiUrl, request);
  }
}
