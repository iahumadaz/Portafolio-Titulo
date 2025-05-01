import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './pages/home-routing.module';
import { LayoutModule } from '../../layout/layout.module';
import { TabMenuComponent } from '../../layout/tab-menu/page/tab-menu.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    TabMenuComponent
  ],
  exports: [TabMenuComponent, LayoutModule ]
})
export class HomeModule {}
