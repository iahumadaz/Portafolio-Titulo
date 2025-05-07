import { Component, OnInit } from '@angular/core';
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
    const texto = event.target.value; 
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
    this.onBuscarCambio({ target: { value: this.textoBusqueda } });
  }
}
