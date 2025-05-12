import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TabMenuComponent } from 'src/app/layout/tab-menu/page/tab-menu.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MisRecetasService } from 'src/app/core/services/mis-recetas.service';
import { RecetaModalComponent } from 'src/app/layout/RecetaModal/page/receta-modal.component';
import { CrearRecetaModalComponent } from 'src/app/layout/crear-receta-modal/pages/crear-receta-modal.component';

@Component({
  selector: 'app-mis',
  templateUrl: './mis.component.html',
  styleUrls: ['./mis.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TabMenuComponent,
    RecetaModalComponent,
    CrearRecetaModalComponent
  ]
})
export class MisComponent implements OnInit {

  private apiUrl = 'http://localhost:3000/api/recetas';
  misRecetas: any[] = [];
  idUsuario: string = '';
  nom_rec: string = '';
  private currentModal: HTMLIonModalElement | null = null;

  constructor(
    private alertCtrl: AlertController,
    private http: HttpClient,
    private misRecetasService: MisRecetasService,
    private modalCtrl: ModalController
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

    this.misRecetas = [{ nombre_receta: 'Test receta', tiempo: '10 min', descripcion: 'Solo prueba' }];

  }


  obtenerRecetas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?id_usuario_creador=${this.idUsuario}`);
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


  async verDetalles(receta: any) {
  console.log("🟢 Entro a verDetalles con receta:");
  if (this.currentModal) {
    await this.currentModal.dismiss();
    this.currentModal = null;
    return this.currentModal;
  }


  this.currentModal = await this.modalCtrl.create({
    component: RecetaModalComponent,
    componentProps: { receta },
    cssClass: 'custom-modal', // Clase personalizada
    backdropDismiss: true,    // Permite cerrar tocando el fondo
    animated: true,           // Hacer que la animación del modal sea más suave
  });

  await this.currentModal.present();
  return this.currentModal;
}

 async agregarReceta() {
    console.log('Agregar receta');
     console.log("🟢 Entro a verDetalles con receta:");
    if (this.currentModal) {
      await this.currentModal.dismiss();
      this.currentModal = null;
      return this.currentModal;
    }


    this.currentModal = await this.modalCtrl.create({
      component: CrearRecetaModalComponent,
      cssClass: 'custom-modal', // Clase personalizada
      backdropDismiss: true,    // Permite cerrar tocando el fondo
      animated: true,           // Hacer que la animación del modal sea más suave
    });

    await this.currentModal.present();
    return this.currentModal;
  }


}

