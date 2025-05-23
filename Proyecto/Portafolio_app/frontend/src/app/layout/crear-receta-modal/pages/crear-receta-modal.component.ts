import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { MisRecetasService } from 'src/app/core/services/mis-recetas.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-crear-receta-modal',
  templateUrl: './crear-receta-modal.component.html',
  styleUrls: ['./crear-receta-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class CrearRecetaModalComponent implements OnInit {

  formReceta!: FormGroup;
  selectedFile: File | null = null;
  previewImage: string | null = null;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private recetaService: MisRecetasService,
    private navCtrl: NavController,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.formReceta = this.fb.group({
      nombre_receta: ['', [Validators.required]],
      tiempo: ['', [Validators.required]],
      descripcion_receta: ['', [Validators.required]]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Previsualización de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  crearReceta() {
  if (!this.selectedFile) {
    alert('Por favor selecciona una imagen');
    return;
  }

  if (this.formReceta.valid) {
    const filePath = `recetas/${Date.now()}_${this.selectedFile.name}`;
    const task = this.storage.upload(filePath, this.selectedFile);

    task.percentageChanges().subscribe(progress => {
      console.log('Progreso:', progress);
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        this.storage.ref(filePath).getDownloadURL().subscribe(downloadURL => {
          console.log('URL de la imagen:', downloadURL);

          const receta = {
            ...this.formReceta.value,
            id_tipo_creador: 2,
            id_usuario_creador: 2,
            imagen_url: downloadURL
          };

          this.recetaService.crearReceta(receta).subscribe(() => {
            this.navCtrl.navigateBack('/home');
          }, error => {
            console.error('Error al crear receta:', error);
          });
        });
      })
    ).subscribe();
  }
}


  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}
