//*******************************************************************************/
//*                                   Cookwell                                  */
//*******************************************************************************/
//* proyecto: Auth Coockwell                                                    */
//* servicio: registro usuario                                                  */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 22-04-2025                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//*******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { ValidaDataClienteService } from 'src/app/core/services/valida-data-cliente.service';
import { ToastController } from '@ionic/angular';

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

  constructor(private validaDataClienteService: ValidaDataClienteService,private toastController: ToastController) {}

  ngOnInit() {
  }


  async Registrar() {
    try {
      const resultado = this.validaDataClienteService.validaRegistro(this.rg_nombre, this.rg_email, this.rg_password);
  
      if (!resultado.valido) {
        console.log("❌ Error de validación:", resultado.error);
  
        await this.mostrarToast(resultado.error || 'Ocurrió un error desconocido', 'danger');
        return;
      }
  
      console.log("✅ Datos válidos, continuar con el registro");
  
      await this.mostrarToast('Datos validados correctamente, procediendo al registro...', 'success');
  
      // TODO: Colocar llamado al backend aquí
  
    } catch (error) {
      console.log("❌ Error al ejecutar servicio validaDataClienteService:", error);
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
