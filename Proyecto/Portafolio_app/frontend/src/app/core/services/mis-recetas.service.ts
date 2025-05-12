import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MisRecetasService {
  private apiUrl = 'http://localhost:3000/api/recetas';
  private apiUrlCR = 'http://localhost:3000/api/'

  constructor(private http: HttpClient) {}

  obtenerRecetas(idUsuarioCreador: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?id_usuario_creador=${idUsuarioCreador}`);
  }

  eliminarReceta(idReceta: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idReceta}`);
  }

  crearReceta(data: any): Observable<any> {
  return this.http.post(`${this.apiUrlCR}/crearReceta`, data);
} 

}
