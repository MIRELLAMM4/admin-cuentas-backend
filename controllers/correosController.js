const db = require('../db');

exports.getCorreos = (req, res) => {
  db.query('SELECT * FROM correos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getCorreosByServicio = (req, res) => {
  const { id_servicio } = req.params;
  db.query('SELECT * FROM correos WHERE id_servicio = ?', [id_servicio], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.createCorreo = (req, res) => {
  const { correo, id_servicio } = req.body;
  if (!correo || !id_servicio) {
    return res.status(400).json({ message: "Faltan datos para crear el correo" });
  }
  db.query('INSERT INTO correos (correo, id_servicio) VALUES (?, ?)', [correo, id_servicio], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Correo creado', id: result.insertId });
  });
};

exports.deleteCorreo = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM correos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Correo eliminado' });
  });
};
