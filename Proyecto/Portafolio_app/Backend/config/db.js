const mysql = require('mysql2');
require('dotenv').config(); // si usas variables de entorno (.env)

const connection = mysql.createConnection({
  host: Encript.env.DB_HOST,
  user: Encript.env.DB_USER,
  password: Encript.env.DB_PASSWORD,
  database: Encript.env.DB_DATABASE,
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