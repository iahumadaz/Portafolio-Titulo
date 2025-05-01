import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    //canActivate: [authGuard], 
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),  
  },
  {
    path: 'auth',
    children: [
      { path: 'login', loadChildren: () => import('./features/auth/login/login.module').then(m => m.LoginPageModule) },
      { path: 'registrar', loadChildren: () => import('./features/auth/registrar/registrar.module').then(m => m.RegistrarPageModule) },
    ]
  },
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
