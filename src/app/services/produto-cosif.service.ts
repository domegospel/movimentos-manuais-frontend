import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoCosif } from '../models/produto-cosif.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoCosifService {

  private readonly apiUrl = 'http://localhost:8080/api/produtos';

  constructor(private readonly http: HttpClient) {}

  listarCosifsPorProduto(codProduto: string): Observable<ProdutoCosif[]> {
    return this.http.get<ProdutoCosif[]>(`${this.apiUrl}/${codProduto}/cosifs`);
  }
}
