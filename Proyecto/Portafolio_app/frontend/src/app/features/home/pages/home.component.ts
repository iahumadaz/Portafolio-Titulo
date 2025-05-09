/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TabMenuComponent } from 'src/app/layout/tab-menu/page/tab-menu.component';
import { IngredientesService } from 'src/app/core/services/ingredientes.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TabMenuComponent
  ]
})
export class HomeComponent implements OnInit {

  textoBusqueda: string = '';
  sugerencias: string[] = [];

  chips = ['Tofu', 'Garbanzos', 'Setas', 'Tomates', 'Bajo en grasa'];
  destacados = ['Tofu', 'Arroz', 'Patata', 'Garbanzos'];

  constructor(private ingredientesService: IngredientesService) { }

  ngOnInit() {}

  onBuscarCambio(event: any): void {
    /*const texto = event.target.value; 
    this.textoBusqueda = texto;
  
    if (texto.trim().length === 0) {
      this.sugerencias = [];
      return;
    }
  
    this.ingredientesService.buscarIngredientes(texto).subscribe({
      next: (data) => this.sugerencias = data,
      error: (err) => console.error('Error en la búsqueda:', err)
    });
    
  }
  onBuscarCambioManual(): void {
    //this.onBuscarCambio({ target: { value: this.textoBusqueda } });
    console.log('Búsqueda manual:', this.textoBusqueda);
  }
}
*/

// src/app/features/home/pages/home.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IngredientesService } from 'src/app/core/services/ingredientes.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';
import { TabMenuComponent } from 'src/app/layout/tab-menu/page/tab-menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule,TabMenuComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  textoBusqueda: string = '';
  sugerencias: string[] = [];
  chips: string[] = ['Tofu', 'Garbanzos', 'Setas', 'Tomates', 'Bajo en grasa'];

  private busquedaSubject: Subject<string> = new Subject<string>();

  constructor(private ingredientesService: IngredientesService) {}

  ngOnInit(): void {
    this.busquedaSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(texto => this.obtenerSugerencias(texto))
    ).subscribe((resultados: string[]) => {
      this.sugerencias = resultados;
    });
  }

  onBuscarCambio(event: any): void {
    const valor = event.target.value?.trim().toLowerCase() || '';
    this.busquedaSubject.next(valor);
  }

  onBuscarCambioManual(): void {
    console.log('Busqueda con Enter:', this.textoBusqueda);
  }

  private obtenerSugerencias(texto: string): Observable<string[]> {
    if (texto.length < 2) {
      return of([]);
    }
    return this.ingredientesService.buscarIngredientes(texto);
  }
}
