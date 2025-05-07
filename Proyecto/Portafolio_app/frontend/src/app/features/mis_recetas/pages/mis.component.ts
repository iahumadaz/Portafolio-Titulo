import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TabMenuComponent } from 'src/app/layout/tab-menu/page/tab-menu.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MisRecetasService } from 'src/app/core/services/mis-recetas.service';

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

  private apiUrl = 'http://localhost:3000/api/recetas';
  misRecetas: any[] = [];
  idUsuario: string = '';
  nom_rec: string = '';

  constructor(
    private alertCtrl: AlertController,
    private http: HttpClient,
    private misRecetasService: MisRecetasService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.idUsuario = payload.id;

      this.misRecetasService.obtenerRecetas(this.idUsuario).subscribe({
        next: (data) => {
          console.log('✅ Recetas cargadas', data);
          this.misRecetas = data;
          console.log('Recetas procesadas:', this.misRecetas.map(r => r.nombre_receta));

        },
        error: (err) => {
          console.error('❌ Error al cargar recetas', err);
        }
      });
    }
  }


  obtenerRecetas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?id_usuario_creador=${this.idUsuario}`);
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
            this.misRecetas = this.misRecetas.filter(r => r.id_recetas !== receta.id_recetas);
          }
        }
      ]
    });

    await alert.present();
  }
}
