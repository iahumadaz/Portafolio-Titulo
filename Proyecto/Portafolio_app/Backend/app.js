const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rutas (por ahora vacío, luego las conectas)
app.get('/', (req, res) => {
  res.send('¡Backend Express corriendo con MySQL!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
