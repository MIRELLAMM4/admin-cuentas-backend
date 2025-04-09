const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const serviciosRoutes = require('./routes/serviciosRoutes');
const correosRoutes = require('./routes/correosRoutes');
const registrosRoutes = require('./routes/registrosRoutes');

app.use(cors());
app.use(express.json());

// Registrar rutas
app.use('/api', authRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/correos', correosRoutes);
app.use('/api/registros', registrosRoutes);

app.get('/', (req, res) => {
  res.send('🎉 API de Admin de Cuentas funcionando');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
