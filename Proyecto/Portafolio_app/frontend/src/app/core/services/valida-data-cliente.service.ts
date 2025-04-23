//*******************************************************************************/
//*                                   Cookwell                                  */
//*******************************************************************************/
//* proyecto: Auth Coockwell                                                    */
//* servicio: Valida data cliente                                               */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 22-04-2025                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//*******************************************************************************/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidaDataClienteService {



  //errores
  err_blancos: string = '';
  err_formato: string = '';

  constructor() { }

  ValidaBlancos(nombre: string, correo: string, password: string): { valido: boolean, error: string | null } {
    if (nombre.trim().length === 0) {
      this.err_blancos = "Nombre está vacío o con solo espacios";
      return { valido: false, error: this.err_blancos }; 
    }

    if (correo.trim().length === 0) {
      this.err_blancos = "Correo está vacío o con solo espacios";
      return { valido: false, error: this.err_blancos }; 
    }
  
    if (password.trim().length === 0) {
      this.err_blancos = "Contraseña está vacía o con solo espacios";
      return { valido: false, error: this.err_blancos };
    }
  
    return { valido: true, error: null }; // No hay error
  }
  
  

  ValidaFormato(correo: string): { valido: boolean, error: string | null } {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const esValido = regex.test(correo.trim());
  
    if (!esValido) {
      this.err_formato = "Correo inválido. Ej: usuario@correo.cl";
      return { valido: false, error: this.err_formato }; 
    }
  
    return { valido: true, error: null }; // No hay error
  }
  
  

  validaDatos(nombre: string, correo: string, password: string): { valido: boolean, error: string | null } {
    const resultadoBlancos = this.ValidaBlancos(nombre,correo, password);
    if (!resultadoBlancos.valido) {
      return { valido: false, error: resultadoBlancos.error }; // Si hay error, devuelvo el estado y el error
    }
  
    const resultadoFormato = this.ValidaFormato(correo);
    if (!resultadoFormato.valido) {
      return { valido: false, error: resultadoFormato.error }; // Si hay error, devuelvo el estado y el error
    }
  
    return { valido: true, error: null }; // Todo está bien
  }
  
}
