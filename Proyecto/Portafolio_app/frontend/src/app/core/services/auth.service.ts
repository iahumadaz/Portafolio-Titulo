//*******************************************************************************/
//*                                   Cookwell                                  */
//*******************************************************************************/
//* proyecto: Auth Coockwell                                                    */
//* servicio: Auth service                                                      */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 22-04-2025                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//*******************************************************************************/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  // Errores
  err_blancos: string = '';
  err_formato: string = '';

  constructor(private http: HttpClient) { } 

  //**************************************************VALIDACIONES DATA*/

  private ValidaBlancos(correo: string, password: string, nombre?: string): { valido: boolean, error: string | null } {
    if (nombre !== undefined && nombre.trim().length === 0) {
      this.err_blancos = "Nombre está vacío o con solo espacios";
      console.log('Nombre está vacío o con solo espacios');
      return { valido: false, error: this.err_blancos };
    }

    if (correo.trim().length === 0) {
      this.err_blancos = "Correo está vacío o con solo espacios";
      console.log('Correo está vacío o con solo espacios');
      
      return { valido: false, error: this.err_blancos };
    }

    if (password.trim().length === 0) {
      this.err_blancos = "Contraseña está vacía o con solo espacios";
      console.log('Contraseña está vacía o con solo espacios');
      
      return { valido: false, error: this.err_blancos };
    }

    return { valido: true, error: null };
  }

  private ValidaFormato(correo: string): { valido: boolean, error: string | null } {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const esValido = regex.test(correo.trim());

    if (!esValido) {
      this.err_formato = "Correo inválido. Ej: usuario@correo.cl";
      return { valido: false, error: this.err_formato }; 
    }

    return { valido: true, error: null };
  }

  validaRegistro(nombre: string, correo: string, password: string): { valido: boolean, error: string | null } {
    console.log('Entro a validaRegistro -> Data:', nombre, correo, password);
    
    const resultadoBlancos = this.ValidaBlancos(correo, password, nombre);
    if (!resultadoBlancos.valido) return resultadoBlancos;

    const resultadoFormato = this.ValidaFormato(correo);
    if (!resultadoFormato.valido) return resultadoFormato;

    return { valido: true, error: null };
  }

  validaLogin(correo: string, password: string): { valido: boolean, error: string | null } {
    const resultadoBlancos = this.ValidaBlancos(correo, password); 
    if (!resultadoBlancos.valido) return resultadoBlancos;

    const resultadoFormato = this.ValidaFormato(correo);
    if (!resultadoFormato.valido) return resultadoFormato;

    return { valido: true, error: null };
  }

  //**************************************************SOLICITUD API */

  registerUser(nombre: string, correo: string, password: string): Observable<any> {
    const body = { nombre: nombre, email: correo, password };
    console.log('Entro a RegisterUser en front -> auth.service.ts', body)

    return this.http.post(`${this.apiUrl}/register`, body);
  }
  loginUser(email:string,password:string){
    const body = {email: email, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}

