
//*******************************************************************************/
//*                                   Cookwell                                  */
//*******************************************************************************/
//* proyecto: Auth Cookwell                                                     */
//* servicio: login usuario                                                     */
//* Desarrollador: Bastian Lisboa (BAS) - Ivan Ahumada (IVA)          */
//* Fecha: 28-04-2025                                                           */
//*******************************************************************************/
//* MODIFICACIONES      
/*  Practicamente es una copia al modlo de registrar, solo con los 2 datos requeridos
para la autentiacion                            */
//*******************************************************************************/
//* Archivo adaptado para LOGIN de usuarios                                     */
//*******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  lg_email: string = '';
  lg_password: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  async iniciarSesion() {
    try {
      if (!this.lg_email || !this.lg_password) {
        await this.mostrarToast('Debes ingresar correo y contraseña', 'danger');
        return;
      }
  
      console.log("🔵 Intentando iniciar sesión...");
  
      this.authService.loginUser(this.lg_email, this.lg_password)
        .subscribe({
          next: async (respuesta) => {
            console.log('✅ Inicio de sesión exitoso:', respuesta);
            await this.mostrarToast('Inicio de sesión exitoso!', 'success');
            // Aquí puedes redirigir al home, dashboard, etc.
          },
          error: async (error) => {
            console.error('❌ Error al iniciar sesión:', error);
            await this.mostrarToast('Correo o contraseña inválidos', 'danger');
          }
        });
  
    } catch (error) {
      console.log('❌ Error inesperado:', error);
      await this.mostrarToast('Error inesperado al iniciar sesión', 'danger');
    }
  }

  private async mostrarToast(mensaje: string, color: 'danger' | 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }
  registrarse() {
    this.router.navigate(['/registrar']);
  }

}
