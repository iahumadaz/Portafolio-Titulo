//*******************************************************************************/
//*                                   Cookwell                                  */
//*******************************************************************************/
//* proyecto: Auth Coockwell                                                    */
//* servicio: registro usuario ts                                               */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 22-04-2025                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//*******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: false,
})
export class RegistrarPage implements OnInit {

  rg_email: string = '';
  rg_password: string = '';
  rg_nombre: string = '';

  constructor(private authService: AuthService,private toastController: ToastController, private router: Router) {}

  ngOnInit() {
  }


  async Registrar() {
    try {
      const resultado = this.authService.validaRegistro(this.rg_nombre, this.rg_email, this.rg_password);
  
      if (!resultado.valido) {
        console.log("❌ Error de validación:", resultado.error);
        await this.mostrarToast(resultado.error || 'Ocurrió un error desconocido', 'danger');
        return;
      }
  
      console.log("✅ Datos válidos, enviando solicitud al backend...");
  
      //enviamos al backend
      this.authService.registerUser(this.rg_nombre, this.rg_email, this.rg_password)
        .subscribe({
          next: async (respuesta) => {
            console.log('✅ Registro exitoso:', respuesta);
            await this.mostrarToast('Usuario registrado exitosamente!', 'success');
            //NO OLVIDAR REDIRIGIR AQUI EN UN FUTURO A EL LOGIN
            this.router.navigate(['/login']);
          },
          error: async (error) => {
            console.error('❌ Error en el registro:', JSON.stringify(error));
            await this.mostrarToast('Error en el registro. Intenta más tarde.', 'danger');
            console.log('❌ Error en el registro:', JSON.stringify(error));
          }
        });
  
    } catch (error) {
      console.log("❌ Error inesperado:", error);
      await this.mostrarToast('Error inesperado al validar datos', 'danger');
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
    

}
