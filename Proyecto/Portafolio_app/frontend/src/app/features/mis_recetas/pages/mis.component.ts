import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TabMenuComponent } from 'src/app/layout/tab-menu/page/tab-menu.component';

@Component({
  selector: 'app-mis',
  templateUrl: './mis.component.html',
  styleUrls: ['./mis.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TabMenuComponent
  ]
})
export class MisComponent implements OnInit {

  misRecetas: any[] = [];

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    // Simulación de recetas (puedes reemplazar por datos reales luego)
    this.misRecetas = [
      {
        id: 1,
        nombre: 'Tarta de Manzana',
        imagen: 'https://source.unsplash.com/400x300/?apple,pie',
        tiempo: '45 min',
        dificultad: 'Fácil'
      },
      {
        id: 2,
        nombre: 'Ensalada César',
        imagen: 'https://source.unsplash.com/400x300/?salad',
        tiempo: '20 min',
        dificultad: 'Media'
      },
      {
        id: 3,
        nombre: 'Pizza Margarita',
        imagen: 'https://source.unsplash.com/400x300/?pizza',
        tiempo: '1 hora',
        dificultad: 'Difícil'
      }
    ];
  }

  agregarReceta() {
    console.log('Agregar receta');
    // Aquí puedes redirigir a un formulario o abrir un modal
  }

  editarReceta(receta: any) {
    console.log('Editar receta:', receta);
    // Puedes abrir un modal o navegar a otra página con el ID
  }

  async eliminarReceta(receta: any) {
    const alert = await this.alertCtrl.create({
      header: '¿Eliminar receta?',
      message: `¿Estás seguro de que deseas eliminar "${receta.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.misRecetas = this.misRecetas.filter(r => r.id !== receta.id);
          }
        }
      ]
    });

    await alert.present();
  }
}
