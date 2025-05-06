import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuComponent } from './tab-menu/page/tab-menu.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations:[TabMenuComponent],
  imports: [
    CommonModule,
    TabMenuComponent,
    IonicModule
  ],
  exports: [TabMenuComponent]
  
})
export class LayoutModule { }
