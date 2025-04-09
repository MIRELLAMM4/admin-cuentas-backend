const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('🎉 API de Admin de Cuentas funcionando');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
const serviciosRoutes = require('./routes/serviciosRoutes');
const correosRoutes = require('./routes/correosRoutes');

app.use('/api/servicios', serviciosRoutes);
app.use('/api/correos', correosRoutes);

const registrosRoutes = require('./routes/registrosRoutes');
app.use('/api/registros', registrosRoutes);
