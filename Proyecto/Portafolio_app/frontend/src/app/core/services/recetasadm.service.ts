// src/app/core/services/recetasadm.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Vista de lista */
export interface RecetaAdm {
  id: number;
  nombre_receta: string;
  imagen_url: string;
}

/** Vista de detalle completo */
export interface RecetaDetalle {
  id_recetas: number;
  nombre_receta: string;
  descripcion_receta: string;
  tiempo_coccion: number;          // ← renombrado
  imagen_url: string;
  pasos: {
    id_paso: number;
    nombre_parte: string;
    numero_paso: number;
    descripcion_paso: string;
    duracion_paso: number;
  }[];
}

@Injectable({ providedIn: 'root' })
export class RecetasadmService {
  private apiUrl = 'http://localhost:3000/api/recetasadm';

  listarDefault(): Observable<RecetaAdm[]> {
    return this.http.get<RecetaAdm[]>(`${this.apiUrl}`);
  }

  buscarPorIngrediente(ingrediente: string): Observable<RecetaAdm[]> {
    const url = `${this.apiUrl}/buscar?ingrediente=${encodeURIComponent(ingrediente)}`;
    return this.http.get<RecetaAdm[]>(url);
  }

  getDetalleReceta(id: number): Observable<RecetaDetalle> {
    return this.http.get<RecetaDetalle>(`${this.apiUrl}/recetas/${id}`);
  }

  constructor(private http: HttpClient) {}
}
