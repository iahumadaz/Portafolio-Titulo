import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './pages/home-routing.module';
//import { LayoutModule } from 'src/app/layout/layout.module';
//import { HomeComponent } from './pages/home.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HomeRoutingModule,
    //HomeComponent  // ✅ Ahora se importa directamente
  ]
})
export class HomeModule { }