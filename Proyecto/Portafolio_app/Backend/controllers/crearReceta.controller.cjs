
const db = require('../config/db.cjs');


async function crearReceta(req, res){
    console.log("entro a crearReceta en backend");
    
    
    const { nombre_receta, tiempo, descripcion_receta, id_tipo_creador, id_usuario_creador, imagen_url } = req.body;
    console.log('➡️ Datos recibidos:', { nombre_receta, tiempo, descripcion_receta, id_tipo_creador, id_usuario_creador, imagen_url });

    if (!nombre_receta || !tiempo || !descripcion_receta || !id_tipo_creador || !id_usuario_creador || !imagen_url) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
            this.subirReceta(nombre_receta, tiempo, descripcion_receta, id_tipo_creador, id_usuario_creador);   
        
            const id = this.consultarID(nombre_receta, tiempo,id_tipo_creador, id_usuario_creador);
            
            this.subirImagen(imagen_url, id , nombre_receta);


            res.status(201).json({ success: true });     
            console.log('✅ receta guardada correctamente');
    } catch (error) {
        console.error('❌ Error al crear receta en base de datos:', error);
        res.status(500).json({ error: 'Error interno al guardar receta', details: err.message });
    }

}   




async function subirReceta(nombre_receta, tiempo, descripcion_receta, id_tipo_creador, id_usuario_creador) {
    
    try {
        const [results] = await db.query(
            `INSERT INTO recetas (nombre_receta, tiempo, descripcion_receta, id_valoracion ,id_tipo_creador, id_usuario_creador)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre_receta, tiempo, descripcion_receta, 0 ,id_tipo_creador, id_usuario_creador]);
    } catch (error) {
        console.error('❌ Error al SUBIR RECETA en base de datos:', error);
    }
    
}





async function subirImagen(url, id, nom_receta){
    
    try {
        const [results] = await db.query(
            `INSERT INTO imagenes (nombre_imagen, tipo_imagen, datos, ruta_imagen,id_recetas)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nom_receta,'image/png',null,url, id]);    
            
            this.subirImagen(imagen_url);


            res.status(201).json({ success: true });     
            console.log('✅ receta guardada correctamente');
    } catch (error) {
        console.error('❌ Error al crear receta en base de datos:', error);
        res.status(500).json({ error: 'Error interno al guardar receta', details: err.message });
    }

}





async function consultarID(nombre_receta, tiempo ,id_tipo_creador, id_usuario_creador){
    try {
        const results = await db.query(
            `SELECT id_recetas FROM recetas WHERE nombre_receta = ?, tiempo = ?, id_tipo_creador = ?, id_usuario_creador = ?`
            [nombre_receta, tiempo ,id_tipo_creador, id_usuario_creador]);

            console.log(results);
            
            return results;
    } catch (error) {
        console.error('❌ Error al crear receta en base de datos:', error);
        res.status(500).json({ error: 'Error interno al consultar receta', details: err.message });
    }
}

module.exports = {
    crearReceta,
    subirImagen,
    consultarID,
    subirReceta
};