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

  // Errores
  err_blancos: string = '';
  err_formato: string = '';

  constructor() { }

  // Valida que los campos no estén vacíos
  private ValidaBlancos(correo: string, password: string, nombre?: string): { valido: boolean, error: string | null } {
    if (nombre !== undefined && nombre.trim().length === 0) {
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

    return { valido: true, error: null };
  }

  // Valida el formato del correo
  private ValidaFormato(correo: string): { valido: boolean, error: string | null } {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const esValido = regex.test(correo.trim());

    if (!esValido) {
      this.err_formato = "Correo inválido. Ej: usuario@correo.cl";
      return { valido: false, error: this.err_formato }; 
    }

    return { valido: true, error: null };
  }

  // Validación para registro (nombre requerido)
  validaRegistro(nombre: string, correo: string, password: string): { valido: boolean, error: string | null } {
    const resultadoBlancos = this.ValidaBlancos(correo, password, nombre);
    if (!resultadoBlancos.valido) return resultadoBlancos;

    const resultadoFormato = this.ValidaFormato(correo);
    if (!resultadoFormato.valido) return resultadoFormato;

    return { valido: true, error: null };
  }

  // Validación para login (sin nombre)
  validaLogin(correo: string, password: string): { valido: boolean, error: string | null } {
    const resultadoBlancos = this.ValidaBlancos(correo, password); 
    if (!resultadoBlancos.valido) return resultadoBlancos;

    const resultadoFormato = this.ValidaFormato(correo);
    if (!resultadoFormato.valido) return resultadoFormato;

    return { valido: true, error: null };
  }

}
