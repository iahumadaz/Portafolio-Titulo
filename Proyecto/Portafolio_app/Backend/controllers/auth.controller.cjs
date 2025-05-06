//*******************************************************************************/
//*                                   Cookwell                                  */
//*******************************************************************************/
//* proyecto: Auth Coockwell                                                    */
//* servicio: Controlador api auth                                              */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 26-04-2025                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//* 05-05-2025: Se añadieron logs para depuración del callback del registro     */
//*******************************************************************************/          
// Iván- crear las funciones del log  01-05-2025                                                   */
//*******************************************************************************/
//*******************************************************************************/

const { guardarLog } = require('./log.controller.cjs');  
const db = require('../config/db.cjs');

// Registrarse
async function registerUser(req, res) {
    console.log('Entro a registerUser en backend -> auth.controller.cjs');
    const { nombre, email, password } = req.body;
    console.log('Datos recibidos:', nombre, email, password);

    if (!nombre || !email || !password) {
        await guardarLog({
            id_fun: '0001',
            nombre_servicio: 'auth.controller.cjs',
            mensaje: 'Todos los campos son obligatorios',
            estado: 'error'
        });
        console.log('Todos los campos son obligatorios');
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const id_tipo_usuario = 1;

    try {
        const [results] = await db.query(
            'INSERT INTO usuarios (username, correo, clave, id_tipo_usuario) VALUES (?, ?, ?, ?)',
            [nombre, email, password, id_tipo_usuario]
        );

        console.log('Usuario registrado con ID:', results.insertId);

        const msg = `Usuario registrado con ID: ${results.insertId}`;
        await guardarLog({
            id_fun: '0001',
            nombre_servicio: 'auth.controller.cjs',
            mensaje: msg,
            estado: 'success'
        });

        res.status(201).json({ success: true, message: 'Usuario creado correctamente' });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        await guardarLog({
            id_fun: '0001',
            nombre_servicio: 'auth.controller.cjs',
            mensaje: 'Error al ejecutar insert en tabla usuarios',
            estado: 'error'
        });
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
}


// Iniciar sesión
function loginUser(req, res) {
    console.log('Entro a loginUser en backend -> auth.controller.cjs');
    const { email, password } = req.body;
    console.log('Datos recibidos:', email, password);

    // Verificación básica
    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Datos inválidos' });
    }

    const sql = 'SELECT correo, clave FROM usuarios WHERE correo = ? AND clave = ?';
    const values = [email, password];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al buscar usuario:', error);
            return res.status(500).json({ message: 'Error al iniciar sesión' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        console.log('Usuario encontrado:', results[0]);
        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: results[0] });
    });
}

// Buscar ingredientes por nombre parcial
function buscarIngredientes(req, res) {
    const { texto } = req.query;

    if (!texto) {
        return res.status(400).json({ message: 'Texto de búsqueda requerido' });
    }

    const sql = `SELECT nombre FROM ingredientes WHERE nombre LIKE ? LIMIT 30`;
    const values = [`%${texto}%`];

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al buscar ingredientes:', error);
            return res.status(500).json({ message: 'Error en la búsqueda' });
        }

        const nombres = results.map(row => row.nombre);
        res.status(200).json(nombres);
    });
}

// Exportar funciones
module.exports = {
    registerUser,
    loginUser,
    buscarIngredientes
};
