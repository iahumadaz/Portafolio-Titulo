// src/app/features/detalle_receta/pages/detalle_receta.component.ts
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute }         from '@angular/router';
import { IonicModule }            from '@ionic/angular';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { TabMenuComponent }   from 'src/app/layout/tab-menu/page/tab-menu.component';
//import { RecetasadmService, RecetaDetalle } from 'src/app/core/services/recetasadm.service';
import {
  RecetasadmService,
  RecetaDetalle
} from 'src/app/core/services/recetasadm.service';

@Component({
  selector: 'app-detalle-receta',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,TabMenuComponent],
  templateUrl: './detalle_receta.component.html',
  styleUrls: ['./detalle_receta.component.scss']
})
export class DetalleRecetaComponent implements OnInit {
  receta!: RecetaDetalle;                         // ← tipo fuerte
  pasos: RecetaDetalle['pasos'] = [];

  constructor(
    private route: ActivatedRoute,
    private recetasService: RecetasadmService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.recetasService.getDetalleReceta(id)
        .subscribe(res => {
          this.receta = res;
          this.pasos  = res.pasos;
        });
    }
  }
}
