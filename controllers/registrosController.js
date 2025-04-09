const db = require('../db');

// Función para calcular fecha de vencimiento
function calcularVencimiento(fecha_inicio, duracion) {
  const fecha = new Date(fecha_inicio);
  if (duracion === '30_dias') fecha.setDate(fecha.getDate() + 30);
  if (duracion === '1_anio') fecha.setFullYear(fecha.getFullYear() + 1);
  return fecha.toISOString().split('T')[0];
}

// Obtener todos los registros
exports.getRegistros = (req, res) => {
  db.query(`
    SELECT r.*, s.nombre AS servicio, c.correo
    FROM registros r
    JOIN servicios s ON r.id_servicio = s.id
    JOIN correos c ON r.id_correo = c.id
  `, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Crear nuevo registro
exports.createRegistro = (req, res) => {
  const { nombre, telefono, id_servicio, id_correo, duracion, fecha_inicio } = req.body;
  const fecha_vencimiento = calcularVencimiento(fecha_inicio, duracion);

  db.query(`
    INSERT INTO registros (nombre, telefono, id_servicio, id_correo, duracion, fecha_inicio, fecha_vencimiento)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, telefono, id_servicio, id_correo, duracion, fecha_inicio, fecha_vencimiento],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Registro guardado', id: result.insertId });
    }
  );
};

// Eliminar registro
exports.deleteRegistro = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM registros WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Registro eliminado' });
  });
};

// Renovar registro
exports.renovarRegistro = (req, res) => {
  const { id } = req.params;
  const { duracion, id_correo } = req.body;

  db.query('SELECT fecha_vencimiento FROM registros WHERE id = ?', [id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ message: 'Registro no encontrado' });

    const fecha_vencimiento = calcularVencimiento(results[0].fecha_vencimiento, duracion);

    db.query('UPDATE registros SET duracion = ?, fecha_inicio = ?, fecha_vencimiento = ?, id_correo = ? WHERE id = ?',
      [duracion, results[0].fecha_vencimiento, fecha_vencimiento, id_correo, id],
      (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Registro renovado' });
      });
  });
};
