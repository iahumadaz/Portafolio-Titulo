const mysql = require('mysql2');
require('dotenv').config(); // si usas variables de entorno (.env)

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306
});

connection.connect((error) => {
  if (error) {
    console.error('Error de conexión:', error);
    return;
  }
  console.log('¡Conectado a la base de datos!');
});

module.exports = connection;

connection.query('SELECT 1 + 1 AS resultado', (error, results) => {
  if (error) {
    console.error('Error ejecutando prueba:', error);
  } else {
    console.log('Resultado de prueba:', results);
  }
});