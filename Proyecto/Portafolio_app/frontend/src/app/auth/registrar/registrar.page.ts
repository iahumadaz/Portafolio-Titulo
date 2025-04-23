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
      const resultado = this.validaDataClienteService.validaDatos(this.rg_nombre, this.rg_email, this.rg_password);
  
      if (!resultado.valido) {

        console.log("❌ Error de validación:", resultado.error);
  

        const toast = await this.toastController.create({
          message: resultado.error || 'Ocurrió un error desconocido',
          duration: 2000,
          color: 'danger', 
          position: 'top', 
        });
        toast.present();
  
        return;
      }
  
      console.log("✅ Datos válidos, continuar con el registro");
  
  
      const toast = await this.toastController.create({
        message: 'Datos validados correctamente, procediendo al registro...',
        duration: 2000,
        color: 'success', 
        position: 'top',
      });
      toast.present();
  
      //COLOCAR LLAMADO A BACK AQUI EN FUTURO.
  
    } catch (error) {
      // Si ocurre un error en la ejecución del servicio
      console.log("❌ Error al ejecutar servicio validaDataClienteService:", error);
    }
  }
  

}
