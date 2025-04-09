const db = require('../db');

exports.getServicios = (req, res) => {
  db.query('SELECT * FROM servicios', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.createServicio = (req, res) => {
  const { nombre, limite_usuarios } = req.body;
  if (!nombre || !limite_usuarios) {
    return res.status(400).json({ message: "Faltan datos para crear el servicio" });
  }
  db.query('INSERT INTO servicios (nombre, limite_usuarios) VALUES (?, ?)', [nombre, limite_usuarios], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Servicio creado exitosamente', id: result.insertId });
  });
};

exports.updateServicio = (req, res) => {
  const { id } = req.params;
  const { nombre, limite_usuarios } = req.body;
  db.query('UPDATE servicios SET nombre = ?, limite_usuarios = ? WHERE id = ?', [nombre, limite_usuarios, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Servicio actualizado' });
  });
};

exports.deleteServicio = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM servicios WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Servicio eliminado' });
  });
};
