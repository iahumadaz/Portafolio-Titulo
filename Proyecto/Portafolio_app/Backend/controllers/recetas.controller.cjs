const db = require('../config/db.cjs');

// GET /recetas
async function obtenerRecetas(req, res) {
  console.log('📥 Entró a obtenerRecetas (backend)');
  const { id_usuario_creador } = req.query;

  if (!id_usuario_creador) {
    return res.status(400).json({ message: 'Falta id_usuario_creador en query' });
  }

  const sql = 'SELECT nombre_receta, tiempo, descripcion_receta, id_valoracion, id_tipo_creador, id_usuario_creador, COALESCE(MAX(img.ruta_imagen), "") AS imagen_url FROM recetas r LEFT JOIN imagenes img ON img.id_recetas = r.id_recetas WHERE id_usuario_creador = ? GROUP BY r.id_recetas, r.nombre_receta, r.tiempo, r.descripcion_receta, r.id_valoracion, r.id_tipo_creador, r.id_usuario_creador ORDER BY r.id_recetas';
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
