const db = require('../config/db.cjs');

// GET /recetas
async function obtenerRecetas(req, res) {
  console.log('📥 Entró a obtenerRecetas (backend)');
  const { id_usuario_creador } = req.query;

  if (!id_usuario_creador) {
    return res.status(400).json({ message: 'Falta id_usuario_creador en query' });
  }

  const sql = 'SELECT r.id_recetas, r.nombre_receta, r.tiempo, r.descripcion_receta, r.id_valoracion, r.id_tipo_creador, r.id_usuario_creador, COALESCE(MAX(img.ruta_imagen), "") AS imagen_url FROM recetas r LEFT JOIN imagenes img ON img.id_recetas = r.id_recetas WHERE r.id_usuario_creador = ? GROUP BY r.id_recetas, r.nombre_receta, r.tiempo, r.descripcion_receta, r.id_valoracion, r.id_tipo_creador, r.id_usuario_creador ORDER BY r.id_recetas;';
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

async function editarReceta(req, res) {
  console.log('✏️ Entró a editarReceta (backend)');
  const { id_receta } = req.params;
  const { nombre_receta, tiempo, descripcion_receta, imagen_url } = req.body;

  if (!id_receta || !nombre_receta || !tiempo || !descripcion_receta) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const sql = `
    UPDATE recetas
    SET nombre_receta = ?, tiempo = ?, descripcion_receta = ?
    WHERE id_recetas = ?
  `;
  const values = [nombre_receta, tiempo, descripcion_receta, id_receta];

  try {
    await db.query(sql, values);

    // Si hay URL de imagen, actualizamos o insertamos la imagen
    if (imagen_url) {
      const checkSql = 'SELECT COUNT(*) AS count FROM imagenes WHERE id_recetas = ?';
      const [checkResult] = await db.query(checkSql, [id_receta]);

      if (checkResult[0].count > 0) {
        // Actualiza imagen
        const updateImgSql = 'UPDATE imagenes SET ruta_imagen = ? WHERE id_recetas = ?';
        await db.query(updateImgSql, [imagen_url, id_receta]);
      } else {
        // Inserta imagen
        const insertImgSql = 'INSERT INTO imagenes (ruta_imagen, id_recetas) VALUES (?, ?)';
        await db.query(insertImgSql, [imagen_url, id_receta]);
      }
    }

    console.log('✅ Receta actualizada correctamente');
    res.status(200).json({ message: 'Receta actualizada correctamente' });
  } catch (err) {
    console.error('❌ Error al actualizar receta:', err);
    res.status(500).json({ message: 'Error al actualizar receta' });
  }
}
module.exports = { obtenerRecetas, editarReceta };
