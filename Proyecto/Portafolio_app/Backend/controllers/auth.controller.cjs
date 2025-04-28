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

const db = require('../config/db.cjs');

// Registrarse
function registerUser(req, res) {
    console.log('Entro a registerUser en backend -> auth.controller.js');
    const { nombre, email, password } = req.body;
    console.log('Datos recibidos:', nombre, email, password);

    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const id_tipo_usuario = 1; // Usuario normal

    const sql = 'INSERT INTO usuarios (username, correo, clave, id_tipo_usuario) VALUES (?, ?, ?, ?)';
    const values = [nombre, email, password, id_tipo_usuario];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al registrar usuario:', error);
            console.log('Error al registrar usuario:', error);
            return res.status(500).json({ message: 'Error al registrar usuario' });
        }
        console.log('Usuario registrado con ID:', results.insertId);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
}

// Iniciar sesión
function loginUser(req, res) {
    const { email, password } = req.body;
    console.log('Intento de login:', email);

    // Aquí iría la lógica real de login, de momento es solo una respuesta dummy
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
}

// Exportar funciones
module.exports = {
    registerUser,
    loginUser
};
