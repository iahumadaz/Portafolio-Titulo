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
/*
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
      switchMap(texto => {
        console.log('📤 [FRONTEND] Llamando al servicio con:', texto);
        return this.obtenerSugerencias(texto);})
    ).subscribe((resultados: string[]) => {
      console.log('✅ Respuesta del backend:', resultados);
      
      this.sugerencias = resultados;
    });
  }

  onBuscarCambio(event: any): void {
  const valor = event.target.value?.trim().toLowerCase() || '';
  console.log('🖊️ [FRONTEND] Usuario escribe:', valor);

  if (valor.length < 2) {
    this.sugerencias = [];
    return;
  }

  this.ingredientesService.buscarIngredientes(valor).subscribe(
    (data: any) => {
      console.log('📥 [FRONTEND] Respuesta del backend:', data);
      this.sugerencias = data;
    },
    (error) => {
      console.error('❌ [FRONTEND] Error en búsqueda:', error);
    }
  );
}
  probarBusquedaManual() {
    console.log('✅ BOTÓN FUNCIONA');
    this.ingredientesService.buscarIngredientes('arroz').subscribe({
      next: (data) => {
        console.log('📥 DATA MANUAL:', data);
        this.sugerencias = data;
      },
      error: (err) => {
        console.error('❌ Error manual:', err);
      }
    });
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
  seleccionarSugerencia(s: string) {
  this.textoBusqueda = s;
  this.sugerencias = [];
  console.log('✅ Sugerencia seleccionada:', s);
  }
}
*/

// home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { RecetasadmService, RecetaAdm } from 'src/app/core/services/recetasadm.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TabMenuComponent } from 'src/app/layout/tab-menu/page/tab-menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabMenuComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  textoBusqueda = '';
  recetas: RecetaAdm[] = [];
  busquedaActiva = false;

  private routerSub!: Subscription;

  constructor(
    private recetasService: RecetasadmService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDefault();

    this.routerSub = this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd && (evt as NavigationEnd).urlAfterRedirects === '/home')
    ).subscribe(() => {
      this.loadDefault();
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  /** Carga las 5 recetas por defecto y resetea el estado de búsqueda */
  loadDefault() {
    this.busquedaActiva = false;
    this.textoBusqueda = '';
    this.recetasService.listarDefault()
      .subscribe(list => this.recetas = list);
  }

  /** Llamada desde (ionClear) y desde el tab Home para volver al inicio */
  reset() {
    this.loadDefault();
  }

  onInput(event: any) {
    this.textoBusqueda = (event.target.value || '').trim();
  }

  buscarRecetas() {
    if (!this.textoBusqueda) { return; }
    this.busquedaActiva = true;
    this.recetasService.buscarPorIngrediente(this.textoBusqueda)
      .subscribe(list => this.recetas = list);
  }
}
