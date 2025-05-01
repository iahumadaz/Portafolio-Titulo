import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,    
    IonicModule       
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
