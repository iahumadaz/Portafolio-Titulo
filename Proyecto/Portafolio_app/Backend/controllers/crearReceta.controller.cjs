
const db = require('../config/db.cjs');


async function crearReceta(req, res){
    console.log("entro a crearReceta en backend");
    
    
    const { nombre_receta, tiempo, descripcion_receta, id_tipo_creador, id_usuario_creador } = req.body;
    console.log('➡️ Datos recibidos:', { nombre_receta, tiempo, descripcion_receta, id_tipo_creador, id_usuario_creador });

    if (!nombre_receta || !tiempo || !descripcion_receta || !id_tipo_creador || !id_usuario_creador) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [results] = await db.query(
            `INSERT INTO recetas (nombre_receta, tiempo, descripcion_receta, id_valoracion ,id_tipo_creador, id_usuario_creador)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre_receta, tiempo, descripcion_receta, 0 ,id_tipo_creador, id_usuario_creador]);     
            res.status(201).json({ success: true });     
            console.log('✅ receta guardada correctamente');
    } catch (error) {
        console.error('❌ Error al crear receta en base de datos:', error);
        res.status(500).json({ error: 'Error interno al guardar receta', details: err.message });
    }

}   

module.exports = {
    crearReceta
};