import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabMenuComponent } from 'src/app/layout/tab-menu/page/tab-menu.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TabMenuComponent,
  ]
})
export class PerfilComponent {
  usuario = {
    nombre: 'Bastian',
    email: 'bastian@email.com',
    edad: 24,
    altura: 175, // cm
    peso: 70, // kg
    objetivo: 'Perder grasa',
    preferencias: 'Vegano'
  };

  imcValor: number = 0;
  categoriaIMC: string = '';
  imcChartData: any;
  imcChartOptions: any;
  macroChartData: any;

  constructor() {
    this.calcularIMC();
    this.configurarGraficos();
  }

  calcularIMC() {
    // Calcular IMC
    const imc = this.usuario.peso / ((this.usuario.altura / 100) ** 2);
    this.imcValor = imc;

    // Determinar la categoría del IMC
    if (imc < 18.5) {
      this.categoriaIMC = 'Bajo peso';
    } else if (imc >= 18.5 && imc < 24.9) {
      this.categoriaIMC = 'Normal';
    } else if (imc >= 25 && imc < 29.9) {
      this.categoriaIMC = 'Sobrepeso';
    } else {
      this.categoriaIMC = 'Obesidad';
    }
  }

  configurarGraficos() {
    // Datos para el gráfico de IMC
    this.imcChartData = {
      labels: ['IMC'],
      datasets: [
        {
          label: 'Índice de Masa Corporal',
          data: [this.imcValor],
          backgroundColor: ['#42A5F5']
        }
      ]
    };

    // Opciones para el gráfico de IMC
    this.imcChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Datos para el gráfico de distribución de macronutrientes
    this.macroChartData = {
      labels: ['Carbohidratos', 'Proteínas', 'Grasas'],
      datasets: [
        {
          data: [50, 30, 20],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };
  }
}
