const db = require('../db');

// Función auxiliar para calcular fecha de vencimiento
function calcularVencimiento(fecha_inicio, duracion) {
  const fecha = new Date(fecha_inicio);
  if (duracion === '30_dias') {
    fecha.setDate(fecha.getDate() + 30);
  } else if (duracion === '1_anio') {
    fecha.setFullYear(fecha.getFullYear() + 1);
  }
  return fecha.toISOString().split('T')[0];
}

exports.getRegistros = (req, res) => {
  const query = `
    SELECT r.*, s.nombre AS servicio, c.correo
    FROM registros r
    JOIN servicios s ON r.id_servicio = s.id
    JOIN correos c ON r.id_correo = c.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.createRegistro = (req, res) => {
  const { nombre, telefono, id_servicio, id_correo, duracion, fecha_inicio } = req.body;
  if (!nombre || !telefono || !id_servicio || !id_correo || !duracion || !fecha_inicio) {
    return res.status(400).json({ message: "Faltan datos para crear el registro" });
  }
  const fecha_vencimiento = calcularVencimiento(fecha_inicio, duracion);
  const query = `
    INSERT INTO registros (nombre, telefono, id_servicio, id_correo, duracion, fecha_inicio, fecha_vencimiento)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [nombre, telefono, id_servicio, id_correo, duracion, fecha_inicio, fecha_vencimiento], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Registro creado', id: result.insertId });
  });
};

exports.deleteRegistro = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM registros WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Registro eliminado' });
  });
};

exports.renovarRegistro = (req, res) => {
  const { id } = req.params;
  const { duracion, id_correo } = req.body;

  // Obtener el registro actual para usar su fecha de vencimiento como nuevo inicio
  db.query('SELECT fecha_vencimiento FROM registros WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: 'Registro no encontrado' });
    const fecha_inicio = results[0].fecha_vencimiento;
    const nueva_fecha_vencimiento = calcularVencimiento(fecha_inicio, duracion);
    const query = 'UPDATE registros SET duracion = ?, fecha_inicio = ?, fecha_vencimiento = ?, id_correo = ? WHERE id = ?';
    db.query(query, [duracion, fecha_inicio, nueva_fecha_vencimiento, id_correo, id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Registro renovado' });
    });
  });
};
