import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuComponent } from './tab-menu/page/tab-menu.component';


@NgModule({
  imports: [
    CommonModule,
    TabMenuComponent
  ],
  exports: [TabMenuComponent]
  
})
export class LayoutModule { }
