const db = require('../config/db.cjs');

// GET /recetas
async function obtenerRecetas(req, res) {
  console.log('📥 Entró a obtenerRecetas (backend)');
  const { id_usuario_creador } = req.query;

  if (!id_usuario_creador) {
    return res.status(400).json({ message: 'Falta id_usuario_creador en query' });
  }

  const sql = 'SELECT * FROM recetas WHERE id_usuario_creador = ?';
  const values = [id_usuario_creador];

  try {
    const [results] = await db.query(sql, values);
    console.log('✅ Recetas obtenidas:', results.length);
    res.status(200).json(results);
  } catch (err) {
    console.error('❌ Error al obtener recetas:', err);
    return res.status(500).json({ message: 'Error al obtener recetas' });
  }
}

module.exports = { obtenerRecetas };
