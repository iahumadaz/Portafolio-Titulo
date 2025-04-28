const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const authRoutes = require('./routes/auth.routes.cjs');


// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes); 

// Ruta base
app.get('/', (req, res) => {
  res.send('¡Backend Express corriendo con MySQL!');
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
