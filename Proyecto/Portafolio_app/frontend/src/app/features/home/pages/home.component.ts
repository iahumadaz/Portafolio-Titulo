import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { TabMenuComponent } from 'src/app/layout/tab-menu/page/tab-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    CommonModule,    
    IonicModule,
    TabMenuComponent,
  ]
})
export class HomeComponent  implements OnInit {

  //remplazar por categorias desde la bdd
  chips = ['Tofu', 'Garbanzos', 'Setas', 'Tomates', 'Bajo en grasa'];

  //Traer ingredientes x de la bdd
  destacados = ['Tofu', 'Arroz', 'Patata', 'Garbanzos'];

  constructor() { }

  ngOnInit() {}

}
