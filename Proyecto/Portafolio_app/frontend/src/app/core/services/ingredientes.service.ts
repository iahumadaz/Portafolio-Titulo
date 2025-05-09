import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IngredientesService {
  private api_URL = 'http://localhost:3000/api/ingredientes'; // Ajusta si usas proxy

  constructor(private http: HttpClient) {}

  buscarIngredientes(query: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.api_URL}?q=${query}`);
  }
}
