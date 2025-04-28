//*******************************************************************************/
//*                                   Cookwell                                  */
//*******************************************************************************/
//* proyecto: Auth Coockwell                                                    */
//* servicio: Controlador api auth                                              */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 26-04-2025                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//*******************************************************************************/

export function registerUser(req, res) {
    console.log('Entro a registerUser en backend -> auth.controller.jd');
    const { nombre, email, password } = req.body;
    console.log('Datos recibidos:', nombre, email, password);

    // Aquí iría la lógica para guardar en base de datos
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
}

export function loginUser(req, res) {
    const { email, password } = req.body;
    console.log('Intento de login:', email);

    // Aquí iría la lógica para verificar usuario
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
}
