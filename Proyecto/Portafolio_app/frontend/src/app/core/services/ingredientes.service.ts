import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IngredientesService {
  private API_URL = 'http://localhost:3000/api'; // Ajusta si usas proxy

  constructor(private http: HttpClient) {}

  buscarIngredientes(texto: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/buscar-ingredientes?texto=${texto}`);
  }
}
