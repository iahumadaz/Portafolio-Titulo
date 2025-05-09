// Backend/routes/ingredientes.routes.cjs
const express = require('express');
const router = express.Router();
const db = require('../config/db.cjs');

// GET /api/ingredientes?q=ajo
router.get('/ingredientes', (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();

  if (!q || q.length < 2) {
    return res.json([]);
  }

  const sql = `
    SELECT nombre_ingrediente 
    FROM ingredientes 
    WHERE LOWER(nombre_ingrediente) LIKE ? 
    LIMIT 10
  `;
  const param = [`%${q}%`];

  db.query(sql, param, (err, results) => {
    if (err) {
      console.error('Error en consulta MySQL:', err);
      return res.status(500).json({ error: 'Error al buscar ingredientes' });
    }

    const nombres = results.map(row => row.nombre);
    res.json(nombres);
  });
});

module.exports = router;