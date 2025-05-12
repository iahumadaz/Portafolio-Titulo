import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { MisRecetasService } from 'src/app/core/services/mis-recetas.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-receta-modal',
  templateUrl: './crear-receta-modal.component.html',
  styleUrls: ['./crear-receta-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class CrearRecetaModalComponent  implements OnInit {

  formReceta!: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private recetaService: MisRecetasService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
      this.formReceta = this.fb.group({
      nombre_receta: ['', [Validators.required]],
      tiempo: ['', [Validators.required]],
      descripcion_receta: ['', [Validators.required]]
    });
  }

  crearReceta() {
    console.log("entro a crearReceta()");
    
    if (this.formReceta.valid) {
      const receta = {
        ...this.formReceta.value,
        id_tipo_creador: 2, // Fijo
        id_usuario_creador: 2 
      };
      console.log(receta);
      

      this.recetaService.crearReceta(receta).subscribe(() => {
        
        this.navCtrl.navigateBack('/home');
      });
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}
