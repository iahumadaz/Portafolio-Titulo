//*******************************************************************************/
//*                                   Cookwell                                  */
//*******************************************************************************/
//* proyecto: Auth Coockwell                                                    */
//* servicio: Api auth                                                          */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 26-04-2025                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//*******************************************************************************/

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.cjs');

//Registrar
router.post('/register', authController.registerUser);
    
//Iniciar sesión
router.post('/login', authController.loginUser);

module.exports = router;
